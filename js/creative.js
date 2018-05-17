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
  var barWidth = $('#portfolio>div.container>.row').width()/3,
  [topics, ncols] = $(document).width() > 992 
    ? ['.portfolio-topic', 4] 
    : ['.portfolio-topic-sm', 2];

  $('#bar').width(barWidth);

  $(topics).each(function(i, topic){
    var target = $(topic).prop('id');
    if(target == 'social-media' || target == 'branding-visual'){
      var isimg = true, imgindex = 1,
      gallery =  $('<div>').addClass('row no-gutters popup-gallery'), 
      cols = [$('<div>').addClass('column'), 
        $('<div>').addClass('column'), 
        $('<div>').addClass('column'), 
        $('<div>').addClass('column')], 
      col, a, img, openbutton,
      nitems = target == 'social-media'? 14 : 5,
      ext = target == 'social-media'? 'png' : 'jpg';

      while(isimg) {
       
        img = new Image();
        img.src = 'img/portfolio/'+target+'/'+imgindex+'.'+ext;
        
        if(imgindex <= nitems){
          $(img)
            .addClass('img-fluid');
          
          col = cols[(imgindex-1)%ncols];
          
          a = $('<a>')
            .prop('href', 'img/portfolio/'+target+'/'+imgindex+'.'+ext)
            .addClass('portfolio-box');
          
          openbutton = $('<div>')
            .addClass('portfolio-box-caption');

          $(col).append(
            $(a).append(
              img, openbutton ) );

          imgindex++;
        }
        else isimg = false;
      }
      $(cols).each(function(i, col){
        if(i < ncols) $(gallery).append(col);
      });
      if($(gallery).children().length) $(topic).append(gallery);
    }
    else if(target == 'marketing') {
      var isvideo = true, videoindex = 1,
      gallery =  $('<div>').addClass('row no-gutters popup-gallery'), 
      cols = [$('<div>').addClass('video-column'), 
        $('<div>').addClass('video-column'),], 
      col, a, video, openbutton, nitems = 2;

      while(isvideo) {
        if(videoindex <= nitems){
          video = $('<video>')
            .prop({
              'src': 'video/portfolio/'+target+'/'+videoindex+'.mp4',
              'type': 'video/mp4',
              'controls': true
            })
            .addClass('video-fluid');
          
          col = cols[(videoindex-1)%(ncols/2)];

          $(col).append(
              video );

          videoindex++;
        }
        else isvideo = false;
      }
      $(cols).each(function(i, col){
        if(i < ncols-1) $(gallery).append(col);
      });
      if($(gallery).children().length) $(topic).append(gallery);
    }
  });


  //Slide galleries on click
  var nowshowing, showing = [null, null];
  $('a.toggle-topic').click(function() {
    if($("#"+$(this).prop('target')).children().length){
      var gallery = $("#"+$(this).prop('target')).children('.popup-gallery');
      showing = nowshowing || $('#'+$('.portfolio-active a').prop('target')).children('.popup-gallery');

      if($(gallery).is(':hidden')){
        $(this).parent().parent().addClass('portfolio-active');
        $("a[target='"+$(showing).parent().prop('id')+"']").parent().parent().removeClass('portfolio-active');
        
        $(gallery).slideToggle('fast', function(){
          $(this).css({'display': 'flex'});
        });
        $(showing).slideToggle();
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
  $('.popup-gallery').each(function(){
    $(this).magnificPopup({
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
    })
  });
})(jQuery); // End of use strict
