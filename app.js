//win not working 

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
    this.boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.turns = []; //arr to hold all the turns from new PlayedPiece class
  }

  handleClick(event) {
    event.preventDefault();
  
    const element = event.currentTarget;
    console.log(element); //<div id="00" class="cell"></div>
    const cellIdText = element.id; 
    console.log(cellIdText);// 00
  
    const cellArr = cellIdText
      .split("")
      .map(item => parseInt(item)); //ex: ["0", "0"]; array
    console.log(cellArr);
  
    if (this.boardState[cellArr[0]][cellArr[1]] !== "") {
      // prevent piece from being added
      return;
    }
  
    console.log(this.boardState[cellArr[0]][cellArr[1]]); // printed ["X", "",""]
  
    //print X or O to DOM 
    element.textContent = this.currentPlayer; 
  
    this.addMove(cellArr);
    console.log(this.boardState); // [Array(3), Array(3), Array(3)]
  
    this.message.textContent = `${this.currentPlayer}'s turn`; //Getting Nan???????????????????????????????????
    console.log(this.currentPlayer); // Got 0!yay!
    
  
    if (this.checkWin()) {
      this.message.textContent = `Game over! ${this.addMove.currentPlayer} wins!`;
    }
    if (this.checkTie(this.addMove.currentPlayer)) {
      this.message.textContent = `Game is tied!`;
    } else {
      let nextPlayer = this.addMove.currentPlayer++;
      this.message.textContent = `${nextPlayer}'s turn.`;
    }
    return;
  }
  
  addMove(cell) {
    const xCoord = cell[0];
    const yCoord = cell[1];
    this.boardState[xCoord][yCoord] = this.currentPlayer; // ["0", "0"]

    let newPlayedPiece = new PlayedPiece(cell);
    this.turns.push(newPlayedPiece);
    console.log(newPlayedPiece); //PlayedPiece {cell: Array(2)} cell: (2) ['0', '0']

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"; //switches current player 
  }

  getCell(cellIndex) {
    if (cellIndex <= 2) {
      return [0, cellIndex];
    } else if (cellIndex <= 5) {
      return [1, cellIndex - 3];
    } else {
      return [2, cellIndex - 6];
    }
  }

  checkWin(player) {
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
      const cellA = this.getCell(a);
      const cellB = this.getCell(b);
      const cellC = this.getCell(c);

      if (
        this.boardState[cellA[0]][cellA[1]] === player &&
        this.boardState[cellB[0]][cellB[1]] === player &&
        this.boardState[cellC[0]][cellC[1]] === player
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

    this.currentPlayer = 'X';
    this.turns = [];

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].textContent = "";
    }
    this.message.textContent = `Player 1 (X's) turn!`;
  }
}

let progressGame = new Game();
const startRestartBtn = document.getElementById("btn");

startRestartBtn.addEventListener("click", event => progressGame.clearBoard(event));

for (let i = 0; i < progressGame.cells.length; i++) {
  progressGame.cells[i].addEventListener("click", event => progressGame.handleClick(event));
}
