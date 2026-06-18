const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');
const header = document.querySelector(".header")
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('open');
    header.classList.toggle('active');
});