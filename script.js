
let player = document.getElementById("player");
let gameContainer = document.getElementById("gameContainer");
let mainMenu = document.getElementById("mainMenu");
let gameOverScreen = document.getElementById("gameOverScreen");
let finalScore = document.getElementById("finalScore");
let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("highScore");

let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");
let upBtn = document.getElementById("up");

let left = false, right = false, jumping = false;
let playerX = 50, playerY = 100, velocityY = 0, gravity = -0.5, score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.innerText = highScore;

function startGame() {
  mainMenu.style.display = "none";
  gameContainer.style.display = "block";
  gameOverScreen.style.display = "none";
  playerX = 50;
  playerY = 100;
  velocityY = 0;
  score = 0;
  update();
}

function restartGame() {
  startGame();
}

function update() {
  velocityY += gravity;
  playerY += velocityY;

  if (left) playerX -= 5;
  if (right) playerX += 5;

  if (playerY <= 0) {
    playerY = 0;
    velocityY = 0;
  }

  if (playerY < -50) {
    endGame();
    return;
  }

  player.style.left = playerX + "px";
  player.style.bottom = playerY + "px";

  document.querySelectorAll(".platform").forEach(platform => {
    let rect = platform.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      playerRect.bottom <= rect.top + 10 &&
      playerRect.bottom >= rect.top - 10 &&
      playerRect.left + 30 > rect.left &&
      playerRect.left < rect.right
    ) {
      playerY = window.innerHeight - rect.top - 100;
      velocityY = 10;
    }
  });

  document.querySelectorAll(".coin").forEach(coin => {
    if (!coin.style.display || coin.style.display !== "none") {
      let rect = coin.getBoundingClientRect();
      let playerRect = player.getBoundingClientRect();
      if (
        playerRect.left < rect.right &&
        playerRect.right > rect.left &&
        playerRect.top < rect.bottom &&
        playerRect.bottom > rect.top
      ) {
        coin.style.display = "none";
        score += 1;
        scoreDisplay.innerText = "النتيجة: " + score;
      }
    }
  });

  requestAnimationFrame(update);
}

function endGame() {
  gameContainer.style.display = "none";
  gameOverScreen.style.display = "block";
  finalScore.innerText = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.innerText = highScore;
  }
}

leftBtn.onmousedown = () => left = true;
leftBtn.onmouseup = () => left = false;
rightBtn.onmousedown = () => right = true;
rightBtn.onmouseup = () => right = false;
upBtn.onmousedown = () => {
  if (!jumping) {
    velocityY = 12;
    jumping = true;
  }
};
upBtn.onmouseup = () => jumping = false;
