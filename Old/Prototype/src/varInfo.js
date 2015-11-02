// holds the variable letters and their respective values.
function VarInfo(var_chars,var_values){
  this.var_chars = var_chars;
  this.var_values = var_values;

  this.getVarChars = function(){
    return this.var_chars;
  }

  this.getVarValues = function(){
    return this.var_values;
  }
}
