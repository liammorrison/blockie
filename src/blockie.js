//Game Setup

//Allows the canvas to be drawn on and interacted with.
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

//Sets the line width for all internal drawing (like the warning flashes for bombs).
context.lineWidth = 4;

//Sprite maps. 

//These are used when drawing to easily reference sprites. They are large sprite maps to avoid loading many individual sprite 
//files (which would hurt performance).

let spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "images/spBlockiePlaying.png";

let spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "images/spBlockieDestructing.png";

let spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "images/spBlockieRecoveringFromDash.png";

let spCountdownDestructionScene = document.createElement("img");
spCountdownDestructionScene.src = "images/spCountdownDestructionScene.png";

//Sound Loading

let sngAnticipate = new Audio("sounds/anticipate.ogg");
let sngCelebrate = new Audio("sounds/celebrate.ogg");
let sngChill = new Audio("sounds/chill.ogg");
let sngHurry = new Audio("sounds/hurry.ogg");
let sngMourn = new Audio("sounds/mourn.ogg");
let sngPersevere1 = new Audio("sounds/persevere1.ogg");
let sngPersevere2 = new Audio("sounds/persevere2.ogg");
let sngPersevere3 = new Audio("sounds/persevere3.ogg");
let sngPersevereZ = new Audio("sounds/persevereZ.ogg");

//Variables

//Holds the level that Blockie is currently playing. Saved in localStorage.
let currentLevelNum;

//Stores the number of levels that are unlocked (since the game is linear, each newly unlocked level is 1 higher than the previous 
//one). Saved in localStorage.
let numUnlockedLevels;

//gameState determines which parts of the game and drawing loops run.
let gameState = "playing";

//Used to stop async/await functions by preventing another await to run. Used when Blockie touches activePoints and the current
//instances needs to stop running, yet everything cannot be rejected (because that would stop the level too).
let cancelAwaitChain = false;

//gameScale changes to fit the gameContainer along the most constrained axis.
let gameScale = 1;

//Globally declares the countdown used in createCountdownTimer() to allow it to always be reset when the level ends or completes.
let countdown = 0;

//Temporarily holds the points gathered during the currentLevel. They are transferred to earnedPoints to be made permanent once the
//level is completed.
let currentLevelPoints = 0;

let xInput = 0;
let yInput = 0;

//Determines if Blockie can move based on collisions.
let preventingMovement = false;

let dashDistance = 96;
let recoveringFromDash = false;
let allowDashAgain = true;
let dashRecoverySeconds = 0.3;
let allowDashAgainSeconds = 0.9;

//Holds the index of the levelMenuIcon that is currently being hovered over.
let levelHoveringIconNum = 0;

let purple = "#A600FF";
let orange = "#FF9D00";

let blue = "#0050FC";
let yellow = "#FFEE00";

//Color of walls.
let changingColorOne = purple;

//Color of Bombs and lasers.
let changingColorTwo = orange;

let passivePointColor = "#85BB65";
let activePointColor = "#F02800";
let blockieSurroundingColor = "#378CFF";

//Holds the .ogg file of the song that is currently playing so that songs can be universally manipulated.
let currentSong = sngChill;

//Arrays

//Holds the highest number of points that were touched in a full run of each level. Saved in localStorage.
let earnedPoints;

//Holds all keys that are pressed.
let keysDown = [];

//Used to prevent keys that have already been pressed from being placed back into the keysDown array until that key has been released.
//Most keys in most circumstances (dashing, menu selection, etc.) delete themselves from the keysDown array on the frame that they are
//used, so this prevents the key from being used in any way until it is released. Some keys in some circumstances (like moving) 
//require the key to remain in keysDown for all the frames that they are held, so those keys are not deleted until they are released.
let keysHeld = [];

//These arrays hold all instances of their class, so that it is easier to draw, activate, and deactivate each obstacle type.

let waitingTimeouts = [];
let endScreenTimeouts = [];
let passivePoints = [];
let movingPassivePoints = [];
let activePoints = [];
let movingActivePoints = [];
let movingHorizontalLasers = [];
let movingVerticalLasers = [];
let bombs = [];
let movingBombs = [];
let walls = [];
let movingWalls = [];
let partyHats = [];

//Used in for loops to apply a function to many object types.
let allInstances = [];
let allInteractiveInstances = [];
let allCollisionInstances = [];

//These hold all of the timing events that are not linked to specific instances so that they can be set and cleared manually.
let uniqueTimeouts = [];
let uniqueIntervals = [];

//Holds all instances that Blockie is currently touching and moves him away from walls, then it collects points, and then it killls
//Blockie if he's touching a harmful obstacle.
let collidingInstances = [];

//Holds the total number of points that spawn in each level.
let possiblePoints = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1];

//Holds a unique message that is displayed after completing each level (except the last level).
let levelMessages = [
    "The world will ask you who you are, <br>and if you do not know, <br>the world will tell you.",

    "Are you a problem?",

    "Quite an experience to live in fear, <br>isn't it? <br>That's what it is to be a slave.",
    "Hell is empty and the devils are here.",
    "WE HAVE MET THE ENEMY AND HE IS US.",

    "War. War never changes.",
    "If you do not change direction, <br>you may end up where you are heading.",

    "You're better off dead <br>when your mind's been set <br>from nine until five. <br>How could it be true? <br>Well it's happening to you. <br>So take my advice.",
    "Ogres are like onions. They have layers.",
    "You're like an ogre. Aren't you?",

    "Knowledge is having something to say. <br>Wisdom is knowing not to say it.",
    "Do not work for the food that perishes, <br>but for the food that endures for eternal life.",

    "It's good that you escaped. It's good that you lived."
];

//Classes

class Player {
    constructor() {
        this.width = 32;
        this.height = 32;

        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height / 2 - this.height / 2;

        this.speed = 2;
        this.angleMovingDegrees = 0;
        this.angleMovingRadians = 0;
        this.dx = 0;
        this.dy = 0;
        this.xSubPixel = 0;
        this.ySubPixel = 0;
        this.xTarget = this.x;
        this.yTarget = this.y;

        this.state = "playing";

        this.sprite = spBlockiePlaying;
        this.sx = 0;

        //Used to draw the remaining seconds meter above the instance.
        this.remainingDashSeconds = 0;
    };
};

class WaitingTimeout {
    constructor() {
        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class EndScreenTimeout {
    constructor() {
        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

//The difference between PassivePoints and ActivePoints is that the latter resolve all currently running promises when touched by
//Blockie, while the former do not.

class PassivePoint {
    constructor(x, y, totalFiringSeconds) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;

        //Used to draw the remaining seconds meter above the instance.
        this.totalFiringSeconds = totalFiringSeconds;
        this.remainingFiringSeconds = 0;
    };
};

class MovingPassivePoint {
    constructor(x, y, xSpeed, ySpeed, totalFiringSeconds) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;

        //Used to draw the remaining seconds meter above the instance.
        this.totalFiringSeconds = totalFiringSeconds;
        this.remainingFiringSeconds = 0;
    };
};

class ActivePoint {
    constructor(x, y, totalFiringSeconds) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class MovingActivePoint {
    constructor(x, y, xSpeed, ySpeed, totalFiringSeconds) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class MovingHorizontalLaser {
    constructor(y, height, speed) {
        this.x = 0;
        this.y = y;
        this.width = canvas.width;
        this.height = height;
        this.speed = speed;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class MovingVerticalLaser {
    constructor(x, width, speed) {
        this.x = x;
        this.y = 0;
        this.width = width;
        this.height = canvas.height;
        this.speed = speed;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class Bomb {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class MovingBomb {
    constructor(x, y, width, height, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    };
};

class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //Walls are always "firing" and visible.
        this.state = "firing";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    }
}

class MovingWall {
    constructor(x, y, width, height, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        //Walls are always "firing" and visible.
        this.state = "firing";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timeout;
    }
}

class PartyHat {
    constructor() {
        this.x = blockie.x + 8;
        this.y = -20;
        this.width = 16;
        this.height = 20;
    };
};

let blockie = new Player();

//Functions

//Level-Handling Functions

//Since these are frequently used numbers, they are variables for simplicity. The canvas' width and height are the same, so they 
//work with both axes.
let oneSixteenth = 2 * 16;
let oneEigth = 4 * 16;
let threeSixteenths = 6 * 16;
let oneFourth = 8 * 16;
let fiveSixteenths = 10 * 16;
let threeEigths = 12 * 16;
let sevenSixteenths = 14 * 16;
let oneHalf = canvas.width / 2;
let nineSixteenths = 18 * 16;
let fiveEigths = 20 * 16;
let elevenSixteenths = 22 * 16;
let threeFourths = 24 * 16;
let thirteenSixteenths = 26 * 16;
let sevenEigths = 28 * 16;
let fifteenSixteenths = 30 * 16;
let wholeScreen = 32 * 16;

let blockieAdjustment = -blockie.width / 2

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(threeSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, threeEigths),
            createWall(0, fiveEigths, wholeScreen, threeEigths),
            createActivePoint(thirteenSixteenths - 8, oneHalf - 8, 0),
            createPassivePoint(oneHalf - 8, oneHalf - 8, 0, 10)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, threeEigths),
            createWall(0, fiveEigths, oneEigth, threeEigths),
            createWall(oneFourth, fiveEigths, oneHalf, oneFourth),
            createWall(sevenEigths, fiveEigths, oneEigth, threeEigths),
            createPassivePoint(threeSixteenths - 8, fifteenSixteenths - 8, 0, 15),
            createPassivePoint(thirteenSixteenths - 8, fifteenSixteenths - 8, 0, 15),
 
            createActivePoint(threeSixteenths - 8, oneHalf - 8, 4)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeEigths, threeEigths),
            createWall(0, fiveEigths, threeEigths, threeEigths),
            createWall(fiveEigths, 0, threeEigths, wholeScreen),
            createActivePoint(oneHalf - 8, sevenEigths - 8, 0),
            createPassivePoint(oneHalf - 8, oneEigth - 8, 0, 10)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelTwo() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, threeFourths),
            createPassivePoint(threeSixteenths - 8, sevenEigths - 8, 0, 10),
 
            loopFireBombs(oneHalf - 16, threeFourths, 32, oneFourth, 2.2, 1, 1),
 
            createActivePoint(sevenEigths - 8, sevenEigths - 8, 2)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createActivePoint(oneHalf - 8, sevenEigths - 8, 0),
 
            loopFireBombs(threeFourths, 0, oneFourth, oneSixteenth, 0, 2, 0.2),
            loopFireBombs(threeFourths, oneSixteenth, oneFourth, oneSixteenth, 0.2, 2, 0.2),
            loopFireBombs(threeFourths, oneEigth, oneFourth, oneSixteenth, 0.4, 2, 0.2),
            loopFireBombs(threeFourths, threeSixteenths, oneFourth, oneSixteenth, 0.6, 2, 0.2),
            loopFireBombs(threeFourths, oneFourth, oneFourth, oneSixteenth, 0.8, 2, 0.2),
            loopFireBombs(threeFourths, fiveSixteenths, oneFourth, oneSixteenth, 1, 2, 0.2),
            loopFireBombs(threeFourths, threeEigths, oneFourth, oneSixteenth, 1.2, 2, 0.2),
            loopFireBombs(threeFourths, sevenSixteenths, oneFourth, oneSixteenth, 1.4, 2, 0.2),
            loopFireBombs(threeFourths, oneHalf, oneFourth, oneSixteenth, 1.6, 2, 0.2),
            loopFireBombs(threeFourths, nineSixteenths, oneFourth, oneSixteenth, 1.8, 2, 0.2),
            loopFireBombs(threeFourths, fiveEigths, oneFourth, oneSixteenth, 2, 2, 0.2),
            loopFireBombs(threeFourths, elevenSixteenths, oneFourth, oneSixteenth, 2.2, 2, 0.2),
            loopFireBombs(threeFourths, threeFourths, oneFourth, oneSixteenth, 2.4, 2, 0.2),
            loopFireBombs(threeFourths, thirteenSixteenths, oneFourth, oneSixteenth, 2.6, 2, 0.2),
            loopFireBombs(threeFourths, sevenEigths, oneFourth, oneSixteenth, 2.8, 2, 0.2),
            loopFireBombs(threeFourths, fifteenSixteenths, oneFourth, oneSixteenth, 3, 2, 0.2)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeEigths, wholeScreen),
            createWall(fiveEigths, 0, threeEigths, wholeScreen),
            createActivePoint(oneHalf - 8, threeSixteenths - 8, 0),
            fireMovingHorizontalLaser(wholeScreen - 32, 32, -1.5, 1, 5)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeEigths, threeEigths),
            createWall(fiveEigths, 0, threeEigths, threeEigths),
            createWall(0, fiveEigths, threeEigths, threeEigths),
            createWall(fiveEigths, fiveEigths, threeEigths, threeEigths),
            createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0),
            createPassivePoint(oneSixteenth - 8, oneHalf - 8, 0, 12),
            createPassivePoint(fifteenSixteenths - 8, oneHalf - 8, 0, 12),
            loopFireBombs(threeEigths, fiveEigths, oneFourth, oneFourth, 0, 1, 2)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelThree() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, wholeScreen),
            createWall(sevenSixteenths, 0, oneEigth, sevenSixteenths),
            createWall(sevenSixteenths, nineSixteenths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeFourths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
            createActivePoint(oneHalf - 8, oneHalf - 8, 0),
            createPassivePoint(oneHalf - 8, elevenSixteenths - 8, 0, 10)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, threeSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeEigths, wholeScreen, oneSixteenth),
            createWall(0, nineSixteenths, wholeScreen, sevenSixteenths),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(threeSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeEigths, 0, oneSixteenth, wholeScreen),
            createWall(nineSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeFourths, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            createPassivePoint(oneEigth - 8, oneHalf - 8, 0, 16),
            createPassivePoint(sevenEigths - 8, oneHalf - 8, 0, 16),
            loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 1, 1, 1),
            loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 1, 1, 1),
            loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 1, 1, 1),
            loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 1),
            loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 1),
            loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 1, 1, 1),
            loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 1, 1, 1),
 
            createActivePoint(oneHalf - 8, oneEigth - 8, 3)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, wholeScreen),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
            createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0),
            fireMovingHorizontalLaser(wholeScreen - 32, 32, -1.5, 0, 5)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createActivePoint(oneHalf - 8, oneSixteenth - 8, 0),
            loopFireMovingHorizontalLasers(0, 32, 2, 0, 1, 4),
            loopFireMovingHorizontalLasers(0, 32, 2, 2, 1, 4),
            loopFireMovingHorizontalLasers(0, 32, 2, 4, 1, 4),
            loopFireMovingHorizontalLasers(0, 32, 2, 6, 1, 4)
        ]);
 
        cancelAwaitChain = false;
 
        destroyCountdownTimer();
 
        endLevel();
    } catch (error) {};
};

async function levelFour() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, oneEigth + blockieAdjustment);
 
        createCountdownTimer(35);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(threeEigths, 0, oneSixteenth, sevenEigths),
            createWall(oneEigth, 0, oneFourth, sevenSixteenths),
            createWall(oneEigth, nineSixteenths, oneFourth, fiveSixteenths),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
            createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0),
            createPassivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0, 9),
 
            fireMovingVerticalLaser(27 * 16, 16, -1, 2, 9),
            fireMovingVerticalLaser(29 * 16, 16, -1, 2, 9),
            fireMovingVerticalLaser(wholeScreen - 16, 16, -1, 2, 9)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(oneEigth, 0, fiveSixteenths, sevenEigths),
            createWall(nineSixteenths, 0, oneHalf, wholeScreen),
            createActivePoint(oneHalf - 8, oneSixteenth - 8, 0),
 
            loopFireBombs(0, 0, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(0, oneEigth, oneEigth, oneEigth, 0.5, 0.5, 0.5),
            loopFireBombs(0, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(0, threeEigths, oneEigth, oneEigth, 1.5, 0.5, 0.5),
            loopFireBombs(0, oneHalf, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(0, fiveEigths, oneEigth, oneEigth, 0.5, 0.5, 0.5),
            loopFireBombs(0, threeFourths, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(0, sevenEigths, oneEigth, oneEigth, 1.5, 0.5, 0.5),
 
            loopFireBombs(sevenSixteenths, 0, oneEigth, oneEigth, 0.5, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, oneEigth, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1.5, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, threeEigths, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, oneHalf, oneEigth, oneEigth, 0.5, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, threeFourths, oneEigth, oneEigth, 1.5, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, sevenEigths, oneEigth, oneEigth, 1, 0.5, 0.5),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, wholeScreen),
            createWall(nineSixteenths, 0, sevenSixteenths, oneFourth),
            createWall(nineSixteenths, oneFourth, oneSixteenth, threeEigths),
            createWall(nineSixteenths, threeFourths, threeSixteenths, oneFourth),
            createWall(threeFourths, oneFourth, oneFourth, threeFourths),
            createActivePoint(oneHalf - 8, sevenEigths - 8, 0),
            createPassivePoint(elevenSixteenths - 8, fiveSixteenths - 8, 0, 5)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneFourth),
            createWall(0, oneFourth, oneFourth, thirteenSixteenths),
            createWall(threeFourths, oneFourth, oneFourth, thirteenSixteenths),
            createWall(oneFourth, oneFourth, threeSixteenths, threeSixteenths),
            createWall(nineSixteenths, oneFourth, threeSixteenths, threeSixteenths),
            createWall(oneFourth, nineSixteenths, threeSixteenths, sevenSixteenths),
            createWall(nineSixteenths, nineSixteenths, threeSixteenths, sevenSixteenths),
            createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth),
 
            fireBomb(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 0.7, 0.7),
 
            fireBomb(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 1.4, 0.7),
 
            fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7),
            fireBomb(oneFourth, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7),
            fireBomb(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7),
 
            fireMovingHorizontalLaser(0, 32, 2, 2.1, 10),
 
            createActivePoint(oneHalf - 8, oneHalf - 8, 3)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            fireBomb(16, 0, fifteenSixteenths, oneEigth, 0, 1),
            fireBomb(16, threeEigths, fifteenSixteenths, oneFourth, 0.15, 1),
            fireBomb(16, sevenEigths, fifteenSixteenths, oneEigth, 0.3, 1),
 
            fireBomb(0, 16, oneEigth, fifteenSixteenths, 2.45, 1),
            fireBomb(threeEigths, 16, oneFourth, fifteenSixteenths, 2.6, 1),
            fireBomb(sevenEigths, 16, oneEigth, fifteenSixteenths, 2.75, 1),
 
            createActivePoint(oneHalf - 8, oneHalf - 8, 7),
            fireBomb(oneEigth, 16, oneFourth, fifteenSixteenths, 4.75, 1),
            fireBomb(fiveEigths, 16, oneFourth, fifteenSixteenths, 4.9, 1),
            fireBomb(16, oneEigth, fifteenSixteenths, oneFourth, 5.05, 1),
            fireBomb(16, fiveEigths, fifteenSixteenths, oneFourth, 5.2, 1)
        ]);
 
        cancelAwaitChain = false;
 
        destroyCountdownTimer();
 
        endLevel();
    } catch (error) {};
};

