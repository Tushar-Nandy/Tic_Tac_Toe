const buttons = document.getElementsByTagName("button");
let gameOver = false;
let turn = 'X';
let X = []
let Y = []
let taken = []

function resetGame() {
    // Clear data
    gameOver = false;
    turn = 'X';
    X = [];
    Y = [];
    taken = [];

    // Clear UI
    for (let button of buttons) {
        button.innerText = '';
        button.classList.remove("gone-next");
    }

    // Reset turn display
    document.getElementById('turn').innerHTML = `Turn: ${turn}`;
}

function isReverseDiagonal(moves){
    const diagonal = ['1 3', '2 2', '3 1']
    let count = 0
    for(let move of moves){
        if(diagonal.includes(move)){
            count = count + 1
        }
    }
    if(count == 3) return true;
    return false;
}

function isDiagonal(moves){
    const diagonal = ['1 1','2 2','3 3']
    let count = 0
    for(let move of moves){
        if(diagonal.includes(move)){
            count = count + 1
        }
    }
    if(count == 3) return true;
    else return isReverseDiagonal(moves);
}

function winCondition(moves){
    const rows = moves.map(item => item.split(" ")[0])
    const columns = moves.map(item => item.split(" ")[1])
    let r1 = 0
    let r2 = 0
    let r3 = 0
    let c1= 0,c2 = 0,c3 =0
    console.log(`Turn: ${turn} row: ${rows} column = ${columns}`)
    for (let r of rows){
        if(r == 1) r1 = r1 + 1;
        else if(r == 2) r2= r2+1;
        else if (r == 3) r3= r3+1;
    }
    for (let c of columns){

        if(c == 1) c1= c1+1;
        else if(c == 2)c2= c2+1;
        else if (c == 3) c3=c3+1;
    }
    if (r1 == 3 || r2 == 3 || r3 == 3) {
        gameOver = true;
        return true;}

    if (c1 == 3 || c2 == 3 ||c3 == 3){
        gameOver = true;
         return true;}

    if(isDiagonal(moves)){
        gameOver = true;
        return true
    }
    return false

}

function hasWon(moves){
    let temp
    if( moves.length == 3){
        temp = moves[0];
        document.getElementById(temp).classList.add("gone-next")
        winCondition(moves)
    }else{
        temp = moves[0];
        document.getElementById(temp).classList.add("gone-next")
        console.log(winCondition(moves))
        if (!winCondition(moves)){
            document.getElementById(temp).classList.remove("gone-next")
            document.getElementById(temp).innerText = ""
            if (turn == 'X'){
            let x_idx = X.indexOf(temp) 
            let idx = taken.indexOf(temp)
            X.splice(x_idx,1)
            taken.splice(idx,1)
            }
            else{
                let y_idx = Y.indexOf(temp) 
            let idx = taken.indexOf(temp)
            Y.splice(y_idx,1)
            taken.splice(idx,1)
            }
        }
    
    }
}
function display(){
    
    for (let val of X){
        document.getElementById(val).innerText = 'X';
    }
    for (let val of Y) {
        document.getElementById(val).innerText = "O";
    }
}
function isOk(Id){
    return !taken.includes(Id)
}
function putSymbols(Id){
    taken.push(Id)
    if (turn == 'X') {
        X.push(Id);
    }
    else {Y.push(Id);
    }
    if (X.length >= 3) hasWon(X);
    if (Y.length >= 3) hasWon(Y);
    display()
}
const buttonPressed = e =>{
    if(gameOver){
        return;
    }
    let Id = e.target.id;
    if (isOk(Id)){
        putSymbols(Id);
        if (turn == 'X') turn = 'Y';
        else turn = 'X';
    }
    if (taken.length >= 9 && !gameOver) {
        document.getElementById('turn').innerHTML = "It's a draw!";
        gameOver = true;
    }
    if (gameOver) {
        document.getElementById('turn').innerHTML = `${turn === 'X' ? 'Y' : 'X'} has won!!!`
        const winner = turn==='X'?'Y' : 'X'
        setTimeout(() => {
            const restart = confirm(`${winner} has won! Do you want to play again?`);
            if (restart) {
                resetGame();
            }
        }, 100); // slight delay so the final move and message are visible before prompt
        return;
    } else {
        document.getElementById('turn').innerHTML = `Turn: ${turn}`
    }

}



document.getElementById('turn').innerHTML = `Turn: ${turn}`

for (let button of buttons){
    button.addEventListener("click",buttonPressed)
}