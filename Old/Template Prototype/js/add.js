var add = function(skillLevel) {
    this.values = [];
    this.op = "+";
    this.random = new Random();

    this.printQuestion = function () {
        var questionString = "What is ";
        for (var i = 0; i < this.values.length; i++) {
            questionString += this.values[i];
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
                // low positive integers (< 100), only 2 numbers.
                var numOfValues = 2;
                while (numOfValues > 0) {
                    this.values.push(this.random.generateRandomInteger(0, 99));
                    numOfValues--;
                }
                break;
            case 2:
                // include 3 digit integers, all positive, may have 3 numbers to add.
                var numberOfValuesPercentage = this.random.generateRandomInteger(0, 101);
                var numOfValues = 2;
                if (numberOfValuesPercentage > 80) {
                    numOfValues = 3;
                }
                while (numOfValues > 0) {
                    this.values.push(this.random.generateRandomInteger(0, 999));
                    numOfValues--;
                }
                break;
            case 3:
                // Up to 3 digit decimals (up to 2 places all have
                // same length), positive, may have 3 numbers to add.
                // Negative integer problems introduced as well (2 values only, 3 digit max).
                var useNegatives = this.random.generateRandomBoolean();
                if (useNegatives) {
                    this.values.push(this.random.generateRandomInteger(-999, -1));
                    this.values.push(this.random.generateRandomInteger(-999, 999))
                }
                else {
                    var numOfValues = this.random.generateRandomInteger(2, 4);
                    var round = this.random.generateRandomInteger(1, 3);
                    while (numOfValues > 0) {
                        this.values.push(this.random.generateRandomDecimal(0, 999, round));
                        numOfValues--;
                    }
                }
                break;
            case 4:
                // Positive and Negative Decimals up to three digits of varying decimal length (1 up to 4 decimal places).
                // Mostly 3 terms, but 2 can happen.
                var numberOfValuesPercentage = this.random.generateRandomInteger(0, 101);
                var numOfValues;
                if (numberOfValuesPercentage > 80) {
                    numOfValues = 2;
                }
                else {
                    numOfValues = 3;
                }
                while (numOfValues > 0) {
                    var round = this.random.generateRandomInteger(0, 5);
                    this.values.push(this.random.generateRandomDecimal(-999, 1000, round));
                    numOfValues--;
                }
                break;
            case 5:
                // 50 | 50 Chance of getting 4 or 3 terms (never 2). Positive and Negative Decimals(2 to 4 length)
                // of varying lengths. 4 digit numbers
                var boo = this.random.generateRandomBoolean();
                var numOfValues;
                if (boo) {
                    numOfValues = 3;
                }
                else {
                    numOfValues = 4;
                }
                while (numOfValues > 0) {
                    var round = this.random.generateRandomInteger(2, 5);
                    this.values.push(this.random.generateRandomDecimal(-9999, 10000, round));
                    numOfValues--;
                }
                break;
            default:
                break;
        }
    };

    this.generateParams();
};

var addObj = new add(5);

var showSolution = function(){
    document.getElementById("answer").innerHTML = addObj.printSolution();
};

var showQuestion = function(){
    document.getElementById("question").innerHTML = addObj.printQuestion();
};