function Random(){
    /**
     * @param x the lower value
     * @param y the higher value
     * @returns {number} a random integer x (inclusive) and y (exclusive).
     */
    this.generateRandomInteger = function(x,y){
        return Math.floor(Math.random()*((y+1)-x)) + x;
    };

  /**
   * Generate a non-zero integer.
   * @param y The absolute value of the highest and lowest possible choices.
   * @returns {number} any number between -y  and  y inclusive that is not 0.
   */
    this.generateRandomNonZeroInteger = function(y){
        var result = this.generateRandomInteger(1,y);
        if(this.generateRandomBoolean()){
          return -result;
        }
        return result;
    }

  /**
   * Generate a non-zero integer within a range of values.
   * @param y The absolute value of the highest and lowest possible choices.
   * @returns {number} any number between -x and -y  or  x and y inclusive that is not 0.
   */
  this.generateRandomNonZeroIntegerInRange = function(x,y){
    var result = this.generateRandomInteger(x,y);
    if(this.generateRandomBoolean()){
      return -result;
    }
    return result;
  }

  /**
   * Generate a non-zero decimal.
   * @param y The absolute value of the highest and lowest possible choices.
   * @param round The number of decimal places tobe rounded to.
   * @returns {number} any number between -y  and  y inclusive that is not 0.
   */
  this.generateRandomNonZeroDecimal = function(y,round){
    var result = this.generateRandomDecimal(1,y,round);
    if(this.generateRandomBoolean()){
      return -result;
    }
    return result;
  }

    /**
     * @param x the lower value
     * @param y the higher value
     * @param round the number of decimal places to round to.
     * @returns {number} a random decimal between x (inclusive) and y (inclusive).
     */
    this.generateRandomDecimal = function(x,y,round){
        return parseFloat((Math.random()*((y+1)-x) + x).toFixed(round));
    };

    /**
     * @returns {boolean} a random boolean value
     */
    this.generateRandomBoolean = function(){
        var intVal = this.generateRandomInteger(0,1);
        return intVal == 1;
    };
}
