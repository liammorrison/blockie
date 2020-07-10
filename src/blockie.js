//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

let gameState = "playing";

let currentLevel = 1;

let currentLevelPoints = 0;
let totalPoints = 0;

let xInput = 0;
let yInput = 0;

let preventingMovement = false;

let arrowLeftAlreadyPressed = false;
let arrowUpAlreadyPressed = false;
let arrowRightAlreadyPressed = false;
let arrowDownAlreadyPressed = false;
let shiftAlreadyPressed = false;
let spaceAlreadyPressed = false;
let pAlreadyPressed = false;

let recoveringFromDash = false;
let allowDashAgain = true;
let dashDistance = 96;
let dashRecoverySeconds = 0.3;
let allowDashAgainSeconds = 0.9;

//Used to stop async/await functions by preventing another await to run. Used when Blockie touches activePoints and the current
//instances needs to stop running, yet everything cannot be rejected (because that would stop the level too).
let cancelAwaitChain = false;

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

//Arrays

let keysDown = [];

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

let levelPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
let oneEigth = 4 * 16;
let oneFourth = 8 * 16;
let threeEigths = 12 * 16;
let oneHalf = canvas.width / 2;
let fiveEigths = 20 * 16;
let threeFourths = 24 * 16;
let sevenEigths = 28 * 16;
let fullScreen = 32 * 16;

let pointOne = 2 * 16;
let pointTwo = 6 * 16;
let pointThree = 10 * 16;
let pointFour = 14 * 16;
let pointFive = 18 * 16;
let pointSix = 22 * 16;
let pointSeven = 26 * 16;
let pointEight = 30 * 16;

let blockieAdjustment = -blockie.width / 2

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(oneHalf + blockieAdjustment, threeFourths + blockieAdjustment);

        cancelAwaitChain = false;

        await fireMovingActivePoint(100, 100, 1, 1, 0);

        cancelAwaitChain = false;
    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelTwo() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelThree() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelFour() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelFive() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelSix() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelSeven() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelEight() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelNine() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelTen() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelEleven() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

async function levelTwelve() {
    try {

    } catch (error) {
        console.log(`Level ${currentLevel} restarted.`);
    };
};

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

        await displayMessage("Determination is your only asset.");
    } else if (reason === "keyPressed") {
        resetBlockieState();
        controlLevel();
    } else if (reason === "countdownTimer") {
        gameState = "playingCutscene";
        await playCutscene(spCountdownDestructionScene, 0.17);
        await displayMessage("You've failed another world.");
    };
};

async function increaseLevel() {
    gameState = "finishingLevel";

    blockie.angleMovingDegrees = -180;


    //Points are only made permanent once a level is completed.
    updateLevelPoints(currentLevel);
    currentLevelPoints = 0;
    calculateTotalPoints();

    currentLevel++;

    //Waits for the PartyHat to descend on to Blockie's head.
    await new Promise((resolve, reject) => {
        let partyHatInstance = new PartyHat();
        partyHats.push(partyHatInstance);

        function animateFinishedLevelHat() {
            partyHatInstance.y += Math.min(2, (blockie.y - partyHatInstance.y - partyHatInstance.height));

            if (partyHatInstance.y + partyHatInstance.height !== blockie.y) {
                //Continuously recalls the function until the PartyHat reaches Blockie's head.
                window.requestAnimationFrame(animateFinishedLevelHat);
            } else {
                resolve("resolved");
            };
        };

        window.requestAnimationFrame(animateFinishedLevelHat);
    });

    await displayMessage("You haven't escaped yet.")
};

