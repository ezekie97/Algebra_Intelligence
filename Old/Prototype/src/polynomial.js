function Polynomial(components) {
  this.components = components;
};

Polynomial.prototype.toString = function(){
  var resultString = "";
  for(var i = 0; i < this.components.length; i++){
    resultString+=this.components[i];
  }
  return resultString;
};

Polynomial.prototype.solve = function(var_info){
    var resultString = "";
    for (var i = 0; i < this.components.length; i++) {
      var component = this.components[i];
      if (component instanceof Term || component instanceof Polynomial) {
        resultString += component.solve(var_info);
      }
      else { // op
        resultString += component;
      }
    }
    return eval(resultString);
};
