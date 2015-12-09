var Random = require('./random.js');
var Question = require('./question.js');
var Factor = require('./factor.js');
var Mongo = require('mongodb');
var Unique = require('uniq');

/**
 * Generate a quiz.
 * Holds all of the questions.
 * All references to html should match with index.ejs (quiz.ejs in actual project).
 * In quiz.ejs the variable 'quiz' will hold a quiz.
 * @param numQuestions The number of questions in this quiz.
 * @constructor
 */
function Quiz(numQuestions, userRatings) {
    this.numQuestions = numQuestions;
    this.questions = [];
    this.responses = []; // user responses, matches with the questions.
    this.ratings = userRatings;

    /**
     * @returns {Question|Array} The questions of this quiz.
     */
    this.getQuestions = function () {
        return this.questions;
    };

    /**
     * @returns {*|Array} The user responses for this quiz.
     */
    this.getResponses = function () {
        return this.responses;
    };

    /**
     * @returns {Number} the number of questions in this quiz.
     */
    this.getNumberOfQuestions = function () {
        return this.numQuestions;
    };

    /**
     * @returns {*} returns the JSON object containing the user's ratings in each category.
     */
    this.getRatings = function () {
        return this.ratings;
    }

    /**
     * Add a question to this quiz.
     * @param question a question to add to this quiz.
     */
    this.addQuestion = function (question) {
        this.questions.push(question);
    }

    /**
     * Set the user responses
     * @param responses the user responses.
     */
    this.setUserResponses = function (responses) {
        this.responses = responses;
    }

    /**
     * @returns{String|Array} the categories used in this quiz.
     */
    this.getCategories = function () {
        var categories = [];
        for (var i = 0; i < numQuestions; i++) {
            var category = this.questions[i].getCategory();
            if (categories.indexOf(category) === -1) {
                categories.push(category);
            }
        }
        return categories;
    };

    /**
     * Populate the array of questions using questions randomly chosen
     * from a list of question templates.
     * @param quiz the quiz to load questions into.
     * @param callback a function to perform once the quiz is generated.
     */
    this.generate = function (quiz, callback) {
        var random = new Random();
        var allCategories = ["Expressions (Addition)", "Expressions (Subtraction)",
            "Quadratic Roots", "Linear Equations"]
        var categories = [];
        var categoriesUnique = [];
        for(var i = 0; i < quiz.getNumberOfQuestions();i++){
            var randInt = random.generateRandomInteger(0, allCategories.length - 1);
            categories.push(allCategories[randInt]);
            categoriesUnique.push(allCategories[randInt]);
        }
        loadTemplates(Unique(categoriesUnique),function (templates) {
            for (var i = 0; i < quiz.getNumberOfQuestions(); i++) {
                var Template = null;
                for(var j = 0; j < templates.length && Template == null; j++){
                    if(templates[j].category == categories[i]){
                        eval("Template = "+templates[j].source);
                    }
                }
                var currentTemplate = new Template();
                var category = currentTemplate.getCategory();
                var skill = quiz.getRatings()[category];
                quiz.addQuestion(currentTemplate.instantiateQuestion(skill));

            }
            callback();
        });
    };

    /**
     * @returns {String} A string of HTML code used to display a quiz.
     */
    this.getHtmlString = function () {
        var htmlString = "<form action='/quizResults' method='post' class='quiz'>";
        for (var i = 0; i < this.questions.length; i++) {
            htmlString += "<div>" + (i + 1) + ". " + getQuestionHtmlString(this.questions[i], i) + "</div><hr>";
        }
        htmlString += "<input type='submit'/> </form>";
        return htmlString;
    };

    /**
     * @returns {String} A string of HTML code used to display questions
     *  of a quiz after the quiz is completed.
     */
    this.getFinishedQuizHtmlString = function () {
        var htmlString = "";
        for (var i = 0; i < this.questions.length; i++) {
            htmlString += "<div class='resultQuestion'>";
            var currentQuestion = this.questions[i];
            var currentResponse = this.responses[i];
            var wasCorrect = currentQuestion.checkAnswer(currentResponse);
            htmlString += (i + 1) + ". " + currentQuestion.getText() + "<br><br>";
            var answers = currentQuestion.getAnswers();
            for (var j = 0; j < answers.length; j++) {
                var answer = answers[j];
                if (""+answer === this.responses[i]) {
                    htmlString += "<input name='q" + i + "' type='radio' disabled='true' checked/>" + answer + "<br>";
                }
                else {
                    htmlString += "<input name='q" + i + "' type='radio' disabled='true' />" + answer + "<br>";
                }
            }
            htmlString += "<p> The Correct Answer was: <b>" + currentQuestion.getCorrectAnswer() + "</b></p>";
            if (currentResponse === null) {
                htmlString += "<span class='no-response'> You did not give an answer for this question. </span>";
            }
            else {
                if (wasCorrect > 0) {
                    htmlString += "<span class='correct'> Your Response: \"" + currentResponse + "\" was correct!</span>";
                }
                else {
                    htmlString += "<span class='incorrect'>Your Response: \"" + currentResponse + "\" was incorrect!</span>";
                }
            }
            htmlString += "</div><hr>";
        }
        return htmlString;
    };

    /**
     * Populate the array of necessary templates.
     * @param callback a callback function to perform upon
     *  loading all templates.
     * @return {*|Array} A list of question templates.
     */
    var loadTemplates = function (categories,callback) {
        var templates = [];
        var queryOptions = [];
        // Create an or query for each category added
        for(var i = 0; i < categories.length; i++){
            queryOptions.push({"category":categories[i]});
        }
        // Do a search for all requested templates.
        var query = {"$or":queryOptions};
        var url = 'mongodb://localhost:27017/algebra_intelligence';
        Mongo.MongoClient.connect(url, function (err, db) {
            var collection = db.collection('templates');
            collection.find(query).toArray(function (err, results) {
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                    /*var Template = null;
                    eval("Template = "+results[i].source);
                    templates.push(new Template());*/
                    templates.push(results[i]);
                }
                callback(templates);
            });
        });
    };

    /**
     * @param question A question object.
     * @param qNumber The question number, used to give each question's radio buttons
     *      unique values for their 'name' attribute.
     * @returns {String} A string of html code used to display a question.
     */
    var getQuestionHtmlString = function (question, qNumber) {
        var htmlString = question.getText() + "</p>";
        var qRadioName = "q" + qNumber; // name used for this questions radio buttons.
        var answers = question.getAnswers();
        //generate radio buttons
        for (var i = 0; i < answers.length; i++) {
            var answerString = answers[i];
            htmlString += "<input type='radio' name='" + qRadioName + "' value='" + answerString + "'>" + answerString + "<br>";
        }
        return htmlString;
    };
}
module.exports = Quiz;