function controlLevel() {
    switch (currentLevel) {
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
    };
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

//Shows a message and awaits a player input to continue the game.
async function displayMessage(message) {
    //Forces the player to read the message for 1 second before they can continue the game.
    await new Promise((resolve, reject) => {
        let drawGameOverScreen = setTimeout(() => {
            //Placed here to draw Blockie with a PartyHat during increaseLevel().
            partyHats.splice(0);

            //Draws the game over screen.
            document.getElementById("messageDisplayer").innerHTML = message;
            gameState = "displayingMessage";
            resolve("resolved");
        }, 1000);
    });

    return await new Promise((resolve, reject) => {
        //Restarts the game once acceptable keys are pressed.
        function resumePlaying() {
            if (keysDown[16] || keysDown[32]) {
                document.getElementById("messageDisplayer").innerHTML = "";

                gameState = "playing";
                resetBlockieState();

                controlLevel();

                resolve("resolved");
            } else {
                //Continuously recalls the function until an acceptable key is pressed.
                window.requestAnimationFrame(resumePlaying);
            };
        };

        window.requestAnimationFrame(resumePlaying);
    });
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

    //Prevents Blockie from dashing again based off of one button press.
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
                context.moveTo(currentInstance.x + 16, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.lineTo(currentInstance.x + 24, currentInstance.y + currentInstance.height * Math.max(0, Math.sign(currentInstance.speed)));
                context.lineTo(currentInstance.x + 32, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.fill();

                //Right warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.width - 16, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.lineTo(currentInstance.width - 24, currentInstance.y + currentInstance.height * Math.max(0, Math.sign(currentInstance.speed)));
                context.lineTo(currentInstance.width - 32, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
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
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.y + 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(0, Math.sign(currentInstance.speed)), currentInstance.y + 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.y + 32);
                context.fill();

                //Bottom warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.height - 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(0, Math.sign(currentInstance.speed)), currentInstance.height - 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.height - 32);
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
    } else if (instanceOneX < 0 || canvas.width < (instanceOneX + instanceOne.width)) {
        preventingMovement = true;
    } else if (instanceOneY < 0 || canvas.height < (instanceOneY + instanceOne.height)) {
        preventingMovement = true;
    } else {
        preventingMovement = false;
    };
};

//Input Functions

function initializeKeyInputs() {
    //Adds all currently pressed keys as a keyCode with a pair of true in the keysDown object. .keyCode is used instead of .key so 
    //that capital letters can't cause unwanted movements.
    document.addEventListener("keydown", e => {
        //Special keys can only be set as "down" during the first single frame of being held until release. This is done by preventing
        //the key from being activated again before release and by deleting it from the array on the second frame of being pressed.
        if (shiftAlreadyPressed) {
            delete keysDown[16];
        };
        if (spaceAlreadyPressed) {
            delete keysDown[32];
        };
        if (arrowLeftAlreadyPressed) {
            delete keysDown[37];
        };
        if (arrowUpAlreadyPressed) {
            delete keysDown[38];
        };
        if (arrowRightAlreadyPressed) {
            delete keysDown[39];
        };
        if (arrowDownAlreadyPressed) {
            delete keysDown[40];
        };
        if (pAlreadyPressed) {
            delete keysDown[80];
        };

        if (e.keyCode === 16) {
            if (!shiftAlreadyPressed) {
                keysDown[e.keyCode] = true;
                shiftAlreadyPressed = true;
            };
        } else if (e.keyCode === 32) {
            if (!spaceAlreadyPressed) {
                keysDown[e.keyCode] = true;
                spaceAlreadyPressed = true;
            };
        } else if (e.keyCode === 37) {
            if (!arrowLeftAlreadyPressed) {
                keysDown[e.keyCode] = true;
                arrowLeftAlreadyPressed = true;
            };
        } else if (e.keyCode === 38) {
            if (!arrowUpAlreadyPressed) {
                keysDown[e.keyCode] = true;
                arrowUpAlreadyPressed = true;
            };
        } else if (e.keyCode === 39) {
            if (!arrowRightAlreadyPressed) {
                keysDown[e.keyCode] = true;
                arrowRightAlreadyPressed = true;
            };
        } else if (e.keyCode === 40) {
            if (!arrowDownAlreadyPressed) {
                keysDown[e.keyCode] = true;
                arrowDownAlreadyPressed = true;
            };
        } else if (e.keyCode === 80) {
            if (!pAlreadyPressed) {
                keysDown[e.keyCode] = true;
                pAlreadyPressed = true;
            };
        } else {
            keysDown[e.keyCode] = true;
        };
    });

    //Deletes all currently unpressed keys from the keysDown object.
    document.addEventListener("keyup", e => {
        //Setting the flag to false allows the key to be set as "down" again.
        if (e.keyCode === 16) {
            delete keysDown[e.keyCode];
            shiftAlreadyPressed = false;
        } else if (e.keyCode === 32) {
            delete keysDown[e.keyCode];
            spaceAlreadyPressed = false;
        } else if (e.keyCode === 37) {
            delete keysDown[e.keyCode];
            arrowLeftAlreadyPressed = false;
        } else if (e.keyCode === 38) {
            delete keysDown[e.keyCode];
            arrowUpAlreadyPressed = false;
        } else if (e.keyCode === 39) {
            delete keysDown[e.keyCode];
            arrowRightAlreadyPressed = false;
        } else if (e.keyCode === 40) {
            delete keysDown[e.keyCode];
            arrowDownAlreadyPressed = false;
        } else if (e.keyCode === 80) {
            delete keysDown[e.keyCode];
            pAlreadyPressed = false;
        } else {
            delete keysDown[e.keyCode];
        };
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

function updateLevelPoints(currentLevel) {
    levelPoints[currentLevel - 1] = currentLevelPoints;
};

function calculateTotalPoints() {
    totalPoints = 0;
    for (let i = 0; i < levelPoints.length; i++) {
        totalPoints += levelPoints[i];
    };
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
    //Restarts the level if P is pressed.
    if (keysDown[80]) {
        restartLevel("keyPressed");
    };

    if (gameState === "playing") {
        //Other Instances' Movements

        moveMovingPassivePoints();
        moveMovingActivePoints();
        moveMovingHorizontalLasers();
        moveMovingVerticalLasers();
        moveMovingBombs();
        moveMovingWalls();

        //Collision Handling

        //Loops through each moving wall that Blockie is touching and pushes Blockie away from it.
        checkCollisionsWithClass(movingWalls);
        for (let i = 0; i < collidingInstances.length; i++) {
            let collidingMovingWallInstance = collidingInstances[i];
            preventingMovement = false;

            //Checks if Blockie would be not touching the current moving wall if he moved with the wall's xSpeed, and if so, 
            //"pushes" Blockie there.
            checkTestInstancesColliding(blockie, blockie.x + collidingMovingWallInstance.xSpeed, blockie.y, collidingMovingWallInstance);
            if (!preventingMovement) {
                blockie.x += collidingMovingWallInstance.xSpeed;
                break;
            };

            //Checks if Blockie would be not touching the current moving wall if he moved with the wall's ySpeed, and if so, 
            //"pushes" Blockie there.
            checkTestInstancesColliding(blockie, blockie.x, blockie.y + collidingMovingWallInstance.ySpeed, collidingMovingWallInstance);
            if (!preventingMovement) {
                blockie.y += collidingMovingWallInstance.ySpeed;
                break;
            };
        };

        //Blockie's Movement

        if (!recoveringFromDash) {
            //xInput and yInput are both used to determine the angle that Blockie is moving in.
            xInput = 0;
            yInput = 0;

            //Each WASD key changes the angle of Blockie's movement.
            //Right
            if (keysDown[68]) {
                xInput++;
            };

            //Left
            if (keysDown[65]) {
                xInput--;
            };

            //Down
            if (keysDown[83]) {
                yInput++;
            };

            //Up
            if (keysDown[87]) {
                yInput--;
            };

            if ((keysDown[16] || keysDown[32]) && allowDashAgain && (xInput !== 0 || yInput !== 0)) {
                //Shift acts uniquely because it only is "down" for one frame; therefore, it must also be deleted after use because
                //otherwise it could never be deleted in the input function.
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
    //Updates the amount of points in the gameInfo div.
    document.getElementById("currentPoints").innerHTML = `Points: ${currentLevelPoints}|7`;

    //Update the current level in the currentLevel div.
    document.getElementById("currentLevel").innerHTML = "Level: " + currentLevel;

    //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState !== "displayingMessage" && gameState !== "playingCutscene") {
        animateBlockie();
        drawBlockie();
    };

    if (gameState === "playing") {
        drawWalls();
        drawPassivePoints();
        drawMovingPassivePoints();
        drawActivePoints();
        drawMovingActivePoints();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawBombs();
        drawMovingBombs();
        drawMovingWalls();
    } else if (gameState === "finishingLevel") {
        drawPartyHats();
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(drawingLoop);
};

//Game Start

levelOne();

initializeKeyInputs();
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(scaleGame);