/**
 * Generate questions for evaluation of addition expressions.
 * @constructor
 */
function EvaluateExpressionAddTemplate() {
    /**
     * Generates an addition expression and its x and y values.
     * The expression is of the form Ax + By.
     * @returns {Question} The evaluate addition expression quiz question.
     */
    this.instantiateQuestion = function(){
        var random = new Random();
        var xValue = random.generateRandomInteger(-25,25);
        var xCoefficient = random.generateRandomInteger(1,11);
        if(random.generateRandomBoolean()){
            xCoefficient = -xCoefficient;
        }
        var yValue = random.generateRandomInteger(-25,25);
        var yCoefficient = random.generateRandomInteger(1,11);
        if(random.generateRandomBoolean()){
            yCoefficient = -yCoefficient;
        }
        var qText = generateText(xValue,yValue,xCoefficient,yCoefficient);
        var qAnswerInfo = generateAnswerInfo(xValue,yValue,xCoefficient,yCoefficient);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText,qAnswers,qCorrectAnswerPos);
    };

    /**
     * Generate the text for a evaluate addition expression question.
     * @param x The value of x.
     * @param y The value of y.
     * @param xCoefficient The coefficient of x.
     * @param yCoefficient the coefficient of y.
     * @return {String} the question text.
     */
    var generateText = function(x,y,xCoefficient,yCoefficient){
        var text = "For x = " + x + " and y = "+ y + " <br> &nbsp&nbsp&nbsp Evaluate ";
        text += xCoefficient + "x + "+ yCoefficient + "y";
        return text;
    };

    /**
     * Generate 4 Multiple Choice Answers.
     * @param x The value of x.
     * @param y The value of y.
     * @param xCoefficient The coefficient of x.
     * @param yCoefficient the coefficient of y.
     * @return {Array} A mixed array of two items . The first holds the
     *      multiple choice answers. The second holds the position of the correct answer.
     */
    var generateAnswerInfo = function(x,y,xCoefficient, yCoefficient){
        var random = new Random();
        var correctAnswer = xCoefficient * x + yCoefficient * y;
        var incorrectAnswerA = xCoefficient * (x+random.generateRandomInteger(-10,10)) +
            yCoefficient * (y+random.generateRandomInteger(-10,10));

        var incorrectAnswerB = (xCoefficient+random.generateRandomInteger(-10,10)) * (x+random.generateRandomInteger(-10,10)) +
            yCoefficient * y;

        var incorrectAnswerC = xCoefficient * x +
            (yCoefficient+random.generateRandomInteger(-10,10)) * (y+random.generateRandomInteger(-10,10));

        var correctAnswerPos = random.generateRandomInteger(0,4); //0 - 3 (a - d)
        switch(correctAnswerPos){
            case 0:
                return [[correctAnswer,incorrectAnswerA,incorrectAnswerB, incorrectAnswerC],correctAnswerPos];
                break;
            case 1:
                return [[incorrectAnswerA, correctAnswer, incorrectAnswerB, incorrectAnswerC],correctAnswerPos];
                break;
            case 2:
                return [[incorrectAnswerA, incorrectAnswerB, correctAnswer, incorrectAnswerC],correctAnswerPos];
                break;
            default: //answer is d.
                return [[incorrectAnswerA,incorrectAnswerB,incorrectAnswerC, correctAnswer],correctAnswerPos];
                break;
        }
    }
}
