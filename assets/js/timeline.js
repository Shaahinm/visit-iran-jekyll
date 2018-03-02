$(function() {
  // sticky sidebar timeline
  var body = $("body");
  $(window).on(
    "scroll",
    // $.debounce(250, function(e) {
    function(e) {
      var screen = $(window);
      var sidebarPosition = $(".timeline-sidebar").offset();
      var sidebar = $(".timeline-sidebar");

      var heroPositionEnd =
        $(".hero-img").offset().top +
        $(".hero-img").height() - 110;

      $(window).scroll(function() {
        if (window.innerHeight + window.scrollY > document.body.clientHeight) {
          $(sidebar).hide();
        } else {
          $(sidebar).show();
        }

        if (screen.width() >= 1200) {
          if ($(window).scrollTop() > heroPositionEnd) {
            $(".timeline-main").css("margin-right", 230);
            sidebar.css("position", "fixed").css("top", "180px");
          } else {
            sidebar.css("position", "static").css("top", "autp");
            $(".timeline-main").css("margin-right", 0);
          }
        } else if (screen.width() < 1200 && screen.width() >= 900) {
          if ($(window).scrollTop() > heroPositionEnd) {
            sidebar
              .css("position", "fixed")
              .css("top", "130px")
              .css("width", "100%")
              .css("background", "white")
              .css("z-index", "10");
          } else {
            sidebar
              .css("position", "static")
              .css("top", "auto")
              .css("width", "auto")
              .css("background", "auto");
          }
        } else if (screen.width() < 900) {
          if ($(window).scrollTop() > heroPositionEnd) {
            sidebar
              .css("position", "fixed")
              .css("top", "70px")
              .css("width", "100%")
              .css("background", "white")
              .css("z-index", "2");
          } else {
            sidebar
              .css("position", "static")
              .css("top", "auto")
              .css("width", "auto")
              .css("background", "auto");
          }
        }
      });
    }
  );
  //end of sticky sidebar timeline

  // active class 
  $(".timeline-sidebar a").click(function(e){
    $(".timeline-sidebar a").removeClass("active");
    $(this).addClass("active");
  });  
});
