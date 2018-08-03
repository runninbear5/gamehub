function Card(value, loadedImage){
	this.loadedImage = loadImage(loadedImage);
	this.faceImage;
	this.faceValue = value;
	this.x;
	this.y;
	this.actualValue;

	if(this.faceValue === 1){
		this.actualValue = 11;
	}else if(this.faceValue === 11){
		this.actualValue = 10;
	}else if(this.faceValue === 12){
		this.actualValue = 10;
	}else if(this.faceValue === 13){
		this.actualValue = 10;
	}else{
		this.actualValue = this.faceValue;
	}

	this.makeFaceDown = function(){
		this.faceImage = this.loadedImage;
		this.loadedImage = loadImage("assets/cardBack.jpg");
	}
} 