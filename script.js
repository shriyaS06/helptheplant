/* VARIABLES */
let plant, water, sun, fire, insect;
let score = 0;
let gameStopped = false;
let gameStarted = false;
let gameWonFlag = false;
let gameLostFlag = false;

/* PRELOAD LOADS FILES */
function preload(){
  plantImg = loadImage('images/plant.png');
  gardenImg = loadImage('images/garden.png');
  waterImg = loadImage('images/water.png');
  sunImg = loadImage('images/sun.png');
  fireImg = loadImage('images/fire.png');
  insectImg = loadImage('images/insect.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600, 400);

  /* CREATE PLANT */
  plantImg.resize(70, 0);
  plant = new Sprite(plantImg, 200, 350, "k");

  /* CREATE WATER */
  waterImg.resize(70, 0);
  water = new Sprite(waterImg);
  water.vel.y = 2;

  /* CREATE SUN */
  sunImg.resize(100,0);
  sun = new Sprite(sunImg);
  sun.vel.y = 2;

  /* CREATE FIRE */
  fireImg.resize(50,0);
  fire = new Sprite(fireImg);
  fire.vel.y = 2;

  /* CREATE INSECT */
  insectImg.resize(100,0);
  insect = new Sprite(insectImg);
  insect.vel.y = 2;

  // Set a timeout to start the game after 10 seconds
  setTimeout(() => {
    gameStarted = true;
  }, 10000);
}

/* BACKGROUND */
function draw() {

  /* GAME BACKGROUND */
  background(gardenImg);

  /* INSTRUCTIONS */
  fill(255);
  textSize(18);
  text('You will help the \nplant.Collecting the \nwater or sun will give \nyou one point. \nCollecting the fire or \ninsect will lose you a \npoint. You win when \nyou reach 10 points. \nYou lose if you \nget less than 0 points.', 410, 30);

  if (!gameStopped) {
    /* PLANT MOVEMENT */
    if (kb.pressing("left")) {
      plant.vel.x = -3;
    } else if (kb.pressing("right")) {
      plant.vel.x = 3;
    } else {
      plant.vel.x = 0;
      plant.vel.y = 0;
    }  

  /* FIRE MOVEMENT */
  setInterval(updateFirePosition, 2000);

  /* INSECT MOVEMENT */
  setInterval(updateInsectPosition, 2000);

  /* WATER MOVEMENT */
  setInterval(updateWaterPosition, 2000);

  /* SUN MOVEMENT */
  setInterval(updateSunPosition, 2000);

  // Stop plant at edges of screen
  if (plant.x < 50) {
    plant.x = 50;
  } else if (plant.x > 350) {
    plant.x = 350;
  }

  // Stop water at edges of screen
  if (water.x < 50) {
    water.x = 50;
  } else if (water.x > 350) {
    water.x = 350;
  }

  // Stop sun at edges of screen
  if (sun.x < 50) {
    sun.x = 50;
  } else if (sun.x > 350) {
    sun.x = 350;
  }

  // Stop fire at edges of screen
  if (fire.x < 50) {
    fire.x = 50;
  } else if (fire.x > 350) {
    fire.x = 350;
  }

  // Stop insect at edges of screen
  if (insect.x < 50) {
    insect.x = 50;
  } else if (insect.x > 350) {
    insect.x = 350;
  }

  /* WATER SCORE */
  updateWaterScore();

  /* SUN SCORE */
  updateSunScore();

  /* FIRE SCORE */
  updateFireScore();

  /* INSECT SCORE */
  updateInsectScore();

  /* DISPLAY SCORE */
  fill(255);
  textSize(24);
  text("Score: " + score, 50, 17);

  /* WON Game */
  gameWon();

  /* LOSE Game */
  gameLost();
  }
    
  if (gameWonFlag) {
    // Display "You've won" message
    fill(255);
    textSize(50);
    text("You've won!", 60, 200);
  } else if (gameLostFlag) {
    // Display "You've lost" message
    fill(255);
    textSize(50);
    text("You've lost!", 60, 200);
  }
}

/* Function to change FIRE position */
function updateFirePosition() {
  if (!gameStopped && fire.y >= height) {
    fire.y = 0;
    fire.x = random(width);
    fire.vel.y = random(1,2);
  }
}

/* Function to change INSECT position */
function updateInsectPosition() {
  if (!gameStopped && insect.y >= height) {
    insect.y = 0;
    insect.x = random(width);
    insect.vel.y = random(1,2);
  }
}

/* Function to change WATER position */
function updateWaterPosition() {
  if (!gameStopped && water.y >= height) {
    water.y = 0;
    water.x = random(width);
    water.vel.y = random(1,2);
  }
}

/* Function to change SUN position */
function updateSunPosition() {
  if (!gameStopped && sun.y >= height) {
    sun.y = 0;
    sun.x = random(width);
    sun.vel.y = random(1,2);
  }
}

/* Function to update WATER score */
function updateWaterScore() {
  if (plant.collides(water)) {
    water.y = 0;
    water.x = random(width);
    water.vel.y = random(1,2);
    water.direction = "down";
    score = score + 1;
  }
}

/* Function to update SUN score */
function updateSunScore() {
  if (plant.collides(sun)) {
    sun.y = 0;
    sun.x = random(width);
    sun.vel.y = random(1,2);
    sun.direction = "down";
    score = score + 1;
  }
}

/* Function to update FIRE score */
function updateFireScore() {
  if (plant.collides(fire)) {
    fire.y = 0;
    fire.x = random(width);
    fire.vel.y = random(1,2);
    fire.direction = "down";
    score = score - 1;
  }
}

/* Function to update INSECT score */
function updateInsectScore() {
  if (plant.collides(insect)) {
    insect.y = 0;
    insect.x = random(width);
    insect.vel.y = random(1,2);
    insect.direction = "down";
    score = score - 1;
  }
}

/* Function to stop all sprites */
function stopAllSprites() {
  water.vel.x = 0;
  water.vel.y = 0;
  sun.vel.x = 0;
  sun.vel.y = 0;
  fire.vel.x = 0;
  fire.vel.y = 0;
  insect.vel.x = 0;
  insect.vel.y = 0;
}

/* RESET game */
function resetGame() {
  score = 0;
  gameStopped = false;
  gameStarted = false;
  gameWonFlag = false;
  gameLostFlag = false;

  // Reset sprite positions
  plant.x = 200;
  plant.y = 350;

  water.x = random(50, 350);
  water.y = random(50, 350);
  water.vel.y = 2;

  sun.x = random(50, 350);
  sun.y = random(50, 350);
  sun.vel.y = 2;

  fire.x = random(50, 350);
  fire.y = random(50, 350);
  fire.vel.y = 2;

  insect.x = random(50, 350);
  insect.y = random(50, 350);
  insect.vel.y = 2;

  // Restart game after instructions
  setTimeout(() => {
    gameStarted = true;
  }, 10000);
}

/* WON Function */
function gameWon() {
  if (score >= 10) {
    gameStopped = true;
    gameWonFlag = true;
    stopAllSprites();
    setTimeout(resetGame, 2000);
  }
}

/* LOSE Function */
function gameLost() {
  if (score < 0) {
    gameStopped = true;
    gameLostFlag = true;
    stopAllSprites();
    setTimeout(resetGame, 2000);
  }
}