// JS
// Определяем iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if(isIOS) {
    
  console.log(ios);
  const parallaxImg = document.querySelector('.parallax__img');
  parallaxImg.classList.add('ios');
  
} 