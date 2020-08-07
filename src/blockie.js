//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

let gameState = "playing";
let currentLevelNum = 1;

//Stores the number of levels that are unlocked (since the game is linear, each newly unlocked level is assumed to be 1 higher than 
//the previous one).
let numUnlockedLevels = 1;

let currentLevelPoints = 0;

//Used to stop async/await functions by preventing another await to run. Used when Blockie touches activePoints and the current
//instances needs to stop running, yet everything cannot be rejected (because that would stop the level too).
let cancelAwaitChain = false;

let xInput = 0;
let yInput = 0;
let preventingMovement = false;
let recoveringFromDash = false;
let allowDashAgain = true;
let dashDistance = 96;
let dashRecoverySeconds = 0.3;
let allowDashAgainSeconds = 0.9;
let hoveringIconArrayNum = 0;

//Sprite maps. 

//These are used when drawing to easily reference sprites. They are large sprite maps to avoid loading many individual sprite 
//files (which would hurt performance).

let spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

let spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

let spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

let spCountdownDestructionScene = document.createElement("img");
spCountdownDestructionScene.src = "../images/spCountdownDestructionScene.png";

let gameScale = 1;

let countdown = 0;

//Sound Loading

let stockSong = new Audio("../sounds/stock_song.mp3")

//Arrays

let keysDown = [];
let keysHeld = [];

//tapKeys holds all of the keys that are only supposed to be active for one frame after being pressed (and that actually do something
//in the game).
let tapKeys = [16, 32, 37, 38, 39, 40, 80];

let waitingTimeouts = [];
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

//Used in for loops to apply a function to many objects.
let allInstances = [];
let allInteractiveInstances = [];
let allCollisionInstances = [];

let currentTimeouts = [];
let currentIntervals = [];

let collidingInstances = [];

//Holds the highest number of points that were touched in a full run of each level.
let earnedPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Holds the total number of points that spawn in each level.
let possiblePoints = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1];

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
let fullScreen = 32 * 16;

let blockieAdjustment = -blockie.width / 2

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(threeSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, fullScreen, threeEigths),
            createWall(0, fiveEigths, fullScreen, threeEigths),
            createActivePoint(thirteenSixteenths - 8, oneHalf - 8, 0),
            createPassivePoint(oneHalf - 8, oneHalf - 8, 0, 10)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, fullScreen, threeEigths),
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
            createWall(fiveEigths, 0, threeEigths, fullScreen),
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
            createWall(0, 0, fullScreen, threeFourths),
            createPassivePoint(threeSixteenths - 8, sevenEigths - 8, 0, 10),

            loopFireBombs(oneHalf - 16, threeFourths, 32, oneFourth, 2.2, 1, 1),

            createActivePoint(sevenEigths - 8, sevenEigths - 8, 2)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createActivePoint(oneHalf - 8, sevenEigths - 8, 0),

            fireBomb(threeFourths, threeFourths, oneFourth, oneFourth, 1, 3)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createWall(0, 0, threeEigths, fullScreen),
            createWall(fiveEigths, 0, threeEigths, fullScreen),
            createActivePoint(oneHalf - 8, threeSixteenths - 8, 0),
            fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 1, 5)
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
            createWall(0, 0, sevenSixteenths, fullScreen),
            createWall(sevenSixteenths, 0, oneEigth, sevenSixteenths),
            createWall(sevenSixteenths, nineSixteenths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, threeFourths, oneEigth, oneSixteenth),
            createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth),
            createWall(nineSixteenths, 0, sevenSixteenths, fullScreen),
            createActivePoint(oneHalf - 8, oneHalf - 8, 0),
            createPassivePoint(oneHalf - 8, elevenSixteenths - 8, 0, 10)
        ]);
 
        cancelAwaitChain = false;
 
        await Promise.all([
            createWall(0, 0, fullScreen, oneSixteenth),
            createWall(0, threeSixteenths, fullScreen, oneSixteenth),
            createWall(0, threeEigths, fullScreen, oneSixteenth),
            createWall(0, nineSixteenths, fullScreen, sevenSixteenths),
            createWall(0, 0, oneSixteenth, fullScreen),
            createWall(threeSixteenths, 0, oneSixteenth, fullScreen),
            createWall(threeEigths, 0, oneSixteenth, fullScreen),
            createWall(nineSixteenths, 0, oneSixteenth, fullScreen),
            createWall(threeFourths, 0, oneSixteenth, fullScreen),
            createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen),
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
            createWall(0, 0, sevenSixteenths, fullScreen),
            createWall(nineSixteenths, 0, sevenSixteenths, fullScreen),
            createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0),
            fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 0, 5)
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

    } catch (error) {};
};