async function levelFive() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneFourth),
            createWall(0, oneFourth, oneFourth, oneHalf),
            createWall(threeFourths, oneFourth, oneFourth, oneHalf),
            createWall(0, threeFourths, sevenSixteenths, oneEigth),
            createWall(nineSixteenths, threeFourths, sevenSixteenths, oneEigth),
            createActivePoint(oneEigth - 8, fifteenSixteenths - 8, 0),
 
            createPassivePoint(sevenEigths - 8, fifteenSixteenths - 8, 2, 7)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneEigth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);
 
        await Promise.all([
            createWall(oneFourth, oneFourth, threeSixteenths, threeFourths),
            createWall(sevenSixteenths, threeEigths, oneEigth, fiveEigths),
            createWall(nineSixteenths, oneFourth, threeSixteenths, threeFourths),
            createActivePoint(sevenEigths - 8, sevenEigths - 8, 0),
            createPassivePoint(oneHalf - 8, fiveSixteenths - 8, 5, 7),
 
            loopFireBombs(0, oneFourth, oneFourth, oneSixteenth, 0.7, 0, 0.4),
            loopFireBombs(0, oneHalf, oneFourth, oneSixteenth, 0, 0, 0.4),
            loopFireBombs(0, threeFourths, oneFourth, oneSixteenth, 0.7, 0, 0.4),
 
            fireMovingHorizontalLaser(0, 32, 1.4, 7, 10)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(sevenEigths + blockieAdjustment, sevenEigths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, threeSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeEigths, wholeScreen, oneSixteenth),
            createWall(0, nineSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeFourths, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(threeSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeEigths, 0, oneSixteenth, wholeScreen),
            createWall(nineSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeFourths, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            createActivePoint(oneEigth - 8, oneEigth - 8, 0),
            createPassivePoint(oneEigth - 8, sevenEigths - 8, 0, 17),
 
            createPassivePoint(oneHalf - 8, oneHalf - 8, 7, 7),
 
            loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 0, 2, 1),
 
            loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 2, 2, 1),
            loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 2, 2, 1),
            loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 0, 2, 1),
 
            loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 2, 2, 1),
            loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 0, 2, 1),
 
            loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 2, 2, 1),
            loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(fiveEigths, fiveEigths, oneEigth, oneEigth, 2, 2, 1),
            loopFireBombs(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 2, 1),
 
            loopFireBombs(oneFourth, thirteenSixteenths, oneEigth, oneEigth, 0, 2, 1),
            loopFireBombs(fiveEigths, thirteenSixteenths, oneEigth, oneEigth, 0, 2, 1),
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelSix() {
    try {
        initializeLevel(oneEigth + blockieAdjustment, oneEigth + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, threeSixteenths, thirteenSixteenths, oneFourth),
            createWall(0, sevenSixteenths, sevenSixteenths, oneEigth),
            createWall(0, nineSixteenths, wholeScreen, sevenSixteenths),
            createWall(0, 0, oneSixteenth, threeSixteenths),
            createWall(oneSixteenth, 0, fifteenSixteenths, oneSixteenth),
            createWall(fifteenSixteenths, oneSixteenth, oneSixteenth, oneHalf),
            createWall(17 * 16, oneSixteenth, oneSixteenth, oneEigth),
            createWall(thirteenSixteenths, threeEigths, oneEigth, oneSixteenth),
            createActivePoint(oneHalf - 8, oneHalf - 8, 0),
            loopFireBombs(9 * 16, oneSixteenth, oneFourth, oneEigth, 0.75, 0.5, 0.75),
            loopFireBombs(thirteenSixteenths, oneSixteenth, oneEigth, fiveSixteenths, 0.75, 0.5, 0.75),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneFourth),
            createWall(0, oneFourth, oneFourth, oneHalf),
            createWall(threeFourths, oneFourth, oneFourth, oneHalf),
            createWall(0, threeFourths, sevenSixteenths, oneEigth),
            createWall(nineSixteenths, threeFourths, sevenSixteenths, oneEigth),
            createActivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0),
            loopFireBombs(oneEigth, sevenEigths, fiveSixteenths, oneEigth, 0, 0.5, 0.75),
            loopFireBombs(nineSixteenths, sevenEigths, fiveSixteenths, oneEigth, 0, 0.5, 0.75),
 
            createPassivePoint(fifteenSixteenths - 8, fifteenSixteenths - 8, 2.5, 7)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, sevenEigths),
            createWall(sevenSixteenths, 0, oneEigth, sevenSixteenths),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
            createActivePoint(oneHalf - 8, oneHalf - 8, 0),
            fireMovingHorizontalLaser(0, 16, 0.7, 0, 10),
 
            fireMovingHorizontalLaser(31 * 16, 16, -1.6, 2, 10)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createActivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0),
            createPassivePoint(oneSixteenth - 8, oneHalf - 8, 0, 5),
            fireBomb(15 * 16, 15 * 16, oneSixteenth, oneSixteenth, 0.15, 0.5),
            fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 0.3, 0.5),
            fireBomb(13 * 16, 13 * 16, threeSixteenths, threeSixteenths, 0.45, 0.5),
            fireBomb(threeEigths, threeEigths, oneFourth, oneFourth, 0.6, 0.5),
            fireBomb(11 * 16, 11 * 16, fiveSixteenths, fiveSixteenths, 0.75, 0.5),
            fireBomb(fiveSixteenths, fiveSixteenths, threeEigths, threeEigths, 0.9, 0.5),
            fireBomb(9 * 16, 9 * 16, sevenSixteenths, sevenSixteenths, 1.05, 0.5),
            fireBomb(oneFourth, oneFourth, oneHalf, oneHalf, 1.2, 0.5),
            fireBomb(7 * 16, 7 * 16, nineSixteenths, nineSixteenths, 1.35, 0.5),
            fireBomb(threeSixteenths, threeSixteenths, fiveEigths, fiveEigths, 1.5, 0.5),
            fireBomb(5 * 16, 5 * 16, elevenSixteenths, elevenSixteenths, 1.65, 0.5),
            fireBomb(oneEigth, oneEigth, threeFourths, threeFourths, 1.8, 0.5),
            fireBomb(3 * 16, 3 * 16, thirteenSixteenths, thirteenSixteenths, 1.95, 0.5),
            fireBomb(oneSixteenth, oneSixteenth, sevenEigths, sevenEigths, 2.1, 0.5),
            fireBomb(1 * 16, 1 * 16, fifteenSixteenths, fifteenSixteenths, 2.25, 0.5),
            fireBomb(0, 0, wholeScreen, wholeScreen, 2.4, 0.5)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);
 
        await Promise.all([
            createActivePoint(oneHalf - 8, oneHalf - 8, 0),
            fireMovingHorizontalLaser(0, oneEigth, 1.4, 0, 10),
            fireMovingVerticalLaser(sevenEigths, oneEigth, -1.4, 0, 10)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelSeven() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, sevenSixteenths),
            createWall(0, sevenSixteenths, sevenSixteenths, oneEigth),
            createWall(nineSixteenths, sevenSixteenths, sevenSixteenths, oneEigth),
            createWall(0, nineSixteenths, wholeScreen, oneSixteenth),
            createWall(0, fiveEigths, oneFourth, oneEigth),
            createWall(threeEigths, fiveEigths, fiveEigths, oneEigth),
            createWall(0, threeFourths, wholeScreen, oneSixteenth),
            createWall(0, thirteenSixteenths, oneSixteenth, oneEigth),
            createWall(threeSixteenths, thirteenSixteenths, thirteenSixteenths, oneEigth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createActivePoint(oneEigth - 8, sevenEigths - 8, 0)
        ]);
 
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeFourths, oneFourth),
            createWall(0, oneFourth, oneHalf, oneFourth),
            createWall(threeFourths, oneFourth, oneFourth, oneFourth),
            createWall(0, oneHalf, oneFourth, oneFourth),
            createWall(oneHalf, oneHalf, oneHalf, oneFourth),
            createWall(oneFourth, threeFourths, threeFourths, oneFourth),
            createActivePoint(sevenEigths - 8, oneEigth - 8, 0),
            loopFireBombs(threeFourths, 0, oneFourth, oneFourth, 0, 0.5, 0.5),
            loopFireBombs(oneHalf, oneFourth, oneFourth, oneFourth, 1, 0.5, 0.5),
            loopFireBombs(oneFourth, oneHalf, oneFourth, oneFourth, 0, 0.5, 0.5),
            loopFireBombs(0, threeFourths, oneFourth, oneFourth, 1, 0.5, 0.5),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeFourths, oneEigth),
            createWall(0, oneEigth, fiveEigths, oneEigth),
            createWall(0, oneFourth, oneHalf, oneEigth),
            createWall(sevenEigths, oneFourth, oneEigth, oneEigth),
            createWall(0, threeEigths, threeEigths, oneEigth),
            createWall(threeFourths, threeEigths, oneFourth, oneEigth),
            createWall(threeFourths, oneHalf, oneFourth, oneEigth),
            createWall(0, oneHalf, threeEigths, oneEigth),
            createWall(sevenEigths, fiveEigths, oneEigth, oneEigth),
            createWall(0, fiveEigths, oneHalf, oneEigth),
            createWall(0, threeFourths, fiveEigths, oneEigth),
            createWall(0, sevenEigths, threeFourths, oneEigth),
            createActivePoint(sevenEigths - 8, sevenEigths - 8, 0),
            createPassivePoint(sevenSixteenths - 8, oneHalf - 8, 0, 20),
            loopFireBombs(threeEigths, threeEigths, oneEigth, oneFourth, 2.8, 2.4, 0.7),
            loopFireBombs(oneHalf, oneFourth, oneEigth, oneHalf, 2.8, 2.4, 0.7),
            loopFireBombs(fiveEigths, oneEigth, oneEigth, threeFourths, 2.8, 2.4, 0.7)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(sevenEigths + blockieAdjustment, sevenEigths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, threeSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeEigths, wholeScreen, oneSixteenth),
            createWall(0, nineSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeFourths, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(threeSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeEigths, 0, oneSixteenth, wholeScreen),
            createWall(nineSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeFourths, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            createActivePoint(oneEigth - 8, oneEigth - 8),
            createPassivePoint(oneEigth - 8, oneHalf - 8, 4.5, 7),
 
            loopFireBombs(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(sevenSixteenths, oneSixteenth, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 1, 1, 0.5),
 
            loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 0.5),
 
            loopFireBombs(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1, 1, 0.5),
 
            loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(fiveEigths, fiveEigths, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, 1, 1, 0.5),
 
            loopFireBombs(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(oneFourth, thirteenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 1, 1, 0.5),
            loopFireBombs(fiveEigths, thirteenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5),
            loopFireBombs(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 1, 1, 0.5),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, threeSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeEigths, wholeScreen, oneSixteenth),
            createWall(0, nineSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeFourths, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(threeSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeEigths, 0, oneSixteenth, wholeScreen),
            createWall(nineSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeFourths, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            createActivePoint(oneEigth - 8, sevenEigths - 8, 0),
 
            loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, oneSixteenth, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 0, 0.5, 0.5),
 
            loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 0, 0.5, 0.5),
 
            loopFireBombs(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5),
 
            loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(fiveEigths, fiveEigths, oneEigth, oneEigth, 1, 0.5, 0.5),
            loopFireBombs(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5),
 
            loopFireBombs(oneFourth, thirteenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5),
            loopFireBombs(fiveEigths, thirteenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5)
        ]);
 
        endLevel();
    } catch (error) {};
};

async function levelEight() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        createCountdownTimer(35);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, fiveSixteenths),
            createWall(oneEigth, sevenSixteenths, oneEigth, oneEigth),
            createWall(threeFourths, sevenSixteenths, oneEigth, oneEigth),
            createWall(0, elevenSixteenths, wholeScreen, fiveSixteenths),
            createActivePoint(oneSixteenth - 8, oneHalf - 8, 0),
            createPassivePoint(fifteenSixteenths - 8, oneHalf - 8, 0, 3),
 
            loopFireBombs(0, fiveSixteenths, oneFourth, oneEigth, 0, 0.7, 0.5),
            loopFireBombs(0, sevenSixteenths, oneEigth, oneFourth, 0.55, 0.7, 0.5),
            loopFireBombs(oneEigth, nineSixteenths, oneFourth, oneEigth, 1.1, 0.7, 0.5),
            loopFireBombs(oneFourth, fiveSixteenths, oneEigth, oneFourth, 1.65, 0.7, 0.5),
 
            loopFireBombs(threeFourths, fiveSixteenths, oneFourth, oneEigth, 0, 0.7, 0.5),
            loopFireBombs(sevenEigths, sevenSixteenths, oneEigth, oneFourth, 0.55, 0.7, 0.5),
            loopFireBombs(fiveEigths, nineSixteenths, oneFourth, oneEigth, 1.1, 0.7, 0.5),
            loopFireBombs(fiveEigths, fiveSixteenths, oneEigth, oneFourth, 1.65, 0.7, 0.5),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneEigth),
            createWall(0, oneFourth, wholeScreen, oneEigth),
            createWall(0, fiveEigths, wholeScreen, oneEigth),
            createWall(0, sevenEigths, wholeScreen, oneEigth),
            createActivePoint(fifteenSixteenths - 8, oneHalf - 8, 2),
 
            fireBomb(0, oneEigth, oneSixteenth, oneEigth, 0, 0.15),
            fireBomb(oneSixteenth, oneEigth, oneSixteenth, oneEigth, 0.15, 0.15),
            fireBomb(oneEigth, oneEigth, oneSixteenth, oneEigth, 0.3, 0.15),
            fireBomb(threeSixteenths, oneEigth, oneSixteenth, oneEigth, 0.45, 0.15),
            fireBomb(oneFourth, oneEigth, oneSixteenth, oneEigth, 0.6, 0.15),
            fireBomb(fiveSixteenths, oneEigth, oneSixteenth, oneEigth, 0.75, 0.15),
            fireBomb(threeEigths, oneEigth, oneSixteenth, oneEigth, 0.9, 0.15),
            fireBomb(sevenSixteenths, oneEigth, oneSixteenth, oneEigth, 1.05, 0.15),
            fireBomb(oneHalf, oneEigth, oneSixteenth, oneEigth, 1.2, 0.15),
            fireBomb(nineSixteenths, oneEigth, oneSixteenth, oneEigth, 1.35, 0.15),
            fireBomb(fiveEigths, oneEigth, oneSixteenth, oneEigth, 1.5, 0.15),
            fireBomb(elevenSixteenths, oneEigth, oneSixteenth, oneEigth, 1.65, 0.15),
            fireBomb(threeFourths, oneEigth, oneSixteenth, oneEigth, 1.8, 0.15),
            fireBomb(thirteenSixteenths, oneEigth, oneSixteenth, oneEigth, 1.95, 0.15),
            fireBomb(sevenEigths, oneEigth, oneSixteenth, oneEigth, 2.1, 0.15),
            fireBomb(fifteenSixteenths, oneEigth, oneSixteenth, oneEigth, 2.25, 0.15),
 
            fireBomb(0, threeEigths, oneSixteenth, oneFourth, 1, 0.15),
            fireBomb(oneSixteenth, threeEigths, oneSixteenth, oneFourth, 1.15, 0.15),
            fireBomb(oneEigth, threeEigths, oneSixteenth, oneFourth, 1.3, 0.15),
            fireBomb(threeSixteenths, threeEigths, oneSixteenth, oneFourth, 1.45, 0.15),
            fireBomb(oneFourth, threeEigths, oneSixteenth, oneFourth, 1.6, 0.15),
            fireBomb(fiveSixteenths, threeEigths, oneSixteenth, oneFourth, 1.75, 0.15),
            fireBomb(threeEigths, threeEigths, oneSixteenth, oneFourth, 1.9, 0.15),
            fireBomb(sevenSixteenths, threeEigths, oneSixteenth, oneFourth, 2.05, 0.15),
            fireBomb(oneHalf, threeEigths, oneSixteenth, oneFourth, 2.2, 0.15),
            fireBomb(nineSixteenths, threeEigths, oneSixteenth, oneFourth, 2.35, 0.15),
            fireBomb(fiveEigths, threeEigths, oneSixteenth, oneFourth, 2.5, 0.15),
            fireBomb(elevenSixteenths, threeEigths, oneSixteenth, oneFourth, 2.65, 0.15),
            fireBomb(threeFourths, threeEigths, oneSixteenth, oneFourth, 2.8, 0.15),
            fireBomb(thirteenSixteenths, threeEigths, oneSixteenth, oneFourth, 2.95, 0.15),
            fireBomb(sevenEigths, threeEigths, oneSixteenth, oneFourth, 3.1, 0.15),
            fireBomb(fifteenSixteenths, threeEigths, oneSixteenth, oneFourth, 3.25, 0.15),
 
            fireBomb(0, threeFourths, oneSixteenth, oneEigth, 0, 0.15),
            fireBomb(oneSixteenth, threeFourths, oneSixteenth, oneEigth, 0.15, 0.15),
            fireBomb(oneEigth, threeFourths, oneSixteenth, oneEigth, 0.3, 0.15),
            fireBomb(threeSixteenths, threeFourths, oneSixteenth, oneEigth, 0.45, 0.15),
            fireBomb(oneFourth, threeFourths, oneSixteenth, oneEigth, 0.6, 0.15),
            fireBomb(fiveSixteenths, threeFourths, oneSixteenth, oneEigth, 0.75, 0.15),
            fireBomb(threeEigths, threeFourths, oneSixteenth, oneEigth, 0.9, 0.15),
            fireBomb(sevenSixteenths, threeFourths, oneSixteenth, oneEigth, 1.05, 0.15),
            fireBomb(oneHalf, threeFourths, oneSixteenth, oneEigth, 1.2, 0.15),
            fireBomb(nineSixteenths, threeFourths, oneSixteenth, oneEigth, 1.35, 0.15),
            fireBomb(fiveEigths, threeFourths, oneSixteenth, oneEigth, 1.5, 0.15),
            fireBomb(elevenSixteenths, threeFourths, oneSixteenth, oneEigth, 1.65, 0.15),
            fireBomb(threeFourths, threeFourths, oneSixteenth, oneEigth, 1.8, 0.15),
            fireBomb(thirteenSixteenths, threeFourths, oneSixteenth, oneEigth, 1.95, 0.15),
            fireBomb(sevenEigths, threeFourths, oneSixteenth, oneEigth, 2.1, 0.15),
            fireBomb(fifteenSixteenths, threeFourths, oneSixteenth, oneEigth, 2.25, 0.15),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(fifteenSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, oneEigth, oneEigth, sevenEigths),
            createWall(9 * 16, 0, oneSixteenth, oneEigth),
            createWall(oneFourth, oneEigth, oneEigth, threeFourths),
            createWall(oneHalf, oneEigth, oneEigth, fiveSixteenths),
            createWall(oneHalf, nineSixteenths, oneEigth, sevenSixteenths),
            createWall(25 * 16, 0, oneSixteenth, oneEigth),
            createWall(threeFourths, oneEigth, oneEigth, threeFourths),
            createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0),
            createPassivePoint(nineSixteenths - 8, oneHalf - 8, 3, 4),
 
            loopFireBombs(11 * 16, 0, sevenSixteenths, oneSixteenth, 0, 1, 0.3),
            loopFireBombs(11 * 16, oneSixteenth, sevenSixteenths, oneSixteenth, 0.3, 1, 0.3),
            loopFireBombs(threeEigths, oneEigth, oneEigth, oneSixteenth, 0.6, 1, 0.3),
            loopFireBombs(fiveEigths, oneEigth, oneEigth, oneSixteenth, 0.6, 1, 0.3),
            loopFireBombs(threeEigths, threeSixteenths, oneEigth, oneSixteenth, 0.9, 1, 0.3),
            loopFireBombs(fiveEigths, threeSixteenths, oneEigth, oneSixteenth, 0.9, 1, 0.3),
            loopFireBombs(threeEigths, oneFourth, oneEigth, oneSixteenth, 1.2, 1, 0.3),
            loopFireBombs(fiveEigths, oneFourth, oneEigth, oneSixteenth, 1.2, 1, 0.3),
            loopFireBombs(threeEigths, fiveSixteenths, oneEigth, oneSixteenth, 1.5, 1, 0.3),
            loopFireBombs(fiveEigths, fiveSixteenths, oneEigth, oneSixteenth, 1.5, 1, 0.3),
            loopFireBombs(threeEigths, threeEigths, oneEigth, oneSixteenth, 1.8, 1, 0.3),
            loopFireBombs(fiveEigths, threeEigths, oneEigth, oneSixteenth, 1.8, 1, 0.3),
            loopFireBombs(threeEigths, sevenSixteenths, threeEigths, oneSixteenth, 2.1, 1, 0.3),
            loopFireBombs(threeEigths, oneHalf, threeEigths, oneSixteenth, 2.4, 1, 0.3)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneSixteenth + blockieAdjustment, oneSixteenth + blockieAdjustment);
 
        await Promise.all([
            createWall(oneEigth, 0, oneEigth, fiveSixteenths),
            createWall(oneFourth, 0, threeFourths, oneSixteenth),
            createWall(oneFourth, threeSixteenths, fiveEigths, oneEigth),
            createWall(oneEigth, fiveSixteenths, oneEigth, oneEigth),
            createWall(fiveEigths, fiveSixteenths, oneEigth, oneEigth),
            createWall(threeEigths, oneHalf, oneEigth, oneEigth),
            createWall(sevenEigths, oneHalf, oneEigth, oneEigth),
            createWall(0, fiveEigths, wholeScreen, threeEigths),
            createActivePoint(oneHalf - 8, oneEigth - 8, 0),
 
            loopFireBombs(oneFourth, fiveSixteenths, threeEigths, oneEigth, 0.7, 1.1, 0.7),
            loopFireBombs(threeFourths, fiveSixteenths, oneFourth, oneEigth, 2.1, 1.1, 0.7),
            loopFireBombs(0, oneHalf, threeEigths, oneEigth, 2.8, 1.1, 0.7),
            loopFireBombs(oneHalf, oneHalf, threeEigths, oneEigth, 1.4, 1.1, 0.7)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, oneSixteenth, oneSixteenth, oneHalf),
            createWall(threeSixteenths, oneSixteenth, oneSixteenth, oneEigth),
            createWall(threeFourths, oneSixteenth, oneSixteenth, oneEigth),
            createWall(threeSixteenths, sevenSixteenths, oneSixteenth, oneEigth),
            createWall(threeFourths, sevenSixteenths, oneSixteenth, oneEigth),
            createWall(fifteenSixteenths, oneSixteenth, oneSixteenth, oneHalf),
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(oneSixteenth, threeSixteenths, sevenEigths, oneSixteenth),
            createWall(oneSixteenth, threeEigths, sevenEigths, oneSixteenth),
            createWall(0, nineSixteenths, wholeScreen, sevenSixteenths),
 
            fireBomb(oneFourth, oneSixteenth, oneHalf, oneEigth, 0.25, 1),
            fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 0.25, 1),
 
            fireBomb(oneFourth, oneSixteenth, oneHalf, oneEigth, 2.25, 1),
            fireBomb(oneSixteenth, oneFourth, sevenEigths, oneEigth, 2.25, 1),
            fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 2.25, 1),
 
            fireBomb(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 4.5, 1),
            fireBomb(oneFourth, oneSixteenth, oneHalf, oneEigth, 4.5, 1),
            fireBomb(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 4.5, 1),
            fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 4.5, 1),
            fireBomb(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 4.5, 1),
 
            createActivePoint(oneEigth - 8, oneHalf - 8, 5.5)
        ]);
 
        cancelAwaitChain = false;
 
        destroyCountdownTimer();
 
        endLevel();
    } catch (error) {};
};

