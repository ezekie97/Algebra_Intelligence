/**
 * Confirm the user is using the correct username and password.
 * For now, the username is "bill" and the password is "123".
 * Logging in sets all skill levels to 1, regardless of what they
 * were before the previous log out.
 */
var validateLogin = function(){
  var form = document.forms["loginForm"];
  var username = form["user"].value;
  var password = form["password"].value;

  // hardcode user and pass for now.
  var defaultUser = "bill";
  var defaultPassword ="123";

  var correctUser = (username === defaultUser);
  var correctPassword = (password === defaultPassword);

  if(correctUser && correctPassword){
    document.cookie = createCookie("username",username);
    //hardcoded cookies.
    document.cookie = createCookie("quadraticSkill",1);
    document.cookie =  createCookie("evalAddSkill",1);
    document.cookie =  createCookie("linearEqSkill",1);
    document.cookie =  createCookie("evalSubSkill",1);
    form.submit();
  }
  else{
    alert("Login Failed. Incorrect Username or Password.")
  }
};
