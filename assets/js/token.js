function isExpired() {
  if (localStorage.getItem("token") !== null) {
    var token = localStorage.getItem("token");
    if (typeof token !== "undefined") {
      var decoded = jwt_decode(token);
      var expiry = decoded.exp;
      if (expiry > Math.floor(Date.now() / 1000)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  return true;
}

function getToken() {
  console.log("gettoekn");
  var token = localStorage.getItem("token");
  if (!isExpired()) {
    return token;
  }
}
