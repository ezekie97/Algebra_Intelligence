function QuestionParser(){

  this.parsePolynomial = function(text){
    var p = new Polynomial([]);
    return p;
  }

  this.parseTerm = function(text){
    var t = new Term(0,[],[]);
    return t;
  }

  this.parseVarInfo = function(text){
    var vi = new VarInfo([],[]);
  }
};
