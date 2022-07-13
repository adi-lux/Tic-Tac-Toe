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
  let gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let filledSpaces = 0;
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");
  let curPlayer = playerOne;

  const resetGame = () => {
    filledSpaces = 0;
    gameArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const _boardFull = () => {
    return filledSpaces === gameArray[0].length * gameArray.length;
  };

  const _checkForWin = () => {
    // diagonal

    // horizontal

    // vertical

    if (_boardFull()) {
      return Tie;
    }
  };

  const _placeLetterOnBoard = (row, col) => {};

  const move = (row, col) => {
    // Place Letter on Board
    const placeSuccess = _placeLetterOnBoard(row, col);
    if (!placeSuccess) {
      return false;
    }
    // Check to See If Win & Also If Tied
    const playerSuccess = _checkForWin();

    // If not win, swap players

    if (!playerSuccess) {
      if (curPlayer === playerOne) {
        curPlayer = playerTwo;
      }
      if (curPlayer === playerTwo) {
        curPlayer = playerOne;
      }
    }

    // return true = success, false = not placed on the board
    return true;
  };

  return { move };
})();

// displayController Module

const DisplayController = (() => {})();
