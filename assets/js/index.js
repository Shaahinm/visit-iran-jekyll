$(document).ready(function() {
  ///////////////////////// start of Provinces slider ////////////////////////////////  

  $("#terminus-scroll-up").click(function(e) {
    $("#terminus-scrollable").animate(
      {
        scrollTop: $("#terminus-scrollable").scrollTop() - 275
      },
      1000
    );
  });

  $("#terminus-scroll-down").click(function(e) {
    $("#terminus-scrollable").animate(
      {
        scrollTop: $("#terminus-scrollable").scrollTop() + 275
      },
      1000
    );
  });

  // $("#terminus-down").click(function() {
  //   $(".slider-nav").slick("slickNext");
  // });
  // $("#terminus-up").click(function() {
  //   $(".slider-nav").slick("slickPrev");
  // });

  // $(".goto").click(function(e) {
  //   e.preventDefault();
  //   // var slideno = $(this).data("slide");
  //   var slideno = $(this).data("slide");
  //   $(".slider-for").slick("slickGoTo", slideno - 1);
  // });
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
  $(".routes-province-scroll-down").click(function() {
    $(".slider-nav-routes").slick("slickNext");
  });
  ///////////////////////// end of route slider //////////////////////////////////
  //////////////////////// start of residence slider ////////////////////////////////////
  $(".slider-nav-residence").slick({
    slidesToShow: 1,
    autoPlay: true,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    arrows: true,
    centerMode: false,
    //  nextArrow: '<div class="my-prev"><i class="fa fa-chevron-right"></i></div>',
    //  prevArrow: '<div class="my-next"><i class="fa fa-chevron-left"></i></div>',
    nextArrow: '<div class="my-prev">&#x3009;</div>',
    prevArrow: '<div class="my-next">&#x3008;</div>',
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
    arrows: true,
    nextArrow: '<div class="my-prev">&#x3009;</div>',
    prevArrow: '<div class="my-next">&#x3008;</div>',
    centerMode: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },      
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
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
    slidesToShow: 3,
    autoPlay: true,
    slidesToScroll: 1,
    speed: 1000,
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
    nextArrow: '<div class="my-prev">&#x3009;</div>',
    prevArrow: '<div class="my-next">&#x3008;</div>',
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true
        }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },     
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
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
    centerMode: false
  });

  $(".goto").click(function(e) {
    // e.preventDefault();
    // var slideno = $(this).data("slide");
    var slideno = $(this).data("slide");
    $(".slider-for-events-province").slick("slickGoTo", slideno - 1);
  });

  // $(".filters button").bind("click", function(e) {
  //   var filter = $(this).val();
  //   var key = "." + filter;

  //   $(".slider-nav-events-province, .slider-for-events-province").slick(
  //     "slickUnfilter"
  //   );
  //   $(".slider-nav-events-province, .slider-for-events-province")
  //     .slick("slickFilter", ":has(" + key + ")")
  //     .slick("refresh");
  //   $(".slider-nav-events-province, .slider-for-events-province").slick(
  //     "slickGoTo",
  //     0
  //   );
  // });
  ///////////////////////// end of province event slider //////////////////////////////////
});
