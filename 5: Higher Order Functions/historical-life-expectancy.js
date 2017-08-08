import Ancestry from "./ancestry.js";
const ancestry = JSON.parse(Ancestry.ANCESTRY_FILE);

function average(array) {
    function plus(a,b) { return a + b };
    return array.reduce(plus) / array.length;
}

function centuryLivedIn(person) {
    return Math.ceil(person.died / 100)
}

//Regular Grouping
let centuryAges = {};

ancestry.forEach(person => {
    let century = centuryLivedIn(person);
    let age = person.died - person.born;

    if(centuryAges[century] == undefined) {
        centuryAges[century] = [age];
    }
    else {
        centuryAges[century].push(age);
    }
});

Object.keys(centuryAges).forEach(century => {
    console.log(`${century}: ${average(centuryAges[century])}`);
})

//Abstracted GroupBy
function groupBy(arr, callback) {
    object = {};
    for(let i = 0; i < arr.length; i++) {
        let group = callback(arr[i]);
        if(object[group] == undefined) {
            object[group] = [arr[i]];
        }
        else {
            object[group].push(arr[i]);
        }
    };
    return object;
}

const peopleByCentury = groupBy(ancestry, centuryLivedIn);

function getAge(person) {
    return person.died - person.born;
}

Object.keys(peopleByCentury).forEach(century => {
    console.log(`${century}: ${average(peopleByCentury[century].map(getAge))}`);
})
