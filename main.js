let canvas; 
let ctx;
let rock, scissors, paper, backgroundImg;
let rockX = 175;
let rockY = 100;
let scisX = 75;
let scisY = 250;
let paperX = 275;
let paperY = 250;
let diffRSx = Math.abs(rockX - scisX);
let diffRSy =  Math.abs(rockY - scisY);
let diffRPx = Math.abs(rockX - paperX);
let diffRPy = Math.abs(rockY - paperY);
let diffSPx = Math.abs(scisX - paperX);
let diffSPy = Math.abs(scisY - paperY);
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 550;
document.getElementById("canvas").appendChild(canvas);


let remainingMoney = parseInt(document.getElementById("wallet").textContent);
let haveBet = 0;




function generateRandomValue(min, max){
  let randomNum = Math.floor(Math.random()*(max - min + 1)) + min;
  return randomNum;
}


function update(){
  let rMoveX = generateRandomValue(-3, 3);
  let rMoveY = generateRandomValue(-3, 3);
  let sMoveX = generateRandomValue(-3, 3);
  let sMoveY = generateRandomValue(-3, 3);
  let pMoveX = generateRandomValue(-3, 3);
  let pMoveY = generateRandomValue(-3, 3);
  rockX += rMoveX;
  rockY += rMoveY;
  scisX += sMoveX;
  scisY += sMoveY;
  paperX += pMoveX;
  paperY += pMoveY;
  xOutOfCanvas(rockX, rockY);
  xOutOfCanvas(scisX, scisY);
  xOutOfCanvas(paperX, paperY);

  if (diffRPx == 0 && diffRPy == 0) {
    console.log("rock become paper");
    rock.src = paper.src;
  }
  if (diffRSx == 0 && diffRSy == 0) {
    console.log("scissors become rock");
    scissors.src = rock.src;
  }
  if (diffSPx == 0 && diffSPy == 0) {
    console.log("paper become scissors");
    paper.src = scissors.src;
  }
}

function xOutOfCanvas(objectX, objectY){
  if (objectX >= 375){
    objectX = 375;
  }
  if (objectX <= 25){
    objectX = 25;
  }
  if (objectY >= 525){
    objectY = 525;
  }
  if (objectY <= 25){
    objectY = 25;
  }
}

function render(){
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(rock, rockX, rockY, 25, 25);
  ctx.drawImage(scissors, scisX, scisY, 25, 25);
  ctx.drawImage(paper, paperX, paperY, 25, 25);

}

function loadImage(){
  backgroundImg = new Image();
  backgroundImg.src="images/background.png";

  rock = new Image();
  rock.src="images/rock.png";

  scissors = new Image();
  scissors.src="images/scissors.png";
  
  paper= new Image();
  paper.src="images/paper.png";

}

function bet(){
  const betAmount = document.getElementById("betInput").value;


  if (!isNaN(betAmount)) {
    if (remainingMoney < betAmount) {
      alert("You don't have enough money");
      alert("Maybe there is a way to get money...")
    }
    else{
    remainingMoney -= betAmount;
    haveBet += parseInt(betAmount);
    document.getElementById("wallet").textContent = remainingMoney;
    document.getElementById("haveBet").textContent = haveBet;

  }
  }
  else{
    alert("Invalid input!");
  }

}

function loan(){
  alert("Are you sure you want to loan?\nIt's really risky...");
  remainingMoney += 10000;
  document.getElementById("wallet").textContent = remainingMoney;
}


function main(){
  render();
  requestAnimationFrame(main);
  update();

}

function startGame(){
  loadImage();
  //setupKeyboardListener();
  //createEnemy();
  main();
}
