// Prototype of the Questions and Their Types.
//Create the Default Questions (Polynomials and Var Values First)

var termA = new Term(4,["x","y"],[1,1]); //4xy
var termB = new Term(3,["y"],[2]);       // 3y^2
var termC = new Term(2,[],[]);           // 2

var plus = "+";
var minus = "-";
var mult = "*";
var divide = "/";

var var_info = new VarInfo(["x","y"],[2,3]); //x = 2 , y = 3.

var plus_polynomial = new Polynomial([termA,plus,termB]); //4xy + 3y^2
var minus_polynomial = new Polynomial([termA,minus,termC]); // 4xy - 2
var mult_polynomial = new Polynomial([termB,mult,termC]); // 3y^2 * 2
var div_polynomial = new Polynomial([termA, divide, termC]); //4xy / 2

var abs_polynomial = new Abs_Polynomial([termA, minus, termB]); // |4xy - 3y^2|
var power_polynomial = new Power_Polynomial([termA,plus,termC],2); //(4xy + 2)^2

//| 2 - (4xy - 3y^2)^2|
var mixed_polynomial = new Abs_Polynomial([termC,minus,new Power_Polynomial([termA, minus, termB],2)]);

var comparison_polynomial = new Polynomial([termC, "<", termA]);

var display = function(){
  document.getElementById("prob_add").innerHTML = plus_polynomial.toString();
  document.getElementById("prob_sub").innerHTML = minus_polynomial.toString();
  document.getElementById("prob_mult").innerHTML = mult_polynomial.toString();
  document.getElementById("prob_div").innerHTML = div_polynomial.toString();
  document.getElementById("prob_abs").innerHTML = abs_polynomial.toString();
  document.getElementById("prob_power").innerHTML = power_polynomial.toString();
  document.getElementById("prob_mixed").innerHTML = mixed_polynomial.toString();
  document.getElementById("prob_comp").innerHTML = comparison_polynomial.toString();
}


var solveAdd = function(){
  document.getElementById("prob_add").innerHTML += "<br>" +plus_polynomial.solve(var_info);
  document.getElementById("add_button").style.visibility = "hidden";
};

var solveSub = function(){
  document.getElementById("prob_sub").innerHTML += "<br>" +minus_polynomial.solve(var_info);
  document.getElementById("sub_button").style.visibility = "hidden";
};

var solveMult = function(){
  document.getElementById("prob_mult").innerHTML += "<br>" +mult_polynomial.solve(var_info);
  document.getElementById("mult_button").style.visibility = "hidden";
};

var solveDiv = function(){
  document.getElementById("prob_div").innerHTML += "<br>" +div_polynomial.solve(var_info);
  document.getElementById("div_button").style.visibility = "hidden";
};

var solveAbs = function(){
  document.getElementById("prob_abs").innerHTML += "<br>" + abs_polynomial.solve(var_info);
  document.getElementById("abs_button").style.visibility = "hidden";
};

var solvePower = function(){
  document.getElementById("prob_power").innerHTML += "<br>" +power_polynomial.solve(var_info);
  document.getElementById("power_button").style.visibility = "hidden";
};

var solveMixed = function(){
  document.getElementById("prob_mixed").innerHTML += "<br>" +mixed_polynomial.solve(var_info);
  document.getElementById("mixed_button").style.visibility = "hidden";
};

var solveComp = function(){
  document.getElementById("prob_comp").innerHTML += "<br>" +comparison_polynomial.solve(var_info);
  document.getElementById("comp_button").style.visibility = "hidden";
};



