
// Play 1 Object 
// Player 2 Object 
//gameFlow Object 


// start with player 1 and rotate players 


//A module generates a board with 9 "square" objects and adds an eventListener to each square object. The eventListener fires a function when clicked.
//That eventListener function should do two things: modify the innerHTML of the "square" object, and change the current player
//The eventListener function uses a "this" variable, which should be the "square" object.

// gameBoard & displayController go inside of a module 
// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
//function where gameboard array is rendered to webpage (for now prefill array with X's and O's)


// 1st get this array to show in the proper places on the board to start 
// create a GameBoard module this contains an array of the proper values and their places (0-8)
// modify the DOM to change the elements of the HTML to match the above gameboard? 


////////////////////////////////////////////
//Import other JavaScript files 
import { GameBoard } from './gameboard'

// grab DOM elements 
const cells = document.getElementsByClassName('cell');
const message = document.getElementById('message'); 
const startRestartBtn = document.getElementById('btn'); 
//grab each ind cell to add an event listener to 
const b1 = document.getElementById('b1'); 
const b2 = document.getElementById('b2'); 
const b3 = document.getElementById('b3'); 
const b4 = document.getElementById('b4'); 
const b5 = document.getElementById('b5'); 
const b6 = document.getElementById('b6'); 
const b7 = document.getElementById('b7'); 
const b8 = document.getElementById('b8'); 
const b9 = document.getElementById('b9'); 

//will  need to do something like this to print the value to DOM board 
//cells[i].textContent = currentPlayer
const player1 = 'X';
const player2 = 'O';

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//  gameboard object with a gameboard array inside of it. 1st move b1 = x, 2nd move b5=O

class PlayedPiece {
    constructor (cell, character){
    this.cell = cell; 
    this.character = character;   
    }
}
 
class GameBoard {
    constructor() {
        this.turns = []; //arr to hold all the turns 
    }
    add(cell, character){
        let newPlayedPiece = new PlayedPiece (cell, character); 
        this.turns.push(newPlayedPiece); 
    }
}
/////////////////////////////////////////////////

let refreshedGameBoard = new GameBoard(); 

//add an event listener to recognize that specific cell location 
//Can I create a loop/iteration to minimalize this code? 
b1.addEventListener("click", addPiece);
b2.addEventListener("click", addPiece);
b3.addEventListener("click", addPiece);
b4.addEventListener("click", addPiece);
b5.addEventListener("click", addPiece);
b6.addEventListener("click", addPiece);
b7.addEventListener("click", addPiece);
b8.addEventListener("click", addPiece);
b9.addEventListener("click", addPiece);

function addPiece (event){
    event.preventDefault(); 

    let cell = ___.value;
    let character = ___.value;

    refreshedGameBoard.add(cell, character); 

    updateDOMList(); 
}

function updateDOMList() {
    cells.innerHTML = '${player.value}'; 
}
//Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
class Player1 {
    constructor(){

    }
}

class Player2 {
    constructor(){

    }
}

class switchTurns {
    constructor(){

    }
}

// add a function to controll who the player is (X or O) 
// function to switch turns, check for ties and wins

//Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

//Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
