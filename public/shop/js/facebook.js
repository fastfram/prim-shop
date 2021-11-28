var permission = 'public_profile,email',
    fbApiVersion = 'v10.0';

if (facebookAppID != "") {
    window.fbAsyncInit = function () {
        FB.init({
            appId: facebookAppID,
            autoLogAppEvents: true,
            xfbml: true,
            version: fbApiVersion
        });
    };

}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = `https://connect.facebook.net/${fbSDKLang}/sdk/xfbml.customerchat.js#xfbml=1&autoLogAppEvents=1&version=${fbApiVersion}`;
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// login by redirect
window.loginByFacebook = function () {
    setCookie("fb_redirect", window.location.href, 0.1);

    redirect_uri = window.location.protocol + "//" + window.location.hostname + "/fb_login.php";

    window.location = encodeURI("https://www.facebook.com/dialog/oauth?client_id=" + facebookAppID + "&redirect_uri=" + redirect_uri + "&response_type=token&scope=" + permission);

};

// Log out ออกจากระบบสมาชิก และระบบ facebook
function logout() {
    $("#process-login").toggle();
    $.post("engine_login.php", {
        mod: "logout"
    })
        .done(function (result) {
            if (result.finish && result.refresh) {
                window.location.reload();
            }
        });
}

window.onload = function () {
    if (m_name == "" && facebookAppID != "") {
        $("#fb-head").css({ "display": "block" }); // ยังไม่ได้ Login ให้แสดงปุ่ม
        $("#fb-field").css({ "display": "block" }); // ยังไม่ได้ Login ให้แสดงปุ่ม
        $("#m-fb-head").css({ "display": "block" }); // ยังไม่ได้ Login ให้แสดงปุ่ม
        $("#m-fb-field").css({ "display": "block" }); // ยังไม่ได้ Login ให้แสดงปุ่ม
    }
}