async function levelFive() {
    try {

    } catch (error) {};
};

async function levelSix() {
    try {

    } catch (error) {};
};

async function levelSeven() {
    try {

    } catch (error) {};
};

async function levelEight() {
    try {

    } catch (error) {};
};

async function levelNine() {
    try {

    } catch (error) {};
};

async function levelTen() {
    try {

    } catch (error) {};
};

async function levelEleven() {
    try {

    } catch (error) {};
};

async function levelTwelve() {
    try {

    } catch (error) {};
};

async function levelEnd() {
    try {

    } catch (error) {};
}

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    gameState = "playing";

    blockie.x = blockieX;
    blockie.y = blockieY;

    recoveringFromDash = false;
    allowDashAgain = true;
};

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
async function restartLevel(reason) {
    //Stops all currently-running timeouts so that they stop hurting performance and don't execute after reseting.
    for (let i = 0; i < currentTimeouts.length; i++) {
        clearTimeout(currentTimeouts[i]);
    };

    currentTimeouts.splice(0);

    //Stops all currently-running timeouts so that they stop hurting performance and don't execute after reseting.
    for (let i = 0; i < currentIntervals.length; i++) {
        clearInterval(currentIntervals[i]);
    };

    currentIntervals.splice(0);

    updateAllInstances();
    for (let i = 0; i < allInstances.length; i++) {
        rejectInstances(allInstances[i]);
    };

    destroyCountdownTimer();

    //Removes all points collected in the level.
    currentLevelPoints = 0;

    //Switches how the game resets based on how it triggered.
    if (reason === "died") {
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

        await displayMessage("Determination is your only asset.", "restartLevel");
    } else if (reason === "keyPressed") {
        resetBlockieState();
        callLevel(currentLevelNum);
    } else if (reason === "lostFocus") {
        await displayMessage("Escaping this tab will not save you!", "restartLevel");
    } else if (reason === "countdownTimer") {
        gameState = "playingCutscene";

        //Waits half a second before displaying a message.
        await new Promise((resolve, reject) => {
            let continueDestruction = setTimeout(() => {
                resolve("resolved");
            }, 500);
        });

        await playCutscene(spCountdownDestructionScene, 0.17);
        await displayMessage("You've failed another world.", "restartLevel");
    };
};

async function endLevel() {
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

        function animateFinishedLevelHat() {
            partyHatInstance.y += Math.min((blockie.y - partyHatInstance.y - partyHatInstance.height), 2);

            if (partyHatInstance.y + partyHatInstance.height !== blockie.y) {
                //Continuously recalls the function until the PartyHat reaches Blockie's head.
                window.requestAnimationFrame(animateFinishedLevelHat);
            } else {
                resolve("resolved");
            };
        };

        window.requestAnimationFrame(animateFinishedLevelHat);
    });

    await displayMessage("You haven't escaped yet.", "enterLevelMenu");

    currentLevelPoints = 0;
};

