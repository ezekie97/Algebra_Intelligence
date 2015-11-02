var multiply = function(skillLevel) {
    this.values = [];
    this.op = "*";
    this.printedOp = "&times";
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
        var solution = this.solve();
        var maxDec = 0;
        for(var i = 0; i < this.values.length; i++){
            var value = this.values[i];
            var places = decimalPlaces(value);
            maxDec+=places;
            }
        return solution.toFixed(maxDec);
    };

    this.generateParams = function () {
        switch (skillLevel) {
            case 1:
                // Numbers 0 - 20
                var numOfValues = 2;
                while(numOfValues > 0){
                    this.values.push(this.random.generateRandomInteger(0,21));
                    numOfValues --;
                }
                break;
            case 2:
                // Numbers 0 - 100
                var numOfValues = 2;
                while(numOfValues > 0){
                    this.values.push(this.random.generateRandomInteger(0,100));
                    numOfValues --;
                }
                break;
            case 3:
                // Numbers 0 - 100 including decimals (0-3 places, same or varying)
                var numOfValues = 2;
                var varyingDecimalPlaces = this.random.generateRandomBoolean();
                var round = this.random.generateRandomInteger(0,4);
                while(numOfValues > 0){
                    this.values.push(this.random.generateRandomDecimal(0,100,round));
                    numOfValues --;
                    if(varyingDecimalPlaces){
                        round = this.random.generateRandomInteger(0,4);
                    }
                }
                break;
            case 4:
                // Numbers -100 - 100 including decimals (0-3 places, same or varying)
                // Up to 3 values, but 3 is rare.
                // Numbers 0 - 100 including decimals (0-3 places, same or varying)
                var numOfValuesPercent = this.random.generateRandomInteger(0,101);
                var numOfValues = 2;
                if(numOfValuesPercent > 85){
                    numOfValues = 3;
                }
                var varyingDecimalPlaces = this.random.generateRandomBoolean();
                var round = this.random.generateRandomInteger(0,4);
                while(numOfValues > 0){
                    this.values.push(this.random.generateRandomDecimal(-100,100,round));
                    numOfValues --;
                    if(varyingDecimalPlaces){
                        round = this.random.generateRandomInteger(0,4);
                    }
                }
                break;
            case 5:
                // Numbers -500 - 500 including decimals (0-4 places, same or varying)
                // Up to 3 values, 50 | 50 chance of 2 or 3.
                var numOfValues = this.random.generateRandomInteger(2,4);
                var varyingDecimalPlaces = this.random.generateRandomBoolean();
                var round = this.random.generateRandomInteger(0,5);
                while(numOfValues > 0){
                    this.values.push(this.random.generateRandomDecimal(-500,500,round));
                    numOfValues --;
                    if(varyingDecimalPlaces){
                        round = this.random.generateRandomInteger(0,5);
                    }
                }
                break;
            default:
                break;
        }
    };

    this.generateParams();
};

var multObj = new multiply(5);

var showSolution = function(){
    document.getElementById("answer").innerHTML = multObj.printSolution();
};

var showQuestion = function(){
    document.getElementById("question").innerHTML = multObj.printQuestion();
};