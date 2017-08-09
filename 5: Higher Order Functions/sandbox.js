const Ancestry = require("./ancestry.js");;
const ancestry = JSON.parse(Ancestry.ANCESTRY_FILE);

//Filter Demo
function filter(array, test) {
  const passed = [];
  for (let i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

console.log(filter(ancestry, person => person.born > 1900 && person.born < 1925));

//Built-In Filter
console.log(ancestry.filter(person => person.father == "Carel Haverbeke"));

//Map Demo
function map(array, transform) {
  const mapped = [];
  for (let i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}

const overNinety = ancestry.filter(person => person.died - person.born > 90);
console.log(map(overNinety, person => person.name));

//Built-In Map
console.log(overNinety.map(person => person.name));

//Reduce Demo
function reduce(array, combine, start) {
  let current = start;
  for (let i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));

//Built-In Reduce
console.log(ancestry.reduce((min, cur) => {
  if (cur.born < min.born) return cur;
  else return min;
}));

//Composability
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

console.log(average(ancestry.filter(male).map(age)));
console.log(average(ancestry.filter(female).map(age)));
