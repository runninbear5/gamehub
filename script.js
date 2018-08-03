var tileGameImg;
var blackjackImg;
var tileGameStart = false;
var blackjackStart = false;
var startScreen = true;
var tileGame = new TileGame();
var blackjack = new BlackJack();

function setup(){
	createCanvas(650, 650);
	tileGameImg = loadImage("assets/2048.jpg");
	blackjackImg = loadImage("assets/blackjack.jpg");
}

function draw(){
	if(startScreen){
		background(255, 255, 255);
		image(tileGameImg, 100, 100, 200, 200);
		fill(0);
		textAlign(CENTER);
		textSize(25);
		text("2048", 200, 200);
		image(blackjackImg, 400, 100, 190, 190);
		textAlign(CENTER);
		text("Blackjack", 500, 200);
	}else if(tileGameStart){
		tileGame.play();
	}else if(blackjack){
		blackjack.play();
		if(blackjack.gameOver){
			fill(255,0,0);
			rectMode(CENTER);
			rect(150, 400, 200, 50);
			fill(255);
			textSize(25);
			text("Play Again?", 150, 410);
			fill(255,0,0);
			rectMode(CENTER);
			rect(450, 400, 200, 50);
			fill(255);
			textSize(25);
			text("Quit?", 450, 410);
		}
	}
}

function mousePressed(){
	if(startScreen){
		if(((mouseX >= 100) && (mouseX <= 300)) && ((mouseY >= 100) && (mouseY <= 300))){
			tileGameStart = true;
			startScreen = false;
			tileGame.start();
		}

		if(((mouseX >= 400) && (mouseX <= 590)) && ((mouseY >= 100) && (mouseY <= 300))){
			blackjackStart = true;
			startScreen = false;
			blackjack.start();
		}
	}
	if(tileGameStart && (tileGame.won || tileGame.lost)){
		if(((mouseX >= 50) && (mouseX <= 250)) && ((mouseY >= 475) && (mouseY <= 525))){
			tileGame = new TileGame();
			tileGame.start();
		}else if(((mouseX >= 350) && (mouseX <= 550)) && ((mouseY >= 475) && (mouseY <= 525))){
			startScreen = true;
			tileGame = false;
			tileGame = new TileGame();
		}
	}
	if(blackjackStart){
		if(blackjack.gameOver){
			if(((mouseX >= 50) && (mouseX <= 250)) && ((mouseY >= 375) && (mouseY <= 425))){
				blackjack = new BlackJack();
				blackjack.start();
			}else if(((mouseX >= 350) && (mouseX <= 550)) && ((mouseY >= 375) && (mouseY <= 425))){
				startScreen = true;
				blackjack = false;
				blackjack = new BlackJack();
			}
		}else{
			blackjack.clicked(mouseX, mouseY);
		}
	}
}
 function keyPressed(){
 	if(tileGameStart){
 		tileGame.keyPressed(keyCode);
 	}
 }