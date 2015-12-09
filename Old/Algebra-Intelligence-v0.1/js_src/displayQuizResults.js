/**
 * Displays the results of a quiz on the
 * 'quizComplete.html' page. Assumes a quiz
 * is saved in 'window.localStorage'
 * @returns {String} HTML text to be displayed.
 */
var displayQuizResults = function(){
  // Calculate Grades
  var quiz = jsonToQuiz(window.localStorage.getItem("quiz"));
  var grader = new Grader(quiz);
  var overall = grader.getOverallGrade();

  // Create Display String
  var htmlString = "<h1>Final Score: " + overall.toFixed(0) +"%</h1>";
  htmlString+= showCategoryResults(quiz) + "<hr>";
  htmlString+= quiz.getFinishedQuizHtmlString();
  htmlString+= quiz.getFinishedQuizHtmlString();
  return htmlString;
};

/**
 * Show results of the quiz for each category
 * @param quiz The quiz object.
 * @returns {String} HTML used to represented each category score.
 */
var showCategoryResults = function(quiz){
  //Calculate Grades for Individual Categories.
  var grader = new Grader(quiz);
  var categories = quiz.getCategories();
  var categoryGrades = [];
  for(var i = 0; i < categories.length; i++){
    categoryGrades.push(grader.getGradeForCategory(categories[i]));
  }
  var htmlString = "";
  for(var i = 0; i < categories.length ; i++){
    htmlString += "<h2>"+categories[i] +"Score: " + categoryGrades[i].toFixed(0) +"%</h2>";
  }
  return htmlString;
};
