/**
 * Load the Algebra Intelligence Menu Bar.
 * @param isLoggedIn Boolean checking if the user is logged in.
 */
var loadMenuBar = function(isLoggedIn){
  var htmlString = "<ul>";
  htmlString+= "<li class = 'btn btn-default'><a href='../html/index.html'>Home</a></li>";
  htmlString+= "<li class = 'btn btn-default'><a href='../html/quiz.html'>Start a Quiz</a></li>";
  htmlString+= "<li class = 'btn btn-default'> <a href='../html/about.html'>About</a> </li>";
  htmlString+= "<li class = 'btn btn-default'>";
  if(isLoggedIn){
    htmlString+=  "<a href='../html/ratings.html'>Your Ratings</a>";
  }
  else{
    htmlString+=  "<a href='../html/login.html'>Login</a>";
  }

  htmlString+=  "</li><li class = 'btn btn-default'>";
  if(isLoggedIn){
    // assumes logout.js is pre-loaded.
    htmlString+= "<a href='../html/signout.html' onclick='logout();'>Logout</a>";
  }
  else{
    htmlString+= "<a href='../html/signup.html'>Sign Up</a>";
  }
  htmlString+= "</li></ul>";
  document.getElementsByClassName('menuBar')[0].innerHTML = htmlString;
};

/**
 * Load the Algebra Intelligence Logo Area at the top of each page.
 */
var loadLogoArea = function(){
  var htmlString = "<h1> <a href='../html/index.html' >ALGEBRA INTELLIGENCE</a></h1>";
  document.getElementsByClassName('logo-area')[0].innerHTML = htmlString;
};

/**
 * Load the Algebra Intelligence Footer.
 */
var loadFooter = function(){
  var htmlString = "Created By William Ezekiel and Lori Benson, 2015.";
  document.getElementsByClassName("footer")[0].innerHTML = htmlString;
};

/**
 * Load the Algebra Intelligence Logo Area, Menu, and Footer and
 * display them on an appropriate web page for Algebra Intelligence.
 */
var loadAll = function(){
  loadLogoArea();
  loadMenuBar(true);
  loadFooter();
};