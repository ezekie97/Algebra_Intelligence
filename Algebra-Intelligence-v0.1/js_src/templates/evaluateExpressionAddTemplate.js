/**
 * Generate questions for evaluation of addition expressions.
 * @constructor
 */
function EvaluateExpressionAddTemplate() {

    this.category = "evalAdd";

    /**
     * @returns {String} the category of this template, and therefore its questions.
     */
    this.getCategory = function(){
      return this.category;
    };
    /**
     * Generates an addition expression and its x and y values.
     * @param skillLevel The user's skill level.
     * The expression is of the form Ax + By.
     * @returns {Question} The evaluate addition expression quiz question.
     */
    this.instantiateQuestion = function(skillLevel){
        var components = generateTemplateComponents(skillLevel);
        var xValue = components[0];
        var yValue = components[1];
        var xCoefficient = components[2];
        var yCoefficient = components[3];
        var qText = generateText(xValue,yValue,xCoefficient,yCoefficient);
        var qAnswerInfo = generateAnswerInfo(xValue,yValue,xCoefficient,yCoefficient);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText,qAnswers,qCorrectAnswerPos, this.category);
    };


    /**
     * Generate values specific to the evaluation addition template based
     *  on the user's skill level in this subject.
     * @param skillLevel The users skill level.
     * @returns {Array} An array of the following: x value, x coefficient, y value,
     *     and y coefficient.
     */
    var generateTemplateComponents = function(skillLevel){
        var random = new Random();
        var x;
        var y;
        var xCoefficient;
        var yCoefficient;
        switch(skillLevel){
          case 1:
                // Use values (1,10) for coefficients.
                // Use values (0,10) for  x,y values.
                x = random.generateRandomInteger(0,10);
                y = random.generateRandomInteger(0,10);
                xCoefficient = random.generateRandomInteger(1,10);
                yCoefficient = random.generateRandomInteger(1,10);
                break;
          case 2:
                // Use values (-10,10) for coefficients (not including 0).
                // Use values (-10,10) for  x,y values.
                x = random.generateRandomInteger(-10,10);
                y = random.generateRandomInteger(-10,10);
                xCoefficient = random.generateRandomNonZeroInteger(10);
                yCoefficient = random.generateRandomNonZeroInteger(10);
                break;
          case 3:
                // Use values (1,15) for coefficients (not including 0).
                // Use decimal values (0,15) for x,y values.
                // Decimals have 1 decimal place.
                x = random.generateRandomDecimal(0,15,1);
                y = random.generateRandomDecimal(0,15,1);
                xCoefficient = random.generateRandomInteger(1,15);
                yCoefficient = random.generateRandomInteger(1,15);
                break;
          case 4:
                // Use values (-15,15) for coefficients (not including 0).
                // Use decimal values (-15,15) for x,y values.
                // Decimals have up to 3 decimal place, all decimals have same number of places.
                var round = random.generateRandomInteger(1,3);
                x = random.generateRandomDecimal(-15,15,round);
                y = random.generateRandomDecimal(-15,15,round);
                xCoefficient = random.generateRandomNonZeroInteger(15);
                yCoefficient = random.generateRandomNonZeroInteger(15);
                break;

          default: //skill level 5
                // Use values (-20,20) for coefficients (not including 0).
                // Use decimal values (-20,20) for x,y values.
                // Decimals have up to 3 decimal place, number of places varies between values.
                var round = random.generateRandomInteger(1,3);
                x = random.generateRandomDecimal(-20,20,round);
                round = random.generateRandomInteger(1,3);
                y = random.generateRandomDecimal(-20,20,round);
                xCoefficient = random.generateRandomNonZeroInteger(20);
                yCoefficient = random.generateRandomNonZeroInteger(20);
                break;
        }
      return[x,y,xCoefficient,yCoefficient];
    }

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

      var skill = parseInt(getCookie("evalAddSkill"));
      if(skill === 3){
        correctAnswer = correctAnswer.toFixed(1);
        incorrectAnswerA = incorrectAnswerA.toFixed(1)
        incorrectAnswerB = incorrectAnswerB.toFixed(1)
        incorrectAnswerC = incorrectAnswerC.toFixed(1)
      }
      else if(skill > 3){
        correctAnswer = correctAnswer.toFixed(3);
        incorrectAnswerA = incorrectAnswerA.toFixed(3)
        incorrectAnswerB = incorrectAnswerB.toFixed(3)
        incorrectAnswerC = incorrectAnswerC.toFixed(3)
      }
        var correctAnswerPos = random.generateRandomInteger(0,3); //0 - 3 (a - d)
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
