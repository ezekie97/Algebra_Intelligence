/**
 * Created by Bill on 10/8/2015.
 */
// 2x
var termA = new Term(2,["x"],[1]);

//3y^2
var termB = new Term(3,["y"],[2]);

var plus = "+";

var components = [termA,plus,termB];

var p = new Polynomial(components);
var q_info = new VarInfo(["x","y"],[1,2]);

document.write(JSON.stringify(q_info));

var q = new Question(p,q_info);

//2 * 1 + 3 * 2 * 2 = 14
alert(q);
alert(q.solve());

