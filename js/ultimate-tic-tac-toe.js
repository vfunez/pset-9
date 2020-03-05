///////////////////// APP STATE (VARIABLES) /////////////////////////
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var score = 0;
var lives = 3;
var ball = 15;
var bricksPerRow = 8;
var bricksPerColumn = 3;
var xBricks = 100;
var yBricks = 25;
var brickPadding = 10;
var topOffSet = 50;
var topOffSetTwo = 30;
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
document.addEventListener("mousemove", mouse, false);
///////////////////// FUNCTIONS /////////////////////////////////////
var bricks = [];
for(var c=0; c<bricksPerColumn; c++) {
  bricks[c] = [];
  for(var r=0; r<bricksPerRow; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
function mouse(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - yPaddle/2;
  }
}
function hit() {
  for(var c=0; c<bricksPerColumn; c++) {
    for(var r=0; r<bricksPerRow; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+xBricks && y > b.y && y < b.y+yBricks) {
          yAxis = -yAxis;
          b.status = 0;
          score++;
          if(score == bricksPerRow*bricksPerColumn) {
            alert("YOU HAVE WON :)");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ball, 0, Math.PI*2);
  context.fillStyle = "#813CA5";
  context.fill();
  context.closePath();
}
function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, canvas.height-xPaddle, yPaddle, xPaddle);
  context.fillStyle = "#813CA5";
  context.fill();
  context.closePath();
}
function drawBricks() {
  for(var c=0; c<bricksPerColumn; c++) {
    for(var r=0; r<bricksPerRow; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(xBricks+brickPadding))+topOffSetTwo;
        var brickY = (c*(yBricks+brickPadding))+topOffSet;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, xBricks, yBricks);
        context.fillStyle = "#813CA5";
        context.fill();
        context.closePath();
      }
    }
  }
}
function drawScore() {
  context.font = "16px Times New Roman";
  context.fillStyle = "#813CA5";
  context.fillText("Score: "+score, 8, 20);
}
function drawLives() {
  context.font = "16px Times New Roman";
  context.fillStyle = "#813CA5";
  context.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  hit();

  if(x + xAxis > canvas.width-ball || x + xAxis < ball) {
    xAxis = -xAxis;
  }
  if(y + yAxis < ball) {
    yAxis = -yAxis;
  }
  else if(y + yAxis > canvas.height-ball) {
    if(x > paddleX && x < paddleX + yPaddle) {
      yAxis = -yAxis;
    }
    else {
      lives--;
      if(!lives) {
        alert("YOU HAVE LOST :(");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        xAxis = 3;
        yAxis = -3;
        paddleX = (canvas.width-yPaddle)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-yPaddle) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += xAxis;
  y += yAxis;
  requestAnimationFrame(draw);
}

draw();
