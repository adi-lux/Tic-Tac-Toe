/* Creating a Tic Tac Toe game using the Module pattern
   Store the gameboard as an array inside of an array object
   Player's also stored in objects
   Wamt an object for controlling the flow of the game
   Set up HTML to render X's and O's
   3x3 grid where each element is a button
*/

// Player factory creates a player and its attributes, defines attributes and functions.

const Player = (givenUserName, gameLetter) => {
  let isTurn = false;
  let isWinner = false;
  let userName = givenUserName;
  let letter = gameLetter;

  const toggleTurn = () => (isTurn = !isTurn);

  const toggleWinner = () => (isWinner = !isWinner);

  return {
    get isTurn() {
      return isTurn;
    },
    get isWinner() {
      return isWinner;
    },
    get userName() {
      return userName;
    },
    get letter() {
      return letter;
    },
    set userName(newUserName) {
      userName = newUserName;
    },
    toggleTurn,
    toggleWinner,
  };
};

// Gameboard Module

const GameBoard = (() => {
  let gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  // 2 players, they both choose their own stuff


})();

// displayController Module

const DisplayController = (() => {

})();
