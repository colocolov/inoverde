let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel__list');
let thumbnailBorderDom = document.querySelector('.carousel__thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.carousel__thumbnail-item');
//let timeDom = document.querySelector('.carousel__time2');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = parseInt(carouselDom.dataset.running) || 3000;
let timeAutoNext = parseInt(carouselDom.dataset.autonext) || 5000;

if (carouselDom) {

    // 1. Заменяем старый код автопрокрутки на новый
    let autoPlayInterval;

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextDom.click();
        }, timeAutoNext);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    nextDom.onclick = function(){
        showSlider('next');    
    }

    prevDom.onclick = function(){
        showSlider('prev');    
    }

    // 2. Инициализация автопрокрутки
    startAutoPlay();
}

// 3. Добавляем обработчики для паузы при наведении
// carouselDom.addEventListener('mouseenter', stopAutoPlay);
// carouselDom.addEventListener('mouseleave', startAutoPlay);

let runTimeOut;
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel__list-item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel__thumbnail-item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // 4. Удаляем старый код автопрокрутки (эти строки больше не нужны)
    // clearTimeout(runNextAuto);
    // runNextAuto = setTimeout(() => {
    //     nextDom.click();
    // }, timeAutoNext)
}