// script.js
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enterBtn');
    const content = document.querySelector('.content');
    const hero = document.querySelector('.hero');
    const audio = document.getElementById('backsound'); // Ambil elemen audio
  
    enterBtn.addEventListener('click', () => {
      hero.classList.add('hidden');
      content.classList.remove('hidden');
  
      // Mulai audio setelah interaksi
      if (audio) {
        audio.play().catch((error) => {
          console.warn("Audio autoplay gagal:", error);
        });
      }
    });
  });
  