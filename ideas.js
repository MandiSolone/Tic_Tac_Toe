


//flow of players turns (player 1, player 2, repeat)
//eventlistener on where that player clicked and update DOM to make the board 
//function to state if it's next turn, tie, or a win 
//reset button 

const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0 1 2]
	[3 4 5]
	[6 7 8]
	[0 3 6]
	[1 4 7]
	[2 5 8]
	[0 4 8]
	[2 4 6]
]

//DOM select the board, the cells, the p elememt with print message, start/restar btn, 
const cellEle = document.querySelectorAll('cell');
const boardEle = document.getElementById('board'); 
const messageEle = document.getElementById('message');
const startRestartBtn = document.getElementById('btn');
let isPlayer_0_Turn = false; 


startRestartGame()

startRestartBtn.addEventListener('click', startRestartGame); 

// resets the board from previous gameplay 

function startRestartGame() {
    isPlayer_0_Turn = false 
    cellEle.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, { once: true})
    })
    setBoardHoverClass()
    messageEle.classList.remove('show')
}

// handling clicks for the gamne 
// currentClass var saves the character (X or 0) for whoes turn it is now
// checks for wins, ties, or switches turns 
function handleCellClick(e) {
    const cell = e.target // get the element where the event occured
    const currentClass = isPlayer_0_Turn ? PLAYER_O_CLASS :  PLAYER_X_CLASS
    placeMark(cell, currentClass)
    if (checkWin (currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }

}

// ending the game. Display a winner or a draw
function endGame(draw) {
    if (draw) {
        messageEle.innerHTML = "It's a draw!"
    } else {
        messageEle.innerHTML = 'Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!' 
    } messageEle.classList.add('show')
}

// if a draw. every () method executes a function for each arr ele and returns true if true for ALL ele
function isDraw(){
    return[...cellEle].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
    })
}

//  placeMark() places a character in the cell. currentClass is X or O depending on whos turn it is. 
// swapTurns swpas the turns after a character is placed in a cell 
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn 
}

// interactive effects -Since we want a character to appear in the cells while hovering over them with our mouse cursor before placing them, the setBoardHoverClass() function takes care of the interactive part of that. The interactive elements will make our Tic-Tac-Toe JavaScript game more interesting.
// function setBoardHoverClass(){
//     boardEle.classList.remove(PLAYER_X_CLASS)
//     boardEle.classList.remove(PLAYER_O_CLASS)
//     if (isPlayer_O_Turn) {
//         boardEle.classList.add(PLAYER_O_CLASS)
//     } else {
//         boardEle.classList.add(PLAYER_X_CLASS)
//     }
// }

//check for win. ".some" checks arr to see if at least 1 ele passes test and returns true 
// .every method returns true if every ele in arr passes test 
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellEle[index].classList.contains(currentClass)
        })
    })
}