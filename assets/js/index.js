$(document).ready(function() {
  ///////////////////////// start of home page hero slider ////////////////////////////////  
  $("#hero-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,    
    prevArrow:"<div class='inside'><img class='a-left control-c prev slick-prev' src='../assets/images/arrow-left.png'></div>",
    nextArrow:"<div class='inside'><img class='a-right control-c next slick-next' src='../assets/images/arrow-right.png'></div>",
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          arrows: false
        }
      }
    ]
  });
  ///////////////////////// end of home page hero slider //////////////////////////////////
  ///////////////////////// start of points of interest slider ////////////////////////////////
  $("#poi-scroll-up").click(function(e) {
    $("#poi-scrollable").animate(
      {
        scrollTop: $("#poi-scrollable").scrollTop() - 275
      },
      1000
    );
  });

  $("#poi-scroll-down").click(function(e) {
    $("#poi-scrollable").animate(
      {
        scrollTop: $("#poi-scrollable").scrollTop() + 275
      },
      1000
    );
  });
  ///////////////////////// end of points of interest slider //////////////////////////////////
  ///////////////////////// start of routes of interest slider ////////////////////////////////
  $("#old-houses-scroll-up").click(function(e) {
    $("#old-houses-scrollable").animate(
      {
        scrollTop: $("#old-houses-scrollable").scrollTop() - 275
      },
      1000
    );
  });

  $("#old-houses-scroll-down").click(function(e) {
    $("#old-houses-scrollable").animate(
      {
        scrollTop: $("#old-houses-scrollable").scrollTop() + 275
      },
      1000
    );
  });
  ///////////////////////// end of routes of interest slider //////////////////////////////////

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
        breakpoint: 1024,
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
        breakpoint: 1024,
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
  //////////////////////// start of residentials slider ////////////////////////////////////

  $("#residentials-scroll-up").click(function(e) {
    $("#residentials-scrollable").animate(
      {
        scrollTop: $("#residentials-scrollable").scrollTop() - 207
      },
      1000
    );
  });

  $("#residentials-scroll-down").click(function(e) {
    $("#residentials-scrollable").animate(
      {
        scrollTop: $("#residentials-scrollable").scrollTop() + 207
      },
      1000
    );
  });

  ///////////////////////// end of residentials slider //////////////////////////////////
  //////////////////////// start of event slider ////////////////////////////////////
  $("#events-scroll-up").click(function(e) {
    $("#events-scrollable").animate(
      {
        scrollTop: $("#events-scrollable").scrollTop() - 207
      },
      1000
    );
  });

  $("#events-scroll-down").click(function(e) {
    $("#events-scrollable").animate(
      {
        scrollTop: $("#events-scrollable").scrollTop() + 207
      },
      1000
    );
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
  ///////////////////////// end of province event slider //////////////////////////////////
  $(".link.expand").click(function(e) {
    e.preventDefault();
    if ($(this).hasClass("expanded")) {
      $(this).removeClass("expanded");
      $("#content-to-expand").removeClass("expand");
      $(this)
        .children("a")
        .text("بیشتر بخوانید");
    } else {
      $(this).addClass("expanded");
      $("#content-to-expand").addClass("expand");
      $(this)
        .children("a")
        .text("نمایش کمتر");
    }
  });

  // $("#search").on("blur", function() {
  //   // if($(this).val())
  //   //   $("#frmSearch").submit();
  // });

  // $("#search").keypress(function(e) {
  //   if (e.which == 13) {
  //     $("#frmSearch").submit();
  //   }
  // });
});
