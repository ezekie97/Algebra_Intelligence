/**
 * Determine all factors of a number or a certain amount if necessary.
 * @param num  The number, must be positive.
 * @param exclude An array of numbers to exclude from factoring.
 * @returns {*[]} An array of arrays that contains two factors of the number.
 */
var factorsOf = function(num,limit,exclude){
  var factors = [1]
  for(var i = 2; i <=num && factors.length < limit; i++){
    if(exclude.indexOf(i) === -1){ // value is not excluded.
      if(num%i === 0){ //is factor
        if(factors.indexOf(num/i) !== -1){
          //factors are repeating stop loop
          break;
        }
        else{
          factors.push(i);
        }
      }
    }
  }
  return factors;
}
