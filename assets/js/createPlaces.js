$(document).ready(function() {
  // $('#submit-all').on('click', function (e) {
  //     e.preventDefault();
  //     // var img1 = document.getElementById("img");
  //     // EXIF.getData(img1, function () {
  //     //     alert(EXIF.pretty(this));
  //     // });
  //     var jqxhr = $.post(settings.register_url, form.serialize())
  //         .done(function(data) {
  //           alert('done');
  //         })
  // });
});

var isLoading = $(".blockui");
Dropzone.options.dropzoneForm = {
  autoProcessQueue: false,
  MaxFiles: 5,
  maxFileSize: 4,
  uploadMultiple: true,
  parallelUploads: 5,
  createImageThumbnails: true,
  paramName: "images",
  previewsContainer: '.preview-container',
  headers: {
    "Cache-Control": null,
    "X-Requested-With": null,
    // "Authorization": `JWT ${getToken()}`
  },
  init: function() {
    var submitButton = document.querySelector("#submit-all");
    var myDropzone = this;
    submitButton.addEventListener("click", function() {
      $(isLoading).show();
      var name = $("#name")
        .val()
        .trim();
      var address = $("#address")
        .val()
        .trim();
      var intro = $("#intro")
        .val()
        .trim();
      var www_address = $("#www_address")
        .val()
        .trim();
      var lat = $("#lat").val();
      var lng = $("#lng").val();
      var hasError = false;
      if (name === "") {
        $(isLoading).hide();
        // $("#name").addClass('error-border');
        $("#name").focus();
        $.notify(settingsCreatePlaces.name, { type: "warning", delay: 5000 });
        hasError = true;
      } else if (address === "") {
        // $("#name").removeClass('error-border');
        // $("#address").addClass('error-border');
        $("#address").focus();
        $(isLoading).hide();
        $.notify(settingsCreatePlaces.address, {
          type: "warning",
          delay: 5000
        });
        hasError = true;
      } else if (intro === "") {
        $("#intro").focus();
        $(isLoading).hide();
        $.notify(settingsCreatePlaces.intro, { type: "warning", delay: 5000 });
        hasError = true;
      } else if (lat === "") {
        $(isLoading).hide();
        $.notify(settingsCreatePlaces.lat, { type: "warning", delay: 5000 });
        hasError = true;
      } else if (lng === "") {
        $(isLoading).hide();
        $.notify(settingsCreatePlaces.lng, { type: "warning", delay: 5000 });
        hasError = true;
      }
      if (!hasError) {
        if (myDropzone.getQueuedFiles().length > 0) {
          myDropzone.processQueue();
        } else {
          $(isLoading).hide();
          $.notify(settingsCreatePlaces.image, { type: "warning" });
        }
      }
    });
    this.on("addedfile", function(file) {
      if (this.files[5]!=null){
        this.removeFile(this.files[5]);
        $.notify(settingsCreatePlaces.too_many, { type: "warning", delay: 5000 });
      }
      if (!file.type.match("image.*")) {
        $.notify(settingsCreatePlaces.not_image, {
          type: "warning",
          delay: 5000
        });
        this.removeFile(file);
        return false;
      }
      if (file.size > 4 * 1024 * 1024) {
        $.notify(settingsCreatePlaces.too_large, {
          type: "warning",
          delay: 5000
        });
        this.removeFile(file);
        return false;
      }
      var removeButton = Dropzone.createElement(
        "<button class='btn btn-small btn-danger' style='margin-top: 5px; margin-right: 40px;'><i class='fa fa-times'></i></button>"
      );
      var _this = this;
      removeButton.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        _this.removeFile(file);
      });
      file.previewElement.appendChild(removeButton);
    });
    this.on("success", function(file, serverResponse) {
      $(isLoading).hide();
      $.notify(settingsCreatePlaces.success, { type: "success", delay: 5000 });
      $(".create-form").hide();
      $(".success-form").fadeIn(500);
    });
    this.on("error", function(file, serverResponse) {
      $(isLoading).hide();
      $(file.previewElement)
        .find(".dz-error-message")
        .text(settingsCreatePlaces.error_server_connection);
      $.notify(serverResponse.status_text, { type: "danger", delay: 5000 });
    });
  }
};
