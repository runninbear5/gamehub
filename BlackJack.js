function BlackJack(){
	this.playerCards = [];
	this.dealerCards = [];
	this.deck = [];
	this.values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
	this.suits = ["clubs", "hearts", "spades", "diamonds"];
	this.playerLoc = 250;
	this.dealerLoc = 250;
	this.playerTotal = 0;
	this.dealerTotal = 0;
	this.playerDone = false;
	this.dealerDone = false;
	this.playerBusted = false;
	this.dealerBusted = false;
	this.gameOver = false;

	this.start = function(){
		for(var i=0; i<4; i++){
			for(var j=0; j<13; j++){
				var value = this.values[j];
				if(value === 1){
					value = "ace";
				}else if(value === 11){
					value = "jack";
				}else if(value === 12){
					value = "queen";
				}else if(value === 13){
					value = "king";
				}
				this.deck.push(new Card(this.values[j], "assets/"+value+"_of_"+this.suits[i]+".png"));
			}
		}
		this.drawPlayerCard(2);
		this.drawDealerCard(2);
	}

	this.play = function (){
		background(34,139,34);
		textSize(25);
		textAlign(CENTER);
		fill(0);
		text("Blackjack", 650/2, 40);
		noStroke();
		fill(255,0,0);
		rectMode(CORNER);
		rect(120, 400, 100, 100);
		fill(0);
		text("Hit", 170, 455);
		rectMode(CORNER);
		rect(120, 510, 100, 100);
		fill(255);
		text("Stay", 170, 565);
		this.drawPlayer();
		this.drawDealer();

		if(this.playerDone && !this.dealerDone){
			if(this.dealerTotal < 17){
				this.drawDealerCard(1);
			}else{
				this.dealerDone = true;
			}
		}

		if(this.playerDone && this.dealerDone){
			if(this.playerTotal > this.dealerTotal && this.dealerTotal <= 21){
				background(0, 0, 255);
				textSize(50);
				fill(255, 255, 255);
				textAlign(CENTER);
				text("You Won", 650/2, 650/2);
				this.drawPlayer();
				this.drawDealer();
			}else{
				background(0, 0, 0);
				textSize(50);
				fill(255, 255, 255);
				textAlign(CENTER);
				text("You Lost", 650/2, 650/2);
				this.drawPlayer();
				this.drawDealer();
			}
			this.gameOver = true;
		}

		if(this.playerBusted){
			background(0, 0, 0);
			textSize(50);
			fill(255, 255, 255);
			textAlign(CENTER);
			text("You Lost", 650/2, 650/2);
			this.drawPlayer();
			this.drawDealer();
			this.gameOver = true;
		}

		if(this.dealerBusted){
			background(0, 0, 255);
			textSize(50);
			fill(255, 255, 255);
			textAlign(CENTER);
			text("You Won", 650/2, 650/2);
			this.drawPlayer();
			this.drawDealer();
			this.gameOver = true;
		}
	}

	this.drawPlayerCard = function(numCards){
		for(var i=0; i<numCards; i++){
			var cardId = (int)(Math.random() * this.deck.length);
			var card = this.deck[cardId];
			this.deck.splice(cardId, 1);
			this.playerCards.push(card);
			card.x = this.playerLoc;
			card.y = 500;
			this.playerLoc += 60;
			this.playerTotal += card.actualValue;
			if(this.playerTotal > 21){
				for(var i=0; i<this.playerCards.length; i++){
					if(this.playerCards[i].faceValue === 1 && this.playerTotal > 21){
						this.playerCards[i].actualValue = 1;
						this.playerCards[i].faceValue = -1;
						this.playerTotal -= 10;
					}
				}
				this.playerBusted = this.playerTotal > 21;
				return;
			}
		}
	}

	this.drawDealerCard = function(numCards) {
		for(var i=0; i<numCards; i++){
			var cardId = (int)(Math.random() * this.deck.length);
			var card = this.deck[cardId];
			this.deck.splice(cardId, 1);
			if(this.dealerCards.length === 0){
				card.makeFaceDown();
			}
			this.dealerCards.push(card);
			card.x = this.dealerLoc;
			card.y = 100;
			this.dealerLoc += 60;
			this.dealerTotal += card.actualValue;
			if(this.dealerTotal > 21){
				for(var i=0; i<this.dealerCards.length; i++){
					if(this.dealerCards[i].faceValue === 1 && this.dealerTotal > 21){
						this.dealerCards[i].actualValue = 1;
						this.dealerCards[i].faceValue = -1;
						this.dealerTotal -= 10;
					}
				}
				this.dealerBusted = this.dealerTotal > 21;
				return;
			}
		}
	}

	this.clicked = function(mouseX, mouseY){
		if(!this.playerDone && (mouseX > 120 && mouseX < 220) && (mouseY > 400 && mouseY < 500)){
			this.drawPlayerCard(1);
		}
		if(!this.playerDone && (mouseX > 120 && mouseX < 220) && (mouseY > 510 && mouseY < 610)){
			this.playerDone = true;
		}
	}

	this.drawPlayer = function(){
		fill(255);
		textSize(25);
		text("Total: "+this.playerTotal, 50, 550);
		for(var i=0; i<this.playerCards.length; i++){
			var card = this.playerCards[i];
			image(card.loadedImage, card.x, card.y, 80, 120);
		}
	}

	this.drawDealer = function(){
		fill(255);
		textSize(25);
		if(!this.gameOver){
			text("Total: "+(this.dealerTotal - this.dealerCards[0].actualValue), 50, 150);
		}else{
			text("Total: "+this.dealerTotal, 50, 150);
		}
		for(var i=0; i<this.dealerCards.length; i++){
			var card = this.dealerCards[i];
			if(i === 0 && this.gameOver){
				image(card.faceImage, card.x, card.y, 80, 120);
			}else{
				image(card.loadedImage, card.x, card.y, 80, 120);
			}
		}
	}
}