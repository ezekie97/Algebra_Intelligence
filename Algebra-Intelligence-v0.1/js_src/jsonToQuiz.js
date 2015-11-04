// Convert json text to a quiz.
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
        revertedQuestions.push(new Question(text, answers, correctAnswerPosition));
    }

    var quiz = new Quiz(numQuestions);
    quiz.questions = revertedQuestions;
    quiz.responses = responses;
    return quiz;
}