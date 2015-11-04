/**
 * A Question which has text and an answer
 * @param text The text of the question.
 * @param answers The 4 multiple choice answers to the question.
 * @param correctAnswerPosition The position in the answer array of the correct answer.
 * @constructor
 */
function Question(text, answers, correctAnswerPosition){
    this.text = text;
    this.answers = answers;
    this.correctAnswerPosition = correctAnswerPosition;

    /**
     * @returns {String} The correct answer to this question as a string.
     */
    this.getCorrectAnswer = function(){
        return ""+this.answers[this.correctAnswerPosition]
    };

    /**
     * Checks if a user given answer is correct.
     * @param userAnswer The user's input answer.
     * @returns {number} 1 if the answer was correct, 0 otherwise.
     */
    this.checkAnswer = function(userAnswer){
        if(userAnswer === this.getCorrectAnswer()){
            return 1;
        }
        return 0;
    };

    // Accessor Functions
    /**
     * @returns {String} The text of this question.
     */
    this.getText = function(){
        return this.text;
    };

    /**
     * @returns {Array} The four answer choices of this question.
     */
    this.getAnswers = function(){
        return this.answers;
    };
}
