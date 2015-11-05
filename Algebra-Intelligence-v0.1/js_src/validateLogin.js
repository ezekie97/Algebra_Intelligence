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
    document.cookie =  createCookie("evalAddSkill",2);
    document.cookie =  createCookie("evalSubSkill",4);
    form.submit();
  }
  else{
    alert("Login Failed. Incorrect Username or Password.")
  }
}
