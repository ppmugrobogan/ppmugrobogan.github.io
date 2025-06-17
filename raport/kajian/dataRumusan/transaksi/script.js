const API_URL = 'https://script.google.com/macros/s/AKfycbzJCBU3E_CAEbss6NM7GUGBPDLqpPZ41Db6rnuuqpvKUgJVvncmn_47GOEC1Ik9F_3w4g/exec';
const KOMENTAR_API = 'https://script.google.com/macros/s/AKfycbzpdnivkWifMSEFZeY83-VvzA-Rhl8o3UG0UtBe4GUcU0jb8_D9NgVxzycoc-iXYB4tRQ/exec';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let hasLiked = false;

const socialMediaUrls = {
  facebook: 'https://web.facebook.com/ppmu.grobogan',
  instagram: 'https://www.instagram.com/ppmu.grobogan',
  youtube: 'https://www.youtube.com/c/PPMUGrobogan',
  tiktok: 'https://www.tiktok.com/@ppmu.grobogan'
};

function parseIsi(text) {
  const lines = text.split('\n');
  let html = '';
  let currentListType = null;
  let listTag = null;
  let listOpened = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    const isArabic = /[\u0600-\u06FF]/.test(trimmed);
    const match = trimmed.match(/^([a-z]\.|\d+\.|[-*+])\s+/i);

    if (match) {
      const marker = match[1];
      let listType = 'ul';
      let styleType = 'disc';

      if (/^[a-z]\./i.test(marker)) {
        listType = 'ol';
        styleType = 'lower-alpha';
      } else if (/^\d+\./.test(marker)) {
        listType = 'ol';
        styleType = 'decimal';
      }

      if (currentListType !== styleType || listTag !== listType) {
        if (listOpened) html += `</${listTag}>`;
        html += `<${listType} style="list-style-type: ${styleType}; margin-left: 1.5em;">`;
        currentListType = styleType;
        listTag = listType;
        listOpened = true;
      }

      html += `<li>${trimmed.replace(/^([a-z]\.|\d+\.|[-*+])\s+/i, '')}</li>`;
    } else {
      if (listOpened) {
        html += `</${listTag}>`;
        listOpened = false;
        currentListType = null;
        listTag = null;
      }

      let formatted = line
        .replace(/(Deskripsi masalah|Pertanyaan|Jawaban|Refrensi)\s*:/g, '<div class="section-title">$1:</div>')
        .replace(/#(.*?)#/g, '<span class="kitab">$1</span>')
        .replace(/\*(.*?)\*/g, '<span class="syahid">$1</span>');

      html += `<p class="${isArabic ? 'arab' : ''}">${formatted}</p>`;
    }
  });

  if (listOpened) html += `</${listTag}>`;
  return html;
}

function splitNames(str) {
  return str.split(/[\n,]/).map(name => name.trim()).filter(Boolean);
}

function renderNames(mushohih, perumus, notulen, moderator) {
  const block = (label, list) => {
    if (!list.length) return '';
    return `<div class="role">${label}</div>${list.map(name => `<div class="name">${name}</div>`).join('')}`;
  };
  return [block('Mushohih', mushohih), block('Perumus', perumus), block('Notulen', notulen), block('Moderator', moderator)].join('');
}

function fetchData() {
  if (!id) {
    console.warn('ID artikel tidak ditemukan.');
    return;
  }
  fetch(`${API_URL}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('banner').src = data.banner;
      document.getElementById('title').textContent = data.title;
      document.querySelector('meta[property="og:title"]').content = data.title;
      document.querySelector('meta[property="og:image"]').content = data.banner;
      document.getElementById('content').innerHTML = parseIsi(data.content);

      document.getElementById('teamList').innerHTML = renderNames(
        splitNames(data.mushohih),
        splitNames(data.perumus),
        splitNames(data.notulen),
        splitNames(data.moderator)
      );

      document.getElementById('likeCount').textContent = data.like;
      document.getElementById('viewCount').textContent = data.view;

      updateCount('view');
    });
}

function updateCount(action) {
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${id}&action=${action}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById('likeCount').textContent = data.like;
      document.getElementById('viewCount').textContent = data.view;
    }
  });
}

function shareArtikel() {
  const title = document.getElementById('title').textContent;
  const url = window.location.href;
  const text = `${title}\n${url}\n__________\nIkuti juga sosial media kami:\nFacebook: ${socialMediaUrls.facebook}\nInstagram: ${socialMediaUrls.instagram}\nYouTube: ${socialMediaUrls.youtube}\nTikTok: ${socialMediaUrls.tiktok}`;

  if (window.AppInventor) {
    window.AppInventor.setWebViewString(text);
  } else if (navigator.share) {
    navigator.share({ title, text });
  } else {
    alert("Link disalin ke clipboard");
    navigator.clipboard.writeText(text);
  }
}

function handleLike(button) {
  if (hasLiked) return;
  hasLiked = true;
  button.classList.add('liked');
  button.innerHTML = `<i class="fas fa-thumbs-up"></i> <span>Disukai</span>`;
  updateCount('like');
}

function loadKomentar() {
    if (!id) return;
    fetch(`${KOMENTAR_API}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const commentList = document.getElementById('komentarList');
        commentList.innerHTML = data.map(c => {
          const inisial = c.nama ? c.nama.charAt(0).toUpperCase() : '?';
          return `
            <div class="komentar-item">
              <div class="komentar-avatar">
                <div class="avatar-bulat">${inisial}</div>
              </div>
              <div class="komentar-content">
                <div class="nama"><strong>${c.nama}</strong></div>
                <div class="waktu">${c.waktu}</div>
                <div class="isi">${c.komentar}</div>
                ${c.kontak ? `
                  <div class="kontak">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ikon-telp" viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M6.62 10.79a15.534 15.534 0 006.59 6.59l2.2-2.2a1.004 1.004 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.3 22 2 13.7 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1.004 1.004 0 01-.21 1.11l-2.2 2.2z"/>
                    </svg>
                    ${c.kontak}
                  </div>` : ''}
              </div>
            </div>
          `;
        }).join('');
      });
  }
  

function kirimKomentar(event) {
  event.preventDefault();

  const nama = document.getElementById('namaKomentar').value.trim();
  const komentar = document.getElementById('isiKomentar').value.trim();
  const kontak = document.getElementById('kontakKomentar').value.trim();

  if (!nama || !komentar) {
    alert('Nama dan komentar wajib diisi.');
    return;
  }

  fetch(KOMENTAR_API, {
    method: 'POST',
    body: JSON.stringify({ id_artikel: id, nama, komentar, kontak })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById('namaKomentar').value = '';
      document.getElementById('isiKomentar').value = '';
      document.getElementById('kontakKomentar').value = '';
      loadKomentar();
    }
  })
  .catch(err => {
    console.error('Gagal kirim komentar:', err);
    alert('Terjadi kesalahan saat mengirim komentar.');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  fetchData();
  loadKomentar();
});

// LOADING IMG
const img = document.getElementById("banner");
  const wrapper = img.parentElement;
  img.onload = () => {
    img.classList.add("loaded");
    wrapper.classList.add("loaded");
  };