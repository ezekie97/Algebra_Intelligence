/**
 * A Question which has text , 4 answer choices, and a category.
 * @param text The text of the question.
 * @param answers The 4 multiple choice answers to the question.
 * @param correctAnswerPosition The position in the answer array of the correct answer.
 * @param category The category or subject this question falls under.
 * @constructor
 */
function Question(text, answers, correctAnswerPosition,category){
    this.text = text;
    this.category = category;
    this.answers = answers;
    this.correctAnswerPosition = correctAnswerPosition;

    /**
     * @returns {String} The correct answer to this question as a string.
     */
    this.getCorrectAnswer = function(){
        return ""+this.answers[this.correctAnswerPosition]
    };

    /**
     * @returns {String} This questions category.
     */
    this.getCategory = function(){
      return this.category;
    };

    /**
     * Checks if a user given answer is correct.
     * @param userAnswer The user's input answer.
     * @returns {Number} 1 if the answer was correct, 0 otherwise.
     */
    this.checkAnswer = function(userAnswer){
        if(userAnswer === this.getCorrectAnswer()){
            return 1;
        }
        return 0;
    };

    /**
     * @returns {String} The text of this question.
     */
    this.getText = function(){
        return this.text;
    };

    /**
     * @returns {*|Array} The four answer choices of this question.
     */
    this.getAnswers = function(){
        return this.answers;
    };
}