async function levelNine() {
    try {
        initializeLevel(oneEigth + blockieAdjustment, oneHalf + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, threeEigths),
            createWall(0, fiveEigths, wholeScreen, threeEigths),
            fireMovingActivePoint(threeFourths - 8, oneHalf - 8, 0.6, 0, 0)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(fifteenSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, sevenSixteenths),
            createWall(oneEigth, nineSixteenths, sevenEigths, fiveSixteenths),
            fireMovingActivePoint(fifteenSixteenths - 8, fifteenSixteenths - 8, -1.65, 0, 0),
 
            loopFireBombs(9 * 16, sevenSixteenths, oneSixteenth, oneEigth, 2.4, 1, 0.2),
            loopFireBombs(11 * 16, sevenSixteenths, oneSixteenth, oneEigth, 2.2, 1, 0.2),
            loopFireBombs(13 * 16, sevenSixteenths, oneSixteenth, oneEigth, 2, 1, 0.2),
            loopFireBombs(15 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.8, 1, 0.2),
            loopFireBombs(17 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.6, 1, 0.2),
            loopFireBombs(19 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.4, 1, 0.2),
            loopFireBombs(21 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.2, 1, 0.2),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, sevenEigths, sevenSixteenths),
            createWall(0, nineSixteenths, sevenEigths, fiveSixteenths),
            fireMovingActivePoint(fifteenSixteenths - 8, oneHalf - 8, 0, -0.25, 0),
            fireMovingPassivePoint(fifteenSixteenths - 8, oneHalf - 8, -0.8, 0, 0, 15),
            loopFireBombs(oneEigth, sevenSixteenths, fiveSixteenths, oneEigth, 0, 0.5, 0.75),
            loopFireBombs(nineSixteenths, sevenSixteenths, fiveSixteenths, oneEigth, 0, 0.5, 0.75),
            loopFireBombs(11 * 16, sevenEigths, fiveSixteenths, oneEigth, 0, 0.5, 0.75)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(sevenEigths + blockieAdjustment, oneEigth + blockieAdjustment);
 
        await Promise.all([
            createWall(threeSixteenths, oneSixteenth, fiveEigths, threeFourths),
            createWall(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth),
            createWall(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth),
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, fiveSixteenths, wholeScreen, oneSixteenth),
            createWall(0, oneHalf, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            fireMovingActivePoint(oneEigth - 8, threeFourths - 8, 0, -0.55, 0),
            loopFireBombs(oneSixteenth, threeEigths, oneEigth, oneEigth, 2, 0.7, 0.75),
            loopFireBombs(thirteenSixteenths, threeEigths, oneEigth, oneEigth, 2, 0.7, 0.75),
            loopFireBombs(threeFourths, thirteenSixteenths, oneSixteenth, oneEigth, 0, 0.35, 0.15),
            loopFireBombs(elevenSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 0.15, 0.35, 0.15),
            loopFireBombs(fiveEigths, thirteenSixteenths, oneSixteenth, oneEigth, 0.3, 0.35, 0.15),
            loopFireBombs(nineSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 0.45, 0.35, 0.15),
            loopFireBombs(oneHalf, thirteenSixteenths, oneSixteenth, oneEigth, 0.6, 0.35, 0.15),
            loopFireBombs(sevenSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 0.75, 0.35, 0.15),
            loopFireBombs(threeEigths, thirteenSixteenths, oneSixteenth, oneEigth, 0.9, 0.35, 0.15),
            loopFireBombs(fiveSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 1.05, 0.35, 0.15),
            loopFireBombs(oneFourth, thirteenSixteenths, oneSixteenth, oneEigth, 1.2, 0.35, 0.15),
            loopFireBombs(threeSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 1.35, 0.35, 0.15)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneEigth + blockieAdjustment, oneEigth + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, threeSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeEigths, thirteenSixteenths, oneSixteenth),
            createWall(0, nineSixteenths, fiveEigths, oneSixteenth),
            createWall(0, threeFourths, sevenSixteenths, oneSixteenth),
            createWall(0, fifteenSixteenths, oneFourth, oneSixteenth),
            createWall(threeFourths, threeFourths, oneFourth, oneSixteenth),
            createWall(fiveEigths, fifteenSixteenths, threeEigths, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(threeSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeEigths, 0, oneSixteenth, thirteenSixteenths),
            createWall(nineSixteenths, 0, oneSixteenth, fiveEigths),
            createWall(threeFourths, 0, oneSixteenth, sevenSixteenths),
            createWall(fifteenSixteenths, 0, oneSixteenth, oneFourth),
            createWall(threeFourths, threeFourths, oneSixteenth, oneFourth),
            createWall(fifteenSixteenths, fiveEigths, oneSixteenth, threeEigths),
            fireMovingActivePoint(sevenEigths - 8, oneHalf - 8, -0.55, 0.55, 0),
 
            loopFireBombs(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 0, 1, 0.5),
            loopFireBombs(sevenSixteenths, oneSixteenth, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 0, 1, 0.5),
            loopFireBombs(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 1.25, 1, 0.5),
 
            loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 0, 1, 0.5),
            loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 0, 1, 0.5),
 
            loopFireBombs(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 1, 0.5),
            loopFireBombs(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5),
 
            loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 0, 1, 0.5),
 
            loopFireBombs(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5),
            loopFireBombs(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(oneSixteenth, oneSixteenth, 13.5 * 16, nineSixteenths),
            createWall(16.5 * 16, oneSixteenth, 13.5 * 16, nineSixteenths),
            createWall(oneSixteenth, fiveEigths, oneEigth, fiveSixteenths),
            createWall(thirteenSixteenths, fiveEigths, oneEigth, fiveSixteenths),
            fireMovingActivePoint(oneHalf - 8, oneSixteenth, 0, 0.4, 0),
 
            fireBomb(threeSixteenths, 25 * 16, fiveEigths, 5 * 16, 1, 0.5),
            fireBomb(threeSixteenths, fiveEigths, fiveEigths, 5 * 16, 2.5, 0.5),
 
            fireBomb(threeSixteenths, fiveEigths, 5 * 16, fiveSixteenths, 4.5, 0.5),
            fireBomb(oneHalf, fiveEigths, 5 * 16, fiveSixteenths, 4.5, 0.5),
            fireBomb(11 * 16, fiveEigths, 5 * 16, fiveSixteenths, 6, 0.5),
            fireBomb(21 * 16, fiveEigths, 5 * 16, fiveSixteenths, 6, 0.5),
 
            fireBomb(threeSixteenths, fiveEigths, 5 * 16, 5 * 16, 7.8, 0.4),
            fireBomb(11 * 16, 25 * 16, 5 * 16, 5 * 16, 8, 0.4),
            fireBomb(oneHalf, fiveEigths, 5 * 16, 5 * 16, 8.2, 0.4),
            fireBomb(21 * 16, 25 * 16, 5 * 16, 5 * 16, 8.4, 0.4),
 
            fireBomb(threeSixteenths, 25 * 16, 5 * 16, 5 * 16, 10, 0.4),
            fireBomb(11 * 16, fiveEigths, 5 * 16, 5 * 16, 10.2, 0.4),
            fireBomb(oneHalf, 25 * 16, 5 * 16, 5 * 16, 10.4, 0.4),
            fireBomb(21 * 16, fiveEigths, 5 * 16, 5 * 16, 10.6, 0.4),
 
            fireBomb(threeSixteenths, fiveEigths, fiveEigths, fiveSixteenths, 12.7, 10)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelTen() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, elevenSixteenths + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeEigths, wholeScreen),
            createWall(fiveEigths, 0, threeEigths, wholeScreen),
            createActivePoint(oneHalf - 8, oneSixteenth - 8, 0),
 
            loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 0, 0, 12),
            loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 3, 0, 12),
            loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 6, 0, 12),
            loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 9, 0, 12),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(oneSixteenth, 0, fiveSixteenths, threeSixteenths),
            createWall(fiveEigths, 0, fiveSixteenths, threeSixteenths),
            createWall(oneSixteenth, 13 * 16, fiveSixteenths, threeSixteenths),
            createWall(fiveEigths, 13 * 16, fiveSixteenths, threeSixteenths),
            createWall(oneSixteenth, thirteenSixteenths, fiveSixteenths, threeSixteenths),
            createWall(fiveEigths, thirteenSixteenths, fiveSixteenths, threeSixteenths),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
            createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0),
 
            fireContinuallyMovingWall(oneSixteenth, threeSixteenths, 7 * 17, 7 * 16, 1.5, 0, 0, 1.25),
            fireContinuallyMovingWall(23 * 16, threeSixteenths, 7 * 17, 7 * 16, -1.5, 0, 0, 1.25),
            fireContinuallyMovingWall(oneSixteenth, 19 * 16, 7 * 16, 7 * 16, 1.5, 0, 0, 1.25),
            fireContinuallyMovingWall(23 * 16, 19 * 16, 7 * 16, 7 * 16, -1.5, 0, 0, 1.25),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, fifteenSixteenths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, threeEigths, oneEigth),
            createWall(fiveEigths, 0, threeEigths, oneEigth),
            createWall(0, sevenEigths, threeEigths, oneEigth),
            createWall(fiveEigths, sevenEigths, threeEigths, oneEigth),
            createActivePoint(oneHalf - 8, oneSixteenth - 8, 0),
 
            loopFireBombs(0, oneEigth, oneEigth, threeFourths, 0, 0, 1000000),
            loopFireBombs(sevenEigths, oneEigth, oneEigth, threeFourths, 0, 0, 1000000),
 
            fireContinuallyMovingWall(oneEigth, oneEigth, oneFourth, oneFourth, 1.5, 0, 0, 2.9),
            fireContinuallyMovingWall(fiveEigths, threeEigths, oneFourth, oneFourth, -1.5, 0, 0, 2.9),
            fireContinuallyMovingWall(oneEigth, fiveEigths, oneFourth, oneFourth, 1.5, 0, 0, 2.9),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, oneSixteenth + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, oneEigth),
            createWall(0, oneEigth, 25 * 16, 3 * 16),
            createWall(0, 7 * 16, sevenEigths, 7 * 16),
            createWall(oneEigth, sevenSixteenths, fiveSixteenths, oneEigth),
            createWall(oneEigth, nineSixteenths, threeFourths, 7 * 16),
            createWall(7 * 16, 25 * 16, nineSixteenths, 3 * 16),
            createActivePoint(oneSixteenth - 8, oneHalf - 8, 0),
            createPassivePoint(oneHalf - 8, oneHalf - 8, 0, 3.5),
 
            loopFireMovingWalls(sevenEigths, -3 * 16, oneEigth, oneSixteenth, 0, 3, 1.3, 1.21, 1.33),
            loopFireMovingWalls(sevenEigths, 33 * 16, oneEigth, oneSixteenth, 0, -3, 1.3, 1.21, 1.33),
 
            loopFireMovingWalls(11 * 16, sevenSixteenths, oneSixteenth, oneEigth, 3, 0, 1.3, 0.85, 1.69),
 
            loopFireMovingWalls(-3 * 16, sevenEigths, oneSixteenth, oneEigth, 3, 0, 0, 1, 1.54),
            loopFireMovingWalls(33 * 16, sevenEigths, oneSixteenth, oneEigth, -3, 0, 0, 1, 1.54)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneSixteenth + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            fireMovingWall(-33 * 16, 0, wholeScreen, wholeScreen, 1.2, 0, 0.5, 15),
 
            fireMovingWall(0, 0, oneSixteenth, threeEigths, 0, -0.2, 0, 10),
            fireMovingWall(0, fiveEigths, oneSixteenth, wholeScreen, 0, -0.2, 0, 10),
 
            fireMovingWall(oneSixteenth, 0, oneSixteenth, threeEigths, 0, -0.35, 0, 10),
            fireMovingWall(oneSixteenth, fiveEigths, oneSixteenth, wholeScreen, 0, -0.35, 0, 10),
 
            fireMovingWall(oneEigth, 0, oneSixteenth, threeEigths, 0, -0.45, 0, 10),
            fireMovingWall(oneEigth, fiveEigths, oneSixteenth, wholeScreen, 0, -0.45, 0, 10),
 
            fireMovingWall(threeSixteenths, 0, oneSixteenth, threeEigths, 0, -0.5, 0, 10),
            fireMovingWall(threeSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.5, 0, 10),
 
            fireMovingWall(oneFourth, 0, oneSixteenth, threeEigths, 0, -0.55, 0, 10),
            fireMovingWall(oneFourth, fiveEigths, oneSixteenth, wholeScreen, 0, -0.55, 0, 10),
 
            fireMovingWall(fiveSixteenths, 0, oneSixteenth, threeEigths, 0, -0.5, 0, 10),
            fireMovingWall(fiveSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.5, 0, 10),
 
            fireMovingWall(threeEigths, 0, oneSixteenth, threeEigths, 0, -0.45, 0, 10),
            fireMovingWall(threeEigths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.45, 0, 10),
 
            fireMovingWall(sevenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.35, 0, 10),
            fireMovingWall(sevenSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.35, 0, 10),
 
            fireMovingWall(oneHalf, 0, oneSixteenth, threeEigths, 0, -0.2, 0, 10),
            fireMovingWall(oneHalf, fiveEigths, oneSixteenth, wholeScreen, 0, -0.2, 0, 10),
 
            fireMovingWall(nineSixteenths, 0, oneSixteenth, threeEigths, 0, -0.1, 0, 10),
            fireMovingWall(nineSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.1, 0, 10),
 
            fireMovingWall(fiveEigths, 0, oneSixteenth, threeEigths, 0, -0.15, 0, 10),
            fireMovingWall(fiveEigths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.15, 0, 10),
 
            fireMovingWall(elevenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.27, 0, 10),
            fireMovingWall(elevenSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.27, 0, 10),
 
            fireMovingWall(threeFourths, 0, oneSixteenth, threeEigths, 0, -0.4, 0, 10),
            fireMovingWall(threeFourths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.4, 0, 10),
 
            fireMovingWall(thirteenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.5, 0, 10),
            fireMovingWall(thirteenSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.5, 0, 10),
 
            fireMovingWall(sevenEigths, 0, oneSixteenth, threeEigths, 0, -0.55, 0, 10),
            fireMovingWall(sevenEigths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.55, 0, 10),
 
            fireMovingWall(fifteenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.6, 0, 10),
            fireMovingWall(fifteenSixteenths, fiveEigths, oneSixteenth, wholeScreen, 0, -0.6, 0, 10),
 
            createActivePoint(fifteenSixteenths - 8, oneSixteenth - 8, 5.1)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(fifteenSixteenths + blockieAdjustment, oneSixteenth + blockieAdjustment);
 
        await Promise.all([
            createActivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0),
 
            createWall(0, 0, sevenEigths, oneEigth),
 
            fireContinuallyMovingWall(-wholeScreen, oneEigth, wholeScreen, oneEigth, 1.5, 0, 0, 4.98),
            fireContinuallyMovingWall(oneEigth, oneEigth, wholeScreen, oneEigth, 1.5, 0, 0, 4.98),
 
            createWall(0, oneFourth, wholeScreen, oneSixteenth),
 
            fireContinuallyMovingWall(-oneEigth, fiveSixteenths, wholeScreen, oneEigth, -1.5, 0, 0, 4.98),
            fireContinuallyMovingWall(wholeScreen, fiveSixteenths, wholeScreen, oneEigth, -1.5, 0, 0, 4.98),
 
            createWall(0, sevenSixteenths, wholeScreen, oneSixteenth),
 
            createWall(0, oneHalf, oneSixteenth, oneEigth),
            loopFireBombs(oneSixteenth, oneHalf, oneEigth, oneEigth, 0, 4, 0.7),
            createWall(threeSixteenths, oneHalf, oneSixteenth, oneEigth),
            loopFireBombs(oneFourth, oneHalf, oneEigth, oneEigth, 2.85, 4, 0.7),
            createWall(threeEigths, oneHalf, oneSixteenth, oneEigth),
            loopFireBombs(sevenSixteenths, oneHalf, oneEigth, oneEigth, 0, 4, 0.7),
            createWall(nineSixteenths, oneHalf, oneSixteenth, oneEigth),
            loopFireBombs(fiveEigths, oneHalf, oneEigth, oneEigth, 2.85, 4, 0.7),
            createWall(threeFourths, oneHalf, oneSixteenth, oneEigth),
            loopFireBombs(thirteenSixteenths, oneHalf, oneEigth, oneEigth, 0, 4, 0.7),
            createWall(fifteenSixteenths, oneHalf, oneSixteenth, oneEigth),
 
            createWall(0, fiveEigths, wholeScreen, oneSixteenth),
 
            loopFireBombs(0, elevenSixteenths, oneFourth, oneEigth, 0, 0, 1000000),
            fireContinuallyMovingWall(oneFourth, elevenSixteenths, oneSixteenth, oneEigth, 2, 0, 0, 1.9),
            loopFireBombs(threeFourths, elevenSixteenths, oneFourth, oneEigth, 0, 0, 1000000),
 
            createWall(0, thirteenSixteenths, wholeScreen, oneSixteenth),
 
            loopFireBombs(0, sevenEigths, wholeScreen, oneEigth, 0, 2, 1)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelEleven() {
    try {
        initializeLevel(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, oneEigth, oneEigth, oneSixteenth),
            createWall(oneEigth, 0, oneEigth, wholeScreen),
            createWall(oneFourth, oneEigth, oneEigth, oneSixteenth),
            createWall(threeEigths, 0, fiveEigths, wholeScreen),
            createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0),
            createPassivePoint(fiveSixteenths - 8, oneSixteenth - 8, 0, 8.5),
 
            fireMovingBomb(oneFourth, wholeScreen, oneEigth, wholeScreen, 0, -2, 0, 3.45),
            fireBomb(oneFourth, threeSixteenths, oneEigth, thirteenSixteenths, 3.45, 12),
 
            fireMovingBomb(0, wholeScreen, oneEigth, wholeScreen, 0, -1.7, 4.5, 12),
 
            fireBomb(0, 0, oneEigth, oneEigth, 1.3, 12)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneSixteenth - 8, oneSixteenth - 8);
 
        await Promise.all([
            createWall(0, oneEigth, sevenSixteenths, sevenEigths),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
            createWall(sevenSixteenths, 25 * 16, oneEigth, oneSixteenth),
            createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0),
 
            fireMovingBomb(sevenSixteenths, 33 * 16, oneEigth, 34 * 16, 0, -0.45, 0, 20.5),
            fireBomb(sevenSixteenths, 0, oneEigth, wholeScreen, 20.5, 1000000)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, threeEigths, oneEigth),
            createWall(fiveEigths, 0, threeEigths, oneEigth),
            createWall(0, oneEigth, oneEigth, threeFourths),
            createWall(oneFourth, oneFourth, oneEigth, oneHalf),
            createWall(fiveEigths, oneFourth, oneEigth, oneHalf),
            createWall(sevenEigths, oneEigth, oneEigth, threeFourths),
            createWall(0, sevenEigths, threeEigths, oneEigth),
            createWall(fiveEigths, sevenEigths, threeEigths, oneEigth),
            createActivePoint(oneHalf - 8, oneSixteenth - 8, 0),
 
            loopFireMovingBombs(oneEigth, oneFourth, oneEigth, oneSixteenth, 0, 1.2, 0, 2, 4),
 
            loopFireMovingBombs(threeEigths, oneFourth, oneFourth, oneSixteenth, 0, 1.86, 0, 1, 2),
            loopFireMovingBombs(threeEigths, oneFourth, oneFourth, oneSixteenth, 0, 1.86, 2, 1, 2),
 
            loopFireMovingBombs(threeFourths, oneEigth, oneEigth, oneSixteenth, 0, 2.35, 0, 0.1, 2.5),
            loopFireMovingBombs(threeFourths, oneEigth, oneEigth, oneSixteenth, 0, 2.35, 1.2, 0.1, 2.5),
            loopFireMovingBombs(threeFourths, oneEigth, oneEigth, oneSixteenth, 0, 2.35, 2.4, 0.1, 2.5)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, oneSixteenth + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, wholeScreen),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
            createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0),
 
            fireContinuallyMovingBomb(threeSixteenths, oneEigth, oneEigth, oneSixteenth, 1.79, 0, 0, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, threeSixteenths, oneEigth, oneSixteenth, 1.79, 0, 0.6, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, oneFourth, oneEigth, oneSixteenth, 1.79, 0, 1.2, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, fiveSixteenths, oneEigth, oneSixteenth, 1.79, 0, 1.8, 2.4),
            fireContinuallyMovingBomb(elevenSixteenths, threeEigths, oneEigth, oneSixteenth, -1.79, 0, 0, 2.4),
            fireContinuallyMovingBomb(elevenSixteenths, sevenSixteenths, oneEigth, oneSixteenth, -1.79, 0, 0.6, 2.4),
            fireContinuallyMovingBomb(elevenSixteenths, oneHalf, oneEigth, oneSixteenth, -1.79, 0, 1.2, 2.4),
            fireContinuallyMovingBomb(elevenSixteenths, nineSixteenths, oneEigth, oneSixteenth, -1.79, 0, 1.8, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, fiveEigths, oneEigth, oneSixteenth, 1.79, 0, 0, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, elevenSixteenths, oneEigth, oneSixteenth, 1.79, 0, 0.6, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, threeFourths, oneEigth, oneSixteenth, 1.79, 0, 1.2, 2.4),
            fireContinuallyMovingBomb(threeSixteenths, thirteenSixteenths, oneEigth, oneSixteenth, 1.79, 0, 1.8, 2.4)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(oneEigth, 0, fiveSixteenths, oneEigth),
            createWall(nineSixteenths, 0, threeEigths, oneEigth),
            createWall(oneEigth, sevenEigths, fiveSixteenths, oneEigth),
            createWall(nineSixteenths, sevenEigths, threeEigths, oneEigth),
            createWall(0, 0, oneEigth, wholeScreen),
            createWall(sevenEigths, 0, oneEigth, wholeScreen),
            createActivePoint(oneHalf - 8, oneSixteenth - 8, 0),
 
            fireContinuallyMovingBomb(oneEigth, oneEigth, threeFourths, oneSixteenth, 0, 1.4, 0, 4.2),
            fireContinuallyMovingBomb(oneEigth, thirteenSixteenths, threeFourths, oneSixteenth, 0, -1.4, 0, 4.2),
 
            fireContinuallyMovingBomb(threeFourths, oneEigth, oneEigth, threeFourths, -1.28, 0, 0, 4.2)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, oneSixteenth + blockieAdjustment);
 
        await Promise.all([
            createWall(oneEigth, oneEigth, threeFourths, oneEigth),
 
            createWall(oneEigth, oneFourth, oneEigth, oneEigth),
            createWall(threeEigths, oneFourth, oneFourth, oneEigth),
            createWall(threeFourths, oneFourth, oneFourth, oneEigth),
 
            createWall(oneEigth, oneHalf, fiveSixteenths, oneEigth),
            createWall(nineSixteenths, oneHalf, fiveSixteenths, oneEigth),
 
            createWall(0, fiveEigths, sevenEigths, oneFourth),
            createWall(sevenEigths, thirteenSixteenths, oneEigth, oneSixteenth),
            fireMovingActivePoint(fifteenSixteenths - 8, fifteenSixteenths - 8, -0.42, 0, 0),
            createPassivePoint(fifteenSixteenths - 8, threeSixteenths - 8, 3, 7),
 
            loopFireMovingBombs(wholeScreen, threeEigths, oneEigth, oneEigth, -9, 0, 0, 0, 1),
 
            fireBomb(0, sevenEigths, oneEigth, oneEigth, 0, 19.3)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

async function levelTwelve() {
    try {
        initializeLevel(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        createCountdownTimer(80);
 
        await Promise.all([
            createWall(oneEigth, oneHalf, sevenEigths, oneEigth),
            createWall(0, threeFourths, sevenEigths, oneEigth),
 
            fireBomb(0, oneHalf, oneEigth, oneEigth, 0, 4.5),
 
            fireBomb(11 * 16, fiveEigths, fiveSixteenths, oneEigth, 0, 0.75),
            fireBomb(11 * 16, fiveEigths, fiveSixteenths, oneEigth, 2.25, 0.75),
            fireBomb(11 * 16, fiveEigths, fiveSixteenths, oneEigth, 4.5, 0.75),
 
            fireBomb(11 * 16, sevenEigths, fiveSixteenths, oneEigth, 1.125, 0.75),
            fireBomb(11 * 16, sevenEigths, fiveSixteenths, oneEigth, 3.375, 0.75),
 
            fireBomb(0, oneHalf, oneEigth, oneEigth, 7, 1000000),
            fireBomb(0, fiveEigths, wholeScreen, oneEigth, 7, 1000000),
            fireBomb(sevenEigths, threeFourths, oneEigth, oneEigth, 7, 1000000),
            fireBomb(0, sevenEigths, wholeScreen, oneEigth, 7, 1000000),
 
            fireBomb(threeSixteenths, oneEigth, 3 * 16, 3 * 16, 7.5, 2),
            fireBomb(oneSixteenth, oneFourth, 3 * 16, 3 * 16, 7.5, 2),
            fireBomb(threeSixteenths, oneFourth, 3 * 16, 3 * 16, 7.5, 2),
            fireBomb(fiveSixteenths, oneFourth, 3 * 16, 3 * 16, 7.5, 2),
 
            fireBomb(elevenSixteenths, oneEigth, 3 * 16, 3 * 16, 7.5, 2),
            fireBomb(nineSixteenths, oneFourth, 3 * 16, 3 * 16, 7.5, 2),
            fireBomb(elevenSixteenths, oneFourth, 3 * 16, 3 * 16, 7.5, 2),
            fireBomb(thirteenSixteenths, oneFourth, 3 * 16, 3 * 16, 7.5, 2),
 
            fireMovingBomb(-threeFourths, 0, threeFourths, oneHalf, 0.34, 0, 9.5, 11.5),
 
            createActivePoint(oneHalf - 8, fiveSixteenths - 8, 21),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 9.5, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 10.62, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 11.74, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 12.86, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 13.98, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 15.1, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 16.22, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 17.34, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 18.46, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 19.58, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 20.7, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 21.82, 7),
            fireMovingBomb(wholeScreen, 0, oneSixteenth, oneHalf, -2, 0, 22.94, 7),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, fiveSixteenths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, wholeScreen),
            createWall(sevenSixteenths, 0, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeSixteenths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeEigths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, nineSixteenths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeFourths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
 
            fireMovingHorizontalLaser(0, oneSixteenth, 1.2, 0, 3.98),
            fireMovingHorizontalLaser(fifteenSixteenths, oneSixteenth, -0.4, 0, 3.98),
 
            fireMovingHorizontalLaser(0, oneSixteenth, 1.2, 4, 7),
            fireMovingHorizontalLaser(0, oneEigth, 1.2, 7, 4.85),
            fireMovingHorizontalLaser(0, oneSixteenth, 3.2, 11, 3.5),
 
            createActivePoint(oneHalf - 8, oneHalf - 8, 16),
            fireMovingBomb(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, -2, 0, 15, 1.6),
            fireMovingBomb(oneSixteenth, oneFourth, oneEigth, oneEigth, 2, 0, 15, 1.6),
            fireMovingBomb(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, -2, 0, 15, 1.6),
            fireMovingBomb(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 2, 0, 15, 1.6)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(oneEigth, oneEigth, threeFourths, oneEigth),
            createWall(oneFourth, threeEigths, oneHalf, oneSixteenth),
            createWall(oneFourth, nineSixteenths, oneHalf, oneSixteenth),
            createWall(oneEigth, threeFourths, threeFourths, oneEigth),
            createWall(oneEigth, oneFourth, oneEigth, oneHalf),
            createWall(threeEigths, oneFourth, oneSixteenth, oneHalf),
            createWall(nineSixteenths, oneFourth, oneSixteenth, oneHalf),
            createWall(threeFourths, oneFourth, oneEigth, oneHalf),
 
            fireMovingWall(0, -oneEigth, 36 * 16, oneEigth, -1.8, 1.8, 0, 2.9),
            fireMovingWall(wholeScreen, -oneEigth, oneEigth, 36 * 16, -1.8, 1.8, 0, 2.9),
 
            fireMovingWall(-oneEigth, wholeScreen, 36 * 16, oneEigth, 1.8, -1.8, 3, 2.9),
            fireMovingWall(-oneEigth, 0, oneEigth, 36 * 16, 1.8, -1.8, 3, 2.9),
 
            fireMovingWall(0, -oneEigth, wholeScreen, oneEigth, 0, 2.3, 5.9, 2.28),
 
            createActivePoint(oneHalf - 8, oneHalf - 8, 10.4),
            fireMovingWall(0, -wholeScreen, wholeScreen, wholeScreen, 0, 1.5, 9, 4),
            fireMovingWall(-wholeScreen, 0, wholeScreen, wholeScreen, 1.5, 0, 9, 4),
            fireMovingWall(0, wholeScreen, wholeScreen, wholeScreen, 0, -1.5, 9, 4),
            fireMovingWall(wholeScreen, 0, wholeScreen, wholeScreen, -1.5, 0, 9, 4)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, oneSixteenth, oneSixteenth, sevenEigths),
            createWall(fifteenSixteenths, oneSixteenth, oneSixteenth, sevenEigths),
 
            fireContinuallyMovingWall(oneSixteenth, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 0, 1.75),
            fireContinuallyMovingWall(threeSixteenths, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 0.35, 1.75),
            fireContinuallyMovingWall(fiveSixteenths, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 0.7, 1.75),
            fireContinuallyMovingWall(sevenSixteenths, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 1.05, 1.75),
            fireContinuallyMovingWall(nineSixteenths, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 1.4, 1.75),
            fireContinuallyMovingWall(elevenSixteenths, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 1.75, 1.75),
            fireContinuallyMovingWall(thirteenSixteenths, oneSixteenth, oneEigth, oneSixteenth, 0, 1.5, 2.1, 1.75),
 
            fireContinuallyMovingWall(oneSixteenth, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 0, 1.75),
            fireContinuallyMovingWall(threeSixteenths, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 0.35, 1.75),
            fireContinuallyMovingWall(fiveSixteenths, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 0.7, 1.75),
            fireContinuallyMovingWall(sevenSixteenths, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 1.05, 1.75),
            fireContinuallyMovingWall(nineSixteenths, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 1.4, 1.75),
            fireContinuallyMovingWall(elevenSixteenths, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 1.75, 1.75),
            fireContinuallyMovingWall(thirteenSixteenths, sevenEigths, oneEigth, oneSixteenth, 0, -1.5, 2.1, 1.75),
 
            fireMovingBomb(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 2.8, 0, 0.73, 2.28),
            fireMovingBomb(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 2.8, 0, 0.73, 2.28),
 
            fireMovingBomb(oneSixteenth, threeEigths, oneEigth, oneFourth, 2.8, 0, 2.48, 2.28),
 
            fireMovingBomb(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 2.8, 0, 4.23, 2.28),
            fireMovingBomb(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 2.8, 0, 4.23, 2.28),
 
            fireMovingBomb(oneSixteenth, threeEigths, oneEigth, oneFourth, 2.8, 0, 5.98, 2.28),
 
            createActivePoint(oneHalf - 8, oneHalf - 8, 8.8)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(0, threeSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeEigths, wholeScreen, oneSixteenth),
            createWall(0, nineSixteenths, wholeScreen, oneSixteenth),
            createWall(0, threeFourths, wholeScreen, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, wholeScreen),
            createWall(threeSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeEigths, 0, oneSixteenth, wholeScreen),
            createWall(nineSixteenths, 0, oneSixteenth, wholeScreen),
            createWall(threeFourths, 0, oneSixteenth, wholeScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, wholeScreen),
 
            fireMovingWall(-wholeScreen, 0, wholeScreen, wholeScreen, 0.75, 0, 0, 1000000),
            fireMovingWall(0, wholeScreen, wholeScreen, wholeScreen, 0, -0.75, 0, 1000000),
 
            fireBomb(oneFourth, oneFourth, oneEigth, oneEigth, 0, 1.8),
            fireBomb(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0, 1.8),
            fireBomb(fiveEigths, oneFourth, oneEigth, oneEigth, 0, 1.8),
            fireBomb(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 1.8),
            fireBomb(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 0, 1.8),
            fireBomb(oneFourth, fiveEigths, oneEigth, oneEigth, 0, 1.8),
            fireBomb(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 1.8),
            fireBomb(fiveEigths, fiveEigths, oneEigth, oneEigth, 0, 1.8),
 
            fireBomb(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1.8, 1.8),
            fireBomb(fiveEigths, oneFourth, oneEigth, oneEigth, 1.8, 1.8),
            fireBomb(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1.8, 1.8),
 
            fireBomb(fiveEigths, oneFourth, oneEigth, oneEigth, 3.6, 1.8),
            fireBomb(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 3.6, 1.8),
 
            createActivePoint(sevenEigths - 8, oneEigth - 8, 7.2)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            loopFireBombs(0, oneFourth, oneEigth, oneSixteenth, 0, 0.3, 1),
            loopFireBombs(oneEigth, oneEigth, oneFourth, sevenEigths, 0, 0.3, 1),
            loopFireBombs(oneHalf, 0, oneFourth, sevenEigths, 0, 0.3, 1),
            fireMovingActivePoint(oneSixteenth - 8, threeEigths - 8, 0, 0.4, 0),
 
            fireContinuallyMovingWall(oneEigth, 0, oneSixteenth, oneEigth, 2.5, 0, 0, 0.65),
            fireContinuallyMovingBomb(threeEigths, fifteenSixteenths, oneEigth, oneSixteenth, 0, -2.5, 0, 3.2),
            fireContinuallyMovingBomb(threeFourths, oneFourth, oneFourth, oneSixteenth, 0, 2.5, 0, 1.9),
            fireContinuallyMovingWall(elevenSixteenths, sevenEigths, oneSixteenth, oneEigth, -2.5, 0, 0, 0.65)
        ]);
 
        cancelAwaitChain = false;
 
        destroyCountdownTimer();
 
        endLevel();
    } catch (error) {};
};

async function levelEnd() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await fireBomb(blockie.x - 8, blockie.y - 8, 48, 48, 0.7, 0.4),
 
        cancelAwaitChain = false;
 
        await fireBomb(blockie.x - oneSixteenth, blockie.y - oneSixteenth, threeSixteenths, threeSixteenths, 0, 0.4);
 
        cancelAwaitChain = false;
 
        await fireBomb(blockie.x - 40, blockie.y - 40, 112, 112, 0, 0.4);
 
        cancelAwaitChain = false;
 
        await fireBomb(blockie.x - 48, blockie.y - 48, oneFourth, oneFourth, 0, 0.4);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            fireMovingHorizontalLaser(blockie.y - oneFourth, oneSixteenth, 1, 0.2, 1.9),
            fireMovingHorizontalLaser(blockie.y + blockie.height + threeSixteenths, oneSixteenth, -1, 0.2, 1.9),
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            fireMovingVerticalLaser(blockie.x - oneFourth, oneSixteenth, 1, 0.2, 1.9),
            fireMovingVerticalLaser(blockie.x + blockie.height + threeSixteenths, oneSixteenth, -1, 0.2, 1.9),
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(threeSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, threeEigths),
            createWall(0, fiveEigths, wholeScreen, threeEigths),
            fireMovingActivePoint(thirteenSixteenths - 8, oneHalf - 8, 3, 0, 0),
            fireMovingWall(wholeScreen, 0, wholeScreen, wholeScreen, -3, 0, 0.7, 2.5),
 
            setEndScreenTimeout(4)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, threeSixteenths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, 92, threeEigths),
            createWall(100, 0, 92, threeEigths),
            createWall(fiveEigths, 0, 92, threeEigths),
            createWall(fiveEigths + 100, 0, 92, threeEigths),
            createWall(0, fiveEigths, 92, threeEigths),
            createWall(100, fiveEigths, 92, threeEigths),
            createWall(fiveEigths, fiveEigths, 92, threeEigths),
            createWall(fiveEigths + 100, fiveEigths, 92, threeEigths),
 
            fireMovingHorizontalLaser(-wholeScreen, wholeScreen, 2, 0, 2.65),
 
            fireBomb(92, 0, 8, threeEigths, 2.65, 1.4),
            fireBomb(fiveEigths + 92, 0, 8, threeEigths, 2.65, 1.4),
            fireBomb(threeEigths, 0, oneFourth, threeEigths, 2.65, 1.4),
            fireBomb(0, threeEigths, wholeScreen, oneFourth, 2.65, 1.4),
 
            fireBomb(threeEigths, oneFourth, oneFourth, oneEigth, 4.05, 3),
            fireBomb(oneFourth, threeEigths, oneHalf, oneFourth, 4.05, 3),
            fireMovingPassivePoint(oneHalf - 8, threeSixteenths - 8, 0, -2, 4.05, 0.8),
            fireMovingActivePoint(threeSixteenths - 8, oneHalf - 8, -2, 0, 4.05),
            fireMovingPassivePoint(thirteenSixteenths - 8, oneHalf - 8, 2, 0, 4.05, 0.8),
 
            setEndScreenTimeout(7.05)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(elevenSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneFourth),
            createWall(0, oneFourth, oneFourth, thirteenSixteenths),
            createWall(threeFourths, oneFourth, oneFourth, thirteenSixteenths),
            createWall(oneFourth, oneFourth, threeSixteenths, threeSixteenths),
            createWall(nineSixteenths, oneFourth, threeSixteenths, threeSixteenths),
            createWall(oneFourth, nineSixteenths, threeSixteenths, sevenSixteenths),
            createWall(nineSixteenths, nineSixteenths, threeSixteenths, sevenSixteenths),
            createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth),
 
            fireBomb(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0.4, 1.3),
            fireBomb(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0.4, 1.3),
            fireBomb(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 0.4, 1.3),
            fireBomb(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0.4, 1.3),
 
            fireBomb(sevenSixteenths, threeEigths, oneEigth, oneSixteenth, 3, 1.3),
            fireBomb(sevenSixteenths, sevenSixteenths, threeSixteenths, oneEigth, 3, 1.3),
            fireBomb(sevenSixteenths, nineSixteenths, oneEigth, oneSixteenth, 3, 1.3),
            fireBomb(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 3, 1.3),
 
            fireBomb(sevenSixteenths, oneFourth, oneEigth, elevenSixteenths, 5.6, 1.3),
            fireBomb(nineSixteenths, sevenSixteenths, threeSixteenths, oneEigth, 5.6, 1.3),
 
            setEndScreenTimeout(7.9)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneFourth),
            createWall(0, oneFourth, oneFourth, oneHalf),
            createWall(threeFourths, oneFourth, oneFourth, oneHalf),
            createWall(0, threeFourths, sevenSixteenths, oneEigth),
            createWall(nineSixteenths, threeFourths, sevenSixteenths, oneEigth),
 
            fireMovingWall(sevenSixteenths, threeFourths, oneEigth, oneEigth, 0, 0, 0, 7.75),
            fireMovingWall(0, sevenEigths, wholeScreen, oneEigth, 0, 0, 0, 7.75),
 
            fireMovingHorizontalLaser(sevenEigths, oneEigth, -1.4, 0, 3.35),
            fireMovingVerticalLaser(0, oneEigth, 1.4, 0, 3.35),
 
            fireMovingWall(0, -sevenEigths, wholeScreen, wholeScreen, 0, 1.4, 4.4, 3.35),
            fireMovingWall(sevenEigths, 0, wholeScreen, wholeScreen, -1.4, 0, 4.4, 3.35),
 
            fireMovingWall(0, -wholeScreen, wholeScreen, wholeScreen, 0, 1.5, 7.8, 4.98),
            fireMovingWall(oneFourth, oneFourth, oneHalf, oneHalf, 0, 0, 12.78, 100),
            fireMovingWall(sevenSixteenths, threeFourths, oneEigth, oneEigth, 0, 0, 12.78, 100),
 
            fireMovingVerticalLaser(-16, 16, 2, 13, 10),
            fireMovingVerticalLaser(-16, 16, 2, 14.5, 10),
            fireMovingVerticalLaser(-16, 16, 2, 16, 10),
 
            fireMovingWall(wholeScreen, sevenEigths, wholeScreen, oneEigth, -3, 0, 20.5, 2.4),
 
            setEndScreenTimeout(23.9)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(sevenEigths + blockieAdjustment, oneEigth + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, oneSixteenth),
            createWall(oneSixteenth, threeSixteenths, sevenEigths, oneFourth),
            createWall(oneSixteenth, nineSixteenths, sevenEigths, oneFourth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, oneSixteenth, oneSixteenth, sevenEigths),
            createWall(threeSixteenths, oneSixteenth, oneSixteenth, oneEigth),
            createWall(threeFourths, oneSixteenth, oneSixteenth, oneEigth),
            createWall(threeSixteenths, thirteenSixteenths, oneSixteenth, oneEigth),
            createWall(threeFourths, thirteenSixteenths, oneSixteenth, oneEigth),
            createWall(fifteenSixteenths, oneSixteenth, oneSixteenth, sevenEigths),
 
            fireMovingActivePoint(oneHalf - 8, oneHalf - 8, -2, 0, 0.5),
            fireMovingPassivePoint(oneHalf - 8, oneHalf - 8, 2, 0, 0.5, 1.8),
 
            setEndScreenTimeout(3.8)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(sevenEigths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, wholeScreen, sevenSixteenths),
            createWall(oneSixteenth, nineSixteenths, sevenEigths, oneSixteenth),
            createWall(oneSixteenth, threeFourths, sevenEigths, oneSixteenth),
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, sevenSixteenths, oneSixteenth, oneHalf),
            createWall(threeSixteenths, sevenSixteenths, oneSixteenth, oneEigth),
            createWall(threeFourths, sevenSixteenths, oneSixteenth, oneEigth),
            createWall(threeSixteenths, thirteenSixteenths, oneSixteenth, oneEigth),
            createWall(threeFourths, thirteenSixteenths, oneSixteenth, oneEigth),
            createWall(fifteenSixteenths, sevenSixteenths, oneSixteenth, oneHalf),
 
            fireContinuallyMovingBomb(oneSixteenth, fiveEigths, threeSixteenths, oneEigth, 2.94, 0, 0.7, 2),
 
            fireBomb(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 0.7, 6.7),
 
            fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 2.7, 4.7),
            fireBomb(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 2.7, 4.7),
 
            fireBomb(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 4.7, 2.7),
            fireBomb(oneSixteenth, fiveEigths, sevenEigths, oneEigth, 4.7, 2.7),
            fireBomb(oneFourth, thirteenSixteenths, oneHalf, oneEigth, 4.7, 2.7),
 
            setEndScreenTimeout(7.7)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneHalf + blockieAdjustment, 25 * 16 + blockieAdjustment);
 
        await Promise.all([
            createWall(0, fifteenSixteenths, wholeScreen, oneSixteenth),
            createWall(0, 0, oneSixteenth, fifteenSixteenths),
            createWall(fifteenSixteenths, 0, oneSixteenth, fifteenSixteenths),
 
            fireMovingWall(oneSixteenth, 0, oneSixteenth, fiveEigths, 0, 0, 0, 12.4),
            fireMovingWall(oneEigth, 0, oneSixteenth, fiveEigths, 0, 0, 0, 12),
            fireMovingWall(threeSixteenths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 11.6),
            fireMovingWall(oneFourth, 0, oneSixteenth, fiveEigths, 0, 0, 0, 11.2),
            fireMovingWall(fiveSixteenths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 10.8),
            fireMovingWall(threeEigths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 10.4),
            fireMovingWall(sevenSixteenths, 0, 1.5 * 16, fiveEigths, 0, 0, 0, 10),
            fireMovingWall(16.5 * 16, 0, 1.5 * 16, fiveEigths, 0, 0, 0, 10),
            fireMovingWall(nineSixteenths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 10.4),
            fireMovingWall(fiveEigths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 10.8),
            fireMovingWall(elevenSixteenths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 11.2),
            fireMovingWall(threeFourths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 11.6),
            fireMovingWall(thirteenSixteenths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 12),
            fireMovingWall(sevenEigths, 0, oneSixteenth, fiveEigths, 0, 0, 0, 12.4),
 
            fireMovingBomb(oneSixteenth, fiveEigths, oneSixteenth, fiveSixteenths, 2.8, 0, 0, 1.74),
            fireMovingBomb(sevenEigths, fiveEigths, oneSixteenth, fiveSixteenths, -1, 0, 0, 1.74),
 
            fireMovingBomb(oneSixteenth, sevenEigths + 16, oneSixteenth, 16, 1.7, 0, 2.845, 4.07),
            fireMovingBomb(oneSixteenth, sevenEigths, oneSixteenth, 16, 1.7, 0, 3, 4.07),
            fireMovingBomb(oneSixteenth, thirteenSixteenths + 16, oneSixteenth, 16, 1.7, 0, 3.155, 4.07),
            fireMovingBomb(oneSixteenth, thirteenSixteenths, oneSixteenth, 16, 1.7, 0, 3.31, 4.07),
            fireMovingBomb(oneSixteenth, threeFourths + 16, oneSixteenth, 16, 1.7, 0, 3.465, 4.07),
            fireMovingBomb(oneSixteenth, threeFourths, oneSixteenth, 16, 1.7, 0, 3.62, 4.07),
            fireMovingBomb(oneSixteenth, elevenSixteenths + 16, oneSixteenth, 16, 1.7, 0, 3.775, 4.07),
            fireMovingBomb(oneSixteenth, elevenSixteenths, oneSixteenth, 16, 1.7, 0, 3.93, 4.07),
            fireMovingBomb(oneSixteenth, fiveEigths + 16, oneSixteenth, 16, 1.7, 0, 4.085, 4.07),
            fireMovingBomb(oneSixteenth, fiveEigths, oneSixteenth, 16, 1.7, 0, 4.24, 4.07),
 
            fireMovingWall(oneSixteenth, 0, oneSixteenth, fiveEigths, 0, -1, 12.4, 10),
            fireMovingWall(oneEigth, 0, oneSixteenth, fiveEigths, 0, -1, 12, 10),
            fireMovingWall(threeSixteenths, 0, oneSixteenth, fiveEigths, 0, -1, 11.6, 10),
            fireMovingWall(oneFourth, 0, oneSixteenth, fiveEigths, 0, -1, 11.2, 10),
            fireMovingWall(fiveSixteenths, 0, oneSixteenth, fiveEigths, 0, -1, 10.8, 10),
            fireMovingWall(threeEigths, 0, oneSixteenth, fiveEigths, 0, -1, 10.4, 10),
            fireMovingWall(sevenSixteenths, 0, 1.5 * 16, fiveEigths, 0, -1, 10, 10),
            fireMovingPassivePoint(oneHalf - 8, nineSixteenths - 8, 0, -1, 9, 10),
            fireMovingWall(16.5 * 16, 0, 1.5 * 16, fiveEigths, 0, -1, 10, 10),
            fireMovingWall(nineSixteenths, 0, oneSixteenth, fiveEigths, 0, -1, 10.4, 10),
            fireMovingWall(fiveEigths, 0, oneSixteenth, fiveEigths, 0, -1, 10.8, 10),
            fireMovingWall(elevenSixteenths, 0, oneSixteenth, fiveEigths, 0, -1, 11.2, 10),
            fireMovingWall(threeFourths, 0, oneSixteenth, fiveEigths, 0, -1, 11.6, 10),
            fireMovingWall(thirteenSixteenths, 0, oneSixteenth, fiveEigths, 0, -1, 12, 10),
            fireMovingWall(sevenEigths, 0, oneSixteenth, fiveEigths, 0, -1, 12.4, 10),
 
            setEndScreenTimeout(23)
        ]);
 
        cancelAwaitChain = false;
        
        moveBlockie(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);
 
        await Promise.all([
            createWall(0, 0, sevenSixteenths, wholeScreen),
            createWall(sevenSixteenths, 0, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeSixteenths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeEigths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, nineSixteenths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeFourths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth),
            createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen),
 
            fireMovingPassivePoint(oneHalf - 8, oneEigth - 8, 0, 0.5, 0.5, 6.25),
 
            fireBomb(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0, 2),
            fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 2, 3.5),
            fireBomb(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 5.5, 4.25),
 
            fireMovingPassivePoint(oneHalf - 8, oneHalf - 8, 0, -0.5, 7.75, 6.25),
 
            fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 9.75, 3),
            fireBomb(sevenSixteenths, oneFourth, oneEigth, oneEigth, 12.75, 1.25),
 
            setEndScreenTimeout(17)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(fifteenSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            fireMovingBomb(0, -wholeScreen, wholeScreen, wholeScreen, 0, 1.24, 1, 3),
            fireMovingBomb(0, wholeScreen, wholeScreen, wholeScreen, 0, -1.24, 1, 3),
            fireMovingBomb(-fifteenSixteenths, 0, fifteenSixteenths, wholeScreen, 2.49, 0, 1, 3),
            fireBomb(0, 0, wholeScreen, sevenSixteenths, 4, 2),
            fireBomb(0, nineSixteenths, wholeScreen, sevenSixteenths, 4, 2),
            fireBomb(0, sevenSixteenths, sevenEigths, oneEigth, 4, 2)
        ]);
 
        cancelAwaitChain = false;
 
        moveBlockie(oneSixteenth + blockieAdjustment, oneHalf + blockieAdjustment);
 
        await Promise.all([
            fireMovingWall(0, 0, wholeScreen, sevenSixteenths, 0, 0, 0, 2),
            fireMovingWall(0, nineSixteenths, wholeScreen, sevenSixteenths, 0, 0, 0, 2),
            fireMovingWall(oneEigth, sevenSixteenths, sevenEigths, oneEigth, 0, 0, 0, 2),
            fireMovingWall(0, 0, wholeScreen, sevenSixteenths, 0, -1.24, 2, 3),
            fireMovingWall(0, nineSixteenths, wholeScreen, sevenSixteenths, 0, 1.24, 2, 3),
            fireMovingWall(oneEigth, 0, sevenEigths, wholeScreen, 2.49, 0, 2, 3),
 
            fireMovingPassivePoint(threeSixteenths - 8, threeSixteenths - 8, 0.666, 0, 6, 8.7),
            fireMovingActivePoint(fifteenSixteenths + 4, sevenEigths + 10, -0.777, 0, 4),
 
            createWall(0, 0, threeFourths, oneEigth),
            createWall(0, oneEigth, oneEigth, oneEigth),
            createWall(oneFourth, oneEigth, oneHalf, oneSixteenth - 8),
            createWall(oneFourth, threeSixteenths + 8, oneHalf, oneSixteenth - 8),
            createWall(0, oneFourth, threeFourths, oneEigth),
            createWall(0, fiveEigths, oneEigth, oneFourth + 2),
            createWall(threeSixteenths + 2, fiveEigths, thirteenSixteenths - 2, oneSixteenth),
            createWall(oneEigth, threeFourths + 2, thirteenSixteenths - 2, oneEigth),
            createWall(0, fifteenSixteenths + 4, fifteenSixteenths - 2, oneSixteenth - 4)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(oneSixteenth, oneSixteenth, oneSixteenth, sevenSixteenths),
            createWall(oneEigth, oneSixteenth, oneEigth, oneSixteenth),
            createWall(oneEigth, oneFourth, oneEigth, oneSixteenth),
            createWall(oneEigth, sevenSixteenths, oneEigth, oneSixteenth),
 
            createWall(fiveSixteenths, oneSixteenth, oneSixteenth, sevenSixteenths),
            createWall(threeEigths, threeSixteenths, oneSixteenth, oneSixteenth),
            createWall(sevenSixteenths, oneFourth, oneSixteenth, oneSixteenth),
            createWall(oneHalf, fiveSixteenths, oneSixteenth, oneSixteenth),
            createWall(nineSixteenths, oneSixteenth, oneSixteenth, sevenSixteenths),
 
            createWall(elevenSixteenths, oneSixteenth, oneSixteenth, sevenSixteenths),
            createWall(threeFourths, oneSixteenth, oneEigth, oneSixteenth),
            createWall(threeFourths, sevenSixteenths, oneEigth, oneSixteenth),
            createWall(sevenEigths, oneEigth, oneSixteenth, fiveSixteenths),
 
            fireMovingWall(oneSixteenth, nineSixteenths, oneSixteenth, oneSixteenth, 1.72, 0, 0, 4),
 
            setEndScreenTimeout(9)
        ]);
 
        cancelAwaitChain = false;
 
        endLevel();
    } catch (error) {};
};

