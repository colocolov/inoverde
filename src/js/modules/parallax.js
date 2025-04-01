// JS
// Определяем iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const parallaxImg = document.querySelector('.parallax__img');

if(isIOS) {
  parallaxImg.classList.add('ios');
} 