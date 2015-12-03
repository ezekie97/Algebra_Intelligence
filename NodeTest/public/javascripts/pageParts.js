/**
 * Load the Algebra Intelligence Menu Bar.
 * @param isLoggedIn Boolean checking if the user is logged in.
 */
var loadMenuBar = function(isLoggedIn){
  var htmlString = "<ul>";
  htmlString+= "<li class = 'btn btn-default'><a href='/'>Home</a></li>";
  htmlString+= "<li class = 'btn btn-default'><a href='/quiz'>Start a Quiz</a></li>";
  htmlString+= "<li class = 'btn btn-default'> <a href='/about'>About</a> </li>";
  htmlString+= "<li class = 'btn btn-default'>";
  if(isLoggedIn){
    htmlString+=  "<a href='/ratings'>Your Ratings</a>";
  }
  else{
    htmlString+=  "<a href='/login'>Login</a>";
  }

  htmlString+=  "</li><li class = 'btn btn-default'>";
  if(isLoggedIn){
    // assumes logout.js is pre-loaded.
    htmlString+= "<a href='/signout' onclick='logout();'>Logout</a>";
  }
  else{
    htmlString+= "<a href='/signup'>Sign Up</a>";
  }
  htmlString+= "</li></ul>";
  document.getElementsByClassName('menuBar')[0].innerHTML = htmlString;
};

/**
 * Load the Algebra Intelligence Logo Area at the top of each page.
 */
var loadLogoArea = function(){
  var htmlString = "<h1> <a href='/' >ALGEBRA INTELLIGENCE</a></h1>";
  document.getElementsByClassName('logo-area')[0].innerHTML = htmlString;
};

/**
 * Load the Algebra Intelligence Footer.
 */
var loadFooter = function(){
  var htmlString = "Created By William Ezekiel and Lori Benson, 2015." +
      "<br/> Images From James University and PageResource.com";
  document.getElementsByClassName("footer")[0].innerHTML = htmlString;
};

/**
 * Load the Algebra Intelligence Logo Area, Menu, and Footer and
 * display them on an appropriate web page for Algebra Intelligence.
 * @param isLoggedIn Boolean checking if the user is logged in.
 */
var loadAll = function(isLoggedIn){
  loadLogoArea();
  loadMenuBar(isLoggedIn);
  loadFooter();
};