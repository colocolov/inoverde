document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие основного контейнера карусели
    const carouselDom = document.querySelector('.carousel');
    if (!carouselDom) {
        // console.log('Carousel not found - script stopped');
        return;
    }

    // Проверяем наличие обязательных элементов
    const nextDom = document.getElementById('next');
    const prevDom = document.getElementById('prev');
    const SliderDom = carouselDom.querySelector('.carousel__list');
    const thumbnailBorderDom = document.querySelector('.carousel__thumbnail');
    
    if (!nextDom || !prevDom || !SliderDom || !thumbnailBorderDom) {
        // console.log('Required carousel elements not found - script stopped');
        return;
    }

    // Проверяем наличие элементов миниатюр
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.carousel__thumbnail-item');
    if (thumbnailItemsDom.length === 0) {
        // console.log('No thumbnail items found - script stopped');
        return;
    }

    // Добавляем первую миниатюру в конец (для циклической прокрутки)
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    // Получаем настройки из data-атрибутов или используем значения по умолчанию
    const timeRunning = parseInt(carouselDom.dataset.running) || 3000;
    const timeAutoNext = parseInt(carouselDom.dataset.autonext) || 5000;

    // 1. Логика автопрокрутки
    let autoPlayInterval;
    let runTimeOut;

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextDom.click();
        }, timeAutoNext);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 2. Обработчики кнопок
    nextDom.onclick = function() {
        stopAutoPlay();
        showSlider('next');
        startAutoPlay();
    }

    prevDom.onclick = function() {
        stopAutoPlay();
        showSlider('prev');
        startAutoPlay();
    }

    // 3. Функция показа слайдов
    function showSlider(type) {
        const SliderItemsDom = SliderDom.querySelectorAll('.carousel__list-item');
        const thumbnailItemsDom = document.querySelectorAll('.carousel__thumbnail-item');
        
        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);
    }

    // 4. Инициализация автопрокрутки
    startAutoPlay();

    // 5. Пауза при наведении (по желанию)
    // carouselDom.addEventListener('mouseenter', stopAutoPlay);
    // carouselDom.addEventListener('mouseleave', startAutoPlay);
});