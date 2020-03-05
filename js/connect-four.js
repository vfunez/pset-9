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
  [38, 32, 26, 20],
  [24, 16, 8, 0],
  [25, 17, 9, 1],
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
let redWins = 0;
let yellowWins = 0;
let ties = 0;
let first;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const cells = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = playAgain;
document.getElementById("redFirst").onclick = redFirst;
document.getElementById("yellowFirst").onclick = yellowFirst;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
  ];
  turn = "Red"
  win = null

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

    let row1 = index % 7;

    if (board[index] === "") {

      while (board[index + 7] === "") {
        let i = index + 7;
        document.getElementById("cell" + i + "").classList.add(turn);
        board[i] = turn;
        document.getElementById("cell" + index + "").classList.remove(turn);
        board[index] = "";
        index = i;

      }
      if (board[index] === "") {
        document.getElementById("cell" + index + "").classList.add(turn);
        board[index] = turn;

      }

      }
      else if (board[index] !== "") {
        if (board[row1] === "") {
          while (board[row1 + 7] === "") {
            let i = row1 + 7;
            document.getElementById("cell" + i + "").classList.add(turn);
            board[i] = turn;
            document.getElementById("cell" + row1 + "").classList.remove(turn);
            board[row1] = "";
            row1 = i;

          }
          if (board[row1] === "") {
            document.getElementById("cell" + row1 + "").classList.add(turn);
            board[row1] = turn;

          }

        }
      }
      if (board[row1] !== "") {
        return false;

      }

      }

      turn = turn === "Red" ? "Yellow" : "Red";
      win = getWinner();
      if (win === "T") {
        ties++;
        document.getElementById("tScore").innerHTML = ties;
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

  return winner ? winner : board.includes("") ? null : "T";
}

function playAgain() {
  board.forEach(function(mark, index) {
    if (cells[index].classList.contains("Red")) {
      cells[index].classList.remove("Red")
    }
    if (cells[index].classList.contains("Yellow")) {
      cells[index].classList.remove("Yellow")
    }
  });
  init()
}

function resetScoreboard() {

}

function resetScoreboard() {
  redWins = 0;
  yellowWins = 0;
  ties = 0;

  document.getElementById("redScore").innerHTML = redWins;
  document.getElementById("tScore").innerHTML = ties;
  document.getElementById("yellowScore").innerHTML = yellowWins;
}

function redFirst(){
  init();

  document.getElementById("turn").innerHTML = "Turn: Red";
  turn = "Red";
  first = "Red"


}

function yellowFirst(){
  init();

  document.getElementById("turn").innerHTML = "Turn: Yellow";
  turn = "Yellow";
  first = "Yellow"

}

function resetScoreboard() {
    redWins = 0;
    yellowWins = 0;
    ties = 0;

    document.getElementById("redScore").innerHTML = redWins;
    document.getElementById("tScore").innerHTML = ties;
    document.getElementById("yellowScore").innerHTML = yellowWins;
  }
