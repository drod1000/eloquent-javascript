arrayToList = array => {
    let list = null
    for(let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list}
    }
    return list
}

listToArray = list => {
    let array = []
    let index = 0
    while(list != null) {
        array[index] = list.value
        list = list.rest
        index++
    }
    return array
}

prepend = (element, list) => {
    list = {value: element, rest: list}
    return list
}

nth = (list, number) => {
    let position = 0
    var element = list
    while(position != number && element != null) {
        element = element.rest
        position++
    }
    if(element != null) {
        return element
    }
    else {
        return undefined
    }
}

console.log(arrayToList([1, 2, 3]))
console.log(listToArray({ value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }))

var list = {value: 2, rest: { value: 3, rest: null } }
console.log(prepend(1, list))

var list2 = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }
console.log(nth(list2, 1))
console.log(nth(list2, 3))
