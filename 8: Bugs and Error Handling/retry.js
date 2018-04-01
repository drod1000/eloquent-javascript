function MultiplicatorUnitFailure(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}

function primitiveMultiply(a, b) {
  var random = Math.random() * 2;
  if (random > 1) {
    return a * b;
  }
  throw new MultiplicatorUnitFailure('Clunky function failed');
}

try {
  console.log(primitiveMultiply(3, 5));
} catch (e) {
  if (e instanceof MultiplicatorUnitFailure) {
    console.log('Clunky function failed. Please try again. You have a 50% shot of success.');
  } else {
    throw e;
  }
}