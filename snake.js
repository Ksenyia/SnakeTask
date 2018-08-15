var dots;

var score;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_NUMBER = 20;
const ALL_DOTS = 400;
const MAX_RAND = 399;
const MAX_RAND_SNAKE = 15;
const DELAY = 500;
const C_HEIGHT = 19;
const C_WIDTH = 19;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(DOT_NUMBER);
var y = new Array(DOT_NUMBER);
var id = new Array(ALL_DOTS);
var id_old = new Array(ALL_DOTS);


function init() {
    drawingField()
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}    


function drawingField(){
	var field = document.getElementById("field");
	var new_id = 0;
	for (var i=0; i < DOT_NUMBER; i++){
		for (var j=0; j < DOT_NUMBER; j++){

			var newDiv = document.createElement("DIV");
			newDiv.setAttribute("class","block");
			newDiv.setAttribute("id",new_id)
			newDiv.style.background = "blue";
			field.appendChild(newDiv);
			new_id++;
		}
		var newP = document.createElement("br");
		field.appendChild(newP);
	}
}


function createSnake() {

    score = 0;
    dots = 3;
    var x_start = Math.floor(Math.random() * MAX_RAND_SNAKE);
    var y_start = Math.floor(Math.random() * MAX_RAND_SNAKE);
    for (var z = 0; z < dots; z++) {
	x[z] = x_start +z;
	y[z] = y_start;
        id[z] = x[z]+DOT_NUMBER*y[z];
	id_old[z]=id[z];
    }
}

function checkApple() {

    if (id[0] == apple_id) {

        dots++;
        locateApple();
	score+=20;
    }
}    

function doDrawing() {
	for (var z = 0; z < dots; z++) {
		var fon = document.getElementById(id_old[z]);
		fon.style.backgroundColor = "blue";

    }
	
    if (inGame) {
        var apple = document.getElementById(apple_id);
		apple.style.backgroundColor = "red";

        for (var z = 0; z < dots; z++) {
            var snake = document.getElementById(id[z]);
	    snake.style.backgroundColor = "black";

        }    
    } else {

       gameOver();
    }  	
}


function gameOver() {
    
    alert("Game over \n your score: "+score);
	
}

function move() {

	for (var z = 0; z < dots; z++) {
	id_old[z]=id[z]
    }
    for (var z = dots; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
	id[z] = id[(z - 1)];
		
    }

    if (leftDirection) {
        x[0] --;
    }

    if (rightDirection) {
        x[0] ++;
    }

    if (upDirection) {
        y[0] --;
    }

    if (downDirection) {
        y[0] ++;
    }
	id[0] = x[0]+DOT_NUMBER*y[0];
}    

function checkCollision() {
	
    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {
      inGame = false;
    }

    if (x[0] < 0) {
      inGame = false;
    }
}

function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_id = r;
}    

function gameCycle() {
    if (inGame) {
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {
    
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    