//Ends the current screen (which is a sub-section of a level which is found within a Promise.all([]);) and continues to the next
//part of the async/await level function.
function endScreen() {
    //Causes all async await functions to stop progressing once they reach another cancelAwaitChain breakpoint.
    cancelAwaitChain = true;

    resolveAllInstances();
    stopUniqueTimingEvents();
    resetBlockieState();
};

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    initializeLevelSong();

    gameState = "playing";

    blockie.x = blockieX;
    blockie.y = blockieY;

    recoveringFromDash = false;
    allowDashAgain = true;
};

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
async function stopLevel(reason) {
    stopAudioElement(currentSong);

    rejectAllInstances();
    stopUniqueTimingEvents();

    //Stops the countdown timer for levels 4 + 8 + 12.
    destroyCountdownTimer();

    //Removes all points collected in the level.
    currentLevelPoints = 0;

    //Resets all keys to avoid having button presses activate after the level has stopped.
    keysDown.splice(0);

    //Switches how the game resets based on how it triggered.
    if (reason === "died") {
        currentSong = sngMourn;
        currentSong.play();

        gameState = "animatingBlockieDestruction";

        //Animates Blockie's destruction.
        blockie.state = "destructing";
        blockie.sx = 0;

        //Waits half a second before displaying a message.
        await new Promise((resolve, reject) => {
            let continueDestruction = setTimeout(() => {
                resolve("resolved");
            }, 500);
        });

        displayMessage("This was only a setback. <br>Progress, Blockie!", "restartLevel");
    } else if (reason === "restartLevelPressed") {
        callCurrentLevel();
    } else if (reason === "lostFocus") {
        currentSong = sngMourn;
        currentSong.play();

        displayMessage("Do not be afraid. <br>Conquer fear. <br>Do not click on other <br>tabs or apps.", "restartLevel");
    } else if (reason === "enterMenuPressed") {
        initializeLevelMenu();
    } else if (reason === "countdownTimerEnded") {
        currentSong = sngMourn;
        currentSong.play();
        
        displayMessage("As long as you are living, <br>you must fight.<br>Please win.", "restartLevel");
    };
};

