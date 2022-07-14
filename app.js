/* Creating a Tic Tac Toe game using the Module pattern
   Store the gameboard as an array inside of an array object
   Player's also stored in objects
   Wamt an object for controlling the flow of the game
   Set up HTML to render X's and O's
   3x3 grid where each element is a button
*/

// Player factory creates a player and its attributes, defines attributes and functions.

const Player = (givenUserName, gameLetter) => {
  let userName = givenUserName;
  let letter = gameLetter;

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
    set letter(newLetter) {
      letter = newLetter;
    },
  };
};

// Gameboard Module
//

const GameBoard = (() => {
  'use strict';
  let gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let filledSpaces = 0;
  const playerList = [Player("Player One", "X"), Player("Player Two", "O")];
  let curPlayer = 0;
  let winningRow = [-2,-2,-2];

  const resetGame = () => {
    filledSpaces = 0;
    gameArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  // Methods of victory: 3 horizontal, 3 vertical, 2 diagnoal
  const _boardFull = () => {
    return filledSpaces === gameArray[0].length * gameArray.length;
  };

  const _checkForWin = () => {
    // invariant: you will always be checking the current person's most recent move.
    const curLetter = playerList[curPlayer].letter


    // diagonal

    if (gameArray[0][2] === curLetter && gameArray[0][2] === curLetter && gameArray[0][2] === curLetter ) {
      console.log(`win!`);
      return [[0,2],[1,1],[2,0]]
    }
    if (gameArray[0][0] === curLetter && gameArray[0][0] === curLetter && gameArray[0][0] === curLetter) {
      console.log(`win!`);
      return [[0,0],[1,1],[2,2]]
    }

    // horizontal
    for (let i = 0; i < gameArray.length; i++) {
        if (gameArray[i][0] === curLetter && gameArray[i][1] === curLetter && gameArray[i][2] === curLetter) {
          console.log(`win!`);
          return [[i,0],[i,1],[i,2]]
        }
        if (gameArray[0][i] === curLetter && gameArray[1][i] === curLetter && gameArray[2][i] === curLetter) {
          console.log(`win!`);
          return [[0,i],[1,i],[2,i]]
        }
      }

    // vertical

    if (_boardFull()) {
      console.log(`tie!`);
      return [-1, -1, -1]; // Tied game
    }
    
    return [-2,-2,-2]; // incomplete game

  };

  const _placeLetterOnBoard = (x,y) => {
    if (gameArray[y][x] !== "") {
      return false;
    }

    gameArray[y][x] = playerList[curPlayer].letter;
    return true;
  };

  const move = (row, col) => {
    // Place Letter on Board
    const placeSuccess = _placeLetterOnBoard(row, col);
    if (!placeSuccess) {
      return false;
    }

    // Check to See If Win & Also If Tied
    winningRow = _checkForWin();
    console.log(`${winningRow}`);

    // If not win, swap players


      if (winningRow[0] === -2) {  
        curPlayer ^= 1  // XOR's curPlayer    
      }
    
    // return true = success, false = not placed on the board
    return true;
  };

  return {
    get winningRow() {
      return winningRow;
    },
    get curPlayer() {
      return curPlayer;
    },
    get gameArray() {
      return gameArray
    },
    move,
  };
})();

// displayController Module

const DisplayController = (() => {})();

