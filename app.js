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
    constructor(img, x, y, dx, dy){
        this.Sprite = new Image(80, 80);
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.dx = dx || (canvasW / 20);
        this.dy = dy || (canvasH / 15);
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
        } else if (this.X + this.dx <= this.Sprite.width){
            // preventing further left movement
            this.X ++;
        }
            // Checking boundaries for Y axis top side
        if (this.Y + (this.dy / 2) > (canvasH-this.Sprite.height)) {
            // preventing further downwards movement
            this.Y --;
            // Checking boundaries for Y axis top side
        } else if (this.Y + this.dy <= this.Sprite.height){
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

    playerCollision(){
        if (
            newPlayer.X < this.X + (this.Sprite.width / 2) &&
            newPlayer.X + newPlayer.Sprite.width > this.X &&
            newPlayer.Y < this.Y + (this.Sprite.height / 2) &&
            newPlayer.Y + newPlayer.Sprite.height > this.Y
        ){
            newPlayer.X ++
            newPlayer.Y --
    }
}

    ghostCollision(){
        if (
            enemyGhost.X < this.X + (this.Sprite.width / 2) &&
            enemyGhost.X + (enemyGhost.Sprite.width / 2) > this.X &&
            enemyGhost.Y < this.Y + (this.Sprite.height / 2) &&
            enemyGhost.Y + (enemyGhost.Sprite.height / 2) > this.Y
            ){
            enemyGhost.dy = -enemyGhost.dy;
            enemyGhost.dx = -enemyGhost.dx;
        }
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
        if (
            newPlayer.X < this.X + (this.Sprite.width / 2) &&
            newPlayer.X + (newPlayer.Sprite.width / 2) > this.X &&
            newPlayer.Y < this.Y + (this.Sprite.height / 2) &&
            newPlayer.Y + (newPlayer.Sprite.height / 2) > this.Y
            ) {
            window.alert(`Into the unknown! (You've lived another day)`);
            document.location.reload();
            clearInterval(interval);
        }
    } 
}

    
// class for randomly moving Spooky object
class Spooky{
    constructor(img, x, y, dx, dy){
        this.Sprite = new Image(80, 80);
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.dx = dx || 0.7;
        this.dy = dy || 0.7;
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


let newPlayer = new Player("Resources\\cover.png", 100, 100)
let firstGate = new Gateway("Resources\\gateway.png", (canvasW - 50), (canvasH - 150))
let randomRocks = [

    new Rocks("Resources\\rock.png", (Math.floor(Math.random() * (canvasW * 0.95))), (Math.floor(Math.random() * (canvasH * 0.95)))),
    new Rocks("Resources\\rock.png", (Math.floor(Math.random() * (canvasW * 0.95))), (Math.floor(Math.random() * (canvasH * 0.95)))),
    new Rocks("Resources\\rock.png", (Math.floor(Math.random() * (canvasW * 0.95))), (Math.floor(Math.random() * (canvasH * 0.95)))),
    new Rocks("Resources\\rock.png", (Math.floor(Math.random() * (canvasW * 0.95))), (Math.floor(Math.random() * (canvasH * 0.95)))),
    new Rocks("Resources\\rock.png", (Math.floor(Math.random() * (canvasW * 0.95))), (Math.floor(Math.random() * (canvasH * 0.95)))),
    new Rocks("Resources\\rock.png", (Math.floor(Math.random() * (canvasW * 0.95))), (Math.floor(Math.random() * (canvasH * 0.95)))),
]
console.log(randomRocks)
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

let enemyGhost = new Spooky("Resources\\spooky.png", (canvasW * 0.75), (canvasH * 0.75));

// Create function for collisions
function checkCollide() {
    if (newPlayer.X < enemyGhost.X + (enemyGhost.Sprite.width / 1.7) &&
        newPlayer.X + (newPlayer.Sprite.width / 1.7) > enemyGhost.X &&
        newPlayer.Y < enemyGhost.Y + (enemyGhost.Sprite.height / 1.7) &&
        (newPlayer.Sprite.height / 1.7) + newPlayer.Y > enemyGhost.Y) {
            window.alert('Game over!'); // Update this later with more flavor text
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
    randomRocks.forEach(i => i.Sprite.onload = window.requestAnimationFrame(gameLoop))
}

function gameLoop(){
    // Clearing canvas
    ctx.clearRect(0, 0, canvasW, canvasH);
    // Drawing ghost at coordinates x and y, with defined size.
    ctx.drawImage(enemyGhost.Sprite, enemyGhost.X, enemyGhost.Y, 80, 80);
    // Drawing player
    ctx.drawImage(newPlayer.Sprite, newPlayer.X, newPlayer.Y, 80, 80);

    ctx.drawImage(firstGate.Sprite, firstGate.X, firstGate.Y, 50, 150);

    randomRocks.forEach(element => ctx.drawImage(element.Sprite, element.X, element.Y, 75, 75));
    randomRocks.forEach(element => element.playerCollision());
    randomRocks.forEach(element => element.ghostCollision());
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

