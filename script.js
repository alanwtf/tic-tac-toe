const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("gameboard");
const winningMessage = document.getElementById("winning-message");
const winningTextMessage = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restart");
let xTurn = true;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    winningMessage.classList.remove("show");
}

function handleClick(e) {
    //place mark
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    //check for win
    
    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else{
        swapTurns();
        setBoardHoverClass();
    }
    //check for draw

    //switch turns
    
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
    
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (xTurn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(O_CLASS);
    }
}

function checkWin(currentClass) {
    console.log("im in");
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    });
}

function endGame(draw){
    if(draw){
        winningMessage.classList.add("show");
        winningTextMessage.innerHTML = `It's a draw!`
    } else {
        winningMessage.classList.add("show");
        winningTextMessage.innerHTML = `${xTurn? "X":"O"} wins!`
    }
}


