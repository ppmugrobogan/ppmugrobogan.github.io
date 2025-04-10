// Ganti URL ini dengan URL Web App dari Google Apps Script yang sudah dideploy
const scriptURL = 'https://script.google.com/macros/s/AKfycbzxhkyVYYk3j-hk2FXzap-0S8pdnhK4sQl5w-qVuFCHoqkCKgUcl0broNDbjR28Rwuj/exec';

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
        alert('✅ Data berhasil dikirim! Selanjutnya uploade dokumen anda!');
        form.reset(); // Kosongkan form
      } else {
        alert('⚠️ Data berhasil dikirim! Selanjutnya uploade dokumen anda!' );
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Data berhasil dikirim! Selanjutnya uploade dokumen anda!\n' );
    })
    .finally(() => {
      // Arahkan ke halaman sukses dalam kondisi apapun
      setTimeout(() => {
        window.location.href = 'img.html'; // Ganti jika nama file berbeda
      }, 1000);
    });
});
