///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9 ,10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16 ,17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [41, 34, 27, 20],
  [40, 33, 26, 19],
  [39, 32, 25, 18],
  [38, 31, 24, 17],
  [37, 30, 23, 16],
  [36, 29, 22, 15],
  [35, 28, 21, 14],
  [34, 27, 20, 13],
  [33, 26, 19, 12],
  [32, 25, 18, 11],
  [31, 24, 17, 10],
  [30, 23, 16, 9],
  [29, 22, 15, 8],
  [28, 21, 14, 7],
  [27, 20, 13, 6],
  [26, 19, 12, 5],
  [25, 18, 11, 4],
  [24, 17, 10, 3],
  [23, 16, 9, 2],
  [22, 15, 8, 1],
  [21, 14, 7, 0],
  [21, 15, 9, 2],
  [22, 16, 10, 4],
  [23, 17, 11, 5],
  [24, 18, 12, 6],
  [28, 22, 16, 15],
  [29, 23, 17, 11],
  [30, 24, 18, 12],
  [31, 25, 19, 13],
  [35, 29, 23, 17],
  [36, 30, 24, 18],
  [37, 31, 25, 19],
  [38, 32, 26, 20]
  [24, 16, 8, 0]
  [25, 17, 9, 1]
  [26, 18, 10, 2],
  [27, 19, 11, 3],
  [31, 23, 25, 7],
  [32, 24, 26, 8],
  [33, 25, 27, 9],
  [34, 26, 18, 10],
  [38, 30, 22, 14],
  [39, 31, 23, 15],
  [40, 32, 24, 16],
  [41, 33, 25, 17],
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let redWin = 0;
let tie = 0;
let yellowWin = 0;
let first;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const cells = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("red-button").onclick = firstRed;
document.getElementById("yellow-button").onclick = firstYellow;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", ""
  ];
  turn = "Red";
  win = null;

  render();
}
function render() {
  board.forEach(function(mark, index) {
    cells[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
  if (e.target.id == "board") {
    return false;
  }
  if (!win) {
    let index = cells.findIndex(function(cell) {
      return cell === e.target;
    });

    let firstRow = index % 7;

    if (board[index] === "") {
      while (board[index + 7] === "") {
        let f = index + 7;
        document.getElementById("cell" + f + "").classList.add(turn);
        board[i] = turn;
        document.getElementById("cell" + index + "").classList.remove(turn);
        board[index] = "";
        index = f;
    }
    if (board[index] === "") {
      document.getElementById("cell" + f + "").classList.add(turn);
      board[index] = turn;
    }
  }
  else if (board[index] !== "") {
        if (board[firstRow] === "") {
          while (board[firstRow + 7] === "") {
            let f = row1 + 7;
            document.getElementById("cell" + f + "").classList.add(turn);
            board[f] = turn;
            document.getElementById("cell" + firstRow + "").classList.remove(turn);
            board[firstRow] = "";
            firstRow = f;
    }
    if (board[firstRow] === "") {
            document.getElementById("cell" + firstRow + "").classList.add(turn);
            board[firstRow] = turn;
           }
        }
    }
    if (board[firstRow] !== "") {
        return false;
      }
    }
    turn = turn === "Red" ? "Yellow" : "Red";
    win = getWinner();
      if (win === "T") {
        tie++;
        document.getElementById("tie-score").innerHTML = tie;
      }
      render();
    }
function getWinner() {
  let winner = null;

    winningConditions.forEach(function(condition, index) {
      if (
        board[condition[0]] &&
        board[condition[0]] === board[condition[1]] &&
        board[condition[1]] === board[condition[2]] &&
        board[condition[2]] === board[condition[3]]
      ) {
        winner = board[condition[0]];
      }
    });

  //    if (winner === "Red") {
    //    redWin++;
    //    document.getElementById('red-score').innerHTML = redWin;
  //    } else if (winner === "Yellow") {
  //      yellowWin++;
//        document.getElementById('yellow-score').innerHTML = redWin;
  //    }
    return winner ? winner : board.includes("") ? null : "T";
  }
//
//
//
//
//
//
  function playAgain() {
    board.forEach(function(mark, index) {
      if (cell[index].classList.contains("Red")) {
        cell[index].classList.remove("Red")
      }
      if (cell[index].classList.contains("Yellow")) {
        cell[index].classList.remove("Yellow")
      }
    });
    init()
  }

  function resetScoreboard() {

  }

  function resetScoreboard() {
    redWin = 0;
    yellowWin = 0;
    tie = 0;
    document.getElementById("red-score").innerHTML = redWin;
    document.getElementById("tie-score").innerHTML = tie;
    document.getElementById("yellow-score").innerHTML = yellowWin;
  }
  function firstRed() {
    init();
    document.getElementById('switch').innerHTML = "Turn: Red";
    turn = "Red";
    first = "Red";
  }
  function firstYellow() {
    init();
    document.getElementById('switch').innerHTML = "Turn: Yellow";
    turn = "Yellow";
    first = "Yellow";
  }
  function resetScoreboard() {
    redWin = 0;
    yellowWin = 0;
    tie = 0;

    document.getElementById("redScore").innerHTML = redWin;
    document.getElementById("tScore").innerHTML = tie;
    document.getElementById("yellowScore").innerHTML = yellowWin;
  }
