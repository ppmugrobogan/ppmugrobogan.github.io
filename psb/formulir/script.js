// Ganti URL ini dengan URL Web App dari Google Apps Script yang sudah dideploy
const scriptURL = 'https://script.google.com/macros/s/AKfycbwytSAwxTd8E3e_OEC-BsE2qNWvNQn5Jv4-FTjM24iSokBd3Fd_0PXrM0L7WgET0Vsz/exec';

const form = document.forms['formulir-psb'];

form.addEventListener('submit', e => {
  e.preventDefault(); // Mencegah reload halaman saat submit

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      if (result.result === 'success') {
        alert('✅ Data berhasil dikirim! Selanjutnya uploade dokumen anda..');
        form.reset(); // Kosongkan form
      } else {
        alert('⚠️ Data berhasil dikirim! Selanjutnya uploade dokumen anda..:\n' + result.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Data berhasil dikirim! Selanjutnya uploade dokumen anda..\n' + error.message);
    })
    .finally(() => {
      // Arahkan ke halaman sukses dalam kondisi apapun
      setTimeout(() => {
        window.location.href = 'img.html'; // Ganti jika nama file berbeda
      }, 1000);
    });
});