function callLevel(levelNum) {
    switch (levelNum) {
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

function initializeLevelMenu() {
    gameState = "inMenu"

    //Creates an array of all 13 menu Icon IDs.
    let menuIconArray = document.querySelectorAll(".menuIcon");

    //If followMouse is true, then whatever icon that the mouse is over will be highlighted.
    let followMouse = false;

    //This timer allows for keys to be used in menus after half a second of the mouse idling.
    let stopFollowingMouse;

    //Makes all unlocked HTML menu elements visible.
    for (let i = 0; i < numUnlockedLevels; i++) {
        menuIconArray[i].style.visibility = "visible";
    };

    //Clicking Handling

    function beginSelectedLevel(iconNum) {
        currentLevelNum = iconNum

        //Makes all unlocked HTML menu elements invisible.
        for (let i = 0; i < numUnlockedLevels; i++) {
            menuIconArray[i].style.visibility = "hidden";
        };

        //Removes all menu-specific eventListeners and timers.
        
        for (let i = 0; i < numUnlockedLevels; i++) {
            menuIconArray[i].removeEventListener("click", () => {
                beginSelectedLevel(i + 1)
            });
        };

        for (let i = 0; i < numUnlockedLevels; i++) {
            menuIconArray[i].removeEventListener("mouseover", () => {
                if (followMouse) {
                    revertLevelIcon(hoveringIconArrayNum);
                    hoveringIconArrayNum = i;
                    highlightLevelIcon(hoveringIconArrayNum);
                };
            });
        };

        document.removeEventListener("mousemove", checkFollowMouse);

        clearInterval(checkFollowKeys);

        //Begins the level that the player clicked the corresponding icon for.
        callLevel(currentLevelNum);
    };

    //Begins the level that is clicked on (even if followMouse is false).
    for (let i = 0; i < numUnlockedLevels; i++) {
        menuIconArray[i].addEventListener("click", () => {
            beginSelectedLevel(i + 1)
        });
    };

    //Hovering Handling

    function highlightLevelIcon(iconNum) {
        menuIconArray[iconNum].style.outline = "5px solid #741EFF";
        menuIconArray[iconNum].style.color = "#741EFF";
        menuIconArray[iconNum].style.backgroundColor = "#FF51EF";
    };

    function revertLevelIcon(iconNum) {
        menuIconArray[iconNum].style.outline = "5px solid white";
        menuIconArray[iconNum].style.color = "white";
        menuIconArray[iconNum].style.backgroundColor = "black";
    };

    let checkFollowKeys = setInterval(() => {
        //Dehighlights the previous hovering icon (as it may change depending on key inputs during this function).
        revertLevelIcon(hoveringIconArrayNum);

        //Moves the hoveringIconArrayNum if any keys are pressed.

        //Left
        if (keysDown[65]) {
            hoveringIconArrayNum--;
        };

        //Right
        if (keysDown[68]) {
            hoveringIconArrayNum++;
        };

        //Up
        if (keysDown[87]) {
            hoveringIconArrayNum -= 4;
        };

        //Down
        if (keysDown[83]) {
            hoveringIconArrayNum += 4;
        };

        //Limits moving the cursor to only unlocked level icons.
        hoveringIconArrayNum = Math.min(hoveringIconArrayNum, numUnlockedLevels - 1);
        hoveringIconArrayNum = Math.max(hoveringIconArrayNum, 0);

        //Highlights the new hoveringIconArrayNum (which may be different than the previous hovering icon if a key was pressed).
        highlightLevelIcon(hoveringIconArrayNum);

        //Begins the currently highlighted level (even if followMouse is still true).
        if (keysDown[16] || keysDown[32]) {
            beginSelectedLevel(hoveringIconArrayNum + 1);
        };
    }, 120);

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
        menuIconArray[i].addEventListener("mouseover", () => {
            if (followMouse) {
                //Dehighlights the previously highlighted icon as the mouse may be over a different icon, which is then highlighted.
                revertLevelIcon(hoveringIconArrayNum);
                hoveringIconArrayNum = i;
                highlightLevelIcon(hoveringIconArrayNum);
            };
        });
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

            resolve("resolved");
        }, 1000);
    });

    return await new Promise((resolve, reject) => {
        //Restarts the game once acceptable keys are pressed.
        function resumePlaying() {
            if (keysDown[16] || keysDown[32]) {
                delete keysDown[16];
                delete keysDown[32];

                document.getElementById("messageDisplayer").innerHTML = "";

                switch (endAction) {
                    case "restartLevel":
                        gameState = "playing";
                        resetBlockieState();
                        callLevel(currentLevelNum);
                        break;
                    case "enterLevelMenu":
                        initializeLevelMenu();
                        break;
                    case "continueLevel":
                        //Does nothing because the levels automatically progress after displayMessage() has resolved.
                        break;
                };

                resolve("resolved");
            } else {
                //Continuously recalls the function until an acceptable key is pressed.
                window.requestAnimationFrame(resumePlaying);
            };
        };

        window.requestAnimationFrame(resumePlaying);
    });
};

//Level-Handling Helper Functions

