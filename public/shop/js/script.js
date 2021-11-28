/// เช็คตำแหน่งการเลื่อนจอ เพื่อแสดงเมนูเลื่อนตาม
$(function() {
  var a;
  var offsetPixels = 143;

  $(window).scroll(function() {
    // fix menu desktop
    if($(window).scrollTop() > offsetPixels) {
      $("#head-fix").css({
        "top":"0"
      });
    } else {
      $("#head-fix").css({
        "top":"-150px"
      });
    }

    // fix go to topif($(window).scrollTop() > offsetPixels) {
    if($(window).scrollTop() > 120) {
      $("#back-to-top").fadeIn('slow');
    } else {
      $("#back-to-top").fadeOut('slow');
    }
  });

  $('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 700);
  });
});

echo.init({
  offset: 500,
  throttle: 50,
  unload: false,
  callback: function (element, op) {
    // console.log(element, 'has been', op + 'ed')
  }
});

function modalLogin() {
  if (validateEmail($("#m-email").val())) {
    if($("#m-password").val()!="") {
      $("#process-login").toggle();
      $("#m-password").prop( "disabled", true );
      $("#m-pass_send").val(hex_md5($("#m-password").val()));

      $.post("engine_login.php", jQuery("#m-login").serialize())
        .done(function(result) {
          console.log(result);
          if (result.finish && result.refresh) {
            setTimeout(function() {
              window.location.reload();
            }, 500);
          } else if (!result.finish) {
            fAlert("m-email");
            fAlert("m-password");
            $("#m-alert-text").html('E-mail หรือ Password ไม่ถูกต้อง');
            $("#m-password").prop( "disabled", false );
            $("#process-login").toggle();
          } else {
            $("#m-alert-text").html("เกิดข้อผิดพลาด");
            $("#process-login").toggle();
            console.log(result);
            //setTimeout(window.location.reload.bind(window.location), 5000);
          }
        })
        .fail(function(result) {
          console.log(result);
          //alert("ไม่สามารถเชื่อมต่ออินเตอร์เน็ตได้1");
        })
    } else {
      fAlert('m-password');
      $("#m-alert-text").html('กรุณากรอกรหัสผ่าน');
    }
  } else {
    fAlert('m-email');
    $("#m-alert-text").html('E-mail ไม่ถูกต้อง');
  }

}

function unAlert(field) {
  $("#" + field + "-udl").css({"border-color":"rgba(0, 0, 0, 0.12)"})
  $("#" + field + "-ico").css({"display":"none"});
}
function fAlert(field) {
  $("#" + field + "-udl").css({"border-color":"#ef5350"})
  $("#" + field + "-ico").css({"display":"block"});
}

function popup(url, w, h) {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;
  var newWindow = window.open(url, "", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  if (window.focus) {
    newWindow.focus();
  }
  return false;
}

$(window).keyup(function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);

  // เช็ค Enter หน้าจอ Login
  if ($('#loginModal').hasClass('in')) {
    if (code == '13' && $("#m-password:focus").length) {
      modalLogin();
    } else if (code == '13' && $("#m-loginBtn:focus").length) {
      modalLogin();
    }
  }

  // เช็ค Enter หน้าจอ search
  if (code == '13' && $("#keyword:focus").length && $("#keyword").val().length>0) {
    location.assign("ค้นหา-" + $("#keyword").val());
  } else if (code == '13' && $("#index-keyword:focus").length && $("#index-keyword").val().length>0) {
    location.assign("ค้นหา-" + $("#index-keyword").val());
  }
});

function search() {
  if ($("#keyword").val().length > 0) {
    location.assign("ค้นหา-" + $("#keyword").val());
  } else if ($("#index-keyword").val().length > 0) {
    location.assign("ค้นหา-" + $("#index-keyword").val());
  }
}
