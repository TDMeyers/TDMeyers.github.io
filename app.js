// Create global variables for drawing the game window
const divHeight = document.getElementById('game-portal').clientHeight;
const divWidth = document.getElementById('game-portal').clientWidth;

// Create global variables for drawing maps onto canvas
const canvas = document.getElementById("game-view");
const ctx = canvas.getContext("2d");
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;
console.log(ctx)

//Adjust Canvas dimensions to containing div
canvas.width = divWidth
canvas.height = divHeight

// Confirm correct canvas width and height dimensions adjusted to parent containing div
const canvasW = canvas.getBoundingClientRect().width;
const canvasH = canvas.getBoundingClientRect().height;
console.log(canvasW, canvasH)

// Create global variables for button functions
// Directionals 
const left = document.getElementById("left");
const right = document.getElementById("right");
const up = document.getElementById("up");
const down = document.getElementById("down");
// - Flashlight
const turnOn = document.getElementById("on");
const turnOff = document.getElementById("off");
// - Game Controls
const start = document.getElementById("start");
const gameReset = document.getElementById("reset");
gameReset.addEventListener('click', function(event){
    document.location.reload();
    clearInterval(interval);
})
// Creating function to draw Canvas element onto page. 
function createCanvas() {
    canvas.height = canvasH;
    canvas.width = canvasW;
    }
// Drawing Canvas area to place game window in on document load.
window.addEventListener('load', function(event){
    createCanvas();
    }
)
// Adding resize listener so that the game window adjusts automatically to resize events.
window.addEventListener('resize', function(event){
    createCanvas();
})

// Create class for Player character
class Player{
    constructor(img, x, y, dx, dy, radius){
        this.Sprite = new Image(80, 80);
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.dx = dx || (canvasW / 15);
        this.dy = dy || (canvasH / 10);
        // this.radius = radius || 80;
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
        // Creating collision function for Player + Boundaries
        collision() {
            // Checking boundaries for X axis right side
        if (this.X + (this.dx / 4) >= (canvasW-this.Sprite.width)){
            // preventing further right movement
            this.X --;
            // Checking boundaries for X axis left side 
        } else if (this.X + this.dx <= (0+ this.Sprite.width)){
            // preventing further left movement
            this.X ++;
            
        }
            // Checking boundaries for Y axis top side
        if (this.Y + (this.dy / 2) > (canvasH-this.Sprite.height)) {
            // preventing further downwards movement
            this.Y --;
            // Checking boundaries for Y axis top side
        } else if (this.Y + this.dy <= (0 + this.Sprite.height)){
            // preventing further upwards movement
            this.Y ++;
        } 
    }
}
class Rocks{
    constructor(img, x, y){
        this.Sprite = new Image(50, 50);
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
    }
}
class Gateway{
    constructor(img, x, y){
        this.Sprite = new Image(25, 100);
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
    }
    gateColision(){
        if (newPlayer.X + newPlayer.dx >= this.X && newPlayer.Y + newPlayer.dx >= this.Y) {
            window.alert(`Into the unknown! (You've lived another day)`);
            document.location.reload();
            clearInterval(interval);
        }
    } 
}

    
// class for randomly moving Spooky object
class Spooky{
    constructor(img, x, y, dx, dy, radius){
        this.Sprite = new Image(80, 80);
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.dx = dx || 1;
        this.dy = dy || 1;
        // this.radius = radius || 80;
    }

    moveBounce() {
        // Movement function for Spooky
        this.X += this.dx;
        this.Y += this.dy;
        
        // Creating collision function for Spooky 
        // if (this.X + this.dx > divWidth-this.radius || this.X + this.dx < 0) {
            if (this.X + this.dx > canvasW-this.Sprite.width || this.X + this.dx < 0) {

            this.dx = -this.dx;
        }
        
        if (this.Y + this.dy > canvasH-this.Sprite.height || this.Y + this.dy < 0) {
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
let firstGate = new Gateway("Resources\\gateway.png", (canvasW - 25), (canvasH - 100))

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

let enemyGhost = new Spooky("Resources\\spooky.png", (canvasW * 0.8), (canvasH * 0.8));

// Create function for collisions
function checkCollide() {
    if (newPlayer.X < enemyGhost.X + (enemyGhost.Sprite.width / 1.7) &&
        newPlayer.X + (newPlayer.Sprite.width / 1.7) > enemyGhost.X &&
        newPlayer.Y < enemyGhost.Y + (enemyGhost.Sprite.height / 1.7) &&
        (newPlayer.Sprite.height / 1.7) + newPlayer.Y > enemyGhost.Y) {
            window.alert('Game over!');
            document.location.reload();
            clearInterval(interval);
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
    firstGate.Sprite.onload = window.requestAnimationFrame(gameLoop);

}

function gameLoop(){
    // Clearing canvas
    ctx.clearRect(0, 0, canvasW, canvasH);
    // Drawing ghost at coordinates x and y, with defined size.
    ctx.drawImage(enemyGhost.Sprite, enemyGhost.X, enemyGhost.Y, 80, 80);
    // Drawing player
    ctx.drawImage(newPlayer.Sprite, newPlayer.X, newPlayer.Y, 80, 80);

    ctx.drawImage(firstGate.Sprite, firstGate.X, firstGate.Y, 25, 100)
    // Start ghost movement and wall? collision
    enemyGhost.moveBounce();
    // start player wall? collision
    newPlayer.collision();
    // start player and ghost collisions
    firstGate.gateColision();

    checkCollide();

    // Declaring time frame for interval checking. 
    window.requestAnimationFrame(gameLoop);
}

