export class PlayedPiece {
    constructor(cell) {
      this.cell = cell;
    }
  }

export class Game {
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


  //   //iterate over cells to pull them individually instead of as a whole group. 
  //   for (let i = 0; i < this.cells.length; i++) {
  //   let cellCharacter = this.cells[i].innerHTML;
  //   console.log("cellCharacter", cellCharacter); 
  //   // return REMOVED THIS
  
  //format: this.boardState[0][0] = X
      // [[0][0], [0][1], [0][2]], // Ex would be ['X', 'X', 'X'] or boxes 0, 1, 2, across the top 
      // [[1][0], [1][1], [1][2]],
      // [[2][0], [2][1], [2][2]],
      // [[0][0], [1][0], [2][0]],
      // [[0][1], [1][1], [2][1]],
      // [[0][2], [1][2], [2][2]],
      // [[0][0], [1][1], [2][2]],
      // [[0][2], [1][1], [2][0]],

  //     if (
  //       cellCharacter[a].textContent === justPlayedCharacter && //justPlayedCharacter = X or O 
  //       cellCharacter[b].textContent === justPlayedCharacter && 
  //       cellCharacter[c].textContent === justPlayedCharacter
  //     ) {