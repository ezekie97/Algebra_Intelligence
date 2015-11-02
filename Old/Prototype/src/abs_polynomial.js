function Abs_Polynomial(components){
  this.components = components;
};

Abs_Polynomial.prototype = Object.create(Polynomial.prototype);
Abs_Polynomial.prototype.toString = function() {
  return "|" + Polynomial.prototype.toString.call(this) + "|";
};
Abs_Polynomial.prototype.solve = function(q_data){
  return Math.abs(Polynomial.prototype.solve.call(this,q_data));
};
