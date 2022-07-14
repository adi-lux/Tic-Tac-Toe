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
  };
};

// Gameboard Module

const GameBoard = (() => {
  let gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let filledSpaces = 0;
  const playerList = [Player("Player One", "X"), Player("Player Two", "O")];
  let curPlayer = 0;
  let winningRow = [-2, -2, -2];

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
    // invariant: you will always be checking the current person's most recent move.

    const curLetter = playerList[curPlayer].letter;

    if (
      gameArray[0][2] === curLetter &&
      gameArray[1][1] === curLetter &&
      gameArray[2][0] === curLetter
    ) {
      return [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }
    if (
      gameArray[0][0] === curLetter &&
      gameArray[1][1] === curLetter &&
      gameArray[2][2] === curLetter
    ) {
      return [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }

    for (let i = 0; i < gameArray.length; i++) {
      if (
        gameArray[i][0] === curLetter &&
        gameArray[i][1] === curLetter &&
        gameArray[i][2] === curLetter
      ) {
        return [
          [i, 0],
          [i, 1],
          [i, 2],
        ];
      }
      if (
        gameArray[0][i] === curLetter &&
        gameArray[1][i] === curLetter &&
        gameArray[2][i] === curLetter
      ) {
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

  const _placeLetterOnBoard = (x, y) => {
    if (gameArray[y][x] !== "") {
      return false;
    }

    gameArray[y][x] = playerList[curPlayer].letter;
    return true;
  };

  const move = (row, col) => {
    const placeSuccess = _placeLetterOnBoard(row, col);
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

  const changeName = (player, newName) => {
    if (player === 1) {
      playerList[0].userName = newName;
    } else {
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
    move,
    changeName,
    resetGame,
  };
})();

// displayController Module

const DisplayController = (() => {
  const clickBoardSetup = () => {};

  const initialize = () => {
    const CellList = document.querySelectorAll(".cell");
    let count = 0;
    CellList.forEach((cell) => {
      cell.id = `cell-${count}`;
      cell.addEventListener("click", () => {
        const row = Math.floor(cell.id.substring(5) / 3);
        const col = cell.id.substring(5) % 3;

        const curPlayerLetter = GameBoard.curPlayer.letter;
        const curPlayerName = GameBoard.curPlayer.userName;
        if (GameBoard.move(col, row)) {
          cell.innerHTML = `<span>${curPlayerLetter}</span>`;

          if (curPlayerLetter === "X") {
            const firstPlayer = document.getElementById(
              "first-playing-background"
            );
            const secondPlayer = document.getElementById(
              "second-playing-background"
            );
            secondPlayer.classList.add("current");
            firstPlayer.classList.remove("current");
          } else {
            const firstPlayer = document.getElementById(
              "first-playing-background"
            );
            const secondPlayer = document.getElementById(
              "second-playing-background"
            );
            firstPlayer.classList.add("current");
            secondPlayer.classList.remove("current");
          }
          const winnerArea = document.querySelector(".again-prompt");
          const winnerText = document.querySelector(".again-prompt h2");
          if (GameBoard.winningRow[0] === -1) {
            winnerArea.style.visibility = "visible";
            winnerText.textContent += "TIE!";
          } else if (GameBoard.winningRow[0] !== -2) {
            winnerArea.style.visibility = "visible";
            winnerText.textContent += `${curPlayerName} wins!`;
          }
        }
      });
      count++;
    });

    const firstButton = document.getElementById("one-submit");

    firstButton.addEventListener("click", (e) => {
      e.preventDefault();

      const newInput = document.getElementById("one-name");
      const newName = newInput.value;
      GameBoard.changeName(1, newName);

      const nameShow = document.querySelectorAll(".first-name");
      nameShow.forEach((name) => (name.textContent = `${newName} (X)`));
      newInput.value = "";
    });

    const secondButton = document.getElementById("two-submit");
    secondButton.addEventListener("click", (e) => {
      e.preventDefault();

      const newInput = document.getElementById("two-name");
      const newName = newInput.value;
      GameBoard.changeName(2, newName);

      const nameShow = document.querySelectorAll(".second-name");
      nameShow.forEach((name) => (name.textContent = `${newName} (O)`));
      newInput.value = "";
    });

    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", (e) => {
      const overlay = document.querySelector(".overlay");
      const first = document.querySelector(".player-one");
      const second = document.querySelector(".player-two");
      overlay.style.visibility = "hidden";
      first.style.visibility = "visible";
      second.style.visibility = "visible";
      const firstPlayer = document.getElementById("first-playing-background");
      firstPlayer.classList.add("current");
    });

    const restartButton = document.getElementById("again-button");
    restartButton.addEventListener("click", (e) => {
      const winnerArea = document.querySelector(".again-prompt");
      winnerArea.style.visibility = "hidden";
      GameBoard.resetGame();
      CellList.forEach((cell) => (cell.textContent = ""));
      const winnerText = document.querySelector(".again-prompt h2");
      winnerText.textContent = "Result: ";
    });
  };

  initialize();
})();
