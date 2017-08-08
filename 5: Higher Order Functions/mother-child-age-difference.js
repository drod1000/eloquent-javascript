import Ancestry from "./ancestry.js";
const ancestry = JSON.parse(Ancestry.ANCESTRY_FILE);

function average(array) {
    function plus(a,b) { return a + b };
    return array.reduce(plus) / array.length;
}

const byName = {};
ancestry.forEach(person => {
    byName[person.name] = person;
});

//Find the average age difference between mothers and children
function ageOfMother(person) {
    const mother = byName[person.mother];
    if(mother != undefined)
    {
        return person.born - mother.born;
    } else {
        return null;
    };
}

const averageAge = average(ancestry.map(ageOfMother).filter(age => age != null));
console.log(averageAge);
