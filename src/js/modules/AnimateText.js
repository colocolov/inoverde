document.addEventListener('DOMContentLoaded', () => {
  // Функция для инициализации анимации
  function initScrollAnimation(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll('.animated-item');
    const stepDelay = container.dataset.stepDelay || '0.2';

    // Подготовка анимации
    items.forEach(item => {
      const block = item.querySelector('.animated-block');
      if (block) {
        block.style.animationPlayState = 'paused';
        block.style.opacity = '0';
      }
    });

    // Создаем Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            const block = item.querySelector('.animated-block');
            if (block) {
              block.style.animationDelay = `${index * parseFloat(stepDelay)}s`;
              block.style.animationPlayState = 'running';
            }
          });
          observer.unobserve(container);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(container);
  }


  // Инициализация для разных контейнеров
  initScrollAnimation('.hero__bottom'); // На странице услуг
  initScrollAnimation('.about__wrap');  // На странице "О нас"
  // Добавляйте другие контейнеры по мере необходимости
});