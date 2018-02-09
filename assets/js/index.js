$(document).ready(function() {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
    swipe: false
  });
  $(".slider-nav").slick({
    rows: 2,
    slidesPerRow: 2,
    // slidesToShow: 4,
    autoPlay: true,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    centerMode: false,  
    responsive: [
      {
        breakpoint: 1024,
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
    $(".slider-nav").slick("slickGoTo", slideno - 1);
  });
});
