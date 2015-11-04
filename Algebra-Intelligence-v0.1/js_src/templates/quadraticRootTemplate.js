/**
 * Template for generating quadratic root questions.
 * @constructor
 */
function QuadraticRootTemplate() {
    /**
     * Generates A quadratic root question and it solution(s).
     * @returns {Question} The quadratic root quiz question.
     */
    this.instantiateQuestion = function(){
        var random = new Random();
        var rootA =  random.generateRandomInteger(-20,20);
        var rootB = random.generateRandomInteger(-20,20);
        var qText = generateText(rootA,rootB);
        var qAnswerInfo = generateAnswerInfo(rootA,rootB);
        var qAnswers = qAnswerInfo[0];
        var qCorrectAnswerPos = qAnswerInfo[1];
        return new Question(qText,qAnswers,qCorrectAnswerPos);
    };

    /**
     * Generate the text for a quadratic root question.
     * @param rootA The first root of the problem.
     * @param rootB The second root of the problem.
     * @return {String} the question text.
     */
    var generateText = function(rootA, rootB){
        var text = "The quadratic equation x<sup>2</sup> ";
        var b = -(rootA + rootB);
        var c = rootA * rootB;
        var op = "+";
        // handle x term
        if( b !== 0) {
            if(b < 0) {
                op = "-";
            }
            text+= op + " " + Math.abs(b) + "x ";
        }
        // handle constant term.
        if(c !==0) {
            op = "+";
            if(c < 0) {
                op = "-";
            }
            text+= op + " " + Math.abs(c) + " ";
        }
        text += " = 0 has...";
        return text;
    };

    /**
     * Generate 4 Multiple Choice Answers given two roots
     * of a quadratic equation.
     * @param rootA The first root
     * @param rootB The second root.
     * @return {Array} A mixed array of two items . The first holds the
     *      multiple choice answers. The second holds the position of the correct answer.
     */
    var generateAnswerInfo = function(rootA,rootB){
        var random = new Random();
        var wrongRootA = rootA + random.generateRandomInteger(1,5);
        var wrongRootB = rootB - random.generateRandomInteger(1,5);
        if(wrongRootA === wrongRootB){
            wrongRootA++;
        }
        var correctAnswer;
        var incorrectAnswerA;
        var incorrectAnswerB;
        var noneAnswer = "None of the above.";
        if(rootA === rootB){
            correctAnswer = "One root: "+ rootA;
            incorrectAnswerA = "Two roots: "+ wrongRootA + " and " + wrongRootB;
            incorrectAnswerB = "One root: "+  (rootA - random.generateRandomInteger(1,3));
        }
        else{
            correctAnswer = "Two roots: "+ rootA + " and " + rootB;
            incorrectAnswerA = "Two roots: "+ wrongRootA + " and " + wrongRootB;
            incorrectAnswerB = "One root: "+ (wrongRootA - random.generateRandomInteger(1,3));
        }

        var correctAnswerPos = random.generateRandomInteger(0,3); //0 - 2 (a - c)
        switch(correctAnswerPos){
            case 0:
                return [[correctAnswer,incorrectAnswerB,incorrectAnswerA, noneAnswer],correctAnswerPos];
                break;
            case 1:
                return [[incorrectAnswerA, correctAnswer, incorrectAnswerB, noneAnswer],correctAnswerPos];
                break;
            case 2:
                return [[incorrectAnswerA, incorrectAnswerB, correctAnswer, noneAnswer],correctAnswerPos];
                break;
            default:
                return [[correctAnswer,incorrectAnswerB,incorrectAnswerA, noneAnswer],correctAnswerPos];
                break;
        }
    }
}