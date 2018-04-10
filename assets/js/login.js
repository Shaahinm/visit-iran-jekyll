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
        var jqxhr = $.post(url, form.serialize())
          .done(function(data) {
            $("#entered_email").val(data.data.email);
            $("#email_content").hide(0);
            $("#verify_code_content").show();
            $(".blockui").hide();
          })
          .fail(function(data) {
            $(".error").hide(0);
            $(".error").empty();
            $(".error").append("<li>خطا در ایجاد برقراری ارتباط با سرور");
            $(".error").show();
            $(".blockui").hide();
          })
          .always(function(data) {
            $(".blockui").hide();
          });

        // jqxhr.always(function() {
        //   alert("second finished");
        // });
      } else {
        $(".error").hide();
        $(".error").empty();
        $(".error").append("<li>ایمیل خود را وارد نمایید");
        $(".error").show();
      }
    }
  });

  $("#btnVerify").on("click", function(e) {
    e.preventDefault();
    var code = $("#code");
    if (code.val().length > 0) {
      $(".error").empty();
      var form = $("#frmCode");
      // var url = "/fa/api/login/";
      var url = "http://visitiran.ir/fa/api/login/";
      $(".blockui").show();
      var jqxhr = $.post(url, form.serialize())
        .done(function(data) {
          window.location.href = "/fa/";
          $(".blockui").hide();
        })
        .fail(function(data) {
          $(".error").hide(0);
          $(".error").empty();
          $(".error").append("<li>" + data.errors);
          $(".error").show();
          $(".blockui").hide();
        })
        .always(function(data) {
          $(".blockui").hide();
        });
    }
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
