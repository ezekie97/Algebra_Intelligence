function Random(){
    /**
     * @param x the lower value
     * @param y the higher value
     * @returns {number} a random integer x (inclusive) and y (exclusive).
     */
    this.generateRandomInteger = function(x,y){
        return Math.floor(Math.random()*(y-x)) + x;
    };

    /**
     * @param x the lower value
     * @param y the higher value
     * @param round the number of decimal places to round to.
     * @returns {number} a random decimal between x (inclusive) and y (exclusive).
     */
    this.generateRandomDecimal = function(x,y,round){
        return parseFloat((Math.random()*(y-x) + x).toFixed(round));
    };

    /**
     * @returns {boolean} a random boolean value
     */
    this.generateRandomBoolean = function(){
        var intVal = this.generateRandomInteger(0,2);
        return intVal == 1;
    };
}