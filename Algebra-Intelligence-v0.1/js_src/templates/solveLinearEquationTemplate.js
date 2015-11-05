/**
 * Created by kotanjai on 10/31/2015.
 */
/**
 * Template for Solving Linear Equations.
 * @constructor
 */
function SolveLinearEquationTemplate() {
      this.category = "linearEq";

    /**
     * @returns {String} the category of this template, and therefore its questions.
     */
    this.getCategory = function() {
      return this.category;
    };

    /**
     * Generates a linear equation question.
     * The expression is of the form Ax + Bx + C = 0.
     * @returns {Question} The evaluate linear equation quiz question.
     */
    this.instantiateQuestion = function (skillLevel) {
        var templateComponents = generateTemplateComponents(skillLevel);
        var A = templateComponents[0];
        var B = templateComponents[1];
        var C = templateComponents[2];
        var qText = generateText(A, B, C);
        var qAnswerInfo = generateAnswerInfo(A,B,C);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText, qAnswers, qCorrectAnswerPos,this.category);
    };

    /**
     * Generate values for linear equation template based
     *  on the user's skill level in this subject.
     * @param skillLevel The users skill level.
     * @returns {Number|Array} An array of the following: A value, B value, C value,
     *
     */
    var generateTemplateComponents = function(skillLevel){
      var random = new Random();
      var A;  // a
      var B;  // b
      var C;  // c
      switch(skillLevel){
        //All  positive numbers
        case 1:
          A = random.generateRandomInteger(1,10);
          B = random.generateRandomInteger(1,10);
          C = random.generateRandomInteger(1,10);
          break;
        case 2:
          //Positive and negative whole numbers
          A = random.generateRandomNonZeroInteger(20);
          // Prevent A+B === 0.
          if(A > 15){
            B = random.generateRandomInteger(-20,A-1);
          }
          else{
            B = random.generateRandomInteger(A+1,20);
          }
          C = random.generateRandomNonZeroInteger(20);
          break;
        case 3:
          //Positive decimals rounded to 1 place
          A = random.generateRandomDecimal(0,10,1);
          B = random.generateRandomDecimal(0,10,1);
          C = random.generateRandomDecimal(0,10,1);
          break;
        case 4:
          //Decimals rounded to 2 places both positive and negative
          A = random.generateRandomDecimal(-10,10,2);
          // Prevent A+B === 0.
          if(A > 5){
            B = random.generateRandomDecimal(-10,A-1,2);
          }
          else{
            B = random.generateRandomDecimal(A+1,10,2);
          }
          C = random.generateRandomDecimal(-10,10,2);
          break;
        default: //skill level 5.
          //Decimals rounding from 1 to 3 places, the range is smaller
          //to make the decimals smaller numbers
          var round = random.generateRandomInteger(1,3);
          A = random.generateRandomDecimal(-5,5,round);
          // Prevent A+B === 0.
          if(A > 2.5){
            B = random.generateRandomDecimal(-5,A-1,round);
          }
          else{
            B = random.generateRandomDecimal(A+1,5,round);
          }
          C = random.generateRandomDecimal(-5,5,round);
          break;
      }
      return [A,B,C];
    };

    /**
     * Generate the text for solving a linear equation question.
     * @param a The value of A, the coefficient of the first x.
     * @param b The value of B, the coefficient of the first x.
     * @param c The value of the constant.
     * @return {String} the question text.
     */
    var generateText = function (a, b, c) {
        var text = "Solve for x: <br> &nbsp&nbsp&nbsp&nbsp";
        text += a + "x + " + b + "x + " + c + " = 0 ";
        return text;
    };

    /**
     * Generate 4 Multiple Choice Answers.
     * @param a The coefficient of x.
     * @param b the coefficient of second x variable.
     * @param c the value of the constant.
     * @return {*|Array} A mixed array of two items . The first holds the
     *      multiple choice answers. The second holds the position of the correct answer.
     */
    var generateAnswerInfo = function (a, b, c) {
        var random = new Random();
        var denominator = 0;
        var numerator = 0;

        //Combine like terms a added to b and assign to denominator
        denominator += a + b;

        //If the constant is negative move to right side and make positive
        if (c < 0) {
            numerator += Math.abs(c);
        }
        //Otherwise constant is positive and becomes negative on right side
        else {
            if (c > 0) {
                numerator += -c;
            }
        }
        //Calculation for correct answer rounded to 2 decimal places
        var addNum = 1;
        var correctAnswer = (numerator / denominator);
        //Calculations for incorrect answers for multiple choice based on correct answer also rounded to 2 decimals
        var incorrectAnswerA = -(correctAnswer).toFixed(2);
        var incorrectAnswerB = (c / a - b).toFixed(2) //(random.generateRandomInteger(-5, 5)).toFixed(2);
        var incorrectAnswerC = (correctAnswer + addNum).toFixed(2); //* (random.generateRandomInteger(-5,5))).toFixed(2);
        correctAnswer = correctAnswer.toFixed(2);
        var correctAnswerPos = random.generateRandomInteger(0, 4); //0 - 3 (a - d)
        switch (correctAnswerPos) {
            case 0:
                return [[correctAnswer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC], correctAnswerPos];
                break;
            case 1:
                return [[incorrectAnswerA, correctAnswer, incorrectAnswerB, incorrectAnswerC], correctAnswerPos];
                break;
            case 2:
                return [[incorrectAnswerA, incorrectAnswerB, correctAnswer, incorrectAnswerC], correctAnswerPos];
                break;
            default: //answer is d.
                return [[incorrectAnswerA, incorrectAnswerB, incorrectAnswerC, correctAnswer], correctAnswerPos];
                break;
        }

    }
}
