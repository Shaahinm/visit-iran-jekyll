$(document).ready(function() {
    $('.map-menu-wrapper td').on("mouseover", function(){
        var state = $(this).data('state');
        $('#map-container').removeClass();
        $('#map-container').addClass(state);
    });

    $('.map-menu-wrapper td').on("mouseleave", function(){
        $('#map-container').removeClass();
    })
});