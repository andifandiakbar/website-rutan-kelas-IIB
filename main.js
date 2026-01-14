let slideIndex = 0;
let autoSlideInterval;
let isPaused = false;

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const container = document.querySelector('.slider-container');

    if (slides.length === 0 || !container) return;

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    const offset = -(slideIndex * 100);
    container.style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

function changeSlide(n) {
    stopAutoSlide();
    slideIndex += n;
    showSlides(slideIndex);
    if (!isPaused) startAutoSlide();
}

function currentSlide(n) {
    stopAutoSlide();
    slideIndex = n;
    showSlides(slideIndex);
    if (!isPaused) startAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function togglePause() {
    if (!isPaused) {
        stopAutoSlide();
        isPaused = true;
        console.log("Auto Slide Berhenti");
    } else {
        isPaused = false;
        startAutoSlide();
        console.log("Auto Slide Berjalan Kembali");
    }
}

let newsIndex = 0;

function moveNews(n) {
    const track = document.querySelector('.news-track');
    const slides = document.querySelectorAll('.main-news-slide');
    const dots = document.querySelectorAll('.news-dot');

    if (!track || slides.length === 0) return;

    newsIndex += n;
    if (newsIndex >= slides.length) { newsIndex = 0; }
    if (newsIndex < 0) { newsIndex = slides.length - 1; }

    const offset = -(newsIndex * 100);
    track.style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[newsIndex]) {
        dots[newsIndex].classList.add('active');
    }
}

function currentNews(n) {
    newsIndex = n;
    moveNews(0);
}

const runCounter = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 50; 

        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    startAutoSlide();

    if (document.querySelectorAll('.main-news-slide').length > 0) {
        moveNews(0);
    }

    runCounter();
});