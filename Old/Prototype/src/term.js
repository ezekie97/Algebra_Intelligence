/*
* Term class that has a coefficient and 0 or more
* letters representing variables.
* @param {number} coefficient the numeric value of the variables coefficient.
* @param {Array.<String>} var_chars an array of 0 or more strings representing the letters used for variables. Each
*   string should only be one character long. If a string is longer, only the first character will be used.
* @param {Array.<number>} var_values an array of 0 or more numbers representing the numeric values of the variables. The
*   order of these numbers should correspond with the order of the letters.
* @param {Array.<number>} var.values an array of 0 or more numbers representing the numeric values of the exponents of
*   the variables. The order of these should correspond with the order of the letters.
* @constructor
*
* */
function Term(coefficient,var_chars,var_exps) {
  this.coefficient = coefficient;
  this.var_chars = var_chars;
  this.var_exps = var_exps;

  this.solve = function(var_info){
    var result = this.coefficient;
    var var_info_chars = var_info.getVarChars();
    var var_info_values = var_info.getVarValues();

    for(var i = 0; i < this.var_chars.length;i++){
      var character = this.var_chars[i];
      var char_pos = var_info_chars.indexOf(character);
      var var_value = var_info_values[char_pos];
      result*=Math.pow(var_value,this.var_exps[i]);
    }
    return result;
  };

  /*
  * @return{string}
  */
  this.toString = function() {
    var resultString = "" + this.coefficient;
    for (var i = 0; i < this.var_chars.length; i++) {
      // only take the first character of the string.
        resultString += this.var_chars[i];

      if (this.var_exps[i] != 1) {
        resultString += (""+this.var_exps[i]).sup();
      }
    }
      return resultString;
  };

 /* // take another term and check if both terms are like terms.
  this.isLikeTerm = function(term) {
      if(term instanceof Term){
        if(term.var_chars.equals(this.var_chars) && term.var_exps.equals(this.var_exps)){
         return true;
       }
      }
      return false;
  }*/
}

