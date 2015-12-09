/**
 * Template for generating quadratic root questions.
 * @constructor
 */
function QuadraticRootTemplate() {
    this.category = "quadratic";

    /**
     * @returns {String} the category of this template, and therefore its questions.
     */
    this.getCategory = function(){
      return this.category;
    };

    /**
     * Generates A quadratic root question and it solution(s).
     * Quadratic Root questions are of the form:
     * ' The quadratic equation Ax^2 + Bx + C = 0 has _____'
     * @param skillLevel The user's skill level for this kind of question.
     * @returns {Question} The quadratic root quiz question.
     */
    this.instantiateQuestion = function(skillLevel){
        //var random = new Random();
        // Get Values for A, B, C, and Roots.
        var templateComponents = generateTemplateComponents(skillLevel);
        var A = templateComponents[0];
        var B = templateComponents[1];
        var C = templateComponents[2];
        var R1 = templateComponents[3];
        var R2 = templateComponents[4];
        var qText = generateText(A,B,C);
        var qAnswerInfo = generateAnswerInfo(A,C,R1,R2,skillLevel);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText,qAnswers,qCorrectAnswerPos,this.category);
    };

    /**
     * Generate values specific to the quadratic root template based
     *  on the user's skill level in this subject.
     * @param skillLevel The users skill level.
     * @returns {Number|Array} An array of the following: A value, B value, C value,
     *     and two values for the Roots.
     */
    var generateTemplateComponents = function(skillLevel){
        var random = new Random();
        var R1; // root 1
        var R2; // root 2
        var A;  // a
        var B;  // b
        var C;  // c
        switch(skillLevel){
          case 1:
            R1 = random.generateRandomInteger(-10,10);
            R2 = random.generateRandomInteger(-10,10);
            A = 1;
            B = -(R1 + R2);
            C = R1 * R2;
            break;
          case 2: // process is same for cases 2 and 3, fall through if level is 2.
          case 3:
            R1 = random.generateRandomNonZeroIntegerInRange(2,20);
            R2 = random.generateRandomNonZeroIntegerInRange(2,20);
            A = 1;
            B = -(R1 + R2);
            C = R1 * R2;
            break;
          case 4:
            R1 = random.generateRandomNonZeroIntegerInRange(5,25);
            R2 = random.generateRandomNonZeroIntegerInRange(5,25);
            A = random.generateRandomNonZeroInteger(20);
            B = A * -(R1 + R2);
            C = A * R1 * R2;
            break;
          default: //skill level 5.
            R1 = random.generateRandomNonZeroIntegerInRange(5,25);
            R2 = random.generateRandomNonZeroIntegerInRange(5,25);
            var round = random.generateRandomInteger(1,3);
            A = random.generateRandomNonZeroDecimal(20,round);
            B = parseFloat((A * -(R1 + R2)).toFixed(round));
            C = parseFloat((A * R1 * R2).toFixed(round));
            break;
        }
        return [A,B,C,R1,R2];
    };

    /**
   * Generate the text for a quadratic root question.
   * @param A The value of A.
   * @param B The value of B.
   * @param C The value of C.
   * @returns {String}
   */
    var generateText = function(A,B,C){
        var text = "The quadratic equation ";
        //handle the A term
        if(A !== 1){
          text+=A;
        }
        text+="x<sup>2</sup> ";

        //handle the B term
        var op = "+";
        if( B !== 0) {
            if(B < 0) {
                op = "-";
            }
            text+= op + " " + Math.abs(B) + "x ";
        }

        // handle constant term.
        if(C !==0) {
            op = "+";
            if(C < 0) {
                op = "-";
            }
            text+= op + " " + Math.abs(C) + " ";
        }
        text += " = 0 has _____.";
        return text;
    };

    /**
     * Generate 4 Multiple Choice Answers given two roots
     * of a quadratic equation.
     * @param A The value of A.
     * @param C The value of C.
     * @param R1 The first root
     * @param R2 The second root.
     * @param skillLevel The user's skill level, affects which answers show up.
     * @return {*|Array} A mixed array of two items . The first holds the
     *      multiple choice answers. The second holds the position of the correct answer.
     */
    var generateAnswerInfo = function(A,C,R1,R2, skillLevel){
        var random = new Random();
        var noneAnswer = "None of the above.";
        var correctAnswerPos = random.generateRandomInteger(0,3); //0 - 3 (a - d)
        var correctAnswer;
        var incorrectAnswerA;
        var incorrectAnswerB;
        var incorrectAnswerC;
        switch(skillLevel){
          case 1:
                // 3 Answers and a `None of the Above` choice.
                // if correctAnswerPos = 3 (d), `None of the Above` becomes the answer automatically.
                // Incorrect Answers are `obviously` wrong

                if(correctAnswerPos === 3){ //`None of the Above` Correct.
                  correctAnswer = noneAnswer;
                  // negate both roots, answer is now wrong.
                  if(Math.abs(R1) === Math.abs(R2) || (R1 === 0) && (R2 === 0) ){ //special cases.
                    var randVal = random.generateRandomNonZeroInteger(2);
                    incorrectAnswerC = generateAnswerText(-R1,-R2,randVal,randVal);
                  }
                  else{
                    incorrectAnswerC = generateAnswerText(-R1,-R2,0,0);
                  }
                }
                else{
                  correctAnswer = generateAnswerText(R1,R2,0,0);
                  incorrectAnswerC = noneAnswer;
                }
                var alterValueA = random.generateRandomInteger(1,5); // positive
                var alterValueB = random.generateRandomInteger(-5,-1); // negative
                incorrectAnswerA = generateAnswerText(R1,R2,alterValueA,alterValueB);
                alterValueA += random.generateRandomInteger(1,3);
                alterValueB -= random.generateRandomInteger(1,3);
                incorrectAnswerB = generateAnswerText(R1,R2,alterValueA, alterValueB);
                break;
          case 2:
          // Remove the none of the above choice, all answers are sign variations of the root.
          // If there is only one root, add another random number and do sign variations of that as well.
            correctAnswer = generateAnswerText(R1,R2,0,0);
            incorrectAnswerA = generateAnswerText(-R1,-R2,0,0);
                if(R1 === R2){ // one root.
                  var badRoot = R1 + random.generateRandomNonZeroInteger(5);
                  incorrectAnswerB = generateAnswerText(badRoot,badRoot,0,0);
                  incorrectAnswerC = generateAnswerText(-badRoot,-badRoot,0,0);
                }
                else{ // two roots.
                  incorrectAnswerB = generateAnswerText(-R1,R2,0,0);
                  incorrectAnswerC = generateAnswerText(R1,-R2,0,0)
                }
                break;
          default:
            //skill levels 3-5
            // Wrong solutions utilize factors of C / A to throw users off.
            var baseC = Math.abs(C/A); //base value of c (important for skill levels 4 and 5.
            correctAnswer = generateAnswerText(R1,R2,0,0);
            var factors = factorsOf(baseC,20,[Math.abs(R1),Math.abs(R2)]); // get up to first 20 factors of C, excluding R1 and R2.
            switch(factors.length){
              case 0: // no other factors
                  incorrectAnswerA = generateAnswerText(-R1,R2,0,0);
                  incorrectAnswerB = generateAnswerText(R1,-R2,0,0);
                  incorrectAnswerC = generateAnswerText(-R1,-R2,0,0);
                  break;

              case 1:  // 1 other factor
                incorrectAnswerA = generateAnswerText(-R1,R2,0,0);
                if(C < 0){
                  incorrectAnswerB = generateAnswerText(-factors[0],baseC/factors[0],0,0);
                  incorrectAnswerC = generateAnswerText(factors[0],-baseC/factors[0],0,0);
                }
                else{
                  incorrectAnswerB = generateAnswerText(-factors[0],-baseC/factors[0],0,0);
                  incorrectAnswerC = generateAnswerText(factors[0],baseC/factors[0],0,0);
                }
                break;
              case 2: // two other factors
                randIndex = random.generateRandomInteger(0,factors.length-1);
                factor = factors[randIndex];
                if(C < 0){
                  incorrectAnswerA = generateAnswerText(-factor,baseC/factor,0,0);
                  incorrectAnswerB = generateAnswerText(factor,-baseC/factor,0,0);
                }
                else{
                  incorrectAnswerA = generateAnswerText(factor,baseC/factor,0,0);
                  incorrectAnswerB = generateAnswerText(-factor,-baseC/factor,0,0);
                }
                factors.splice(randIndex,1);
                randIndex = random.generateRandomInteger(0,factors.length-1);
                factor = factors[randIndex];
                if(C < 0){
                  incorrectAnswerC = generateAnswerText(-factor,baseC/factor,0,0);
                }
                else{
                  incorrectAnswerC = generateAnswerText(factor,baseC/factor,0,0);
                }
                break;
              default: //3 or more other factors
                  var incorrectAnswers = [];
                  for(var i= 0; i < 3; i++){
                    var randIndex = random.generateRandomInteger(0,factors.length-1);
                    var factor = factors[randIndex];
                    if(C < 0){
                      if(random.generateRandomBoolean()){
                        incorrectAnswers.push(generateAnswerText(-factor,baseC/factor,0,0));
                      }
                      else{
                        incorrectAnswers.push(generateAnswerText(factor,-baseC/factor,0,0));
                      }
                    }
                    else{
                      if(random.generateRandomBoolean()){
                        incorrectAnswers.push(generateAnswerText(factor,baseC/factor,0,0));
                      }
                      else{
                        incorrectAnswers.push(generateAnswerText(-factor,-baseC/factor,0,0));
                      }
                    }
                    factors.splice(randIndex,1);
                  }
                  incorrectAnswerA = incorrectAnswers[0];
                  incorrectAnswerB = incorrectAnswers[1];
                  incorrectAnswerC = incorrectAnswers[2];
                break;
            }
            break;
        }

        switch(correctAnswerPos){
            case 0:
                return [[correctAnswer,incorrectAnswerB,incorrectAnswerA, incorrectAnswerC],correctAnswerPos];
                break;
            case 1:
                return [[incorrectAnswerA, correctAnswer, incorrectAnswerB, incorrectAnswerC],correctAnswerPos];
                break;
            case 2:
                return [[incorrectAnswerA, incorrectAnswerB, correctAnswer, incorrectAnswerC],correctAnswerPos];
                break;
            default:
                return [[incorrectAnswerA,incorrectAnswerB,incorrectAnswerC, correctAnswer],correctAnswerPos];
                break;
        }
    };

    /**
     * Generate text for an answer.
     * @param R1 The value of the first root.
     * @param R2 The value of the second root.
     * @param alterValueA Value to change R1 by.
     * @param alterValueB Value to change R2 by.
     * @returns {String} Text for an answer choice.
     */
    var generateAnswerText = function(R1,R2,alterValueA, alterValueB){
      if(R1 === R2){
          R1 += alterValueA;
          R2 = R1;
      }
      else{
        R1 += alterValueA;
        R2 += alterValueB;
      }
      if(R1 === R2){ // one root
          return "One Root: " + R1.toFixed(0);
        }
      else{ // two roots
          return "Two Roots: " + R1.toFixed(0) + " and " + R2.toFixed(0);
        }
    }
}
