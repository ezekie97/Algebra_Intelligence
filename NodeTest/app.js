/* Load Required MOdules */
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var Quiz = require('./src/quiz.js');
var LoginModule = require('./src/login.js');
var SignupModule = require('./src/signup.js');
var RatingsModule = require('./src/ratings.js');
var Grader = require('./src/grader.js');
var mongo = require('mongodb');

var app = express();
var quiz = null;


// Set up body parser for POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Use public js and stylesheet files
app.use(express.static('public'));

// Allow rendering of .ejs files.
app.set('view engine', 'ejs');

// Home Page
app.get('/', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    res.render('index', {login: loggedIn});
    res.end();
});


// About Page
app.get('/about', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    res.render('about', {login: loggedIn});
    res.end();
});


// Quiz Page
app.get('/quiz', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if (loggedIn) {
        RatingsModule.getRatings(req.cookies.user, function (ratingsObj) {
            quiz = new Quiz(10, ratingsObj);
            quiz.generate(quiz, function () {
                var htmlString = quiz.getHtmlString();
                res.render('quiz', {quizHTML: htmlString});
                res.end();
            });
        })

    }
    else {
        res.redirect('/login');
        res.end();
    }

});

// Quiz Results Page
app.get('/quizResults', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if (loggedIn) {
        res.render('quizResults');
    }
    else {
        res.redirect('/login');
    }

    res.end();
});

// Quiz Results Page
app.post('/quizResults', function (req, res) {
    var responses = [];
    for (var i = 0; i < quiz.getNumberOfQuestions(); i++) {
        var name = "q" + i;
        if (req.body.hasOwnProperty(name)) {
            responses.push(req.body[name]);
        }
        else {
            responses.push(null);
        }
    }
    quiz.setUserResponses(responses);
    var grader = new Grader(quiz);
    var overall = grader.getOverallGrade();
    var htmlString = "<h1> Final Grade: " + overall + "% </h1>";
    var allCategories = quiz.getCategories();
    updateRanks(req, grader, allCategories, function (html) {
        htmlString += html + quiz.getFinishedQuizHtmlString();
        res.render('quizResults', {quizResults: htmlString});
        res.end();
    });

});

var updateRanks = function (req, grader, allCategories, callback) {
    var grades = [];
    var links = {
        "Expressions (Addition)": "https://www.mathsisfun.com/algebra/simplify.html",
        "Expressions (Subtraction)": "https://www.mathsisfun.com/algebra/simplify.html",
        "Quadratic Roots": "https://www.mathsisfun.com/algebra/quadratic-equation.html",
        "Linear Equations": "https://www.mathsisfun.com/algebra/equations-solving.html"
    };
    var htmlString = "";
    for (var i = 0; i < allCategories.length; i++) {
        grades.push(grader.getGradeForCategory(allCategories[i]));
    }
    var url = 'mongodb://localhost:27017/algebra_intelligence';
    RatingsModule.getRatings(req.cookies.user, function (ratingsObj) {
        var updatedSkills = {};
        for (var i = 0; i < grades.length && i < allCategories.length; i++) {
            var currentSkill = ratingsObj[allCategories[i]];
            var updatedSkill = currentSkill;
            htmlString += "<h2>" + allCategories[i] + " Grade: " + grades[i];
            if (grades[i] <= 50) {
                if(currentSkill > 1){
                    updatedSkill--;
                    htmlString += "     Your rank in this category has decreased!"
                }
                var link = links[allCategories[i]];
                htmlString += "<br> It looks like you're not doing so well in " + allCategories[i] + ". " +
                    "For extra help, click <a href=" + link + ">here</a>!";
            }
            if (grades[i] > 80 && currentSkill < 5) {
                updatedSkill++;
                htmlString += "    Your rank in this category has increase!";
            }
            htmlString += "</h2>";
            updatedSkills[allCategories[i]] = updatedSkill;
        }
        mongo.MongoClient.connect(url, function (err, db) {
            var collection = db.collection("users");
            collection.updateOne({"username": req.cookies.user}, {$set: updatedSkills});
            callback(htmlString);
        });
    })
};

/**
 * User Ratings Page
 */
app.get('/ratings', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if (loggedIn) {
        RatingsModule.getRatings(req.cookies.user, function (ratingsObj) {
            var htmlString = "";
            for (var property in ratingsObj) {
                if (ratingsObj.hasOwnProperty(property)) {
                    htmlString += "<p> " + property + " Skill : " + ratingsObj[property] + "</p>";
                }
            }
            res.render('ratings', {"username": req.cookies.user.toUpperCase(), "ratings": htmlString});
            res.end();
        });

    }
    else {
        res.redirect('/login');
        res.end();
    }
});

/**
 * Signup Page
 */
app.get('/signup', function (req, res) {
    var loggedIn = req.cookies.user !== undefined;
    if (loggedIn) {
        res.redirect('/');
    }
    else {
        res.render('signup', {"msg": ""});
    }
    res.end();
});

app.post('/signup', function (req, res) {
    var user = req.body.user;
    var pass = req.body.pass;
    SignupModule.signup(user, pass, function (msg, success) {
        if (success) {
            // log user in
            res.cookie("user", user);
            res.redirect('/');
        }
        else {
            res.render('signup', {"msg": msg});
        }
        res.end();

    });
});

/**
 * Signout Page
 */
app.get('/signout', function (req, res) {
    res.clearCookie('user', {});
    res.render('signout');
    res.end();
});

/**
 * Login Page
 */
app.post('/login', function (req, res) {
    var username = req.body.user;
    var password = req.body.password;
    LoginModule.verifyLogin(username, password, function (valid) {
        if (valid) {
            res.cookie("user", username);
            res.redirect('/');
        }
        else {
            res.render('login', {loginMessage: "Invalid Username or Password!"});
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
        res.render('login', {loginMessage: ""});
    }
    res.end();
});

// Start the server.
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});