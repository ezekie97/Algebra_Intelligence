/**
 * Generate a login
 * @param param The parameter of this cookie.
 * @param value The value of this cookie.
 * @return {string} Text for the login cookie.
 */
var createCookie = function(param,value){
  return param  + "=" + value;
};

/**
 * Get the value of a cookie based on its 'ID'.
 * @param cookieID The cookie 'ID' as a string.
 * @returns {string} The value assigned to the cookie 'ID'.
 */
var getCookie = function(cookieID){
  var name = cookieID + "=";
  var cookies = document.cookie.split(";");
  for(var i = 0; i < cookies.length; i++){
    var cookie = cookies[i].trim();
    if(cookie.indexOf(name) === 0){
      return cookie.substring(name.length, cookie.length);
    }

  }
  return "";
};

/**
 * Checks the username cookie and checks if someone is logged in.
 * @return {boolean} True if someone is logged in.
 */
var checkCookie = function(){
  return getCookie("username") !== "";
};

/**
 * @returns {string} Text that will expire a cookie.
 */
var deleteCookie = function(){
  return "username=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
};
