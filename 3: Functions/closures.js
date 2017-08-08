//ES5
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

//ES6
function multiplier(factor) {
    return number => number * factor
}

//Frozen in time
var twice = multiplier(2);
//Calling function unfreezes it, giving it access to both the 2 and the 5
console.log(twice(5));
