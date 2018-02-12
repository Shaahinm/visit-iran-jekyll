$(document).ready(function() {
  ///////////////////////// start of Provinces slider ////////////////////////////////
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    // asNavFor: ".slider-nav",
    swipe: false,    
    infinite: false
  });
  $(".slider-nav").slick({
    rows: 2,
    slidesPerRow: 2,
    // slidesToShow: 4,
    autoPlay: true,
    autoplaySpeed: 1000,
    speed: 1000,
    slidesToScroll: 1,    
    // dots: true,
    arrows: false,
    focusOnSelect: false,
    vertical: true,
    verticalSwiping: true,    
    centerMode: false,
    // prevArrow: '<span class="prev"><i class="fa fa-chevron-up fa-2x" aria-hidden="true"></i></span>',
    // nextArrow: '<span class="next"><i class="fa fa-chevron-down fa-2x" aria-hidden="true"></i></span>',
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 3,
          autoPlay: true,
          slidesToScroll: 1,
          asNavFor: ".slider-for",
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
          autoPlay: true,
          slidesToScroll: 1,
          asNavFor: ".slider-for",
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      }
    ]
  });

  $(".goto").click(function(e) {
    e.preventDefault();
    // var slideno = $(this).data("slide");
    var slideno = $(this).data("slide");
    $(".slider-for").slick("slickGoTo", slideno - 1);
  });
  ///////////////////////// end of Provinces slider //////////////////////////////////
  //////////////////////// start of routes slider ////////////////////////////////////
  $(".slider-for-routes").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav-routes",
    swipe: false
  });
  $(".slider-nav-routes").slick({
    slidesToShow: 2,
    autoPlay: true,
    slidesToScroll: 1,
    asNavFor: ".slider-for-routes",
    dots: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 3,
          autoPlay: true,
          slidesToScroll: 1,
          asNavFor: ".slider-for-routes",
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
          autoPlay: true,
          slidesToScroll: 1,
          asNavFor: ".slider-for-routes",
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      }
    ]
  });

  ///////////////////////// end of route slider //////////////////////////////////
  //////////////////////// start of residence slider ////////////////////////////////////
  $(".slider-nav-residence").slick({
    slidesToShow: 1,
    autoPlay: true,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    centerMode: true,
    // prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-chevron-left' aria-hidden='true'></i></button>",
    // nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
          autoPlay: true,
          slidesToScroll: 1,
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
          autoPlay: true,
          slidesToScroll: 1,
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: false
        }
      }
    ]
  });
  ///////////////////////// end of residence slider //////////////////////////////////
  //////////////////////// start of village slider ////////////////////////////////////
  $(".slider-nav-village").slick({
    slidesToShow: 4,
    autoPlay: true,
    slidesToScroll: 4,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,          
          slidesToScroll: 3,          
        }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,          
          slidesToScroll: 2,          
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,          
          slidesToScroll: 1,          
        }
      }
    ]
  });
  ///////////////////////// end of village slider //////////////////////////////////
  //////////////////////// start of residental slider ////////////////////////////////////
  $(".slider-for-residentals").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav-residentals",
    swipe: false
  });
  $(".slider-nav-residentals").slick({
    slidesToShow: 2,
    autoPlay: true,
    slidesToScroll: 1,
    asNavFor: ".slider-for-residentals",
    dots: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 3,
          autoPlay: true,
          slidesToScroll: 1,
          asNavFor: ".slider-for-residentals",
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
          autoPlay: true,
          slidesToScroll: 1,
          asNavFor: ".slider-for-residentals",
          dots: false,
          focusOnSelect: true,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          centerMode: true
        }
      }
    ]
  });
   ///////////////////////// end of residental slider //////////////////////////////////
  //////////////////////// start of event slider ////////////////////////////////////
  $(".slider-nav-event").slick({
    slidesToShow: 4,
    autoPlay: true,
    slidesToScroll: 4,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    centerMode: false,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 2,
          autoPlay: true,
          slidesToScroll: 1,
          dots: false,
          focusOnSelect: true,          
          arrows: false,
          centerMode: false
        }
      },
      {
        breakpoint: 700,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
          autoPlay: true,
          slidesToScroll: 1,
          dots: false,
          focusOnSelect: true,          
          arrows: false,
          centerMode: false
        }
      }
    ]
  });
  ///////////////////////// end of event slider //////////////////////////////////
  //////////////////////// start of craft slider ////////////////////////////////////
  $(".slider-nav-craft").slick({
    slidesToShow: 4,
    autoPlay: true,
    slidesToScroll: 4,
    dots: false,
    focusOnSelect: true,
    arrows: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,          
          slidesToScroll: 3,          
        }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,          
          slidesToScroll: 2,          
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,          
          slidesToScroll: 1,          
        }
      }
    ]
  });
  ///////////////////////// end of craft slider //////////////////////////////////  
  //////////////////////// start of province event slider ////////////////////////////////////
  $(".slider-for-events-province").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,   
    swipe: false,    
    infinite: false
  });
  $(".slider-nav-events-province").slick({    
    slidesToShow: 3,
    autoPlay: true,
    autoplaySpeed: 1000,    
    speed: 1000,
    slidesToScroll: 1,        
    arrows: false,
    focusOnSelect: false,
    vertical: true,
    verticalSwiping: true,    
    centerMode: false,   
  });

  $(".goto").click(function(e) {
    // e.preventDefault();
    // var slideno = $(this).data("slide");
    var slideno = $(this).data("slide");
    $(".slider-for-events-province").slick("slickGoTo", slideno - 1);
  });  

  $('.filters button').bind('click', function(e){
    var filter = $(this).val();
    var key = "."+filter;
    
    $('.slider-nav-events-province, .slider-for-events-province').slick('slickUnfilter');
    $('.slider-nav-events-province, .slider-for-events-province').slick('slickFilter',':has('+key+')').slick('refresh');
    $('.slider-nav-events-province, .slider-for-events-province').slick('slickGoTo', 0);    
   
    
    });
  ///////////////////////// end of province event slider //////////////////////////////////
});
