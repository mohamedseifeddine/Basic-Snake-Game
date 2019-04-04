// Variable Declaration

var canvas = document.getElementById("myCanvas");
var highscore = document.getElementById("highscore");
var ctx = canvas.getContext("2d");
var direction , snake , score 

// initialize the game

function init() {
  direction = "RIGHT";
  score = 0;
  snake = [{ x: 40, y: 40 }, { x: 60, y: 40 }, { x: 80, y: 40 }];

}

init();

function game() {
  ctx.clearRect(0, 0, 888, 555);
  for (var i = 0; i < snake.length; i++) {
    ball = snake[i];
    if (i == snake.length - 1) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "#ff0000";
    }
 ctx.fillRect(ball.x, ball.y, 19, 19);
  }
 
  
}

 game();
