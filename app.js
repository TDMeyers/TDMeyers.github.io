// Create global variables for drawing the game window
const
divHeight = document.getElementById('game-portal').clientHeight;
divWidth = document.getElementById('game-portal').clientWidth;

// Create global variables for drawing maps onto canvas
const 
canvas = document.getElementById("game-view");
ctx = canvas.getContext("2d");
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;

// Create global variables for button functions
const
// - Directionals
left = document.getElementById("left");
right = document.getElementById("right");
up = document.getElementById("up");
down = document.getElementById("down");
// - Flashlight
turnOn = document.getElementById("on");
turnOff = document.getElementById("off");
// - Game Controls
start = document.getElementById("start");
reset = document.getElementById("reset");
reset.addEventListener('click', function(event){
    location.reload();
})
// Creating function to draw Canvas element onto page. 
function createCanvas() {
    canvas.height = divHeight;
    canvas.width = divWidth;
    }
// Drawing Canvas area to place game window in on document load.
window.addEventListener('load', function(event){
    createCanvas();
    }
)
// Adding resize listener so that the game window adjusts automatically to resize events.
window.addEventListener('resize', function(event){
    createCanvas();
    }, true )

// Create class for Player character
class Player{
    constructor(img, x, y, dx, dy, radius){
        this.Sprite = new Image();
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.dx = dx || 20;
        this.dy = dy || 20;
        this.radius = radius || 80;
    }
        // Movement functions for Player
        moveUp(){
            this.Y -= this.dy;
        };
        moveDown(){
            this.Y += this.dy;
        }
        moveLeft(){
            this.X -= this.dx;
        }
        moveRight(){
            this.X += this.dx;
        }
        // Creating collision function for Player 
        collision() {
        if (this.X + this.dx > divWidth-this.radius || this.X + this.dx < 0) {
            this.dx = -this.dx;
        }
        
        if (this.Y + this.dy > divHeight-this.radius || this.Y + this.dy < 0) {
            this.dy = -this.dy;
        }
    }
}
// class for randomly moving Spooky object
class Spooky{
    constructor(img, x, y, dx, dy, radius){
        this.Sprite = new Image();
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.dx = dx || 1;
        this.dy = dy || 1;
        this.radius = radius || 80;
    }

    moveBounce() {
        // Movement function for Spooky
        this.X += this.dx;
        this.Y += this.dy;
        
        // Creating collision function for Spooky 
        if (this.X + this.dx > divWidth-this.radius || this.X + this.dx < 0) {
            this.dx = -this.dx;
        }
        
        if (this.Y + this.dy > divHeight-this.radius || this.Y + this.dy < 0) {
            this.dy = -this.dy;
        }
    }
}

// Create class for Map Objects
// Create class for flashlight? (maybe - probably not, leaving for stretch goal) 
// Create variables and DOM display for character stats

// Create function for detecting game win state
// Create function for resetting the game
let newPlayer = new Player("Resources\\cover.png", 100, 100)

// Create function for movement for arrow buttons
const moveLeft = document.getElementById('left')
moveLeft.onclick = (event) => {
    newPlayer.moveLeft();
    console.log('left has been pressed')
}
const moveRight = document.getElementById('right')
moveRight.onclick = (event) => {
    newPlayer.moveRight();
    console.log('right has been pressed')
}
const moveUp = document.getElementById('up')
moveUp.onclick = (event) => {
    newPlayer.moveUp();
    console.log('up has been pressed')
}
const moveDown = document.getElementById('down')
moveDown.onclick = (event) => {
    newPlayer.moveDown();
    console.log('down has been pressed')
}

let enemyGhost = new Spooky("Resources\\spooky.png", 1000, 500);

// Create function for collisions
function checkCollide() {
    if (newPlayer.X < enemyGhost.X + (enemyGhost.radius - 15) &&
        newPlayer.X + (newPlayer.radius - 15) > enemyGhost.X &&
        newPlayer.Y < enemyGhost.Y + (enemyGhost.radius - 15) &&
        (newPlayer.radius - 15) + newPlayer.Y > enemyGhost.Y) {
            window.alert('Game over!')
        }
}


// Create start button listener to execute start()
start.addEventListener('click', gameStart);

// Setting repeating game timer loop

// Create start button function
function gameStart () {
    start.value = 'game started';
    // start gameLoop()
    // Load in Player and Ghost characters
    enemyGhost.Sprite.onload = window.requestAnimationFrame(gameLoop);
    newPlayer.Sprite.onload = window.requestAnimationFrame(gameLoop);

}

function gameLoop(){
    // Clearing canvas
    ctx.clearRect(0, 0, divWidth, divHeight);
    // Drawing ghost at coordinates x and y, with defined size.
    ctx.drawImage(enemyGhost.Sprite, enemyGhost.X, enemyGhost.Y, 80, 80);
    // Drawing player
    ctx.drawImage(newPlayer.Sprite, newPlayer.X, newPlayer.Y, 80, 80)
    // Start ghost movement and wall? collision
    enemyGhost.moveBounce();
    // start player wall? collision
    newPlayer.collision();
    // start player and ghost collisions
    checkCollide();
    // Declaring time frame for interval checking. 
    window.requestAnimationFrame(gameLoop);
}

console.log(newPlayer.Sprite.width, newPlayer.Sprite.height);
console.log(newPlayer.X, newPlayer.Y);
console.log(enemyGhost.Sprite.width, enemyGhost.Sprite.height);
console.log(enemyGhost.width, enemyGhost.height);
console.log(newPlayer, enemyGhost)