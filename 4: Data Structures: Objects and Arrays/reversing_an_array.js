reverseArray = array => {
    newArray = []
    maxIndex = array.length - 1
    for(let i = 0; i <= maxIndex; i++) {
        newArray[maxIndex - i] = array[i]
    }
    return newArray
}

reverseArrayInPlace = array => {
    let copyArray = array.slice()
    for(let i = 0; i <= maxIndex; i++) {
        array[maxIndex - i] = copyArray[i]
    }
    return array
}

a = [1,2,3,4]
console.log(reverseArray(a))
console.log(a)
console.log(reverseArrayInPlace(a))
console.log(a)
