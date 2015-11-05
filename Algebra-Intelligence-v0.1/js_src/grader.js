/**
 * A Grader which grades a quiz.
 * @param quiz The quiz to be assessed.
 * @constructor
 */
function Grader(quiz){
  this.quiz = quiz;

  /**
   * @returns {Number} The overall grade for this quiz.
   */
  this.getOverallGrade = function(){
    var questions = this.quiz.getQuestions();
    var responses = this.quiz.getResponses();
    var numQuestions = this.quiz.getNumberOfQuestions();
    var correct = 0;
    for(var i = 0; i < numQuestions; i++){
      var question = questions[i];
      var response = responses[i];
      correct+=question.checkAnswer(response);
    }
    return (correct/numQuestions) * 100;
  };

  /**
   * Get a a grade for a specific category of a quiz. Changes rankings behind the scenes.
   * @param category The category.
   * @returns {Number} The grade for this category.
   */
  this.getGradeForCategory = function(category){
    var questions = this.quiz.getQuestions();
    var responses = this.quiz.getResponses();
    var numQuestions = this.quiz.getNumberOfQuestions();
    var numQuestionsInCategory = 0;
    var correct = 0;
    for(var i = 0; i < numQuestions; i++){
      var question = questions[i];
      if(category == question.getCategory()){
        numQuestionsInCategory++;
        var response = responses[i];
        correct+=question.checkAnswer(response);
      }
    }
    var grade = (correct/numQuestionsInCategory) * 100;
    var cookieName = category + "Skill";
    var rank = getCookie(cookieName);
    if(grade <=50){ //ranking in this subject drops.
      if(rank > 1){
        rank--;
      }
    }
    else if(grade >=80){
      if(rank < 5){
        rank++;
      }
    }
    document.cookie = createCookie(cookieName,rank);
    return grade;
  };
}
