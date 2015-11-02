
// 2x
var termA = new Term(2,["x"],[1]);

//3y^2
var termB = new Term(3,["y"],[2]);

var plus = "+";

var components = [termA,plus,termB];

var var_info = new Object();
var_info.x = 1;
var_info.y = 5;


//2x + 3y^2
var polynomial = new Polynomial(components);
alert(polynomial);
alert(polynomial.solve(var_info)); // 2 + 75 = 77


// test with absolute value
var minus = "-";

components[1] = minus;

//| 2x - 3y^2 |
var abs_polynomial = new Abs_Polynomial(components)
//(abs_polynomial);
//alert(abs_polynomial.solve(var_info)); //| 2 - 75 | = 73

components[1] = plus;
components[2] = termA;

//(2x + 2x) ^ 2
var power_polynomial = new Power_Polynomial(components,2);
//alert(power_polynomial);
//alert(power_polynomial.solve(var_info)); // (2 + 2)^2 = 16


//Mixing Polynomial Types (abs and power)
components[1] = minus;
components[2] = termB;

var power_abs_polynomial = new Power_Polynomial([new Abs_Polynomial(components)],2);
alert(power_abs_polynomial);
alert(power_abs_polynomial.solve(var_info)); // (|2-75|)^2 = 5329

