var subtract = function(skillLevel) {
    this.values = [];
    this.op = "-";
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
                questionString += " " + this.op + " ";
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
            if(places > maxDec){
                maxDec = places;
            }
        }
        return solution.toFixed(maxDec);
    };

    this.generateParams = function () {
        switch (skillLevel) {
            case 1:
                // Numbers 0-100, Minuend >= Subtrahend
                var minuend = this.random.generateRandomInteger(0,101);
                var subtrahend = this.random.generateRandomInteger(0,(minuend+1));
                this.values.push(minuend);
                this.values.push(subtrahend);
                break;
            case 2:
                // include 0-1000, Minuend May be < Subtrahend
                //
                var minuend = this.random.generateRandomInteger(0,1001);
                var subtrahend = this.random.generateRandomInteger(0,(minuend+1));
                this.values.push(minuend);
                this.values.push(subtrahend);
                break;
            case 3:
                // include -1000-1000, Minuend May be < Subtrahend and either may be negative.
                var minuend = this.random.generateRandomInteger(-1000,1001);
                var subtrahend = this.random.generateRandomInteger(-1000,1001);
                this.values.push(minuend);
                this.values.push(subtrahend);
                break;
            case 4:
                // include decimals from -1000 to 1000, same decimal places (up to 3).
                var round = this.random.generateRandomInteger(0,4);
                var minuend = this.random.generateRandomDecimal(-1000,1001,round);
                var subtrahend = this.random.generateRandomDecimal(-1000,1001,round);
                this.values.push(minuend);
                this.values.push(subtrahend);
                break;
            case 5:
                // Decimal places up to 4 and vary in length between values. May have 3 values.
                var boo = this.random.generateRandomBoolean();
                var numOfValues;
                if (boo) {
                    numOfValues = 2;
                }
                else {
                    numOfValues = 3;
                }
                while (numOfValues > 0) {
                    var round = this.random.generateRandomInteger(0, 5);
                    this.values.push(this.random.generateRandomDecimal(-1000, 10000, round));
                    numOfValues--;
                }
                break;
            default:
                break;
        }
    };

    this.generateParams();
};

var subObj = new subtract(3);

var showSolution = function(){
    document.getElementById("answer").innerHTML = subObj.printSolution();
};

var showQuestion = function(){
    document.getElementById("question").innerHTML = subObj.printQuestion();
};