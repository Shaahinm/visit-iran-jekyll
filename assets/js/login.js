$(document).ready(function() {
  $("#btnSubmit").prop("disabled", true);
  $("#btnSubmit").on("click", function(e) {
    e.preventDefault();
    var email = $("#email");
    if (email.val().length > 0) {
      if (isValidEmailAddress(email.val())) {
        $(".error").empty();
        var form = $("#frmEmail");
        // var url = "/fa/api/register/";
        var url = "http://visitiran.ir/fa/api/register/";

        $(".blockui").show();
        var jqxhr = $.post(settings.register_url, form.serialize())
          .done(function(data) {
            $("#entered_email").val(data.data.email);
            $("#lblEmail").text(data.data.email);            
            $("#email_content").hide(0);
            $("#verify_code_content").fadeIn(500);
            $(".blockui").hide();
          })
          .fail(function(data) {            
            $.notify(data.data.status_text, {type: 'danger', delay: 5000});
            $(".blockui").hide();
          })
          .always(function(data) {
            $(".blockui").hide();
          });        
      } else {
        // $(".error").hide();
        // $(".error").empty();
        // $(".error").append("<li>" + settings.error_no_email);
        // $(".error").show(500);
        $.notify(settings.error_no_email, {type: 'info', delay: 5000});
      }
    } else {
      $.notify(settings.error_no_email, {type: 'info', delay: 5000});
    }
  });

  $("#btnVerify").on("click", function(e) {
    e.preventDefault();
    var code = $("#code");
    if (code.val().length > 0) {
      $(".error.code").empty();
      var form = $("#frmCode");
      // var url = "/fa/api/login/";
      var url = "http://visitiran.ir/fa/api/login/";
      $(".blockui").show();
      var jqxhr = $.post(url, form.serialize())
        .done(function(data) {
          window.location.href = settings.login_return_url;
          $(".blockui").hide();
        })
        .fail(function(data) {
          // $(".error.code").hide(0);
          // $(".error.code").empty();
          // console.log('error', data);
          // $(".error.code").append("<li>" + data.responseJSON.status_text);
          // $(".error.code").show(500);
          $.notify(data.responseJSON.status_text, {type: 'danger', delay: 5000});
          $(".blockui").hide();
        })
        .always(function(data) {
          $(".blockui").hide();
        });
    } else {
      // $(".error.code").hide(0);
      // $(".error.code").empty();
      // $(".error.code").append("<li>" + settings.error_no_verification_code);
      $.notify(settings.error_no_verification_code, {type: 'danger', delay: 5000});
      $(".error.code").show(500);
    }
  });
  $("#btnPrevForm").on("click", function(e) {
    $(".blockui").show();
    $(".error.code").hide(0);
    $(".error.code").empty();
    $("#code").val("");
    grecaptcha.reset();
    $("#btnSubmit").prop("disabled", true);
    $("#verify_code_content").hide(0);
    $("#email_content").fadeIn(500);
    $(".blockui").hide();
  });
});

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(
    /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i
  );
  return pattern.test(emailAddress);
}

function correctCaptcha() {
  $("#btnSubmit").prop("disabled", false);
}
