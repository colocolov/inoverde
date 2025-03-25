document.addEventListener('DOMContentLoaded', () => {
  // Находим все контейнеры с data-атрибутом
  const containers = document.querySelectorAll('[data-scroll-animation]');
  
  containers.forEach(container => {
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
              // Учитываем индивидуальную задержку (data-delay) если есть
              const delay = block.dataset.delay || index * parseFloat(stepDelay);
              block.style.animationDelay = `${delay}s`;
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
  });
});