// modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var path = require("path");
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var Quiz = require('./src/quiz.js');
var LoginModule = require('./src/login.js');
var SignupModule = require('./src/signup.js');
var RatingsModule = require('./src/ratings.js');

// Set up body parser for POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Use public js files
app.use(express.static('public'));

// Allow rendering of .ejs files.
app.set('view engine', 'ejs');

// Home Page
app.get('/', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    res.render('index',{login:loggedIn});
    res.end();
});

// About Page
app.get('/about', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    res.render('about',{login: loggedIn});
    res.end();
});

// Quiz Page
app.get('/quiz', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if(loggedIn){
        RatingsModule.getRatings(req.cookies.user,function(ratingsObj){
            var q = new Quiz(5,ratingsObj);
            q.generate();
            var htmlString = q.getHtmlString();
            res.render('quiz', {quizHTML: htmlString});
            res.end();
        })

    }
    else{
        res.redirect('/login');
        res.end();
    }

});

// Quiz Results Page
app.get('/quizResults', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if(loggedIn){
        res.render('quizResults');
    }
    else{
        res.redirect('/login');
    }

    res.end();
});

// User Ratings Page
app.get('/ratings', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if(loggedIn){
        RatingsModule.getRatings(req.cookies.user,function(ratingsObj){
            var htmlString = "";
            for(var property in ratingsObj){
                htmlString+= "<p> "+ property + " Skill : " + ratingsObj[property] +"</p>";
            }
            res.render('ratings',{"username":req.cookies.user.toUpperCase(),"ratings":htmlString});
            res.end();
        });

    }
    else{
        res.redirect('/login');
        res.end();
    }
});

// Signup Page
app.get('/signup', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if(loggedIn){
        res.redirect('/');
    }
    else{
        res.render('signup',{"msg":""});
    }
    res.end();
});

app.post('/signup', function (req, res) {
    var user = req.body.user;
    var pass = req.body.pass;
    SignupModule.signup(user,pass,function(msg,success){
        if(success){
            // log user in
            res.cookie("user",user);
            res.redirect('/');
        }
        else{
            res.render('signup',{"msg":msg});
        }
        res.end();

    });
});

// Signout Page
app.get('/signout', function (req, res) {
    res.clearCookie('user',{});
    res.render('signout');
    res.end();
});

// Login Page
app.post('/login', function (req, res) {
    var username = req.body.user;
    var password = req.body.password;
    LoginModule.verifyLogin(username,password,function(valid){
        if(valid){
            res.cookie("user",username);
            res.redirect('/');
        }
        else{
            res.render('login',{loginMessage:"Invalid Username or Password!"});
        }
        res.end();

    });
});

app.get('/login', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if (loggedIn) {
        res.redirect('/');

    }
    else {
        res.render('login',{loginMessage:""});
    }
    res.end();
});

// Start the server.
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});