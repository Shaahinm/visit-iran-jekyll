$(document).ready(function () {
    $('#btnSubmit').on('click', function (e) {
        e.preventDefault();
        var img1 = document.getElementById("img");
        EXIF.getData(img1, function () {
            alert(EXIF.pretty(this));
        });
    });
});