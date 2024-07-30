import { Game } from "./gameboard";

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
cells.addEventListener("click", addPiece);

function addPiece(event) {
  event.preventDefault();

  const element = event.currentTarget;
  const cellCoordText = element.id;
  const cell = cellCoordText.split("");

  if (cell !== boardState[xCoord][yCoord]) {
    progressGame.addMove(cell);
    cellCoordText.textContent = `${currentPlayer.value}`;
  }
  if (checkWin(currentPlayer)) {
    message.textContent = `Game over! ${currentPlayer} wins!`;
    return;
  }
  if (checkTie()) {
    message.textContent = `Game is tied!`;
    return;
  } else {
    let nextPlayers = curentPlayer++;
    message.textContent = `${nextPlayers}'s turn.`;
  }
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
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
