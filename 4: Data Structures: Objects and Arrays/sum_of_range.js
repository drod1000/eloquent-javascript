range = (start, end, step = 1) => {
    array = []
    let index = 0
    if(start > end && step == 1) {
        step = -1
    }
    if(step >= 1)  {
        for(let i = start; i <= end; i+= step) {
            array[index] = i
            index++
        }
    }
    else {
        for(let i = start; i >= end; i+= step) {
            array[index] = i
            index++
        }
    }
    return array
}

sum = array => {
    total = 0
    for(let i = 0; i < array.length; i++) {
        total += array[i]
    }
    return total
}

console.log(sum(range(1,10)))
console.log(range(1, 10, 2))
console.log(range(5, 2, -2))
console.log(range(5,2))
