import Swiper from 'swiper/bundle';
 
 const swiper = new Swiper('.swiper', {
  
   loop: true,
   spaceBetween: 20,

    pagination: {
    el: '.swiper-pagination',
  },
});