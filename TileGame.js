function TileGame(){	
	this.boxs = [];
	this.keysPressed = [];
	this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
	this.locations = [10, 170, 330, 490];
	this.skinnyRect = 10;
	this.longRect = 650;
	this.won = false;
	this.lost = false;

	this.start = function(){
		this.addBoxes(2);
	}

	this.play = function(){
		if(!this.won && !this.lost){
			background(204, 190, 178);
			rectMode(CORNER);
			noStroke();
			fill(129, 116, 107);
			rect(0, 0, this.longRect, this.skinnyRect);
			rect(0, 0, this.skinnyRect, this.longRect);
			rect(0, 640, this.longRect, this.skinnyRect);
			rect(640, 0, this.skinnyRect, this.longRect);
			rect(160, 0, this.skinnyRect, this.longRect);
			rect(320, 0, this.skinnyRect, this.longRect);
			rect(480, 0, this.skinnyRect, this.longRect);
			rect(0, 160, this.longRect, this.skinnyRect);
			rect(0, 320, this.longRect, this.skinnyRect);
			rect(0, 480, this.longRect, this.skinnyRect);
			for(var i=0; i<this.boxs.length; i++){
				this.boxs[i].show();
				if(this.boxs[i].value === 2048){
					this.won = true;
				}
			}
		}else{
			background(0, 0, 0);
			textSize(50);
			fill(255, 255, 255);
			textAlign(CENTER);
			text("You Won", 650/2, 650/2);
			fill(255,0,0);
			rectMode(CENTER);
			rect(150, 500, 200, 50);
			fill(255);
			textSize(25);
			text("Play Again?", 150, 510);
			fill(255,0,0);
			rectMode(CENTER);
			rect(450, 500, 200, 50);
			fill(255);
			textSize(25);
			text("Quit?", 450, 510);
		}
		if(this.lost){
			background(0, 0, 0);
			textSize(50);
			fill(255, 255, 255);
			textAlign(CENTER);
			text("You Lost", 650/2, 650/2);
			fill(255,0,0);
			rectMode(CENTER);
			rect(150, 500, 200, 50);
			fill(255);
			textSize(25);
			text("Play Again?", 150, 510);
			fill(255,0,0);
			rectMode(CENTER);
			rect(450, 500, 200, 50);
			fill(255);
			textSize(25);
			text("Quit?", 450, 510);
		}
	}

	// function touchStarted(){
	// 	if(touches.length>0){
	// 		if(touches[0].x > 650.0/2.0){
	// 			moveRight();
	// 		}else if(touches[0].x < 650.0/2.0){
	// 			moveLeft();
	// 		}else if(touches[0].y > 650.0/2.0){
	// 			moveUp();
	// 		}else if(touches[0].y < 650.0/2.0){
	// 			moveDown();
	// 		}
	// 	}
	// }

	// function touchMoved(){
	// 	if(touches[0].x > prevTouch.x){
	// 		moveRight();
	// 	}else if(touches[0].x < prevTouch.x){
	// 		moveLeft();
	// 	}else if(touches[0].y > prevTouch.y){
	// 		moveUp();
	// 	}else if(touches[0].y < prevTouch.y){
	// 		moveDown();
	// 	}
	// }

	 this.addBoxes = function(num){
		for(var i=0; i<num; i++){
			var newBox = new Box(this.locations[(int)(Math.random()*4)], this.locations[(int)(Math.random()*4)]);
			for(var j=0; j<this.boxs.length; j++){
				if(this.boxs.length === 16){
					this.lost = true;
					break;
				}
				while(this.boxs[j].x === newBox.x && this.boxs[j].y === newBox.y){
					newBox.x = this.locations[(int)(Math.random()*4)];
					newBox.y = this.locations[(int)(Math.random()*4)];
					j=0;
				}
			}
			this.boxs.push(newBox);
		}
	}

	this.keyPressed  = function(keyCode){
		if(!this.lost){
			if(keyCode === RIGHT_ARROW){
				this.moveRight();
			}else if(keyCode === LEFT_ARROW){
				this.moveLeft();
			}else if(keyCode === UP_ARROW){
				this.moveUp();
			}else if(keyCode === DOWN_ARROW){
				this.moveDown();
			}
			var boxMove = false;
			for(var i=0; i<this.boxs.length; i++){
				if(this.boxs[i].movedSuc){
					boxMove = true;
				}
				this.boxs[i].movedSuc = false;
				this.boxs[i].tryMove = false;
			}
			if(boxMove){
				this.addBoxes(1);
			}
			if(this.boxs.length === 16){
					this.lost = true;
			}
		}
		if(this.keysPressed.length<11){
			this.keysPressed.push(keyCode);
		}else{
			this.keysPressed.splice(0,1);
			this.keysPressed.push(keyCode);
		}
		var konami = true;
		if(this.keysPressed.length===11){
			for(var i=0; i<this.keysPressed.length; i++){
				if(!(this.keysPressed[i]===this.konamiCode[i])){
					konami = false;
				}
			}
			if(konami){
				this.won = true;
			}
		}
	}

	this.moveRight = function(){
		var boxsMoved = 0;
		var startingBoxLength = this.boxs.length;
		while(boxsMoved < startingBoxLength){
			var rightMostIdx = -1;
			var rightMostPos = 0;
			for(var i=0; i<this.boxs.length; i++){
				if( !this.boxs[i].tryMove && this.boxs[i].x > rightMostPos){
					rightMostPos = this.boxs[i].x;
					rightMostIdx = i;
				}
			}
			if(rightMostIdx != -1){
				var box = this.boxs[rightMostIdx];
				var locIdx = this.locations.indexOf(box.x);
				var collision = false;
				var moveAmount = 0;
				while(locIdx+1<this.locations.length && !collision){
					for(var i=0; i<this.boxs.length; i++){
						if(this.boxs[i].x === this.locations[locIdx+1] && this.boxs[i].y === box.y){
							collision = true;
							if(this.boxs[i].value === box.value){
								this.boxs[i].increaseValue();
								this.boxs.splice(rightMostIdx, 1);
								box.movedSuc = true;
							}
						}
					}
					if(!collision){
						locIdx = locIdx+1;
						box.x = this.locations[locIdx];
						box.movedSuc = true;
					}
				}
				boxsMoved ++;
				box.tryMove = true;
			}
		}
	}

	this.moveLeft = function(){
		var boxsMoved = 0;
		var startingBoxLength = this.boxs.length;
		while(boxsMoved < startingBoxLength){
			var leftMostIdx = -1;
			var leftMostPos = 580;
			for(var i=this.boxs.length-1; i>-1; i--){
				if( !this.boxs[i].tryMove && this.boxs[i].x < leftMostPos){
					leftMostPos = this.boxs[i].x;
					leftMostIdx = i;
				}
			}
			if(leftMostIdx != -1){
				var box = this.boxs[leftMostIdx];
				var locIdx = this.locations.indexOf(box.x);
				var collision = false;
				var moveAmount = 0;
				while(locIdx-1>-1 && !collision){
					for(var i=0; i<this.boxs.length; i++){
						if(this.boxs[i].x === this.locations[locIdx-1] && this.boxs[i].y === box.y){
							collision = true;
							if(this.boxs[i].value === box.value){
								this.boxs[i].increaseValue();
								this.boxs.splice(leftMostIdx, 1);
								box.movedSuc = true;
							}
						}
					}
					if(!collision){
						locIdx = locIdx-1;
						box.x = this.locations[locIdx];
						box.movedSuc = true;
					}
				}
				boxsMoved ++;
				box.tryMove = true;
			}
		}
	}

	this.moveUp = function(){
		var boxsMoved = 0;
		var startingBoxLength = this.boxs.length;
		while(boxsMoved < startingBoxLength){
			var upMostIdx = -1;
			var upMostPos = 580;
			for(var i=this.boxs.length-1; i>-1; i--){
				if( !this.boxs[i].tryMove && this.boxs[i].y < upMostPos){
					upMostPos = this.boxs[i].y;
					upMostIdx = i;
				}
			}
			if(upMostIdx != -1){
				var box = this.boxs[upMostIdx];
				var locIdx = this.locations.indexOf(box.y);
				var collision = false;
				var moveAmount = 0;
				while(locIdx-1>-1 && !collision){
					for(var i=0; i<this.boxs.length; i++){
						if(this.boxs[i].y === this.locations[locIdx-1] && this.boxs[i].x === box.x){
							collision = true;
							if(this.boxs[i].value === box.value){
								this.boxs[i].increaseValue();
								this.boxs.splice(upMostIdx, 1);
								box.movedSuc = true;
							}
						}
					}
					if(!collision){
						locIdx = locIdx-1;
						box.y = this.locations[locIdx];
						box.movedSuc = true;
					}
				}
				boxsMoved ++;
				box.tryMove = true;
			}
		}
	}

	this.moveDown = function(){
		var boxsMoved = 0;
		var startingBoxLength = this.boxs.length;
		while(boxsMoved < startingBoxLength){
			var downMostIdx = -1;
			var downMostPos = 0;
			for(var i=0; i<this.boxs.length; i++){
				if( !this.boxs[i].tryMove && this.boxs[i].y > downMostPos){
					downMostPos = this.boxs[i].y;
					downMostIdx = i;
				}
			}
			if(downMostIdx != -1){
				var box = this.boxs[downMostIdx];
				var locIdx = this.locations.indexOf(box.y);
				var collision = false;
				var moveAmount = 0;
				while(locIdx+1<this.locations.length && !collision){
					for(var i=0; i<this.boxs.length; i++){
						if(this.boxs[i].y === this.locations[locIdx+1] && this.boxs[i].x === box.x){
							collision = true;
							if(this.boxs[i].value === box.value){
								this.boxs[i].increaseValue();
								this.boxs.splice(downMostIdx, 1);
								box.movedSuc = true;
							}
						}
					}
					if(!collision){
						locIdx = locIdx+1;
						box.y = this.locations[locIdx];
						box.movedSuc = true;
					}
				}
				boxsMoved ++;
				box.tryMove = true;
			}
		}
	}
}