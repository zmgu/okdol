const swiper = new Swiper('.swiper', {
   // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
 
    loop: true,

    autoHeight: false,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });