var termA = new Term(4,["x"],[1]);
var plus = "+";

var components = [termA,plus,termA];
var poly = new Polynomial(components);
var abs_poly = new Abs_Polynomial(components);


var abs_poly_JSON = {Abs_Polynomial : abs_poly};

alert(JSON.stringify(poly));
alert(JSON.stringify(abs_poly_JSON));

var z=  JSON.stringify(abs_poly_JSON);

var x =  JSON.parse(z);

alert(poly.constructor.name);
alert(abs_poly.constructor.name);
alert(termA.constructor.name);
alert(x.constructor.name);

