# TDMeyers.github.io

Cave Explorer DOM based browser game 
------------------------------------------------------------------
(not the most interesting title, but it gets the point across!)
- Project 1 for Activate Work and Per Scholas
------------------------------------------------------------------
Hosted on Github Pages at https://tdmeyers.github.io/
------------------------------------------------------------------

----------------- Motivations ------------------------------------

I wanted to make a game that would be a stretch of my capabilities as a burgeoning learner and software developer. Having had no prior exposure to code of any sort, I felt this was an excellent benchmarking opportunity to conclude the first Module of the Activate Work / Per Scholas journey. I can confidently say that before beginning the program I would absolutely NOT have been able to produce anything like this - amateur hour it may be - no matter how many hours went in. As it stands, I plan to continue to invest time into polish and development as I believe it is an excellent display of a variety of web developement skills and techniques. This will likely become one of my highlighted portfolio projects, and I'm ecstatic that I was able to reach even this point (per my commit today on 6/29/2023). Can't wait to see where I'll be able to take it. Thank you to all the amazing artists and graphics designers that allow their work to be shared under the various creative commons licenses - the world would be far duller without your shine. 

--------------------------- Build Status -------------------------

Currently still very much a W.I.P. Also on the docket is improving the overal UI/UX to something more cohesive and staging more animations and text. I'l list out some extra ideas below as they come to me. 

- Lives 
- Extra levels
- Timed/limited battery
- Stamina tracker
- Flashlight object

----------------------- Current Bugs/Challenges -------------------

Repeatedly pressing "start" button incrementally and greatly speeds up ghost character. Multiple attempts to reset related values and timers have proven unsuccessful. 

Player character does not have solid interaction with the boundaries, and sometimes slips through. Collision logic likely to blame. 

---------------------------- Code Style --------------------------

Honestly, as far as I'm aware the code style is pretty standard. I've tried to use Semantic HTML when possible, and keep the logic of the game separated out without too much codependency or overlap. I have also attempted to be verbose in my comments in the JS page, so that the overall layout can be followed. 

--------------------------- Screenshots? ------------------------

Find one linked here, maybe: 


--------------------------- Tech / Framework --------------------

In the spirit of the project I have tried to utilize outside libraries as little as possible and keep the scope constrained to HTML/CSS/JavaScript. I did utilize Canvas and its myriad of capabilites for the game window and plan on extending the animation framework in the future for more visually engaging gameplay. 


--------------------------- Features -----------------------------

One point that I really tried to focus on in this project is making it display-dynamic and responsive. I have tried to hardcode as few values as possible and thus the overall look and feel should change only slightly, within reason, between various sizes of displays.  

-------------------------- Code Ex: -------------------------------

This is a snapshot of the loop that begins the "game run", which draws the objects on screen and begins movement and checking for various collisions and interactions. 

-------------------------------------------------------------------

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

By looping through and using the RequestAnimationFrame, I can time the redrawing of the canvas to the refresh rate of the browser and display and attempt to ensure that all objects are kept onscreen at roughly the same rate and method. This also keeps the function checks consistent at the same pace so that one check does not happen significantly faster or slower than the others. 

--------------------------------------------------------------------
-------------------------- Installation ----------------------------

This will be to host from your own GitHub pages.io site, cloned from this project! The initial configuration steps can also be found on https://pages.github.com/ 

- Make a new github repo for your project, naming it username.github.io, remmeber to keep it public so that it can be deployed. 

From Git Bash:

cd into your desired directory 

type "git clone" and then paste the following:

git clone https://github.com/username/username.github.io

- enter your project folder and add an index.html file, like so:
cd username.github.io
touch index.html

then push it! (push it~)

git add --all
git commit -m "initial commit"
git push -u origin main

then cd back to your 'main' directory

type "git clone" and paste the following:

https://github.com/TDMeyers/TDMeyers.github.io

press "enter" to create your local clone. 

---------------------- How to Play: --------------------------------

Pretty simple! Start with the labeled button, move with the provided arrow keys. Depending on when you see this, the flashlight may-or-may-not be working. But try the buttons out anyway!


---------------------- Want to Contribute? -------------------------

You're awesome for doing so!! Please keep in mind that I am at the very basic levels of publishing this so some things may look clumsy and/or not be optimized. This is intentional and OK, as this is a project for learning - not monetization. 

Feel free to propose changes or constructive criticism in a pull request. 

Issue Focuses:

- What browser are you using? Does it occur on all browsers or just one? 

- What resolution does the error occur on? Is it repeatable on multiple screen sizes? 

- Screenshots are very helpful, but I understand the current limitations.

- Expected and/or deviated behavior. 

- If you're so inclined - browser version. 

The more detail, the less chances of a miscommunication. Thank you for assisting me in the journey of learning!


--------------------- Licensing -----------------------------------

This is created under the GNU Affero General Public License v3.0

Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.

--------------------------------------------------------------------

Flashlight image from https://pngimg.com/uploads/flashlight/flashlight_PNG11108.png

Coin slot image from https://www.publicdomainpictures.net/en/view-image.php?image=285805&picture=drop-coin-slot

Awesome pixel art explorer credit to Chr0ma Dave at 
https://chroma-dave.itch.io/pixelart-hiker

Portal art from: https://www.pngall.com/portal-png/download/33537


Typewriter CSS animation tutorial from: 

https://dev.to/afif/a-multi-line-css-only-typewriter-effect-3op3

Additional fonts acquired from Google Fonts

2D collision and bounding tutorial by MDN 

https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
