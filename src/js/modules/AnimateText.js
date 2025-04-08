document.addEventListener("DOMContentLoaded", function () {
  // Первый скрипт - анимация текстовых блоков
  const textBlocks = document.querySelectorAll(".text-animate");
  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const repeat = entry.target.dataset.repeat === "true";

        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          entry.target.classList.add("visible");
        } else if (repeat) {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.5 }
  );
  if (textBlocks) {
    textBlocks.forEach((block) => textObserver.observe(block));
  }

  // Второй скрипт - анимация контейнеров с элементами
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
    const containerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            const block = item.querySelector('.animated-block');
            if (block) {
              const delay = block.dataset.delay || index * parseFloat(stepDelay);
              block.style.animationDelay = `${delay}s`;
              block.style.animationPlayState = 'running';
            }
          });
          containerObserver.unobserve(container);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    containerObserver.observe(container);
  });
});