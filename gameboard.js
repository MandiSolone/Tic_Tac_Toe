import { PlayedPiece } from './playedpiece'

class Game {
    constructor() {
      this.currentPlayer = "X";
      this.boardState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
  
      this.turns = []; //arr to hold all the turns
    }
  
    addMove(cell) {
      const xCoord = cell[0];
      const yCoord = cell[1];
      this.boardState[xCoord][yCoord] = this.currentPlayer;
  
      let newPlayedPiece = new PlayedPiece(cell);
      this.turns.push(newPlayedPiece);
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }
