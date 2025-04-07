// NAVIGASI
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('navigasi');
});

// SLIDE
const imageLinks = [
    "../GAMBAR/BROSUR/pendaftaran.jpg",
    "../GAMBAR/BROSUR/baner2.jpg",
    
];

function populateSlides() {
    const slider = document.querySelector('.slider');

    imageLinks.forEach((link) => {
        const imgTag = document.createElement('img');
        imgTag.src = link;
        imgTag.classList.add('slide');
        slider.appendChild(imgTag);
    });
}

populateSlides();

let currentSlideIndex = 0;

function showSlide() {
    const slider = document.querySelector('.slider');
    const slideWidth = document.querySelector('.slide').clientWidth;

    currentSlideIndex++;
    if (currentSlideIndex >= imageLinks.length) {
        currentSlideIndex = 0;
    }

    slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

function startAutoSlide() {
    setInterval(showSlide, 5000);
}

startAutoSlide();