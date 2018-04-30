
var isLoading = $(".blockui");
var modal = document.getElementById("loginModal");
modal.style.display = "none";
$(document).ready(function() {
  var url = settings_comments_province.url;
  getComments(url, true);
  $(".btn.next").on("click", function(e) {
    e.preventDefault();
    getComments($(this).attr("href"), false);    
  });

  $("#commentToggle").on("click", function(e) {
    e.preventDefault();
    var commentSection = $(".comment-section");
    if ($(commentSection).hasClass("hidden")) {
      $(commentSection).removeClass("hidden");
    } else {
      $(commentSection).addClass("hidden");
    }
  });

  // form submit
  $("#btnSubmitReview").on("click", function(e) {
    e.preventDefault();
    var isLoading = $("#blockuiPostReview");
    if (
      $("#rate").val() == "0" ||
      $("#review")
        .val()
        .trim().length == 0
    ) {
      $.notify(settings_comments_province.error_empty_form, {
        type: "warning",
        delay: 5000
      });
    } else {
      if (!isExpired()) {        
        postComment();
      } else {
        var modal = document.getElementById("loginModal");        
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function() {
          modal.style.display = "none";
        };
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
    }
  });

  // bar rating
  $("#rater").barrating({
    theme: "fontawesome-stars-o",
    allowEmpty: false,
    initialRating: 1,
    onSelect: function(value, text, event) {
      $("#rate").val(value);
    }
  });

  //login.js

  $("#btnSubmit").prop("disabled", true);
  $("#btnSubmit").on("click", function(e) {
    e.preventDefault();
    var email = $("#email");
    if (email.val().length > 0) {
      if (isValidEmailAddress(email.val())) {
        $(".error").empty();
        var form = $("#frmEmail");
        $("#blockLogin").show();
        var jqxhr = $.post(settings.register_url, form.serialize())
          .done(function(data) {
            $("#entered_email").val(data.email);
            $("#lblEmail").text(data.email);
            $("#email_content").hide(0);
            $("#verify_code_content").fadeIn(500);
            $("#blockLogin").hide();
          })
          .fail(function(data) {
            $.notify(data.responseJSON, { type: "danger", delay: 5000 });
            $("#blockLogin").hide();
          })
          .always(function(data) {
            $("#blockLogin").hide();
          });
      } else {        
        $.notify(settings.error_no_email, { type: "info", delay: 5000 });
      }
    } else {
      $.notify(settings.error_no_email, { type: "info", delay: 5000 });
    }
  });

  $("#btnVerify").on("click", function(e) {
    e.preventDefault();
    var code = $("#password");
    if (code.val().length > 0) {
      $(".error.code").empty();
      var form = $("#frmCode");      
      $("#blockLogin").show();
      var jqxhr = $.post(settings.login_url_token, form.serialize())
        .done(function(data) {
          var token = data.token;
          localStorage.setItem('token', token);
          var modal = document.getElementById("loginModal");
          modal.style.display = "none";
          $("#blockLogin").hide();
          postComment();
        })
        .fail(function(data) {         
          $.notify(data.responseJSON.non_field_errors, {
            type: "danger",
            delay: 5000
          });
          $("#blockLogin").hide();
        })
        .always(function(data) {
          $("#blockLogin").hide();
        });
    } else {      
      $.notify(settings.error_no_verification_code, {
        type: "danger",
        delay: 5000
      });
      $(".error.code").show(500);
    }
  });
  $("#btnPrevForm").on("click", function(e) {
    resetLoginModal();
  });
});

function getComments(url, reset) {
  $(isLoading).show();
  var commentContainer = $(".comment-container");
  if (reset) {
    $(commentContainer).empty();
    $(".next-prev").show();
    $(".comment-container").show();
    $(".no-comment").hide();
  }
  var jqxhr = $.get(url, function(data) {
    $("#commentCount").text(data.count);
    if (data.count > 0) {
      for (i = 0; i < data.results.length; i++) {
        createComment(data.results[i]);
      }
      if (data.next != null) {
        $(".btn.next").removeClass("disabled");
        $(".btn.next").attr("href", data.next);
      } else {
        $(".btn.next").addClass("disabled");
      }
      if (data.previous != null) {
        $(".btn.prev").removeClass("disabled");
        $(".btn.prev").attr("href", data.previous);
      } else {
        $(".btn.prev").addClass("disabled");
      }
    } else {
      $(".next-prev").hide();
      $(".comment-container").hide();
      $(".no-comment").fadeIn(500);
    }
  })
    .done(function() {
      $(isLoading).fadeOut(500);
    })
    .fail(function() {
      // alert("error");
    })
    .always(function() {
      $(isLoading).fadeOut(500);
    });
}

function createComment(data) {
  var stars = createStars(data.rate, 5);

  var commentTemplate = `<div class="comment">
                            <div class="avatar">
                                <img src="http://visitiran.ir/static/tourismiran/assets/images/avatar-placholder.png" alt="">
                                <div class="sub-avatar">
                                    <div class="username">
                                    ${
                                      data.reviewer.first_name
                                        ? data.reviewer.first_name
                                        : "بدون نام"
                                    }
                                    </div>                                    
                                </div>
                            </div>                           
                            <div class="text">                                                           
                              <div class="star-rating-display">
                                  ${stars}
                                  <div class="date">${data.time}</div>   
                              </div>
                                  ${data.review}
                            </div>
                        </div>`;
  var commentContainer = $(".comment-container");
  $(commentContainer).append(commentTemplate);
}

function createStars(star, max) {
  if (!$.isNumeric(star)) {
    star = 0;
  }
  var toReturn = "";
  for (var i = 0; i < star; i++) {
    toReturn += '<span class="fa fa-star checked"></span>';
  }

  var diff = max - star;

  for (var j = 0; j < diff; j++) {
    toReturn += '<span class="fa fa-star"></span>';
  }

  return toReturn;
}

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(
    /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i
  );
  return pattern.test(emailAddress);
}

