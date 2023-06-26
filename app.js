// Drawing Canvas area to place game window in on document load.
window.addEventListener('load', function(event){
    function createCanvas() {
        let canvas = document.getElementById('game-view');
        let divHeight = document.getElementById('game-portal').clientHeight;
        let divWidth = document.getElementById('game-portal').clientWidth;
        canvas.height = divHeight;
        canvas.width = divWidth;
        }
    createCanvas();
    }
)
// Adding resize listener so that the game window adjusts automatically to resize events.
window.addEventListener('resize', function(event){
    createCanvas();
    }, true )

// Create global variables for drawing maps onto canvas
let canvas = document.getElementById("game-view");
let ctx = canvas.getContext("2d");

// Create class for Player character
class Player {
    constructor(name, stamina, health, mvmnt){
        this.name = name || "Hero",
        this.stamina = stamina || 25,
        this.health = health || 10,
        this.mvmnt = mvmnt || 1
    }
}
// Create class for Map Objects
// Create class for flashlight? (maybe)

// Create function for collisions
// Create function for detecting game win state
// Create function for movement for arrow buttons



