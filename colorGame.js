var num = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();
resetButton.addEventListener("click",reset);


function init(){
	initDifficulty();
	initSquares();
	reset();
}

function initDifficulty(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click",function(){
			modeButtons.forEach(function(button){
				button.classList.remove("selected");
			});
			this.classList.add("selected");

			if(this.textContent === "easy"){
				num = 3;
			}else{
				num = 6;
			}
			reset();
		});
	}
}

function initSquares(){
	for(var i = 0; i < squares.length; i++){
		//add initial colors to squares
		squares[i].style.background = colors[i];

		//add click listeners in squares
		squares[i].addEventListener("click",function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare the clicked color to picked color
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				h1.style.background = clickedColor;
				changeColors(clickedColor);
			}else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}
}



function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random =Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var colors = [];
	for(var i = 0; i < num; i++){
		colors[i] = randomColor();
	}
	return colors;
}

function randomColor(){
	//generate a random RGB color
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);

	var color = "rgb("+red+", "+green+", "+blue+")"
	return color;
}

function reset(){
	colors = generateRandomColors(num);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}else{
			squares[i].style.display = "none";
		}
		
	}
	h1.style.background = "steelblue";
}