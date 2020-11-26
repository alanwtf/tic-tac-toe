const displayController = (function () {
    const X_CLASS = "x";
    const O_CLASS = "o";
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById("gameboard");
    const winningMessage = document.getElementById("winning-message");
    const winningTextMessage = document.querySelector("[data-winning-message-text]");
    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", startGame);
    let player1 = null;
    let player2 = null;
    const player1div = document.querySelector(".player-1");
    const player2div = document.querySelector(".player-2");
    const player1btn = player1div.querySelector(".btn");
    const player2btn = player2div.querySelector(".btn");
    
    player1btn.addEventListener("click", () => player1 = createPlayer(player1div));
    player2btn.addEventListener("click", () => player2 = createPlayer(player2div));
    
    function createPlayer(player){
        let newPlayer = Player(player.querySelector("input").value);
        player.querySelector("h2").innerHTML = newPlayer.name;
        return newPlayer;
    }

    function handleClick(e) {
        //place mark
        const cell = e.target;
        const currentClass = gameboard.getXturn() ? X_CLASS : O_CLASS;
        placeMark(cell, currentClass);
        //check for win / draw 
        if (gameboard.checkWin(currentClass)) {
            endGame(false);
        } else if (gameboard.isDraw()) {
            endGame(true);
        } else {
            gameboard.swapTurns();
            setBoardHoverClass();
        }
    }

    const placeMark = function (cell, currentClass) {
        cell.classList.add(currentClass);
    }

    const setBoardHoverClass = function () {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        player1div.classList.remove("your-turn");
        player2div.classList.remove("your-turn");
        console.log(gameboard.getXturn());
        if (gameboard.getXturn()) {
            board.classList.add(X_CLASS);
            player1div.classList.add("your-turn");
        } else {
            board.classList.add(O_CLASS);
            player2div.classList.add("your-turn");
        }
    }

    const endGame = function (draw) {
        if (draw) {
            winningMessage.classList.add("show");
            winningTextMessage.innerHTML = `It's a draw!`;
        } else {
            winningMessage.classList.add("show");
            winningTextMessage.innerHTML = `${gameboard.getXturn() ? player1.name : player2.name} wins!`;
            gameboard.getXturn() ? addWinToDOM(player1div, player1) : addWinToDOM(player2div, player2);
        }
    }

    function startGame() {
        gameboard.setXturn(true);
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true })
        });
        setBoardHoverClass();
        winningMessage.classList.remove("show");
    }

    function addWinToDOM(player, playerObj){
        player.querySelector("#p-wins").innerHTML = playerObj.addWin();
    }

    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    return {
        cellElements,
        startGame,
        X_CLASS,
        O_CLASS,
        getPlayer1,
        getPlayer2
    }

})();

const Player = (name) =>{
    let winCount = 0;
    const addWin = () => ++winCount;

    return{
        addWin,
        name
    }
}

const gameboard = (function (cellElements) {
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

    let xTurn = true;

    const getXturn = () => xTurn;

        function setXturn(value) {
            xTurn = value;
        }

    const checkWin = function (currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }

    const isDraw = function () {
        return [...cellElements].every(cell => {
            return cell.classList.contains(displayController.X_CLASS) || cell.classList.contains(displayController.O_CLASS);
        });
    }

    const swapTurns = function () {
        xTurn = !xTurn;
    }

    return {
        checkWin,
        isDraw,
        swapTurns,
        getXturn,
        setXturn
    }

})(displayController.cellElements);



displayController.startGame();