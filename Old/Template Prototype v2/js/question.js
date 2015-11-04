/**
 * A Question which has text and an answer
 * @param text The text of the question.
 * @param answer The 4 multiple choice answers to the question.
 * @param correctAnswerPosition The position in the answer array of the correct answer.
 * @constructor
 */
function Question(text, answers, correctAnswerPosition){
    this.text = text;
    this.answers = answers;
    this.correctAnswerPosition = correctAnswerPosition;

    this.getText = function(){return this.text;}
    this.getAnswers = function(){return this.answers;}
    this.getCorrectAnswer = function(){return this.answers[this.correctAnswerPosition]};
    this.checkAnswer = function(){
        var radios = document.getElementsByName("q1");
        for(var i = 0; i < radios.length; i++){
            var radio = radios[i];
            if(radio.checked){
                if(radio.value === ""+this.getCorrectAnswer()){
                    return "CORRECT";
                }
                else{
                    return "INCORRECT";
                }
            }
        }
        return "CHOOSE AN ANSWER";
    }
    this.display = function(){
        var htmlText = text + "<br><br>";
        for(var i = 0; i < this.answers.length; i++ ){
            var answerText = this.answers[i];
            var inp = "<input type='radio' name='q1' value='" + answerText + "'>"+answerText + "<br>";
            htmlText+= inp;
        }
        htmlText+= "<input type='button' value='Check' onclick='alert(q.checkAnswer());'>";
        document.getElementById("question").innerHTML = htmlText;
    }
}
