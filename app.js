//win not working// I don't think the boardState is being filled at all. Should be X & O correct? or ["0", "0"]?

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


    // places X's & O's within the board b/w "". An array within an array
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

      if (this.boardState[cellArr[0]][cellArr[1]] !== "") {
        // prevent piece from being added if cell already used
        return;
      }

      element.textContent = this.currentPlayer; //print X or O into cell on DOM
      this.addMove(cellArr); //[0, 0]; numbers placed into addMove function
      this.message.textContent = `${this.currentPlayer}'s turn`;
      console.log("checkWin: " + this.checkWin());
      console.log("checkTie: " + this.checkTie());

      if (this.checkWin()) {
        this.message.textContent = `Game over! ${this.currentPlayer === "X" ? "O" : "X"} wins!`;
      }
      if (this.checkTie()) {
        this.message.textContent = `Game is tied!`;
      }
      return;
    }
  }

  addMove(cell) {
    const xCoord = cell[0]; // starts as [2, 2] from cellArr, these const break it, so this is-  2
    const yCoord = cell[1]; // 2
    this.boardState[xCoord][yCoord] = this.currentPlayer; //this.boardState[2][2]. prints X or O to boardState position - Ex: ["X", "",""]

    let newPlayedPiece = new PlayedPiece(cell);
    this.turns.push(newPlayedPiece); // returns array - PlayedPiece {cell: Array(2)} cell: (2) ['0', '0']
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"; //switches current player
  }

  //if a = zero getCell(0) = [0, 0]// ex2 with a = 4 you'd get [1, 1], which matches and is dead cell 11 on the gameboard
  getCell(cellIndex) {
    if (cellIndex <= 2) {
      return [0, cellIndex]; // so [0, 0 or 1 or 2] which is the whole top row of the boardState
    } else if (cellIndex <= 5) {
      return [1, cellIndex - 3]; //so [1, 2 or 1, or 0] which is the whol 2nd row of the boardState
    } else {
      return [2, cellIndex - 6]; //so [2, 2 or 1 or 0] which is the whole 3rd row of the boardState
    }
  }

  // I want to compare the justPlayed Character (say X (string value); against my already placed spots (so, boardState or DOM elements); and check to see if there are any winningcombination matches. //************************ Compare winingcombos to my DOM element string text and the justPlayedCharacter string text (ex: X === X ). Need to iterate over the cells to get just the text piece.

  checkWin() {
    const justPlayedCharacter = this.currentPlayer === "X" ? "O" : "X"; //matches the player who just went X or O
    console.log("A");
    console.log("this.boardState", this.boardState);
    console.log(this.justPlayedCharacter)
    
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
      const [a, b, c] = winningCombinations[i]; //ex [0, 4, 8]//ex2 if a = 4 (so center box of tic-tac-toe)
      console.log([a, b, c]);
      console.log(a);
      console.log(b);
      console.log(c);
      console.log("winningCombinations", winningCombinations)

      const cellA = this.getCell(a); // "a" is position of const [a, b, c] above. //ex2 = [1, 1]
      const cellB = this.getCell(b);
      const cellC = this.getCell(c);
      console.log("cellA[0]", cellA[0]);
      console.log("cellA[1]", cellA[1]);
      console.log("this.boardState[0]", this.boardState[1]);
      console.log("this.boardState[0,0]", this.boardState[0,0]);
      console.log("this.boardState[0,0][0]", this.boardState[0,0][0]);
      console.log("this.boardState[0][0]", this.boardState[0][0]);


      console.log("cellA", cellA);
      console.log("cellB", cellB);
      console.log("cellC", cellC);
      console.log("this.boardState[cellA[0]][cellA[1]]", this.boardState[cellA[0]][cellA[1]]);
      console.log("this.boardState[cellB[0]][cellB[1]]", this.boardState[cellB[0]][cellB[1]]);
      console.log("this.boardState[cellC[0]][cellC[1]]", this.boardState[cellC[0]][cellC[1]]);
      console.log("justPlayedCharacter", this.justPlayedCharacter);
      // console.log("this.boardState[cellA][i]", this.boardState[cellA][i]);

      if (
        //this.boardState[cellA[0]][cellA[1]]. Ex2 [1, 1] = this.boardState[1][1]
        this.boardState[cellA[0]][cellA[1]] === justPlayedCharacter &&
        this.boardState[cellB[0]][cellB[1]] === justPlayedCharacter &&
        this.boardState[cellC[0]][cellC[1]] === justPlayedCharacter
      ) {
        console.log("ITS TRUE")
        return true;
      } 
    }
    console.log("D");
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
