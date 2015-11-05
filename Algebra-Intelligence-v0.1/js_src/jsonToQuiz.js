/**
 * Convert JSON text to a Quiz object.
 * @param jsonText The jsonText
 * @returns {Quiz} The quiz represented by the JSON text.
 */
var jsonToQuiz = function(jsonText){
    var obj = JSON.parse(jsonText);
    var numQuestions = obj.numQuestions;
    var responses = obj.responses;
    var questions = obj.questions;
    var revertedQuestions = [];

    // revert questions to Question.
    for(var i = 0; i < questions.length; i++){
        var q = questions[i];
        var text = q.text;
        var answers = q.answers;
        var correctAnswerPosition = q.correctAnswerPosition;
        var category = q.category;
        revertedQuestions.push(new Question(text, answers, correctAnswerPosition,category));
    }

    var quiz = new Quiz(numQuestions);
    quiz.questions = revertedQuestions;
    quiz.responses = responses;
    return quiz;
};
