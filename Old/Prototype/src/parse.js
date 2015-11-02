/**
 * Created by Bill on 10/7/2015.
 */
  var parseTest = function(){
    var text = '{"components":[{"coefficient":2,"var_chars":[],"var_exps":[],"exp":1},"+",{"coefficient":2,"var_chars":[],"var_exps":[],"exp":1}]}';

    var obj = JSON.parse(text);
    alert(obj.components);
    var t1 = obj.components[0];
    var term = new Term(t1.coefficient,t1.var_chars,t1.var_exps,t1.exp);
    alert(term);
};
