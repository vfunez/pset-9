///////////////////// APP STATE (VARIABLES) /////////////////////////
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var score = 0;
var lives = 3;
var ball = 15;
var brickRowCount = 8;
var brickColumnCount = 3;
var brickWidth = 100;
var brickHeight = 25;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
var x = canvas.width/2;
var y = canvas.height-30;
var xPaddle = 20;
var yPaddle = 100;
var paddleX = (canvas.width-yPaddle)/2;
var xAxis = 2;
var yAxis = -2;
var rightPressed = false;
var leftPressed = false;
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("x-button").onclick = firstX;
document.getElementById("o-button").onclick = firstO;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;

  render();
}
function firstX() {
  document.getElementById('switch').innerHTML = "Turn: X";
  turn = "X";
}
function firstO() {
  document.getElementById('switch').innerHTML = "Turn: O";
  turn = "O";
}
function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
    if (win === "T") {
    tie++;
    document.getElementById('tie-score').innerHTML = tie;
    }
  }
}
function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

    if (winner === "X") {
      xWin++;
      document.getElementById('x-score').innerHTML = xWin;
    } else if (winner === "O") {
      oWin++;
      document.getElementById('o-score').innerHTML = oWin;
    }
  return winner ? winner : board.includes("") ? null : "T";
}
