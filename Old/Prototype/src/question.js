function Question(polynomial,var_info){
  this.polynomial = polynomial;
  this.var_info = var_info
  this.parser = new QuestionParser();

  this.solve = function(){
    return this.polynomial.solve(this.var_info);
  }

  this.toString = function(){
    return this.polynomial.toString();
  }

  this.parse = function(){
    //chose random, valid question ID
    //get q_components column
    // var t = text;
    // this.polynomial = parser.parsePolynomial(t);
    // get var info
    // var vi = text;
    // this.var_info = parser.parseVarInfo(vi);
    //COMPLETE
  }

  this.changeSkillLevel = function(){
    //if this.right + this.wrong > MAX_TIL_CHANGE
    // skilllevel = this.wrong/(this.right+this.wrong); (rounded to nearest .1)
  }
};
