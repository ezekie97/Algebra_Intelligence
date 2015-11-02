var divide = function(skillLevel) {
    this.values = [];
    this.op = "/";
    this.printedOp = "&divide";
    this.random = new Random();

    this.printQuestion = function () {
        var questionString = "What is ";
        for (var i = 0; i < this.values.length; i++) {
            if(this.values[i] < 0){
                questionString += "("+this.values[i]+")";
            }
            else{
                questionString += this.values[i];
            }

            if ((i + 1) < this.values.length) {
                questionString += " " + this.printedOp + " ";
            }
        }
        questionString += "?";
        return questionString;
    };

    this.solve = function () {
        var resultString = "";
        for (var i = 0; i < this.values.length; i++) {
            resultString += this.values[i];
            if ((i + 1) < this.values.length) {
                resultString += " " + this.op + " ";
            }
        }
        return eval(resultString);
    };

    this.printSolution = function () {
        return this.solve();
    };

    this.generateParams = function () {
        switch (skillLevel) {
            case 1:
                // 1 - 15 times tables, numbers work out evenly.
                var divisor = this.random.generateRandomInteger(1,16);
                var dividend = divisor * this.random.generateRandomInteger(1,16);
                this.values.push(dividend);
                this.values.push(divisor);
                break;
            case 2:
                // 1 - 20 times tables, numbers work out evenly.
                var divisor = this.random.generateRandomInteger(1,21);
                var dividend = divisor * this.random.generateRandomInteger(1,21);
                this.values.push(dividend);
                this.values.push(divisor);
                break;
            case 3:
                // 1 - 20 times tables, with negatives, numbers work out evenly.

                // prevents 0 as divisor
                var divisorChoice1 = this.random.generateRandomInteger(-25,-1);
                var divisorChoice2 = this.random.generateRandomInteger(1,26);
                var chooseOption1 = this.random.generateRandomBoolean();
                var divisor = divisorChoice2;
                if(chooseOption1){
                    divisor = divisorChoice1;
                }
                var dividend = divisor * this.random.generateRandomInteger(-20,21);
                this.values.push(dividend);
                this.values.push(divisor);
                break;
            case 4:
                // -50 - 50, numbers don't have to work out evenly, |dividend| >= |divisor|
                var divisorChoice1 = this.random.generateRandomInteger(-50,-1);
                var divisorChoice2 = this.random.generateRandomInteger(1,51);
                var chooseOption1 = this.random.generateRandomBoolean();
                var divisor = divisorChoice2;
                if(chooseOption1){
                    divisor = divisorChoice1;
                }
                var dividendChoice1 = this.random.generateRandomInteger(-50,(-divisor+1));
                var dividendChoice2 = this.random.generateRandomInteger((divisor+1),51);
                if(divisor < 0){
                    dividendChoice1 = this.random.generateRandomInteger(-50,(divisor+1));
                    dividendChoice2 = this.random.generateRandomInteger((-divisor+1),51);
                }

                chooseOption1 = this.random.generateRandomBoolean();
                var dividend = dividendChoice2;
                if(chooseOption1){
                    dividend = dividendChoice1;
                }
                this.values.push(dividend);
                this.values.push(divisor);
                break;
            case 5:
                // Numbers -50 - 50 times tables, numbers don't have to work out evenly.
                // Includes decimals (up to 3 places, varying).
                var round = this.random.generateRandomInteger(0,3);
                var divisorChoice1 = this.random.generateRandomDecimal(-50,-1,round);
                var divisorChoice2 = this.random.generateRandomDecimal(1,51,round);
                var chooseOption1 = this.random.generateRandomBoolean();
                var divisor = divisorChoice2;
                if(chooseOption1){
                    divisor = divisorChoice1;
                }

                round = this.random.generateRandomInteger(0,3);
                var dividend = this.random.generateRandomDecimal(-51,50,round);
                this.values.push(dividend);
                this.values.push(divisor);
                break;
            default:
                break;
        }
    };

    this.generateParams();
};

var divObj = new divide(5);

var showSolution = function(){
    document.getElementById("answer").innerHTML = divObj.printSolution();
};

var showQuestion = function(){
    document.getElementById("question").innerHTML = divObj.printQuestion();
};