async function endLevel() {
    stopAudioElement(currentSong);

    gameState = "finishingLevel";

    //Points are only made permanent once a level is completed and only the high score is recorded in earnedPoints.
    if (earnedPoints[currentLevelNum - 1] < currentLevelPoints) {
        earnedPoints[currentLevelNum - 1] = currentLevelPoints;
    };

    //Unlocks the next level (because arrays are 0-indexed) which allows it to be seen and selected in the menu.
    numUnlockedLevels = Math.max(currentLevelNum + 1, numUnlockedLevels);
    numUnlockedLevels = Math.min(numUnlockedLevels, 13);

    //Makes Blockie face the player during the PartyHat animation.
    blockie.angleMovingDegrees = -180;

    //Waits for the PartyHat to descend on to Blockie's head.
    await new Promise((resolve, reject) => {
        let partyHatInstance = new PartyHat();
        partyHats.push(partyHatInstance);

        //Plays sngAnticipate during the entire PartyHat animation.
        currentSong = sngAnticipate;
        currentSong.play();

        function animateFinishedLevelHat() {
            partyHatInstance.y += Math.min((blockie.y - partyHatInstance.y - partyHatInstance.height), 2);

            if (partyHatInstance.y + partyHatInstance.height !== blockie.y) {
                //Continuously recalls the function until the PartyHat reaches Blockie's head.
                window.requestAnimationFrame(animateFinishedLevelHat);
            } else {
                //When the PartyHat animation ends, sngAnticipate stops and sngCelebrate plays until the levelMenu is initialized.
                stopAudioElement(currentSong);
                currentSong = sngCelebrate;
                currentSong.play();

                resolve("resolved");
            };
        };

        window.requestAnimationFrame(animateFinishedLevelHat);
    });

    //Shows a unique message for each level after completing it and then transitions into the level menu.
    await displayMessage(levelMessages[currentLevelNum - 1], "enterLevelMenu");

    //currentLevelPoints is set to 0 because it is only a temporary holder of points for each run on a level. earnedPoints[] stores
    //the currentLevelPoints permanently if it is a high score.
    currentLevelPoints = 0;
};

