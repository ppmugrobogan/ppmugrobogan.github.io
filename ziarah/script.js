// script.js
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enterBtn');
    const content = document.querySelector('.content');
    const hero = document.querySelector('.hero');
  
    enterBtn.addEventListener('click', () => {
      hero.classList.add('hidden');
      content.classList.remove('hidden');
    });
  });
  