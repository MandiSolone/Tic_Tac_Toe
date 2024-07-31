//why is my X's & O's not printing and my current players not switching?

class PlayedPiece {
  constructor(cell) {
    this.cell = cell;
  }
}

class Game {
  constructor() {
    this.currentPlayer = "X";
    // places X's & O's within the board b/w ""
    this.boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.turns = []; //arr to hold all the turns
  }
  // ["0", "0"]
  addMove(cell) {
    const xCoord = cell[0];
    const yCoord = cell[1];
    this.boardState[xCoord][yCoord] = this.currentPlayer;

    let newPlayedPiece = new PlayedPiece(cell);
    this.turns.push(newPlayedPiece);
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
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
  const cellCoordText = element.id; // ex:id ="00" string 
  const cell = cellCoordText.split("");  //ex: ["0", "0"]; array

  if (progressGame.boardState[cell[0], cell[1]] !== "") {
    progressGame.addMove(cell);
    message.textContent = `${progressGame.currentPlayer}'s turn`; 
  }
  if (checkWin(progressGame.addMove.currentPlayer)) {
    message.textContent = `Game over! ${progressGame.addMove.currentPlayer} wins!`;
  }
  if (checkTie(progressGame.addMove.currentPlayer)) {
    message.textContent = `Game is tied!`;
    
  } else {
    let nextPlayer = progressGame.addMove.currentPlayer++;
    message.textContent = `${nextPlayer}'s turn.`;
  } return;
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
