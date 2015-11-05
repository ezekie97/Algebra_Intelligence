/**
 * Generate a quiz.
 * Holds all of the questions.
 * All references to html should match with index.html (quiz.html in actual project).
 * In quiz.html the variable 'quiz' will hold a quiz.
 * @param numQuestions The number of questions in this quiz.
 * @constructor
 */
function Quiz(numQuestions){
    this.numQuestions = numQuestions;
    this.questions=[];
    this.responses =[]; // user responses, matches with the questions.


    /**
     * @returns {Question|Array} The questions of this quiz.
     */
    this.getQuestions = function(){
      return this.questions;
    };

    /**
     * @returns {*|Array} The user responses for this quiz.
     */
    this.getResponses = function(){
      return this.responses;
    };

    /**
     * @returns {Number} the number of questions in this quiz.
     */
    this.getNumberOfQuestions = function(){
      return this.numQuestions;
    };

    /**
     * @returns{String|Array} the categories used in this quiz.
     */
    this.getCategories = function(){
      var categories = [];
      for(var i = 0; i < numQuestions; i++){
        var category = this.questions[i].getCategory();
        if(categories.indexOf(category) === -1){
          categories.push(category);
        }
      }
      return categories;
    };

    /**
     * Take user responses for a quiz and store them in the
     * responses array. Questions that are unanswered
     * store 'null' as their response.
     */
    this.getUserAnswers = function(){
        this.responses = []; // clear responses, in event of double click.
        for(var i = 0; i < this.numQuestions; i++){
            var qRadioName = "q" + i;
            var qRadios = document.getElementsByName(qRadioName);
            var hasCheckedRadio = false;
            for(var j = 0; j < qRadios.length && !hasCheckedRadio; j++){
                var radio = qRadios[j];
                if(radio.checked){
                    this.responses.push(radio.value);
                    hasCheckedRadio = true;
                }
            }
            if(!hasCheckedRadio){
                this.responses.push(null);
            }
        }
    };

    /**
     * Populate the array of questions using questions randomly chosen
     * from a list of question templates.
     */
    this.generate = function(){
        var randInt;
        var random = new Random();
        var templates = loadTemplates();
        for(var i = 0; i < this.numQuestions ; i++){
            randInt = random.generateRandomInteger(0,templates.length-1);
            var skillCategory = templates[randInt].getCategory() + "Skill";
            this.questions.push(templates[randInt].instantiateQuestion(parseInt(getCookie(skillCategory))));
        }
    };



    /**
     * @returns {String} A string of HTML code used to display a quiz.
     */
    this.getHtmlString = function(){
        var htmlString = "";
        for(var i = 0; i < this.questions.length; i++){
            htmlString += "<div class='quiz-question'>" + (i+1) + ". " + getQuestionHtmlString(this.questions[i],i) + "</div><hr>";
        }
        return htmlString;
    };

    /**
     * @returns {String} A string of HTML code used to display questions
     *  of a quiz after the quiz is completed.
     */
    this.getFinishedQuizHtmlString = function(){
        var htmlString = "";
        for(var i = 0; i < this.questions.length; i++){
            htmlString+="<div class='resultQuestion'>";
            var currentQuestion = this.questions[i];
            var currentResponse = this.responses[i];
            var wasCorrect = currentQuestion.checkAnswer(currentResponse);
            htmlString += (i+1) + ". " +currentQuestion.getText() + "<br><br>";
            htmlString += "<p> The Correct Answer was: <b>"+ currentQuestion.getCorrectAnswer() + "</b></p>";
            if(currentResponse === null){
                htmlString+="<span class='no-response'> You did not give an answer for this question. </span>";
            }
            else{
                if(wasCorrect > 0){
                    htmlString += "<span class='correct'> Your Response: \"" + currentResponse + "\" was correct!</span>";
                }
                else{
                    htmlString += "<span class='incorrect'>Your Response: \"" + currentResponse + "\" was incorrect!</span>";
                }
            }
            htmlString += "</div><hr>";
        }
        return htmlString;
    };

    /**
     * Populate the array of templates.
     * NEEDS TO BE HOOKED UP TO DATABASE.
     * LOADS TEMPLATES FROM SRC FOR NOW.
     * @return {*|Array} A list of question templates.
     */
    var loadTemplates = function(){
      var templates = [];
      var qt = new QuadraticRootTemplate();
      //templates.push(qt);
      //qt = new EvaluateExpressionAddTemplate();
      //templates.push(qt);
      //qt = new EvaluateExpressionSubtractTemplate();
      //templates.push(qt);
      qt = new SolveLinearEquationTemplate();
      templates.push(qt);
      return templates;
    };

    /**
     * @param question A question object.
     * @param qNumber The question number, used to give each question's radio buttons
     *      unique values for their 'name' attribute.
     * @returns {String} A string of html code used to display a question.
     */
    var getQuestionHtmlString = function(question, qNumber){
      var htmlString = question.getText() + "</p>";
      var qRadioName = "q" + qNumber; // name used for this questions radio buttons.
      var answers = question.getAnswers();
      //generate radio buttons
      for(var i = 0; i < answers.length; i++ ){
        var answerString = answers[i];
        htmlString += "<input type='radio' name='"+qRadioName+"' value='" + answerString + "'>"+answerString + "<br>";
      }
      return htmlString;
    };
}
