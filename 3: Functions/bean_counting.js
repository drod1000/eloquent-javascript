countBs = word => {
    return countChar(word, "B")
}

countChar = (word, char) => {
    let count = 0
    for(let i = 0; i < word.length; i++) {
        if(word.charAt(i) === char) {
            count++
        }
    }
    return count
}

console.log(countBs("not here"))
console.log(countBs("Baby"))
console.log(countBs("BaBy"))

console.log(countChar("not here", "B"))
console.log(countChar("Baby", "B"))
console.log(countChar("BaBy", "B"))