//Resolves all promises and removes all instances from their object arrays.
function resolveInstances(objectArray) {
    //The for loop's length is determined before it starts to avoid missing the first element.
    let initialArrayLength = objectArray.length;

    for (let i = initialArrayLength - 1; i >= 0; i--) {
        //Rejects the instances' Promises and timeouts and destroys the instances.
        let instance = objectArray[i];
        instance.externalResolve();
        clearTimeout(instance.timeout);
        objectArray.splice(i, 1);
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

//Adds a currently-running timeout to an array so that it can be easily deactivated when the game restarts.
function addCurrentTimeout(timeout) {
    currentTimeouts.push(timeout);
};

//Removes a timeout from the array of currently-running timeouts.
function removeCurrentTimeout(timeout) {
    let currentTimeoutIndex = currentTimeouts.indexOf(timeout);
    currentTimeouts.splice(currentTimeoutIndex, 1);
};

//Adds a currently-running interval to an array so that it can be easily deactivated when the game restarts.
function addCurrentInterval(interval) {
    currentIntervals.push(interval);
};

//Removes a interval from the array of currently-running intervals and clears it.
function removeCurrentInterval(interval) {
    clearInterval(interval);
    let currentIntervalIndex = currentIntervals.indexOf(interval);
    currentIntervals.splice(currentIntervalIndex, 1);
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
        removeCurrentTimeout(endDashRecovery);
    }, dashRecoverySeconds * 1000);
    addCurrentTimeout(endDashRecovery);

    //Sets an interval to the length of the dash recovery which counts down the semi-accurate remaining length of the timeout.
    //This is used in drawing the remaining seconds meter to show the player how much more recovery time that they need to wait.
    blockie.remainingDashSeconds = allowDashAgainSeconds;
    let remainingDashSecondsInterval = setInterval(() => {
        blockie.remainingDashSeconds -= 0.004;
    }, 1);
    addCurrentInterval(remainingDashSecondsInterval);

    let resetAllowDashAgain = setTimeout(() => {
        allowDashAgain = true;
        removeCurrentInterval(remainingDashSecondsInterval);
        removeCurrentTimeout(resetAllowDashAgain);
    }, allowDashAgainSeconds * 1000);
    addCurrentTimeout(resetAllowDashAgain);
};

//Allows for dashing again.
function resetBlockieState() {
    blockie.state = "playing";
    recoveringFromDash = false;
    allowDashAgain = true;

    //Prevents Blockie from dashing immedaitely after respawning/entering another screen due to the same button press that was meant 
    //to only dash/end a message.
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
function setWaitingTimeout(waitingSeconds) {
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
            instance.remainingFiringSeconds -= 0.004;
        }, 1);
        addCurrentInterval(remainingFiringSecondsInterval);

        instance.timeout = setTimeout(() => {
            removeCurrentInterval(remainingFiringSecondsInterval);

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
            instance.remainingFiringSeconds -= 0.004;
        }, 1);
        addCurrentInterval(remainingFiringSecondsInterval);

        instance.timeout = setTimeout(() => {
            removeCurrentInterval(remainingFiringSecondsInterval);

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
        waitingTimeouts,
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
    //Draws the remaining seconds meter for when Blockie can dash again.
    if (!allowDashAgain && gameState === "playing") {
        context.fillStyle = "#378CFF";
        context.fillRect(blockie.x, blockie.y - 8, blockie.width * (blockie.remainingDashSeconds / allowDashAgainSeconds), 4);
    };

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
            removeCurrentTimeout(animateBlockieDestructing);
            removeCurrentTimeout(endAnimateBlockieDestructing);
        }, 1.5 * 1000);
        addCurrentTimeout(endAnimateBlockieDestructing);

        let animateBlockieDestructing = setInterval(() => {
            blockie.sx += blockie.width;
        }, 0.5 * 1000);
        addCurrentTimeout(animateBlockieDestructing);
    };
};

function drawBlockie() {
    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.width, blockie.height, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPassivePoints() {
    for (let i = 0; i < passivePoints.length; i++) {
        let currentInstance = passivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = "#E6FF16";
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = "#E6FF16";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#E6FF16";
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingPassivePoints() {
    for (let i = 0; i < movingPassivePoints.length; i++) {
        let currentInstance = movingPassivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = "#E6FF16";
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = "#E6FF16";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#E6FF16";
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
                context.strokeStyle = "#FF9012";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF9012";
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
                context.strokeStyle = "#FF9012";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF9012";
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
                context.fillStyle = "#FF51EF";

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
                context.fillStyle = "#FF51EF";
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
                context.fillStyle = "#FF51EF";

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Top warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed))), currentInstance.y + 16, 0);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(Math.sign(currentInstance.speed), 0), currentInstance.y + 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed))), currentInstance.y + 32, 0);
                context.fill();

                //Bottom warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed))), currentInstance.height - 16, 0);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(Math.sign(currentInstance.speed), 0), currentInstance.height - 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed))), currentInstance.height - 32, 0);
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
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
                context.strokeStyle = "#FF51EF";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
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
                context.strokeStyle = "#FF51EF";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        let currentInstance = walls[i];
        context.fillStyle = "#741EFF";
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawMovingWalls() {
    for (let i = 0; i < movingWalls.length; i++) {
        let currentInstance = movingWalls[i];
        context.fillStyle = "#741EFF";
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawPartyHats() {
    for (let i = 0; i < partyHats.length; i++) {
        let currentInstance = partyHats[i];

        context.fillStyle = "#378CFF";

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
        //Prevents tapKeys from being set to true after 1 frame of being pressed.
        for (let i = 0; i < tapKeys.length; i++) {
            delete keysDown[tapKeys[i]];
        };

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

//Point Functions



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
}

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
            restartLevel("countdownTimer");
        };
    }, 1000);
};

