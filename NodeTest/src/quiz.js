var Random = require('./random.js');
var Question = require('./question.js');
var Factor = require('./factor.js');
var Mongo = require('mongodb');

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
        var randInt;
        var random = new Random();
        loadTemplates(function (templates) {
            for (var i = 0; i < quiz.getNumberOfQuestions(); i++) {
                randInt = random.generateRandomInteger(0, templates.length - 1);
                var currentTemplate = templates[randInt];
                var category = currentTemplate.getCategory();
                var skill = quiz.getRatings()[category];
                quiz.addQuestion(templates[randInt].instantiateQuestion(skill));
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
        htmlString += "<input style='text-align:center;display:inline;' type='submit'> </form>";
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
    var loadTemplates = function (callback) {
        var templates = [];
        var url = 'mongodb://localhost:27017/algebra_intelligence';
        Mongo.MongoClient.connect(url, function (err, db) {
            var collection = db.collection('templates');
            collection.find({}).toArray(function (err, results) {
                for (var i = 0; i < results.length; i++) {
                    eval(results[i].source);
                }
                // templates are in code, begin adding them.
                templates.push(new EvaluateExpressionAddTemplate());
                templates.push(new EvaluateExpressionSubtractTemplate());
                templates.push(new QuadraticRootTemplate());
                templates.push(new SolveLinearEquationTemplate());
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