function callCurrentLevel() {
    switch (currentLevelNum) {
        case 1:
            levelOne();
            break;
        case 2:
            levelTwo();
            break;
        case 3:
            levelThree();
            break;
        case 4:
            levelFour();
            break;
        case 5:
            levelFive();
            break;
        case 6:
            levelSix();
            break;
        case 7:
            levelSeven();
            break;
        case 8:
            levelEight();
            break;
        case 9:
            levelNine();
            break;
        case 10:
            levelTen();
            break;
        case 11:
            levelEleven();
            break;
        case 12:
            levelTwelve();
            break;
        case 13:
            levelEnd();
            break;
    };
};

//Initializes all of the variables to either their saved values, which are stored in local storage, or their default values.
function loadSavedData() {
    currentLevelNum = parseInt(localStorage.getItem("currentLevelNum")) || 1;
    numUnlockedLevels = parseInt(localStorage.getItem("numUnlockedLevels")) || 1;

    //This array cannot be short-circuit evaluated becuse .split() doesn't work on null values.
    if (localStorage.getItem("earnedPoints")) {
        earnedPoints = localStorage.getItem("earnedPoints").split(",");
    } else {
        earnedPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    };
};

//Asks the player to start a new game or continue an old game (if save data exists). Unlike the levelMenu, the player must navigate
//this menu with the mouse and click on an icon in order to progress the game so that the game's tab will be considered "active"
//by the browser and be allowed to play audio.
function initializeOpeningScreenMenu() {
    gameState = "inOpeningMenu";

    //Creates an array of all opening menu Icon IDs.
    let openingMenuIconArray = [document.getElementById("newGameMenuIcon")];

    //Continuing the game is only an option if save data exists (when the local storage variables are not set to "undefined").
    if (localStorage.getItem("currentLevelNum") !== "undefined") {
        openingMenuIconArray.push(document.getElementById("continueGameMenuIcon"));
    };

    //Makes all unlocked HTML menu elements visible.
    for (let i = 0; i < openingMenuIconArray.length; i++) {
        openingMenuIconArray[i].style.visibility = "visible";
    };

    //Clicking Handling
 
    //Starts a new game or continues the old one when an icon is clicked.
    for (let i = 0; i < openingMenuIconArray.length; i++) {
        openingMenuIconArray[i].addEventListener("click", () => {
            exitOpeningMenu(openingMenuIconArray[i])
        });
    };

    //Hovering Handling

    function highlightLevelIcon(iconNum) {
        openingMenuIconArray[iconNum].style.outline = "5px solid " + changingColorTwo;
        openingMenuIconArray[iconNum].style.color = changingColorTwo;
        openingMenuIconArray[iconNum].style.backgroundColor = changingColorOne;
    };

    function revertLevelIcon(iconNum) {
        openingMenuIconArray[iconNum].style.outline = "5px solid white";
        openingMenuIconArray[iconNum].style.color = "white";
        openingMenuIconArray[iconNum].style.backgroundColor = "black";
    };

    //Listens for if the player hovers over any menu icons and highlights that element.
    for (let i = 0; i < openingMenuIconArray.length; i++) {
        openingMenuIconArray[i].addEventListener("mouseover", () => {
            //Highlights the menuIcon that currently has the mouse over it.
            highlightLevelIcon(i);
        });
    };

    //Listens for if the player stops hovering over any menu icons and dehighlights that element.
    for (let i = 0; i < openingMenuIconArray.length; i++) {
        openingMenuIconArray[i].addEventListener("mouseout", () => {
            //Dehighlights the menuIcon that had the mouse move away from it.
            revertLevelIcon(i);
        });
    };

    //Selection Handling
 
    function exitOpeningMenu(selectedIcon) {
        //Makes all unlocked HTML menu elements hidden.
        for (let i = 0; i < openingMenuIconArray.length; i++) {
            openingMenuIconArray[i].style.visibility = "hidden";
        };

        //Removes all menu-specific eventListeners and timers.

        for (let i = 0; i < openingMenuIconArray.length; i++) {
            openingMenuIconArray[i].removeEventListener("click", () => {
                exitOpeningMenu(openingMenuIconArray[i])
            });
        };

        for (let i = 0; i < openingMenuIconArray.length; i++) {
            openingMenuIconArray[i].removeEventListener("mouseover", () => {
                //Highlights the menuIcon that currently has the mouse over it.
                highlightLevelIcon(i);
            });
        };

        //Listens for if the player stops hovering over any menu icons and dehighlights that element.
        for (let i = 0; i < openingMenuIconArray.length; i++) {
            openingMenuIconArray[i].removeEventListener("mouseout", () => {
                //Dehighlights the menuIcon that had the mouse move away from it.
                revertLevelIcon(i);
            });
        };

        //Changes how the game continues depending on the selectedIcon that was pressed.
        if (selectedIcon.id === "newGameMenuIcon") {
            //Deletes all save data, resets the variables, explains the controls, and enters the levelMenu.
            localStorage.clear();
            loadSavedData();
            displayMessage("-Move with WASD.<br>-Dash with Shift, Space, and the Arrow Keys.<br>-Confirm or continue with Shift, Space, or the Mouse.<br>-Restart the level with O.<br>-Enter the level menu with P.<br>-Change color schemes with I.<br>-Have fun!", "enterLevelMenu");
        } else if (selectedIcon.id === "continueGameMenuIcon") {
            //Loads all save data and enters the levelMenu.
            loadSavedData();
            initializeLevelMenu();
        };
    };
};

function initializeLevelMenu() {
    currentSong = sngChill;
    currentSong.play();

    gameState = "inLevelMenu";

    //Creates an array of all 13 menu Icon IDs.
    let levelMenuIconArray = document.querySelectorAll(".levelMenuIcon");

    //If followMouse is true, then whatever icon that the mouse is over will be highlighted.
    let followMouse = false;

    //This timer allows for keys to be used in menus after half a second of the mouse idling.
    let stopFollowingMouse;

    //Makes all unlocked HTML menu elements visible.
    for (let i = 0; i < numUnlockedLevels; i++) {
        levelMenuIconArray[i].style.visibility = "visible";
    };

    //Clicking Handling

    //Begins the level that is clicked on (even if followMouse is false).
    for (let i = 0; i < numUnlockedLevels; i++) {
        levelMenuIconArray[i].addEventListener("click", () => {
            beginSelectedLevel(i + 1);
        });
    };

    //Hovering Handling

    function highlightLevelIcon(iconNum) {
        levelMenuIconArray[iconNum].style.outline = "5px solid " + changingColorTwo;
        levelMenuIconArray[iconNum].style.color = changingColorTwo;
        levelMenuIconArray[iconNum].style.backgroundColor = changingColorOne;
    };

    function revertLevelIcon(iconNum) {
        levelMenuIconArray[iconNum].style.outline = "5px solid white";
        levelMenuIconArray[iconNum].style.color = "white";
        levelMenuIconArray[iconNum].style.backgroundColor = "black";
    };

    //Stops following the mouse (allows for following keys) after half a second of not moving the mouse.
    function checkFollowMouse() {
        clearTimeout(stopFollowingMouse);
        followMouse = true;
        stopFollowingMouse = setTimeout(() => {
            followMouse = false;
        }, 500);
    };

    document.addEventListener("mousemove", checkFollowMouse);

    //Listens for if the player hovers over any menu icons and highlights that element (if they aren't using the keys to navigate 
    //the menu).
    for (let i = 0; i < numUnlockedLevels; i++) {
        levelMenuIconArray[i].addEventListener("mouseover", () => {
            if (followMouse) {
                //Dehighlights the previously highlighted icon as the mouse may be over a different icon, which is then highlighted.
                revertLevelIcon(levelHoveringIconNum);
                levelHoveringIconNum = i;
                highlightLevelIcon(levelHoveringIconNum);
            };
        });
    };

    let checkFollowKeys = setInterval(() => {
        //Dehighlights the previous hovering icon (as it may change depending on key inputs during this function).
        revertLevelIcon(levelHoveringIconNum);

        //Moves the levelHoveringIconNum if any keys are pressed.

        //Left
        if (keysDown[65]) {
            levelHoveringIconNum--;
        };

        //Right
        if (keysDown[68]) {
            levelHoveringIconNum++;
        };

        //Up
        if (keysDown[87]) {
            levelHoveringIconNum -= 4;
        };

        //Down
        if (keysDown[83]) {
            levelHoveringIconNum += 4;
        };

        //Limits moving the cursor to only unlocked level icons.
        levelHoveringIconNum = Math.min(levelHoveringIconNum, numUnlockedLevels - 1);
        levelHoveringIconNum = Math.max(levelHoveringIconNum, 0);

        //Highlights the new levelHoveringIconNum (which may be different than the previous hovering icon if a key was pressed).
        highlightLevelIcon(levelHoveringIconNum);

        //Begins the currently highlighted level (even if followMouse is still true).
        if (keysDown[16] || keysDown[32]) {
            //Prevents the keys from being counted as pressed down again (until the key is lifted again).
            delete keysDown[16];
            delete keysDown[32];

            beginSelectedLevel(levelHoveringIconNum + 1);
        };
    }, 120);

    //Selection Handling

    function beginSelectedLevel(iconNum) {
        currentLevelNum = iconNum

        //Makes all unlocked HTML menu elements hidden.
        for (let i = 0; i < numUnlockedLevels; i++) {
            levelMenuIconArray[i].style.visibility = "hidden";
        };

        //Removes all menu-specific eventListeners and timers.
        
        document.removeEventListener("mousemove", checkFollowMouse);

        for (let i = 0; i < numUnlockedLevels; i++) {
            levelMenuIconArray[i].removeEventListener("click", () => {
                beginSelectedLevel(i + 1)
            });
        };

        for (let i = 0; i < numUnlockedLevels; i++) {
            levelMenuIconArray[i].removeEventListener("mouseover", () => {
                if (followMouse) {
                    revertLevelIcon(levelHoveringIconNum);
                    levelHoveringIconNum = i;
                    highlightLevelIcon(levelHoveringIconNum);
                };
            });
        };

        clearInterval(checkFollowKeys);

        //Begins the level that the player clicked the corresponding icon for.
        callCurrentLevel();
    };
};

//Shows a message and awaits a player input to continue the game.
async function displayMessage(message, endAction) {
    gameState = "displayingMessage";

    //Forces the player to read the message for 1 second before they can continue the game.
    await new Promise((resolve, reject) => {
        let drawGameOverScreen = setTimeout(() => {
            //Placed here to draw Blockie with a PartyHat during endLevel().
            partyHats.splice(0);

            //Draws the game over screen.
            document.getElementById("messageDisplayer").innerHTML = message;
        }, 1000);

        //Waits to stop playing sngCelebrate or sngMourn before the message can be exited.
        let stopAudio = setTimeout(()=> {
            stopAudioElement(currentSong);

            resolve("resolved");
        }, 1800);
    });

    return await new Promise((resolve, reject) => {
        //Restarts the game once acceptable keys are pressed.
        function resumePlaying() {
            //Shift and Space key handler.
            if (keysDown[16] || keysDown[32]) {
                //Prevents the key from being counted as pressed down again (until the key is lifted again).
                delete keysDown[16];
                delete keysDown[32];

                stopMessage();
            } else {
                //Continuously recalls the function until an acceptable key is pressed.
                window.requestAnimationFrame(resumePlaying);
            };

            function stopMessage() {
                document.getElementById("messageDisplayer").innerHTML = "";

                switch (endAction) {
                    case "restartLevel":
                        gameState = "playing";
                        resetBlockieState();
                        callCurrentLevel();
                        break;
                    case "enterLevelMenu":
                        initializeLevelMenu();
                        break;
                    case "continueLevel":
                        //Does nothing because the levels automatically progress after displayMessage() has resolved.
                        break;
                };

                resolve("resolved");
            };
        };

        window.requestAnimationFrame(resumePlaying);
    });
};

//Level-Handling Helper Functions

//Resolves all instances' promises and timeouts and splices them from their instance array.
function resolveAllInstances() {
    //Updates the allInstances array to contain all different instance arrays.
    updateAllInstances();

    //Sorts through each instance array in allInstances. 
    for (let i = 0; i < allInstances.length; i++) {
        //The for loop's length is determined before it starts to avoid missing the first element.
        let initialArrayLength = allInstances[i].length;
        let instanceArray = allInstances[i];

        //Resolves each instance's Promises and timeouts and removes the instance from their instance array.
        for (let j = initialArrayLength - 1; j >= 0; j--) {
            let instance = instanceArray[j];
            instance.externalResolve();
            clearTimeout(instance.timeout);
            instanceArray.splice(j, 1);
        };
    };
};

//Rejects all instances' promises and timeouts and splices them from their instance array.
function rejectAllInstances() {
    //Updates the allInstances array to contain all different instance arrays.
    updateAllInstances();

    //Sorts through each instance array in allInstances. 
    for (let i = 0; i < allInstances.length; i++) {
        //The for loop's length is determined before it starts to avoid missing the first element.
        let initialArrayLength = allInstances[i].length;
        let instanceArray = allInstances[i];

        //Rejects each instance's Promises and timeouts and removes the instance from their instance array.
        for (let j = initialArrayLength - 1; j >= 0; j--) {
            let instance = instanceArray[j];
            instance.externalReject();
            clearTimeout(instance.timeout);
            instanceArray.splice(j, 1);
        };
    };
};

//Rejects all promises and removes all instances from their object arrays.
function rejectInstances(objectArray) {
    //The for loop's length is determined before it starts to avoid missing the first element.
    let initialArrayLength = objectArray.length;

    for (let i = initialArrayLength - 1; i >= 0; i--) {
        //Rejects the instances' Promises and timeouts and destroys the instances.
        let instance = objectArray[i];
        instance.externalReject();
        clearTimeout(instance.timeout);
        objectArray.splice(i, 1);
    };
};

//Timing Functions

//Adds a "unique" timeout to an array so that it can be easily deactivated (when the game stops).
function addUniqueTimeout(timeout) {
    uniqueTimeouts.push(timeout);
};

//Removes a timeout from the array of "unique" timeouts.
function removeUniqueTimeout(timeout) {
    let uniqueTimeoutIndex = uniqueTimeouts.indexOf(timeout);
    uniqueTimeouts.splice(uniqueTimeoutIndex, 1);
};

//Adds a "unique" interval to an array so that it can be easily deactivated (when the game stops).
function addUniqueInterval(interval) {
    uniqueIntervals.push(interval);
};

//Removes a interval from the array of "unique" intervals and clears it.
function removeUniqueInterval(interval) {
    clearInterval(interval);
    let uniqueIntervalIndex = uniqueIntervals.indexOf(interval);
    uniqueIntervals.splice(uniqueIntervalIndex, 1);
};

