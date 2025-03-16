// NAVIGASI
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('navigasi');
});

// SLIDE
const imageLinks = [
    "../GAMBAR/BROSUR/BENDERA.jpg",
    "../GAMBAR/BROSUR/BMK_PERUMUS.jpg",
    "../GAMBAR/BROSUR/foto1.JPG",
    "../GAMBAR/BROSUR/GUSE.jpg",
    "../GAMBAR/BROSUR/PENGURUS.jpg",
    "../GAMBAR/BROSUR/PENTASPA.jpg"
];

function populateSlides() {
    imageLinks.forEach((link, index) => {
        const slideWrapperId = `slide-wrapper${index + 1}`;
        const slideWrapper = document.getElementById(slideWrapperId);

        if (slideWrapper) {
            const imgTag = document.createElement('img');
            imgTag.src = link;
            imgTag.alt = `Slide ${index + 1}`;
            imgTag.classList.add('slide'); // Mempertahankan class yang sudah ada

            const div = document.createElement('div');
            div.appendChild(imgTag);
            slideWrapper.appendChild(div);
        }
    });
}

populateSlides();

let currentSlideIndex = 0;
let intervalId;

function showNextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function showPrevSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide-wrapper');
    if (slideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (slideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides.forEach((slide, index) => {
        slide.style.display = index === currentSlideIndex ? 'block' : 'none';
    });
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        showNextSlide();
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

startAutoSlide(); // Mulai otomatis geser

