const buttons = document.getElementsByTagName("button");
let X = []
let Y = []
let taken = []
let turn = 'X'
let gameOver = false

document.getElementById("turn").innerHTML = `Turn: ${turn}`

function hasWon(moves) {
    // Make a shallow copy of moves so original isn't mutated
    let copiedMoves = [...moves];

    let temp, temp_r, temp_c;
    if (copiedMoves.length > 3) {
        temp = copiedMoves.shift();
        temp_r = temp.split(' ')[0];
        temp_c = temp.split(' ')[1];
        console.log(temp);
        document.getElementById(temp).classList.add('gone-next');
    }

    // Extract rows and columns as arrays
    const row = copiedMoves.map(item => item.split(' ')[0]);
    const column = copiedMoves.map(item => item.split(' ')[1]);

    console.log(`Turn: ${turn} row: ${row} column: ${column}`);

    if (row[0] === row[1] && row[1] === row[2]) {
        return true;
    } else if (column[0] === column[1] && column[1] === column[2]) {
        return true;
    }

    return false;
}



function isOk(Id) {
    return !taken.includes(Id);
}

function putInArr(Id) {
    taken.push(Id);
    if (turn === 'X') {
        X.push(Id);
        turn = 'Y';
    } else {
        Y.push(Id);
        turn = 'X';
    }
}

function putSymbols() {
    for (let val of X) {
        document.getElementById(val).innerText = "X";
    }
    for (let val of Y) {
        document.getElementById(val).innerText = "O";
    }
}

function checkWin() {
    console.log(`${hasWon(X)} X has won`)
    if (hasWon(X)) {
        document.getElementById("turn").innerHTML = "X has Won!!!";
        gameOver = true;
    }
    else if (hasWon(Y)) {
        console.log(`${hasWon(Y)} Y has won`) ;
        document.getElementById("turn").innerHTML = "Y has Won!!!";
        gameOver = true;
    }
}

const buttonPressed = e => {
    if (gameOver) return; // prevent play after win

    let Id = e.target.id;
    if (isOk(Id)) {
        putInArr(Id);
        putSymbols();

        // Check win after updating the board
        if (X.length >= 3 || Y.length >= 3) {
            checkWin();
        }

        // Only update the turn text if no one has won yet
        if (!gameOver) {
            document.getElementById("turn").innerHTML = `Turn: ${turn}`;
        }
    }

    console.log(X, Y, taken);
}

for (let button of buttons) {
    button.addEventListener("click", buttonPressed);
}
