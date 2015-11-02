// "What are the roots of x^2 + 5x + 6"
// a root question
var rootFunc = function(skillLevel){
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.random = new Random();

    // print the question
    this.printQuestion = function(){
        var xSquaredText = "x<sup>2</sup>";
        var plus = " + ";
        var minus = " - ";
        var xText = "x";
        var aText;
        var bText;
        var cText;
        switch(this.a) {
            case 0:
                aText = "";
                break;
            case 1:
                aText = xSquaredText;
                break;
            default:
                aText = this.a + xSquaredText;
                break;
        }
        switch(this.b){
            case 0:
                bText = "";
                break;
            case 1:
                bText = xText;
                break;
            default:
                if(this.a == 0){
                    if(this.b < 0){
                        bText = Math.abs(this.b) + xText;
                    }
                    else{
                        bText = this.b + xText;
                    }
                }
                else{
                    if(this.b < 0){
                        bText = minus + Math.abs(this.b) + xText;
                    }
                    else{
                        bText = plus + this.b + xText;
                    }
                }
                break;
        }
        if(this.c == 0){
            cText = ""
        }
        else if(this.c < 0) {
            if(this.a == 0 && this.b == 0){
                cText = Math.abs(this.c);
            }
            else{
                cText = minus + Math.abs(this.c);
            }
        }
        else{
            if(this.a == 0 && this.b == 0){
                cText = Math.abs(this.c);
            }
            else{
                cText = plus + Math.abs(this.c);
            }
        }
        return "What are the roots of the quadratic polynomial " + aText + " " + bText + " " + cText;
    };

    // solve the quadratic polynomial
    this.solve = function(){
        var b_squared = Math.pow(this.b,2);
        var determinant = b_squared - 4 * this.a * this.c;
        var denominator = 2 * this.a;
        var solutions = [];
        solutions.push((-this.b - Math.sqrt(determinant))/denominator);
        solutions.push((-this.b + Math.sqrt(determinant))/denominator);
        return solutions;
    };

    //  print the solution
    this.printSolution = function(){
        var solutionString = "Roots: ";
        var solution = this.solve();
        for(var root in solution){
            if(solution.hasOwnProperty(root)){
                solutionString+= solution[root] + " ";
            }
        }
        return solutionString;
    };

    this.generateParams = function(){
        switch(skillLevel) {
            case 1:
                // a = 1 , b = 0, c = perfect square.
                // Form: (x^2 - c)
                this.a = 1;
                this.b = 0;
                var randomNum = this.random.generateRandomInteger(1,20);
                this.c = -1 * Math.pow(randomNum,2);
                break;
            case 2:
                // Using two roots r1 and r2.
                // a = 1, b = (r1 + r2) , c = (r1 * r2)
                // b and c must have opposite signs
                // r1 and r2 are relatively low integers (-10 to 10)
                this.a = 1;
                var r1 = this.random.generateRandomInteger(-10,10);
                var r2 = this.random.generateRandomInteger(-10,10);
                this.b = r1 + r2;
                this.c = r1 * r2;
                break;
            case 3:
                // Using two roots r1 and r2.
                // a = 1, b = (r1 + r2) , c = (r1 * r2)
                // b and c must have opposite signs
                // r1 and r2 are have higher values (-25 to 25)
                this.a = 1;
                r1 = this.random.generateRandomInteger(-25,25);
                r2 = this.random.generateRandomInteger(-25,25);
                this.b = r1 + r2;
                this.c = r1 * r2;
                break;
            case 4:
                // Quadratic Formula is necessary to solve.
                // a , b and c are all integers between -20 and 20.
                this.a = this.random.generateRandomInteger(-20,20);
                this.b = this.random.generateRandomInteger(-20,20);
                this.c = this.random.generateRandomInteger(-20,20);
                break;
            case 5:
                // Quadratic Formula is necessary to solve.
                // a, b and c are all decimals between -15 and 15.
                var round = this.random.generateRandomInteger(1,3);
                this.a = this.random.generateRandomDecimal(-15,15,round);

                round = this.random.generateRandomInteger(1,3);
                this.b = this.random.generateRandomDecimal(-15,15,round);

                round = this.random.generateRandomInteger(1,3);
                this.c = this.random.generateRandomDecimal(-15,15,round);
                break;
            default:
                break;
        }
    };
    this.generateParams();
};



//store the templates
//tests
var rootFuncText = ""+rootFunc;

var updatedRootFunc = function(){};
eval("updatedRootFunc  = "+rootFuncText);

var rootObj = new updatedRootFunc(5);

var showSolution = function(){
    document.getElementById("answer").innerHTML = rootObj.printSolution();
};

var showQuestion = function(){
    document.getElementById("question").innerHTML = rootObj.printQuestion();
};