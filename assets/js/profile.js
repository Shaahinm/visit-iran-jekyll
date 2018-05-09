var isLoading = $(".blockui");
$(isLoading).show();

Dropzone.options.dropzoneForm = {
  autoProcessQueue: true,
  url: "#",
  method: "PUT",
  MaxFiles: 1,
  maxFileSize: 1,
  uploadMultiple: false,
  parallelUploads: 1,
  createImageThumbnails: true,
  paramName: "avatar_image",
  thumbnailWidth: "250",
  thumbnailHeight: "250",
  thumbnailMethod: "crop",
  acceptedFiles: "image/*",
  // addRemoveLinks: true,
  // dictCancelUpload: 'کانکئل ',
  previewsContainer: ".preview-container",
  // dictRemoveFile: "حذف",
  headers: {
    "Cache-Control": null,
    "X-Requested-With": null,
    Authorization: `JWT ${getToken()}`
  },
  init: function() {    
    var myDropzone = this;   
    myDropzone.options.url = `${settings_profile.edit_url}`;
    this.on("addedfile", function(file) {
      if (this.files[1] != null) {
        this.removeFile(this.files[0]);
        $.notify("cant have more than 1 picture", {
          type: "warning",
          delay: 5000
        });
      }
      if (file.size > 1 * 1024 * 1024) {
        $.notify(settings_profile.too_large, {
          type: "warning",
          delay: 5000
        });
        this.removeFile(file);
        return false;
      }
      $("#profile-image").hide(500);
    });
    this.on("removedfile", function(file) {
      $("#profile-image").fadeIn(500);
    });
    this.on("success", function(file, serverResponse) {
      $(isLoading).hide(500);
      myDropzone.options.addRemoveLinks = false;
      $.notify(settings_profile.success, { type: "success", delay: 5000 });            
    });
    this.on("error", function(file, serverResponse) {
      $(isLoading).hide();
      $(file.previewElement)
        .find(".dz-error-message")
        .text(settings_profile.error);
      $.notify(serverResponse.status_text, { type: "danger", delay: 5000 });      
    });
    this.on("maxfilesexceeded", function(file) {      
      this.removeFile(file);
    });
  }
};

$(document).ready(function() {
  getProfile();
  $("#submit-all").on("click", function(e) {
    e.preventDefault();
    editNames();
  });

  $("#uploadimage").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: settings_profile.edit_url, // Url to which the request is send
      type: "PUT", // Type of request to be send, called as method
      headers: { Authorization: `JWT ${getToken()}` },
      data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
      success: function(
        data // A function to be called if request succeeds
      ) {
        $("#loading").hide();
        $("#message").html(data);
      }
    });
  });
});

function getProfile() {
  var url = settings_profile.get_me_url;
  $.ajax({
    url: url,
    type: "GET",
    headers: { Authorization: `JWT ${getToken()}` },
    success: function(data) {
      sessionStorage.setItem("url", data.url);
      //   $('#dropzoneForm').attr('action', sessionStorage.getItem('url'));
      console.log(data);
      $("#username").val(data.username);
      $("#first_name").val(data.first_name);
      $("#last_name").val(data.last_name);
      if (data.avatar_image !== null) {
        $("#profile-image").attr("src", data.avatar_image);
      }
      $(isLoading).fadeOut(500);
    },
    error: function(data) {
      $.notify(settings_profile.server_error, { type: "danger", delay: 5000 });
      $(isLoading).hide();
    },
    always: function() {
      $(isLoading).hide();
    }
  });
}

function editNames() {
  $(isLoading).fadeIn();
  var payload = {
    first_name: $("#first_name")
      .val()
      .trim(),
    last_name: $("#last_name")
      .val()
      .trim(),
    profile: {}
  };
  $.ajax({
    url: settings_profile.edit_url,
    type: "PUT",
    headers: { Authorization: `JWT ${getToken()}` },
    data: JSON.stringify(payload),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(data) {
      $.notify(settings_profile.success, {
        type: "success",
        delay: 5000
      });
      $(isLoading).hide(500);
    },
    error: function(data) {
      console.log(data);
      $.notify(data.responseJSON, {
        type: "danger",
        delay: 5000
      });
      $(isLoading).hide();
    },
    always: function() {
      resetLoginModal();
      $(isLoading).hide();
    }
  });
}