//Sets the countdownTimer to be invisible and clears its interval.
function destroyCountdownTimer() {
    let countdownTimerContainer = document.getElementById("countdownTimerContainer");
    countdownTimerContainer.style.visibility = "hidden";
    clearInterval(countdown);
}

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
};

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Game loop

function gameLoop() {
    if (gameState === "playing") {
        //Restarts the level if P is pressed.
        if (keysDown[80]) {
            restartLevel("keyPressed");
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
                //Since the shift key is unique and only counts as "down" for 1 frame, it can't always be removed from the keysDown 
                //array even while it's being held, so it must be removed manually after each time it's used.
                delete keysDown[16];
                
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

        //Checks if Blockie is colliding after everything has moved, and if so, restarts the level.
        checkTestCollisionsWithClasses(blockie.x, blockie.y, allCollisionInstances);
        if (preventingMovement) {
            restartLevel("died");
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

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (let i = 0; i < currentTimeouts.length; i++) {
                    clearTimeout(currentTimeouts[i]);
                };

                currentTimeouts.splice(0);

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (let i = 0; i < currentIntervals.length; i++) {
                    clearInterval(currentIntervals[i]);
                };

                currentIntervals.splice(0);

                resetBlockieState();

                cancelAwaitChain = true;

                updateAllInstances();
                for (let i = 0; i < allInstances.length; i++) {
                    resolveInstances(allInstances[i]);
                };

                //Allows for Blockie to touch activePoints if they are underneath collisions, since he won't die.
                break;
            } else {
                restartLevel("died");
                break;
            };
        };
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(gameLoop);
};

//Drawing is handled in a loop that is separate from the gameLoop because the game should still be drawn even while the game is 
//restarting or changing levels.
function drawingLoop() {
    //Updates the high score in the points div of the level that is being played or hovered over.
    if (gameState === "inMenu") {
        document.getElementById("points").innerHTML = `Points: ${earnedPoints[hoveringIconArrayNum]}|${possiblePoints[hoveringIconArrayNum]}`;
    } else {
        document.getElementById("points").innerHTML = `Points: ${currentLevelPoints}|${possiblePoints[currentLevelNum - 1]}`;
    };

    //Updates the number in the level div of the level that is being played or hovered over.
    if (gameState === "inMenu") {
        if (hoveringIconArrayNum + 1 < 13) {
            document.getElementById("level").innerHTML = `Level: ${hoveringIconArrayNum + 1}`;
        } else {
            document.getElementById("level").innerHTML = `Level: END`;
        };
    } else {
        document.getElementById("level").innerHTML = `Level: ${currentLevelNum}`;
    };

    //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState !== "displayingMessage" && gameState !== "playingCutscene" && gameState !== "inMenu") {
        animateBlockie();
        drawBlockie();
    };

    if (gameState === "playing") {
        drawPassivePoints();
        drawMovingPassivePoints();
        drawActivePoints();
        drawMovingActivePoints();
        drawWalls();
        drawMovingWalls();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawBombs();
        drawMovingBombs();
    } else if (gameState === "finishingLevel") {
        drawPartyHats();
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(drawingLoop);
};

//Check Page Focus

//Since this game uses async-await and timers regularly, having the browser focus on other tabs completely ruins the game's structure
//(timing of instances, etc.); therefore, once the player refocusses on the tab, the level restarts.
function checkPageFocus() {
    if (!document.hasFocus() && gameState === "playing") {
        restartLevel("lostFocus");
    };

    window.requestAnimationFrame(checkPageFocus);
};

//Game Start

levelOne();

initializeKeyInputs();
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(scaleGame);
window.requestAnimationFrame(checkPageFocus);