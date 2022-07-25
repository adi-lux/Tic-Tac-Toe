/* Creating a Tic Tac Toe game using the Module pattern
   Store the gameboard as an array inside of an array object
   Player's also stored in objects
   Wamt an object for controlling the flow of the game
   Set up HTML to render X's and O's
   3x3 grid where each element is a button
*/
var Player = function (givenUserName, gameLetter) {
    var userName = givenUserName;
    var letter = gameLetter;
    return {
        get userName() {
            return userName;
        },
        get letter() {
            return letter;
        },
        set userName(newUserName) {
            userName = newUserName;
        },
    };
};
// Gameboard Module
var GameBoard = (function () {
    var gameArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    var filledSpaces = 0;
    var playerList = [
        Player('Player One', 'X'),
        Player('Player Two', 'O'),
    ];
    var curPlayer = 0;
    var winningRow = [-2, -2, -2];
    var resetGame = function () {
        filledSpaces = 0;
        gameArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    };
    var _boardFull = function () {
        return filledSpaces === gameArray[0].length * gameArray.length;
    };
    var _checkForWin = function () {
        // invariant: you will always be checking the current person's most recent move.
        var curLetter = playerList[curPlayer].letter;
        if (gameArray[0][2] === curLetter &&
            gameArray[1][1] === curLetter &&
            gameArray[2][0] === curLetter) {
            return [
                [0, 2],
                [1, 1],
                [2, 0],
            ];
        }
        if (gameArray[0][0] === curLetter &&
            gameArray[1][1] === curLetter &&
            gameArray[2][2] === curLetter) {
            return [
                [0, 0],
                [1, 1],
                [2, 2],
            ];
        }
        for (var i = 0; i < gameArray.length; i++) {
            if (gameArray[i][0] === curLetter &&
                gameArray[i][1] === curLetter &&
                gameArray[i][2] === curLetter) {
                return [
                    [i, 0],
                    [i, 1],
                    [i, 2],
                ];
            }
            if (gameArray[0][i] === curLetter &&
                gameArray[1][i] === curLetter &&
                gameArray[2][i] === curLetter) {
                return [
                    [0, i],
                    [1, i],
                    [2, i],
                ];
            }
        }
        if (_boardFull()) {
            return [-1, -1, -1]; // Tied game
        }
        return [-2, -2, -2]; // incomplete game
    };
    var _placeLetterOnBoard = function (x, y) {
        if (gameArray[y][x] !== '') {
            return false;
        }
        gameArray[y][x] = playerList[curPlayer].letter;
        return true;
    };
    var move = function (row, col) {
        var placeSuccess = _placeLetterOnBoard(row, col);
        if (!placeSuccess) {
            return false;
        }
        filledSpaces += 1;
        winningRow = _checkForWin();
        if (winningRow[0] === -2) {
            // Game in Progress
            curPlayer ^= 1;
        }
        return true;
    };
    var changeName = function (player, newName) {
        if (player === 1) {
            playerList[0].userName = newName;
        }
        else {
            playerList[1].userName = newName;
        }
    };
    return {
        get winningRow() {
            return winningRow;
        },
        get curPlayer() {
            return playerList[curPlayer];
        },
        get gameArray() {
            return gameArray;
        },
        move: move,
        changeName: changeName,
        resetGame: resetGame,
    };
})();
// displayController Module
var DisplayController = (function () {
    var initialize = function () {
        var CellList = document.querySelectorAll('.cell');
        var count = 0;
        CellList.forEach(function (cell) {
            cell.id = "cell-".concat(count);
            cell.addEventListener('click', function () {
                var row = Math.floor(cell.id.substring(5) / 3);
                var col = cell.id.substring(5) % 3;
                var curPlayerLetter = GameBoard.curPlayer.letter;
                var curPlayerName = GameBoard.curPlayer.userName;
                if (GameBoard.move(col, row)) {
                    cell.innerHTML = "<span>".concat(curPlayerLetter, "</span>");
                    if (curPlayerLetter === 'X') {
                        var firstPlayer = document.getElementById('first-playing-background');
                        var secondPlayer = document.getElementById('second-playing-background');
                        secondPlayer.classList.add('current');
                        firstPlayer.classList.remove('current');
                    }
                    else {
                        var firstPlayer = document.getElementById('first-playing-background');
                        var secondPlayer = document.getElementById('second-playing-background');
                        firstPlayer.classList.add('current');
                        secondPlayer.classList.remove('current');
                    }
                    var winnerArea = document.querySelector('.again-prompt');
                    var winnerText = document.querySelector('.again-prompt h2');
                    if (GameBoard.winningRow[0] === -1) {
                        winnerArea.style.visibility = 'visible';
                        winnerText.textContent += 'TIE!';
                    }
                    else if (GameBoard.winningRow[0] !== -2) {
                        winnerArea.style.visibility = 'visible';
                        winnerText.textContent += "".concat(curPlayerName, " wins!");
                    }
                }
            });
            count++;
        });
        var firstButton = document.getElementById('one-submit');
        firstButton.addEventListener('click', function (e) {
            e.preventDefault();
            var newInput = document.getElementById('one-name');
            var newName = newInput.value;
            GameBoard.changeName(1, newName);
            var nameShow = document.querySelectorAll('.first-name');
            nameShow.forEach(function (name) { return (name.textContent = "".concat(newName, " (X)")); });
            newInput.value = '';
        });
        var secondButton = document.getElementById('two-submit');
        secondButton.addEventListener('click', function (e) {
            e.preventDefault();
            var newInput = document.getElementById('two-name');
            var newName = newInput.value;
            GameBoard.changeName(2, newName);
            var nameShow = document.querySelectorAll('.second-name');
            nameShow.forEach(function (name) { return (name.textContent = "".concat(newName, " (O)")); });
            newInput.value = '';
        });
        var startButton = document.querySelector('.start-button');
        startButton.addEventListener('click', function (e) {
            var overlay = document.querySelector('.overlay');
            var first = document.querySelector('.player-one');
            var second = document.querySelector('.player-two');
            overlay.style.visibility = 'hidden';
            first.style.visibility = 'visible';
            second.style.visibility = 'visible';
            var firstPlayer = document.getElementById('first-playing-background');
            firstPlayer.classList.add('current');
        });
        var restartButton = document.getElementById('again-button');
        restartButton.addEventListener('click', function (e) {
            var winnerArea = document.querySelector('.again-prompt');
            winnerArea.style.visibility = 'hidden';
            GameBoard.resetGame();
            CellList.forEach(function (cell) { return (cell.textContent = ''); });
            var winnerText = document.querySelector('.again-prompt h2');
            winnerText.textContent = 'Result: ';
        });
    };
    initialize();
})();
