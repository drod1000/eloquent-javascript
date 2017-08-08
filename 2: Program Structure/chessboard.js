var chessboard = ""
var size = 8

for(let i = 1; i <= size; i++) {
    if(i % 2 == 1) {
        chessboard += ("# ").repeat(size / 2)
    }
    else {
        chessboard += (" #").repeat(size / 2)
    }
    chessboard += "\n"
}

console.log(chessboard)