//Clears and destroys all current timing events.
function stopUniqueTimingEvents() {
    //Clears and deletes from uniqueIntervals all "unique" timeouts so that they don't execute.
    for (let i = 0; i < uniqueTimeouts.length; i++) {
        clearTimeout(uniqueTimeouts[i]);
    };
 
    uniqueTimeouts.splice(0);
 
    //Clears and deletes from uniqueIntervals all "unique" intervals so that they don't execute anymore.
    for (let i = 0; i < uniqueIntervals.length; i++) {
        clearInterval(uniqueIntervals[i]);
    };
 
    uniqueIntervals.splice(0);
};

//Blockie Functions 

function initializeDash() {
    blockie.state = "recoveringFromDash";
    blockie.speed = dashDistance;
    recoveringFromDash = true;
    allowDashAgain = false;

    let endDashRecovery = setTimeout(() => {
        recoveringFromDash = false;
        blockie.state = "playing";
        removeUniqueTimeout(endDashRecovery);
    }, dashRecoverySeconds * 1000);
    addUniqueTimeout(endDashRecovery);

    //Sets an interval to the length of the dash recovery which counts down the semi-accurate remaining length of the timeout.
    //This is used in drawing the remaining seconds meter to show the player how much more recovery time that they need to wait.
    blockie.remainingDashSeconds = allowDashAgainSeconds;
    let remainingDashSecondsInterval = setInterval(() => {
        blockie.remainingDashSeconds -= 0.07;
    }, 70);
    addUniqueInterval(remainingDashSecondsInterval);

    let resetAllowDashAgain = setTimeout(() => {
        allowDashAgain = true;
        removeUniqueInterval(remainingDashSecondsInterval);
        removeUniqueTimeout(resetAllowDashAgain);
    }, allowDashAgainSeconds * 1000);
    addUniqueTimeout(resetAllowDashAgain);
};

//Allows for dashing again.
function resetBlockieState() {
    blockie.state = "playing";
    recoveringFromDash = false;
    allowDashAgain = true;

    //Prevents the key from being counted as pressed down again (until the key is lifted again).
    delete keysDown[16];
    delete keysDown[32];
    delete keysDown[37];
    delete keysDown[38];
    delete keysDown[39];
    delete keysDown[40];
};

//Adjusts Blockie's location to prevent wall clipping in screen transitions.
function moveBlockie(x, y) {
    blockie.x = x;
    blockie.y = y;
};

function moveBlockieAwayFromMovingWalls() {
    //Loops through each moving wall that Blockie is touching and pushes Blockie away from it.
    checkCollisionsWithClass(movingWalls);
    for (let i = 0; i < collidingInstances.length; i++) {
        let collidingMovingWallInstance = collidingInstances[i];
        preventingMovement = false;

        //Checks if Blockie would be not touching the current moving wall if he moved with the wall's xSpeed, and if so, 
        //"pushes" Blockie there.
        preventingMovement = false;
        checkBlockieOutsideBorder(blockie, blockie.x + collidingMovingWallInstance.xSpeed, blockie.y);
        checkTestInstancesColliding(blockie, blockie.x + collidingMovingWallInstance.xSpeed, blockie.y, collidingMovingWallInstance);
        if (!preventingMovement) {
            blockie.x += collidingMovingWallInstance.xSpeed;
            break;
        };

        //Checks if Blockie would be not touching the current moving wall if he moved with the wall's ySpeed, and if so, 
        //"pushes" Blockie there.
        preventingMovement = false;
        checkBlockieOutsideBorder(blockie, blockie.x, blockie.y + collidingMovingWallInstance.ySpeed);
        checkTestInstancesColliding(blockie, blockie.x, blockie.y + collidingMovingWallInstance.ySpeed, collidingMovingWallInstance);
        if (!preventingMovement) {
            blockie.y += collidingMovingWallInstance.ySpeed;
            break;
        };
    };
}

//Instance Functions

//Creates a WaitingTimeout instance, and awaits for its resolution to then create the root collision instance. This is meant to allow
//for instances to spawn at different times concurrently (using Promise.all) or spawn a bit after another's destruction.
async function setWaitingTimeout(waitingSeconds) {
    //Creates an instance and sets all of its initial properties.
    let instance = new WaitingTimeout();
    waitingTimeouts.push(instance);

    return new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = waitingTimeouts.indexOf(instance);
            waitingTimeouts.splice(instanceIndex, 1);
            resolve("resolved");
        }, waitingSeconds * 1000);
    });
};

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
async function setWarningTimeouts(instanceAffecting) {
    //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.
    let warningSeconds = 1;

    await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instanceAffecting.externalResolve = resolve;
        instanceAffecting.externalReject = reject;

        instanceAffecting.timeout = setTimeout(() => {
            instanceAffecting.visible = false;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);
    });

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instanceAffecting.externalResolve = resolve;
        instanceAffecting.externalReject = reject;

        instanceAffecting.timeout = setTimeout(() => {
            instanceAffecting.visible = true;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);
    });

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instanceAffecting.externalResolve = resolve;
        instanceAffecting.externalReject = reject;

        instanceAffecting.timeout = setTimeout(() => {
            instanceAffecting.visible = false;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);
    });

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instanceAffecting.externalResolve = resolve;
        instanceAffecting.externalReject = reject;

        instanceAffecting.timeout = setTimeout(() => {
            //Makes the affected instance visible and collidable.
            instanceAffecting.state = "firing";
            instanceAffecting.visible = true;
            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);
    });
};

