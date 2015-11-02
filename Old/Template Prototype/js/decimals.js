var isFloat = function(number){
    return number % 1 !== 0;
};


var decimalPlaces = function(number){
    if(!isFloat(number)){
        return 0;
    }
    else{
        var numString = number.toString();
        return numString.split('.')[1].length;
    }
}