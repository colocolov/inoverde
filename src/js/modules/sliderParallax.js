// https://swiperjs.com/swiper-api

import _vars from "../_vars.js";
import Swiper, { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper";

Swiper.use([Parallax]);

if (_vars.parallaxSliderEl) {

  console.log(_vars.parallaxSliderEl);
  // слайдер на главной
  new Swiper(_vars.parallaxSliderEl, {
    // direction: "vertical",
    speed: 800,
    parallax: true,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    mousewheel: true,

    
    
  });
  //----- END
}