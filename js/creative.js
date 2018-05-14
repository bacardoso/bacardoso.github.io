(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 110)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);


  //Bar animation
  var barWidth = $('#portfolio>div.container>.row').width()/3;
  $('#bar').width(barWidth);

  var nowshowing, showing = [null, null];
  $('a.toogle-topic').click(function() {
    if($("#"+$(this).prop('target')).children().length){
      var gallery = $("#"+$(this).prop('target')).children('.popup-gallery');
      showing = nowshowing || $('#'+$('.portfolio-active a').prop('target')).children('.popup-gallery');

      if($(gallery).is(':hidden')){
        $(this).parent().parent().addClass('portfolio-active');
        $("a[target='"+$(showing).parent().prop('id')+"']").parent().parent().removeClass('portfolio-active');
        
        $(gallery).slideToggle('fast', function(){
          $(this).css({'display': 'flex'});
          console.log(showing);
        });
        $(showing).slideToggle('fast');
        $("#bar")
        .css('left', $(this).prop('target') == 'marketing' ? 
          barWidth : 
          ($(this).prop('target') == 'branding-visual' ? 
            barWidth*2 : 
            0 ) );

      }
      nowshowing = gallery;
    }
  });

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
})(jQuery); // End of use strict