//Creates a endScreenTimeout instance, and awaits for its resolution to then end the current screen and continue the level async/await
//function.
async function setEndScreenTimeout(seconds) {
    //Creates an instance and sets all of its initial properties.
    let instance = new EndScreenTimeout();
    endScreenTimeouts.push(instance);

    return new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            endScreen();
        }, seconds * 1000);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function createPassivePoint(x, y, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new PassivePoint(x, y, firingSeconds);
    passivePoints.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        //Sets an interval to the length of the firingSeconds which counts down the semi-accurate remaining length of the timeout.
        //This is used in drawing the remaining seconds meter to show the player how much longer the point will exist.
        instance.remainingFiringSeconds = firingSeconds;
        let remainingFiringSecondsInterval = setInterval(() => {
            instance.remainingFiringSeconds -= 0.15;
        }, 150);
        addUniqueInterval(remainingFiringSecondsInterval);

        instance.timeout = setTimeout(() => {
            removeUniqueInterval(remainingFiringSecondsInterval);

            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = passivePoints.indexOf(instance);
            passivePoints.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingPassivePoint(x, y, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingPassivePoint(x, y, xSpeed, ySpeed, firingSeconds);
    movingPassivePoints.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        //Sets an interval to the length of the firingSeconds which counts down the semi-accurate remaining length of the timeout.
        //This is used in drawing the remaining seconds meter to show the player how much longer the point will exist.
        instance.remainingFiringSeconds = firingSeconds;
        let remainingFiringSecondsInterval = setInterval(() => {
            instance.remainingFiringSeconds -= 0.15;
        }, 150);
        addUniqueInterval(remainingFiringSecondsInterval);

        instance.timeout = setTimeout(() => {
            removeUniqueInterval(remainingFiringSecondsInterval);

            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = movingPassivePoints.indexOf(instance);
            movingPassivePoints.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function createActivePoint(x, y, waitingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new ActivePoint(x, y);
    activePoints.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingActivePoint(x, y, xSpeed, ySpeed, waitingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingActivePoint(x, y, xSpeed, ySpeed);
    movingActivePoints.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;
    });
};

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireMovingHorizontalLasers(y, height, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Fires the first instance with 0 waiting seconds because the initialWaitingSeconds has already been waited for.
    await fireMovingHorizontalLaser(y, height, speed, 0, firingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireMovingHorizontalLaser(y, height, speed, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingHorizontalLaser(y, height, speed, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingHorizontalLaser(y, height, speed);
    movingHorizontalLasers.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = movingHorizontalLasers.indexOf(instance);
            movingHorizontalLasers.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireMovingVerticalLasers(x, width, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Fires the first instance with 0 waiting seconds because the initialWaitingSeconds has already been waited for.
    await fireMovingVerticalLaser(x, width, speed, 0, firingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireMovingVerticalLaser(x, width, speed, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingVerticalLaser(x, width, speed, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingVerticalLaser(x, width, speed);
    movingVerticalLasers.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = movingVerticalLasers.indexOf(instance);
            movingVerticalLasers.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireBombs(x, y, width, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Fires the first instance with 0 waiting seconds because the initialWaitingSeconds has already been waited for.
    await fireBomb(x, y, width, height, 0, firingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireBomb(x, y, width, height, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireBomb(x, y, width, height, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new Bomb(x, y, width, height);
    bombs.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = bombs.indexOf(instance);
            bombs.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireMovingBombs(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Fires the first instance with 0 waiting seconds because the initialWaitingSeconds has already been waited for.
    await fireMovingBomb(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireMovingBomb(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingBomb(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);
    movingBombs.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = movingBombs.indexOf(instance);
            movingBombs.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireContinuallyMovingBomb(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);
    movingBombs.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        //Continually switches the sign of the wall's speed over each interval of the set parameter of time.
        function directionChangeTimeout() {
            instance.timeout = setTimeout(() => {
                directionChangeTimeout();

                //Makes the wall switch directions.
                instance.xSpeed *= -1;
                instance.ySpeed *= -1;
            }, directionChangeSeconds * 1000);
        };

        directionChangeTimeout();
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function createWall(x, y, width, height) {
    //Creates an instance and sets all of its initial properties.
    let instance = new Wall(x, y, width, height);
    walls.push(instance);

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;
    });
};

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireMovingWalls(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Fires the first instance with 0 waiting seconds because the initialWaitingSeconds has already been waited for.
    await fireMovingWall(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireMovingWall(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingWall(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);
    movingWalls.push(instance);

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            let instanceIndex = movingWalls.indexOf(instance);
            movingWalls.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireContinuallyMovingWall(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(initialWaitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);
    movingWalls.push(instance);

    //Creates a timeout for the instance's direction changing and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        //Continually switches the sign of the wall's speed over each interval of the set parameter of time.
        function directionChangeTimeout() {
            instance.timeout = setTimeout(() => {
                directionChangeTimeout();

                //Makes the wall switch directions.
                instance.xSpeed *= -1;
                instance.ySpeed *= -1;
            }, directionChangeSeconds * 1000);
        };

        directionChangeTimeout();
    });
};

//Instance Helper Functions

function updateAllInstances() {
    allInstances = [
        waitingTimeouts,
        endScreenTimeouts,
        passivePoints,
        movingPassivePoints,
        activePoints,
        movingActivePoints,
        movingHorizontalLasers,
        movingVerticalLasers,
        bombs,
        movingBombs,
        walls,
        movingWalls
    ];
};

function updateAllInteractiveInstances() {
    allInteractiveInstances = [
        passivePoints,
        movingPassivePoints,
        activePoints,
        movingActivePoints,
        movingHorizontalLasers,
        movingVerticalLasers,
        bombs,
        movingBombs
    ];
};

function updateAllCollisionInstances() {
    allCollisionInstances = [
        walls,
        movingWalls
    ];
};

//Moves instances by adding speed to their location every step.
function moveMovingHorizontalLasers() {
    for (let i = 0; i < movingHorizontalLasers.length; i++) {
        if (movingHorizontalLasers[i].state !== "warning") {
            movingHorizontalLasers[i].y += movingHorizontalLasers[i].speed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingVerticalLasers() {
    for (let i = 0; i < movingVerticalLasers.length; i++) {
        if (movingVerticalLasers[i].state !== "warning") {
            movingVerticalLasers[i].x += movingVerticalLasers[i].speed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingPassivePoints() {
    for (let i = 0; i < movingPassivePoints.length; i++) {
        if (movingPassivePoints[i].state !== "warning") {
            movingPassivePoints[i].x += movingPassivePoints[i].xSpeed;
            movingPassivePoints[i].y += movingPassivePoints[i].ySpeed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingActivePoints() {
    for (let i = 0; i < movingActivePoints.length; i++) {
        if (movingActivePoints[i].state !== "warning") {
            movingActivePoints[i].x += movingActivePoints[i].xSpeed;
            movingActivePoints[i].y += movingActivePoints[i].ySpeed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingBombs() {
    for (let i = 0; i < movingBombs.length; i++) {
        if (movingBombs[i].state !== "warning") {
            movingBombs[i].x += movingBombs[i].xSpeed;
            movingBombs[i].y += movingBombs[i].ySpeed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingWalls() {
    for (let i = 0; i < movingWalls.length; i++) {
        if (movingWalls[i].state !== "warning") {
            movingWalls[i].x += movingWalls[i].xSpeed;
            movingWalls[i].y += movingWalls[i].ySpeed;
        };
    };
};

//Drawing Functions

function animateBlockie() {
    //Draws Blockie himself.
    if (blockie.state === "playing") {
        blockie.sprite = spBlockiePlaying;
        //sx is the location on the blockie.png sprite map. Here it determines the sprite's direction facing. It starts at the 
        //idle image, then goes to the top-left, and then continues in a clockwise direction.
        blockie.sx = blockie.width * (Math.round(blockie.angleMovingDegrees / 45) + 4);
    } else if (blockie.state === "recoveringFromDash") {
        blockie.sprite = spBlockieRecoveringFromDash;
        blockie.sx = 0;
    } else if (blockie.state === "destructing") {
        blockie.sprite = spBlockieDestructing;

        let endAnimateBlockieDestructing = setTimeout(() => {
            clearInterval(animateBlockieDestructing);
            removeUniqueTimeout(animateBlockieDestructing);
            removeUniqueTimeout(endAnimateBlockieDestructing);
        }, 1.5 * 1000);
        addUniqueTimeout(endAnimateBlockieDestructing);

        let animateBlockieDestructing = setInterval(() => {
            blockie.sx += blockie.width;
        }, 0.4 * 1000);
        addUniqueTimeout(animateBlockieDestructing);
    };
};

//Draws the remaining seconds meter for when Blockie can dash again.
function drawBlockieDashMeter() {
    if (!allowDashAgain) {
        context.fillStyle = blockieSurroundingColor;
        context.fillRect(blockie.x + 4, blockie.y - 8, 24 * (blockie.remainingDashSeconds / allowDashAgainSeconds), 4);
    };
};

function drawBlockie() {
    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.width, blockie.height, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPassivePoints() {
    for (let i = 0; i < passivePoints.length; i++) {
        let currentInstance = passivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = passivePointColor;
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = passivePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = passivePointColor;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingPassivePoints() {
    for (let i = 0; i < movingPassivePoints.length; i++) {
        let currentInstance = movingPassivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = passivePointColor;
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = passivePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = passivePointColor;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawActivePoints() {
    for (let i = 0; i < activePoints.length; i++) {
        let currentInstance = activePoints[i];

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = activePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = activePointColor;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingActivePoints() {
    for (let i = 0; i < movingActivePoints.length; i++) {
        let currentInstance = movingActivePoints[i];

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = activePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = activePointColor;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingHorizontalLasers() {
    for (let i = 0; i < movingHorizontalLasers.length; i++) {
        let currentInstance = movingHorizontalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.fillStyle = changingColorTwo;

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Left warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + 16, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.lineTo(currentInstance.x + 24, currentInstance.y + currentInstance.height * Math.max(Math.sign(currentInstance.speed), 0));
                context.lineTo(currentInstance.x + 32, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.fill();

                //Right warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.width - 16, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.lineTo(currentInstance.width - 24, currentInstance.y + currentInstance.height * Math.max(Math.sign(currentInstance.speed), 0));
                context.lineTo(currentInstance.width - 32, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingVerticalLasers() {
    for (let i = 0; i < movingVerticalLasers.length; i++) {
        let currentInstance = movingVerticalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.fillStyle = changingColorTwo;

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Top warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.y + 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(Math.sign(currentInstance.speed), 0), currentInstance.y + 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.y + 32);
                context.fill();

                //Bottom warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.height - 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(Math.sign(currentInstance.speed), 0), currentInstance.height - 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.height - 32);
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawBombs() {
    for (let i = 0; i < bombs.length; i++) {
        let currentInstance = bombs[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = changingColorTwo;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingBombs() {
    for (let i = 0; i < movingBombs.length; i++) {
        let currentInstance = movingBombs[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = changingColorTwo;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        let currentInstance = walls[i];
        context.fillStyle = changingColorOne;
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawMovingWalls() {
    for (let i = 0; i < movingWalls.length; i++) {
        let currentInstance = movingWalls[i];
        context.fillStyle = changingColorOne;
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawPartyHats() {
    for (let i = 0; i < partyHats.length; i++) {
        let currentInstance = partyHats[i];

        context.fillStyle = blockieSurroundingColor;

        context.beginPath();
        context.moveTo(currentInstance.x, currentInstance.y + currentInstance.height);
        context.lineTo(currentInstance.x + currentInstance.width / 2, currentInstance.y);
        context.lineTo(currentInstance.x + currentInstance.width, currentInstance.y + currentInstance.height);
        context.fill();
    };
};

//Collision Functions

function checkCollisionsWithClass(classArray) {
    collidingInstances.splice(0);

    for (let i = 0; i < classArray.length; i++) {
        checkInstancesColliding(blockie, classArray[i]);
    };
};

function checkCollisionsWithClasses(classesArray) {
    collidingInstances.splice(0);

    for (let i = 0; i < classesArray.length; i++) {
        let currentClass = classesArray[i];
        for (let i = 0; i < currentClass.length; i++) {
            checkInstancesColliding(blockie, currentClass[i]);
        };
    };
};

function checkTestCollisionsWithClasses(instanceOneX, instanceOneY, classesArray) {
    preventingMovement = false;

    checkBlockieOutsideBorder(blockie, instanceOneX, instanceOneY);

    for (let i = 0; i < classesArray.length; i++) {
        let currentClass = classesArray[i];
        for (let i = 0; i < currentClass.length; i++) {
            checkTestInstancesColliding(blockie, instanceOneX, instanceOneY, currentClass[i]);
        };
    };
};

//Determines if two instances are "colliding". They cannot be colliding if one is in the warning state.
function checkInstancesColliding(instanceOne, instanceTwo) {
    let xColliding = false;
    let yColliding = false;

    if ((instanceTwo.x <= instanceOne.x) && (instanceOne.x <= instanceTwo.x + instanceTwo.width) && (instanceTwo.state === "firing")) {
        xColliding = true;
    } else if ((instanceOne.x <= instanceTwo.x) && (instanceTwo.x <= instanceOne.x + instanceOne.width) && (instanceTwo.state === "firing")) {
        xColliding = true;
    };

    if ((instanceTwo.y <= instanceOne.y) && (instanceOne.y <= instanceTwo.y + instanceTwo.height) && (instanceTwo.state === "firing")) {
        yColliding = true;
    } else if ((instanceOne.y <= instanceTwo.y) && (instanceTwo.y <= instanceOne.y + instanceOne.height) && (instanceTwo.state === "firing")) {
        yColliding = true;
    };

    //The instances must have an overlapping area (x and y components) for there to be a collision.
    if (xColliding && yColliding) {
        collidingInstances.push(instanceTwo);
    };
};

//Determines if two instances are "colliding" (with Blockie's theoretical test locations). They cannot be colliding if one is in 
//the warning state.
function checkTestInstancesColliding(instanceOne, instanceOneX, instanceOneY, instanceTwo) {
    let xColliding = false;
    let yColliding = false;

    if ((instanceTwo.x <= instanceOneX) && (instanceOneX <= instanceTwo.x + instanceTwo.width)) {
        xColliding = true;
    } else if ((instanceOneX <= instanceTwo.x) && (instanceTwo.x <= instanceOneX + instanceOne.width)) {
        xColliding = true;
    };

    if ((instanceTwo.y <= instanceOneY) && (instanceOneY <= instanceTwo.y + instanceTwo.height)) {
        yColliding = true;
    } else if ((instanceOneY <= instanceTwo.y) && (instanceTwo.y <= instanceOneY + instanceOne.height)) {
        yColliding = true;
    };

    //The instances must have an overlapping area (x and y components) for there to be a collision.
    if (xColliding && yColliding) {
        preventingMovement = true;
    }
};

//Checks if an instance (Blockie) is outside of the game canvas.
function checkBlockieOutsideBorder(instanceOne, instanceOneX, instanceOneY) {
    if (instanceOneX < 0 || canvas.width < (instanceOneX + instanceOne.width)) {
        preventingMovement = true;
    } else if (instanceOneY < 0 || canvas.height < (instanceOneY + instanceOne.height)) {
        preventingMovement = true;
    };
}

//Input Functions

function initializeKeyInputs() {
    document.addEventListener("keydown", e => {
        //Adds all pressed keys to an array for game loops to react to without having to create a unique eventListener for every 
        //possible input.
        if (!keysHeld[e.keyCode]) {
            keysDown[e.keyCode] = true;
            keysHeld[e.keyCode] = true;
        };
    });

    //Removes lifted keys from the keysDown array so that they can no longer call their associated functions.
    document.addEventListener("keyup", e => {
        delete keysDown[e.keyCode];
        delete keysHeld[e.keyCode];
    });
};

//Scale Functions 

//Scales the game (including the title, info, and others) along the restricting axis while preserving the games aspect ratio.
function scaleGame() {
    //Determines the scale of the most restricted axis.
    gameScale = Math.min(window.innerWidth / 520, window.innerHeight / 617);

    //Changes the scale of the game's CSS container.
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.style.transform = "scale(" + gameScale + ")";

    //Continuously recalls the function.
    window.requestAnimationFrame(scaleGame);
};

//Cutscene Functions

//Waits for a small cutscene to finish.
async function playCutscene(scene, secondsPerFrame) {
    let cutsceneSideLength = 512;
    let cutscenesx = 0;
    let lastFramesx = scene.naturalWidth - cutsceneSideLength;

    //Each time the frame changes, the next sprite in the sprite map is shown.
    let cutscene = setInterval(() => {
        cutscenesx += cutsceneSideLength;
    }, secondsPerFrame * 1000);

    return new Promise((resolve, reject) => {
        function drawCutscene() {
            context.drawImage(scene, cutscenesx, 0, cutsceneSideLength, cutsceneSideLength, 0, 0, cutsceneSideLength, cutsceneSideLength);

            //Resolves the Promise if the cutscene is over.
            if (cutscenesx > lastFramesx) {
                resolve("resolved");
            } else {
                //Continuously recalls the function until the animation is completed.
                window.requestAnimationFrame(drawCutscene);
            };
        };

        window.requestAnimationFrame(drawCutscene);
    });
};

//Audio Functions

//Loops the currentSong manually to remove the end buffer that audio.loop = true; adds.
function loopSong() {
    if (currentSong != undefined) {
        let buffer = 0.07;

        if (currentSong.currentTime > currentSong.duration - buffer) {
            currentSong.currentTime = 0;
            currentSong.play();
        };
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(loopSong);
};

function stopAudioElement(audioElement) {
    audioElement.currentTime = 0;
    audioElement.pause();
};

function initializeLevelSong() {
    //Stops the music from the levelMenu from playing once a level is starting.
    stopAudioElement(currentSong);

    //The game progresses the music to be more intense and complex every 4 levels, and each timed level has its own music.
    //The final level has a spooky version of the main theme.
    if (currentLevelNum >= 1 && currentLevelNum <= 3) {
        currentSong = sngPersevere1;
    } else if (currentLevelNum >= 5 && currentLevelNum <= 7) {
        currentSong = sngPersevere2;
    } else if (currentLevelNum >= 9 && currentLevelNum <= 11) {
        currentSong = sngPersevere3;
    } else if (currentLevelNum % 4 === 0) {
        currentSong = sngHurry;
    } else if (currentLevelNum === 13) {
        currentSong = sngPersevereZ;
    };

    currentSong.play();
};

//Micellaneous Functions

//Creates a timer that resets the level if the counter reaches 0.
function createCountdownTimer(totalSeconds) {
    let seconds = totalSeconds;

    //Sets the timer container to be visible.
    let countdownTimerContainer = document.getElementById("countdownTimerContainer");
    countdownTimerContainer.style.visibility = "visible";

    countdown = setInterval(() => {
        //Each interval the amount of seconds decreases and the displayed numbers are calculated.
        seconds--;
        let currentMinutes = Math.floor(seconds / 60);
        let currentSeconds = seconds % 60;

        //The remaining time is displayed.
        let countdownTimer = document.getElementById("countdownTimer");
        countdownTimer.innerHTML = `${currentMinutes}:${currentSeconds}`;

        //Restarts the level if the timer reaches 0.
        if (seconds <= 0) {
            destroyCountdownTimer();
            stopLevel("countdownTimerEnded");
        };
    }, 1000);
};

//Sets the countdownTimer to be invisible and clears its interval.
function destroyCountdownTimer() {
    let countdownTimerContainer = document.getElementById("countdownTimerContainer");
    countdownTimerContainer.style.visibility = "hidden";
    clearInterval(countdown);
};

//Allows for the color scheme of the game to be swapped by pressing "i";
function changeColors() {
    if (keysDown[73]) {
        //Prevents the key from being counted as pressed down again (until the key is lifted again).
        delete keysDown[73];

        if (changingColorOne === purple) {
            changingColorOne = blue;
        } else if (changingColorOne === blue) {
            changingColorOne = purple;
        };

        if (changingColorTwo === orange) {
            changingColorTwo = yellow;
        } else if (changingColorTwo === yellow) {
            changingColorTwo = orange;
        };
    };

    window.requestAnimationFrame(changeColors);
};

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
};

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Game loop

function gameLoop() {
    if (gameState === "playing") {
        //Restarts the level if O is pressed.
        if (keysDown[79]) {
            //Prevents the key from being counted as pressed down again (until the key is lifted again).
            delete keysDown[79];

            stopLevel("restartLevelPressed");
        };

        //Enters the level menu if P is pressed.
        if (keysDown[80]) {
            //Prevents the key from being counted as pressed down again (until the key is lifted again).
            delete keysDown[80];

            stopLevel("enterMenuPressed");
        };

        //Other Instances' Movements

        moveMovingPassivePoints();
        moveMovingActivePoints();
        moveMovingHorizontalLasers();
        moveMovingVerticalLasers();
        moveMovingBombs();
        moveMovingWalls();

        //Collision Handling

        //"Pushes" Blockie away from walls that just moved to his location. Needed to allow Blockie to move.
        moveBlockieAwayFromMovingWalls();

        //Blockie's Movement

        if (!recoveringFromDash) {
            //xInput and yInput are both used to determine the angle that Blockie is moving in.
            xInput = 0;
            yInput = 0;

            //Each WASD key changes the angle of Blockie's movement.
            //Left
            if (keysDown[65]) {
                xInput--;
            };

            //Right
            if (keysDown[68]) {
                xInput++;
            };

            //Up
            if (keysDown[87]) {
                yInput--;
            };

            //Down
            if (keysDown[83]) {
                yInput++;
            };

            if ((keysDown[16] || keysDown[32]) && allowDashAgain && (xInput !== 0 || yInput !== 0)) {
                //Prevents the keys from being counted as pressed down again (until the key is lifted again).
                delete keysDown[16];
                delete keysDown[32];
                
                //Pressing shift causes Blockie to "dash" by increasing his speed, creating a cooldown timeout, and playing a recovery 
                //animation.
                initializeDash();
            } else if ((keysDown[37] || keysDown[38] || keysDown[39] || keysDown[40]) && allowDashAgain) {
                //Pressing the Arrow keys causes Blockie to "dash" by increasing his speed, creating a cooldown timeout, and playing a 
                //recovery animation. Directional inputs are reset to allow Blockie to dash only in the direction of the arrow keys.
                xInput = 0;
                yInput = 0;

                //Right
                if (keysDown[39]) {
                    xInput++;
                };

                //Left
                if (keysDown[37]) {
                    xInput--;
                };

                //Down
                if (keysDown[40]) {
                    yInput++;
                };

                //Up
                if (keysDown[38]) {
                    yInput--;
                };

                initializeDash();
            } else {
                blockie.speed = 2;
            };

            //By the way atan2() works, all -y values return negative angles; therefore, the idle state image (image 0)
            //must be set at -180 degrees and all angles must be increased by 180 degrees to rotate from the top-left in a 
            //clockwise direction continuously.
            blockie.angleMovingDegrees = -180;

            if (xInput !== 0 || yInput !== 0) {
                //Finds the angle that Blockie is moving in radians based on the inputs.
                blockie.angleMovingRadians = calculateAngleRadians(xInput, yInput);

                //Converted to make the direction of Blockie more discernible.
                blockie.angleMovingDegrees = convertRadiansToDegrees(blockie.angleMovingRadians);

                //blockie.speed is the hypotenuse for all directional velocities to allow for diagonal movement.
                blockie.dx = Math.cos(blockie.angleMovingRadians) * blockie.speed;
                blockie.dy = Math.sin(blockie.angleMovingRadians) * blockie.speed;

                //The SubPixels store the directional velocity.
                blockie.xSubPixel += blockie.dx;
                blockie.ySubPixel += blockie.dy;

                //The velocity is then floored to avoid the sprite from being on subpixel locations and being distorted.
                blockie.dx = Math.floor(blockie.xSubPixel);
                blockie.dy = Math.floor(blockie.ySubPixel);

                //The SubPixels then store the decimal remainders so they can be added on the next step to not lose speed.
                blockie.xSubPixel -= blockie.dx;
                blockie.ySubPixel -= blockie.dy;

                //The testLocations are where Blockie should go, but it must also be checked for collisions before he is moved.
                blockie.xTarget = blockie.x + blockie.dx;
                blockie.yTarget = blockie.y + blockie.dy;
            } else {
                //Accounts for possible changes in Blockie's location due to respawning or something else that isn't an input.
                blockie.xTarget = blockie.x;
                blockie.yTarget = blockie.y;
            };

            //Movement Obstacles

            updateAllCollisionInstances();
            checkTestCollisionsWithClasses(blockie.xTarget, blockie.yTarget, allCollisionInstances);

            //Moves Blockie to an open space if he is trying to move into a collision instance.
            if (preventingMovement) {
                //Resets Blockie's target location to his current location because there is a 100% chance that space is clear.
                blockie.xTarget = blockie.x;
                blockie.yTarget = blockie.y;

                let xChange = 0;
                let yChange = 0;
                let xDir = Math.sign(blockie.dx);
                let yDir = Math.sign(blockie.dy);
                let lastAvailableX = blockie.xTarget;
                let lastAvailableY = blockie.yTarget;

                //Finds the last free space in the direction that Blockie is moving in. Stops checking for more spaces once 
                //Blockie has moved past his dx or dy each frame.
                while (Math.abs(xChange) < Math.abs(blockie.dx) || Math.abs(yChange) < Math.abs(blockie.dy)) {
                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dx) - xChange < 1) {
                        xChange += blockie.dx - xChange;
                    } else {
                        xChange += xDir;
                    };

                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dy) - yChange < 1) {
                        yChange += blockie.dy - yChange;
                    } else {
                        yChange += yDir;
                    };

                    //Checks if each increment is empty and replaces the last available location with it.
                    checkTestCollisionsWithClasses(blockie.xTarget + xChange, blockie.yTarget + yChange, allCollisionInstances);
                    if (!preventingMovement) {
                        lastAvailableX = blockie.xTarget + xChange;
                        lastAvailableY = blockie.yTarget + yChange;
                    };
                };

                //Sets Blockie's location to the last available one in the direction that he's moving in.
                blockie.xTarget = lastAvailableX;
                blockie.yTarget = lastAvailableY;

                //Resets dx and dy to be relative to his new position.
                blockie.dx = blockie.x + blockie.dx - blockie.xTarget;
                blockie.dy = blockie.y + blockie.dy - blockie.yTarget;
                xChange = 0;
                yChange = 0;

                //Independently checks along the x-axis for an available space after moving in Blockie's exact direction (this
                //only activates when moving diagonally and allows for "sliding").
                while (Math.abs(xChange) < Math.abs(blockie.dx)) {
                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dx) - xChange < 1) {
                        xChange += blockie.dx - xChange;
                    } else {
                        xChange += xDir;
                    };

                    //Checks if each increment is empty and replaces the last available location with it.
                    checkTestCollisionsWithClasses(blockie.xTarget + xChange, blockie.yTarget, allCollisionInstances);
                    if (!preventingMovement) {
                        lastAvailableX = blockie.xTarget + xChange;
                    };
                };

                blockie.xTarget = lastAvailableX;

                //Independently checks along the y-axis for an available space after moving in Blockie's exact direction (this
                //only activates when moving diagonally and allows for "sliding").
                while (Math.abs(yChange) < Math.abs(blockie.dy)) {
                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dy) - yChange < 1) {
                        yChange += blockie.dy - yChange;
                    } else {
                        yChange += yDir;
                    };

                    //Checks if each increment is empty and replaces the last available location with it.
                    checkTestCollisionsWithClasses(blockie.xTarget, blockie.yTarget + yChange, allCollisionInstances);
                    if (!preventingMovement) {
                        lastAvailableY = blockie.yTarget + yChange;
                    };
                };

                blockie.yTarget = lastAvailableY;
            };

            blockie.x = blockie.xTarget;
            blockie.y = blockie.yTarget;
        };

        //Collision Handling

        //"Pushes" Blockie away from walls that he moved to.
        moveBlockieAwayFromMovingWalls();

        //Is Blockie Being Crushed?

        //Checks if Blockie is colliding after everything has moved, and if so, restarts the level (because he's being crushed by 
        //walls and/or the canvas's edge).
        checkTestCollisionsWithClasses(blockie.x, blockie.y, allCollisionInstances);
        if (preventingMovement) {
            stopLevel("died");
        };

        //Interactivity Handling

        updateAllInteractiveInstances();
        checkCollisionsWithClasses(allInteractiveInstances);

        for (let i = 0; i < collidingInstances.length; i++) {
            if (collidingInstances[i].constructor.name === "PassivePoint") {
                //Adds points to the current level's total.
                currentLevelPoints++;

                //Resolves the PassivePoint's Promise and destroys the instance once it is touched.
                let collidingPoint = collidingInstances[i];
                collidingPoint.externalResolve();
                clearTimeout(collidingPoint.timeout);
                let instanceIndex = passivePoints.indexOf(collidingPoint);
                passivePoints.splice(instanceIndex, 1);
            } else if (collidingInstances[i].constructor.name === "MovingPassivePoint") {
                //Adds points to the current level's total.
                currentLevelPoints++;

                //Resolves the PassivePoint's Promise and destroys the instance once it is touched.
                let collidingPoint = collidingInstances[i];
                collidingPoint.externalResolve();
                clearTimeout(collidingPoint.timeout);
                let instanceIndex = movingPassivePoints.indexOf(collidingPoint);
                movingPassivePoints.splice(instanceIndex, 1);
            } else if (collidingInstances[i].constructor.name === "ActivePoint" || collidingInstances[i].constructor.name === "MovingActivePoint") {
                //Adds points to the current level's total.
                currentLevelPoints++;

                endScreen();

                //Allows for Blockie to touch activePoints if they are underneath collisions, since the loop stops checking for other
                //collisions once Blockie has touched an active point.
                break;
            } else {
                //Kills Blockie if he's touching a harmful obstacle (bombs and lasers).
                stopLevel("died");
                break;
            };
        };
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(gameLoop);
};

//Drawing Handling

//Drawing is handled in a loop that is separate from the gameLoop because the game should still be drawn even while the game is 
//restarting or changing levels.
function drawingLoop() {
    //Updates the high score in the points div of the level that is being played or hovered over.
    if (gameState === "inOpeningMenu") {
        document.getElementById("points").innerHTML = "";
    } else if (gameState === "inLevelMenu") {
        document.getElementById("points").innerHTML = `Points: ${earnedPoints[levelHoveringIconNum]}|${possiblePoints[levelHoveringIconNum]}`;
    } else {
        document.getElementById("points").innerHTML = `Points: ${currentLevelPoints}|${possiblePoints[currentLevelNum - 1]}`;
    };

    //Updates the number in the level div of the level that is being played or hovered over.
    if (gameState === "inOpeningMenu") {
        document.getElementById("level").innerHTML = "";
    } else if (gameState === "inLevelMenu") {
        if (levelHoveringIconNum + 1 < 13) {
            document.getElementById("level").innerHTML = `Level: ${levelHoveringIconNum + 1}`;
        } else {
            document.getElementById("level").innerHTML = `Level: END`;
        };
    } else {
        document.getElementById("level").innerHTML = `Level: ${currentLevelNum}`;
    };

    //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState !== "displayingMessage" && gameState !== "inOpeningMenu" && gameState !== "inLevelMenu") {
        animateBlockie();
        drawBlockie();
    };

    if (gameState === "playing") {
        drawPassivePoints();
        drawMovingPassivePoints();
        drawActivePoints();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawMovingActivePoints();
        drawWalls();
        drawMovingWalls();
        drawBombs();
        drawMovingBombs();

        drawBlockieDashMeter();
    } else if (gameState === "finishingLevel") {
        drawPartyHats();
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(drawingLoop);
};

//Refresh Handling

window.addEventListener("beforeunload", () => {
    localStorage.setItem("currentLevelNum", currentLevelNum);
    localStorage.setItem("numUnlockedLevels", numUnlockedLevels);
    localStorage.setItem("earnedPoints", earnedPoints);
});

//Check Page Focus
 
//Since this game uses async-await and timers regularly, having the browser focus on other tabs completely ruins the game's structure
//(timing of instances, etc.); therefore, once the player refocusses on the tab, the level restarts.
function checkPageFocus() {
    if (!document.hasFocus() && gameState === "playing") {
        stopLevel("lostFocus");
    };

    window.requestAnimationFrame(checkPageFocus);
};

//Start Game

initializeOpeningScreenMenu();

initializeKeyInputs();
window.requestAnimationFrame(checkPageFocus);
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(loopSong);
window.requestAnimationFrame(changeColors);
window.requestAnimationFrame(scaleGame);