function correctCaptcha() {
  $("#btnSubmit").prop("disabled", false);
}

function recaptchaExpired() {
  // alert("Your Recaptcha has expired, please verify it again !");
  // grecaptcha.reset();
}
function postComment() {
  var isLoading = $("#blockuiPostReview");
  $(isLoading).show();  
  $.ajax({
    url: settings_comments_province.url,
    type  : 'POST',
    headers: {"Authorization": `JWT ${getToken()}`},
    data: $("#reviewForm").serialize(),
    success: function(data) {
      $.notify(settings_comments_province.success, {
        type: "success",
        delay: 5000
      });
      resetLoginModal();
      resetReviewForm();
      var url = settings_comments_province.url;
      getComments(url, true);
    },
    error: function(data) {
      console.log(data);
      $.notify(data.responseJSON.status_text, {
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
  // var jqxhr = $.post(
  //   settings_comments_province.url,
  //   $("#reviewForm").serialize()
  // )
  //   .done(function(data) {
  //     $.notify(settings_comments_province.success, {
  //       type: "success",
  //       delay: 5000
  //     });
  //     resetLoginModal();
  //     resetReviewForm();
  //     var url = settings_comments_province.url;
  //     getComments(url, true);
  //   })
  //   .fail(function(data) {
  //     $.notify(settings_comments_province.error, {
  //       type: "danger",
  //       delay: 5000
  //     });
  //     $(isLoading).hide();
  //   })
  //   .always(function(data) {
  //     resetLoginModal();
  //     $(isLoading).hide();
  //   });
}

function resetLoginModal() {
  $("#blockLogin").show();
  $(".error.code").hide(0);
  $(".error.code").empty();
  $("#code").val("");
  grecaptcha.reset();
  $("#btnSubmit").prop("disabled", true);
  $("#verify_code_content").hide(0);
  $("#email_content").fadeIn(500);
  $(".blockui").hide();
}

function resetReviewForm() {
  $("#review").val("");
  $("#rater").barrating("clear");
}