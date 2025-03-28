// https://swiperjs.com/swiper-api

import _vars from "../_vars.js";
import Swiper, { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper";

Swiper.use([Autoplay]);

// устанавливаем свой размер отступов через глобальную переменную --gap
// const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gap"));
// console.log(gap);

if (_vars.portfolioSliderEl) {

  // слайдер на главной
  new Swiper(_vars.portfolioSliderEl, {
    loop: true,
    autoplay: {
      //пауза между прокруткой
      delay: 3000,
      //закончить на последнем слайде
      // stopOnLastSlide: false,
      //отключить после ручного переключения
      // disableOnInteraction: false,
    },
    //скорость переключения слайдов
    speed: 800,
    // показ кол-ва слайдов (работает, когда откл effect: "fade")
    slidesPerView: 1.1,
    // расстояние между слайдами
    // spaceBetween: gap, // свой размер
    spaceBetween: 20,
    // кол-во пролистываемых слайдов
    slidesPerGroup: 1,
    // стартовый слайд
    initialSlide: 1,
    // активный слайд по центру
    // centeredSlides: true,
    
    // адаптив
    breakpoints: {
      // when window width is >= 320px
      480: {
        slidesPerView: 2.2,
        // spaceBetween: 20,
      },
    },

    //отложенная загрузка:
    //отключаем презагрузку картинок
    preloadImages: false,
    lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: false,
    },
    // переключение при клике на слайд
    slideToClickedSlide: true,
    // отключение прокрутки при наведении мыши
    on: {
      init() {
        this.el.addEventListener("mouseenter", () => {
          this.autoplay.stop();
        });

        this.el.addEventListener("mouseleave", () => {
          this.autoplay.start();
        });
      },
    },
    //
    
  });
  //----- END
}