class PlayedPiece {
  constructor(cell) {
    this.cell = cell;
  }
}

class Game {
  constructor() {
    this.currentPlayer = "X";
    // places X's & O's within the board b/w "". An array within an array
    this.boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.turns = []; //arr to hold all the turns from new PlayedPiece class
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
}

const cells = document.getElementsByClassName("cell");
const message = document.getElementById("message");
const startRestartBtn = document.getElementById("btn");

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

let progressGame = new Game();

startRestartBtn.addEventListener("click", clearBoard);

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", addPiece);
}

function addPiece(event) {
  event.preventDefault();

  const element = event.currentTarget;
  console.log(element); //<div id="00" class="cell"></div>
  const cellIdText = element.id; 
  console.log(cellIdText);// 00

  const cellArr = cellIdText.split(""); //ex: ["0", "0"]; array
  console.log(cellArr);

  if (progressGame.boardState[(cellArr[0], cellArr[1])] !== "") {
    console.log(progressGame.boardState[(cellArr[0], cellArr[1])]); // printed ["X", "",""]

    //print X or O to DOM 
    element.textContent = progressGame.currentPlayer; 

    progressGame.addMove(cellArr);
    console.log(progressGame.boardState); // [Array(3), Array(3), Array(3)]

    message.textContent = `${progressGame.currentPlayer}'s turn`; //Getting Nan???????????????????????????????????
    console.log(progressGame.currentPlayer); // Got 0!yay!
  }

  if (checkWin(progressGame.addMove.currentPlayer)) {
    message.textContent = `Game over! ${progressGame.addMove.currentPlayer} wins!`;
  }
  if (checkTie(progressGame.addMove.currentPlayer)) {
    message.textContent = `Game is tied!`;
  } else {
    let nextPlayer = progressGame.addMove.currentPlayer++;
    message.textContent = `${nextPlayer}'s turn.`;
  }
  return;
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function clearBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  message.textContent = `Player 1 (X's) turn!`;
}
