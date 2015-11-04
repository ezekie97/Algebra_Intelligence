/**
 * Created by kotanjai on 10/31/2015.
 */

function SolveLinearEquationTemplate() {
    /**
     * Generates a linear equation question.
     * The expression is of the form Ax + Bx + C
     * @returns {Question} The evaluate linear equation quiz question.
     */
    this.instantiateQuestion = function () {
        var random = new Random();

        var xCoefficient = random.generateRandomInteger(-20, 20);
        //Test to check if random generated a 0 for the xCoefficient, if it did regenerate another number
        if (xCoefficient == 0) {
            xCoefficient = random.generateRandomInteger(-20, 20);
        }

        var yCoefficient = random.generateRandomInteger(-20, 20);
        //Test to check if random generated a 0 for the constant, if it did regenerate another number
        if (yCoefficient == 0) {
            yCoefficient = random.generateRandomInteger(-20, 20);
        }


        var zCoefficient = random.generateRandomInteger(-20, 20);
        if (zCoefficient == 0) {
            zCoefficient = random.generateRandomInteger(-20, 20);
        }

        var qText = generateText(xCoefficient, yCoefficient, zCoefficient);
        var qAnswerInfo = generateAnswerInfo(xCoefficient, yCoefficient, zCoefficient);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText, qAnswers, qCorrectAnswerPos);
    };

    /**
     * Generate the text for solving a linear equation question.
     * @param xCoefficient The coefficient of first x variable.
     * @param yCoefficient the coefficient of second x variable.
     * @param zCoefficient The coefficient of the constant.
     * @return {String} the question text.
     */

    var generateText = function (xCoefficient, yCoefficient, zCoefficient) {
        var text = "Solve for x:   ";
        text += xCoefficient + "x + " + yCoefficient + "x + " + zCoefficient + " = 0 ";
        return text;
    };

    /**
     * Generate 4 Multiple Choice Answers.
     * @param xCoefficient The coefficient of x.
     * @param yCoefficient the coefficient of second x variable.
     * @param zCoefficient the value of the constant.
     * @return {Array} A mixed array of two items . The first holds the
     *      multiple choice answers. The second holds the position of the correct answer.
     */
    var generateAnswerInfo = function (xCoefficient, yCoefficient, zCoefficient) {
        var random = new Random();
        var denominator = 0;
        var numerator = 0;

        //Combine like terms xCoefficient added to yCoefficient and assign to denominator
        denominator += xCoefficient + yCoefficient;

        //If the constant is negative move to right side and make positive
        if (zCoefficient < 0) {
            numerator += Math.abs(zCoefficient);
        }
        //Otherwise constant is positive and becomes negative on right side
        else {
            if (zCoefficient > 0) {
                numerator += -zCoefficient;
            }
        }
        //Calculation for correct answer rounded to 2 decimal places
        var correctAnswer = (numerator / denominator).toFixed(2);
        //Calculations for incorrect answers for multiple choice based on correct answer also rounded to 2 decimals
        var incorrectAnswerA = correctAnswer * (random.generateRandomInteger(-10, 10).toFixed(2));
        var incorrectAnswerB = correctAnswer * (random.generateRandomInteger(-5, 5).toFixed(2));
        var incorrectAnswerC = Math.abs(correctAnswer) * (random.generateRandomInteger(-5, 5).toFixed(2));

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
