// 4 x^2 y
var term = new Term(4,["x","y"],[2,1]);
alert(term);

// x = 2, y = 3
var var_data = new Object;
var_data.x = 2;
var_data.y = 3;
alert(term.solve(var_data));

var termA = new Term(5,["x"],[1]);
var termB = new Term(4,["x"],[1]);
var termC = new Term(4,["x","y"],[2]);
var termD = new Term(4,["x","y"],[1,1]);
var termE = new Term(4,["x","y"],[1,2]);

alert(termA.isLikeTerm(termB)); //true
alert(termA.isLikeTerm(termC)); // false
alert(termD.isLikeTerm(termE)); // false

