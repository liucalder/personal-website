// Global Variables
let botX;
let botY;
let ballX;
let ballY;
let ballSpeedX = 5.0;
let ballSpeedY = 5.0;
let playerScore;
let botScore;
let selectedLevel;
let powerUpSpeed = 5;
let powerUpX, powerUpY;
let level;
let difficultySelected = false;
let gameStarted = true;
let roundPlayed = false;
let powerUpActive;
let powerUpType; // 1 = increase paddle size, 2 = slow bot, 3 = speed up ball
let winnerText = "";
let paddleSizeIncreased = false;
let powerUpChance;
let youWon, youLost;

function setup() {
  createCanvas(1000, 800);
  ballX = width / 2;
  ballY = height / 2;
  spawnPowerUp();

  // Load images
  youWon = loadImage("youwon.jpg");
  youLost = loadImage("youlost.png");
}

function resetGame() {
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = 6;
  ballSpeedY = random(-12, 12);
  selectedLevel = level + 4;
  paddleSizeIncreased = false;
  spawnPowerUp();
}

function spawnPowerUp() {
  powerUpChance = int(random(1, 4));
  if (powerUpChance === 1) {
    powerUpX = width / 2;
    powerUpY = random(20, 780);
    powerUpActive = true;
    powerUpType = int(random(1, 4));
  }
}

function drawPowerUp() {
  if (powerUpActive) {
    fill(random(150, 255), random(150, 255), random(150, 255));
    if (powerUpType === 1) {
      ellipse(powerUpX, powerUpY, 30, 30);
    } else if (powerUpType === 2) {
      rect(powerUpX - 15, powerUpY - 15, 30, 30);
    } else if (powerUpType === 3) {
      triangle(powerUpX - 20, powerUpY + 20, 520, powerUpY + 20, 500, powerUpY - 20);
    }
  }
}

function applyPowerUp() {
  if (powerUpType === 1) {
    paddleSizeIncreased = true;
  } else if (powerUpType === 2) {
    selectedLevel -= 4;
  } else if (powerUpType === 3) {
    ballSpeedX *= 1.5;
    ballSpeedY *= 1.5;
  }
  powerUpActive = false;
}

function draw() {
  if (gameStarted) {
    background(0);
    fill(255);
    textSize(40);
    if (roundPlayed) {
      textAlign(CENTER);
      textSize(50);
      if (winnerText === "You won! Good job!") {
        fill(random(150, 255), random(150, 255), random(150, 255));
        text(winnerText, width / 2, 250);
        image(youWon, 350, 275, 300, 300);
      } else {
        fill(255);
        text(winnerText, width / 2, 250);
        image(youLost, 350, 275, 300, 300);
      }
    }
    if (!roundPlayed) {
      text("Instructions: ", 250, 80);
      textSize(30);
      text("Move the mouse to move your paddle", 250, 125);
      text("There is a 1/3 chance a power up will\n show up, hit the power up with a ball to activate it", 250, 185);
      text("Square = slow bot, circle = big paddle,\ntriangle = ball speed increase", 250, 260);
      text("First player to get to 11 points wins!", 250, 360);
      text ("Press 'n' to add a point to yourself", 250, 450);
      text("Press 'm' to add a point to the bot", 250, 500);
      textSize(40);
      fill(255, 0, 0);
    }
    textAlign(CENTER);
    text("Press a number from 1 to 9 to select difficulty: " + level, width / 2, 650);
    text("Press 'w' to start the game", width / 2, 700);
    if (keyIsPressed && key >= '1' && key <= '9') {
      level = int(key) - 48;
      difficultySelected = true;
      selectedLevel = level + 4;
    }
    if (keyIsPressed && key === 'w' && difficultySelected) {
      gameStarted = false;
    }
  }
  if (!gameStarted && difficultySelected) {
    game();
  }
}

function game() {
  background(0);
  fill(181);

  if (paddleSizeIncreased) {
    rect(0, mouseY - 120, 20, 240, 10);
    if (ballX < 30 && mouseY - 120 < ballY && mouseY + 120 > ballY && ballX > 0) {
      ballSpeedY = 0;
      ballSpeedY += ((ballY - mouseY) / (40 / 3)) * (-ballSpeedX / 6);
      selectedLevel += 0.5;
      ballSpeedX *= -1;
      ballSpeedX += 0.5;
    }
  } else {
    rect(0, mouseY - 90, 20, 180, 10);
    if (ballX < 30 && mouseY - 90 < ballY && mouseY + 90 > ballY && ballX > 0) {
      ballSpeedY = 0;
      ballSpeedY += ((ballY - mouseY) / 10) * (-ballSpeedX / 6);
      selectedLevel += 0.5;
      ballSpeedX *= -1;
      ballSpeedX += 0.5;
    }
  }

  rect(980, botY, 20, 180, 10);
  ellipse(ballX, ballY, 16, 16);

  fill(255, 0, 0);
  textSize(72);
  stroke(255);
  line(500, 0, 500, 800);
  text(playerScore, 350, 400);
  text(botScore, 650, 400);

  drawPowerUp();

  if (ballX > 970 && botY < ballY && botY + 180 > ballY && ballX < 1000) {
    ballSpeedX *= -1;
    ballSpeedX -= 0.5;
    ballSpeedY = 0;
    ballSpeedY += (((ballY - botY) - 90) / 10) * (-ballSpeedX / 6);
  }

  if (powerUpActive && ballSpeedX > 0 && dist(ballX, ballY, powerUpX, powerUpY) < 23) {
    applyPowerUp();
  }

  if (ballY > 792 || ballY < 8) {
    ballSpeedY *= -1;
  }
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < -50) {
    botScore++;
    resetGame();
  }

  if (ballX > 1050) {
    playerScore++;
    resetGame();
  }
}

function keyPressed() {
  if (key === 'n') {
    playerScore++;
  }
  if (key === 'm') {
    botScore++;
  }
}
