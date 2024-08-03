class PlayedPiece {
  constructor(cell) {
    this.cell = cell;
  }
}

class Game {
  constructor() {
    this.message = document.getElementById("message");
    this.cells = document.getElementsByClassName("cell");
    this.currentPlayer = "X";

    // Places X's & O's within the board b/w "". An array within an array.
    //3) [Array(3), Array(3), Array(3)]
    // 0 : (3) ['X', 'O', 'X']
    // 1 : (3) ['O', 'X', 'O']
    // 2 : (3) ['X', 'O', 'X']
    // length: 3
    this.boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.turns = []; //arr to hold all the turns from new PlayedPiece class
  }

  handleClick(event) {
    if (!this.checkWin()) {
      event.preventDefault();

      const element = event.currentTarget; //<div id="00" class="cell"></div>
      const cellIdText = element.id; // 00  (number)
      const cellArr = cellIdText
        .split("") // ["0", "0"]; string
        .map((item) => parseInt(item)); //[0, 0]; numbers

      //Prevent piece from being added if cell is already used
      if (this.boardState[cellArr[0]][cellArr[1]] !== "") {
        return;
      }

      element.textContent = this.currentPlayer; //prints X or O into cell on DOM
      this.addMove(cellArr); //[0, 0]; numbers placed into addMove function
      this.message.textContent = `${this.currentPlayer}'s turn`;
      if (this.checkWin()) {
        this.message.textContent = `Game over! ${
          this.currentPlayer === "X" ? "O" : "X"
        } wins!`;
      }
      if (this.checkTie()) {
        this.message.textContent = `Game is tied!`;
      }
      return;
    }
  }

  addMove(cell) {
    const xCoord = cell[0]; // Ex: starts as [0, 0] from cellArr //  xCoord = 0
    const yCoord = cell[1]; // 0
    //this.boardState[0][0]. prints X or O to boardState position - Ex: ["X", "",""]
    this.boardState[xCoord][yCoord] = this.currentPlayer;

    let newPlayedPiece = new PlayedPiece(cell);
    this.turns.push(newPlayedPiece);
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  //If a = 0 getCell(0) = [0, 0]
  getCell(cellIndex) {
    if (cellIndex <= 2) {
      return [0, cellIndex]; // so [0, 0 or 1 or 2] - the whole top row of the boardState
    } else if (cellIndex <= 5) {
      return [1, cellIndex - 3]; //so [1, 2 or 1, or 0] - the whole 2nd row of the boardState
    } else {
      return [2, cellIndex - 6]; //so [2, 2 or 1 or 0] - the whole 3rd row of the boardState
    }
  }

  checkWin() {
    const justPlayedCharacter = this.currentPlayer === "X" ? "O" : "X"; //Reverts the player to who just went: X or O

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      //Ex winningCombination [0, 3, 6]// a = 0 // getCell = [0, 0] (top left box of tic-tac-toe square)
      const cellA = this.getCell(a);
      const cellB = this.getCell(b);
      const cellC = this.getCell(c);

      if (
        //this.boardState[cellA[0]][cellA[1]]. Ex: [0, 0] = this.boardState[0][0]
        this.boardState[cellA[0]][cellA[1]] === justPlayedCharacter &&
        this.boardState[cellB[0]][cellB[1]] === justPlayedCharacter &&
        this.boardState[cellC[0]][cellC[1]] === justPlayedCharacter
      ) {
        return true;
      }
    }
    return false;
  }

  checkTie() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].textContent === "") {
        return false;
      }
    }
    return true;
  }

  clearBoard() {
    this.boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.currentPlayer = "X";
    this.turns = [];

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].textContent = "";
    }
    this.message.textContent = `Player 1 (X's) turn!`;
  }
}

let progressGame = new Game();
const startRestartBtn = document.getElementById("btn");

startRestartBtn.addEventListener("click", (event) =>
  progressGame.clearBoard(event)
);

for (let i = 0; i < progressGame.cells.length; i++) {
  progressGame.cells[i].addEventListener("click", (event) =>
    progressGame.handleClick(event)
  );
}
