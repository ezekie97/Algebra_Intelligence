/**
 * Created by kotanjai on 10/31/2015.
 */

function SolveLinearEquationTemplate() {
    /**
     * Generates a linear equation question.
     * The expression is of the form Ax + Bx + C = 0.
     * @returns {Question} The evaluate linear equation quiz question.
     */
    this.instantiateQuestion = function () {
        var random = new Random();

        // generate values from -20 to 20, excluding 0.
        var A = random.generateRandomNonZeroInteger(21);
        var B = random.generateRandomNonZeroInteger(21);
        var C = random.generateRandomNonZeroInteger(21);
        if(A + B === 0){
          A += random.generateRandomNonZeroInteger(5);
        }

        var qText = generateText(A, B, C);
        var qAnswerInfo = generateAnswerInfo(A, B, C);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText, qAnswers, qCorrectAnswerPos);
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
     * @return {Array} A mixed array of two items . The first holds the
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
        var correctAnswer = (numerator / denominator);
        //Calculations for incorrect answers for multiple choice based on correct answer also rounded to 2 decimals
        var incorrectAnswerA = (correctAnswer * (random.generateRandomInteger(-10, 10))).toFixed(2);
        var incorrectAnswerB = (correctAnswer * (random.generateRandomInteger(-5, 5))).toFixed(2);
        var incorrectAnswerC = (Math.abs(correctAnswer) * (random.generateRandomInteger(-5, 5))).toFixed(2);
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
