// modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var ejs = require("ejs");
var Quiz = require('./src/quiz.js');

// Set up body parser for POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Use public js files
app.use(express.static('public'));

// Allow rendering of .ejs files.
app.set('view engine', 'ejs');


// Home Page
app.get('/',function(req,res){
  res.render('index');
  res.end();
});

// About Page
app.get('/about',function(req,res){
  res.render('about');
  res.end();
});

// Quiz Page
app.get('/quiz',function(req,res){
  res.render('quiz');
  res.end();
});

// Quiz Results Page
app.get('/quizResults',function(req,res){
  res.render('quizResults');
  res.end();
});

// User Ratings Page
app.get('/ratings',function(req,res){
  res.render('ratings');
  res.end();
});

// Signup Page
app.get('/signup',function(req,res){
  res.render('signup');
  res.end();
});

// Signup Page
app.get('/signout',function(req,res){
  res.render('signout');
  res.end();
});




// Login Page
app.post('/login',function(req,res){
  /*var user = req.body.user;
  if(user === "bill"){
    console.log("yippe");
    res.render('index');
  }
  else{
    res.render('login');
  }*/
  res.end();
});

app.get('/login',function(req,res){
  /*if(Object.keys(req.query).length === 0){ // no request made.
    console.log("Initial Login")
  }
  else{
    console.log("A Failed Attempt");
  }
  res.render('login');*/
  res.render('login');
  res.end();
});

// Start the server.
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s",host,port);
});