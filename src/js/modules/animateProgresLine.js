class ScrollAnimation {
  constructor(container) {
    this.container = container;
    this.line = container.querySelector('.line');
    this.sections = container.querySelectorAll('.process__section');

    if (!this.line || !this.sections.length) {
      // console.log('Required elements (.line or .process__section) not found in container', container);
      return; // Прекращаем выполнение, если нет нужных элементов
    }

    this.duration = parseInt(container.dataset.duration) || 7000;
    this.shouldRepeat = container.dataset.repeat === 'true';
    this.animationId = null;
    this.startTime = null;
    this.sectionPositions = [];
    
    this.init();
  }

  init() {
    this.calculatePositions();
    this.setupObserver();
    window.addEventListener('resize', this.calculatePositions.bind(this));
  }

  calculatePositions() {
    const containerRect = this.container.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    
    this.sectionPositions = Array.from(this.sections).map(section => {
      const rect = section.getBoundingClientRect();
      return {
        left: rect.left + scrollX - containerRect.left,
        width: rect.width
      };
    });
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAnimation();
        } else if (!this.shouldRepeat) {
          this.resetAnimation();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.container);
  }

  startAnimation() {
    cancelAnimationFrame(this.animationId);
    this.line.style.transform = 'translate(-50%, -50%) scaleX(0)';
    
    requestAnimationFrame(() => {
      this.line.style.transition = `transform ${this.duration}ms linear`;
      this.line.style.transform = 'translate(-50%, -50%) scaleX(1)';
      this.startTime = Date.now();
      this.animateSections();
    });
  }

  animateSections() {
    const elapsed = Date.now() - this.startTime;
    const progress = elapsed / this.duration;
    
    this.sections.forEach((section, index) => {
      const sectionStart = this.sectionPositions[index].left / window.innerWidth;
      if (progress >= sectionStart && !section.classList.contains('visible')) {
        section.classList.add('visible');
        section.classList.add('point');
      }
    });

    if (progress < 1) {
      this.animationId = requestAnimationFrame(this.animateSections.bind(this));
    }
  }

  resetAnimation() {
    cancelAnimationFrame(this.animationId);
    this.line.style.transition = 'none';
    this.sections.forEach(section => section.classList.remove('visible'));
  }
}

// Инициализация только если есть хотя бы один .line-animation2
document.addEventListener('DOMContentLoaded', () => {
  const lineAnimateContainers = document.querySelectorAll('.line-animation');
  
  if (!lineAnimateContainers.length) {
    // console.log('No .line-animation containers found - script stopped');
    return; // Выходим, если нет контейнеров
  }

  // Функция для инициализации анимации (только на десктопе)
  const initAnimation = () => {
    if (window.innerWidth <= 767.98) {
      return; // Не запускаем на мобильных устройствах
    }

    lineAnimateContainers.forEach(container => {
      new ScrollAnimation(container);
    });
  };

  // Инициализация при загрузке
  initAnimation();
  
  // Переинициализация при изменении размера окна
  window.addEventListener('resize', initAnimation);
});