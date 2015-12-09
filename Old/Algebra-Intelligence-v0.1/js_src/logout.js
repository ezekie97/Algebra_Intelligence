/**
 * Delete the user cookie, which causes the user to logout.
 */
var logout = function(){
  document.cookie= deleteCookie();
};
