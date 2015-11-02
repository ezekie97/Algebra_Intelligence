function Power_Polynomial(components,exponent){
  this.components = components;
  this.exponent = exponent;
};

Power_Polynomial.prototype = Object.create(Polynomial.prototype);

Power_Polynomial.prototype.toString = function() {
  return "(" + Polynomial.prototype.toString.call(this) + ")"+(""+this.exponent).sup();
};

Power_Polynomial.prototype.solve = function(q_data){
  return Math.pow(Polynomial.prototype.solve.call(this,q_data),this.exponent);
};
