//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

let gameState = "playing";

let currentLevel = 1;

let permanentPoints = 0;
let currentLevelPoints = 0;

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

//Loads Blockie's sprite maps. They are large sprite maps to avoid loading many individual sprite files.
let spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

let spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

let spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

let gameScale = 1;

//Arrays

let keysDown = [];

let waitingTimeouts = [];
let passivePoints = [];
let activePoints = [];
let horizontalLasers = [];
let verticalLasers = [];
let movingHorizontalLasers = [];
let movingVerticalLasers = [];
let bombs = [];
let walls = [];
let partyHats = [];

//allObjects is used to make destroying all instances (reject or resolve) possible with a for loop.
let allObjects = [];

let currentTimeouts = [];
let currentIntervals = [];

let collidingInstances = [];

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
        this.targetXLocation = this.x;
        this.targetYLocation = this.y;

        this.state = "playing";

        this.sprite = spBlockiePlaying;
        this.sx = 0;
        this.spriteSideLength = 16;

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

class HorizontalLaser {
    constructor(y, height) {
        this.x = 0;
        this.y = y;
        this.width = canvas.width;
        this.height = height;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalReject;
        this.timeout;
    };
};

class VerticalLaser {
    constructor(x, width) {
        this.x = x;
        this.y = 0;
        this.width = width;
        this.height = canvas.height;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
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

class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

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
        initializeLevel(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);

        cancelAwaitChain = false;

        await Promise.all([
            createWall(0, 0, 14 * 16, fullScreen),
            createWall(14 * 16, 0, 4 * 16, 14 * 16),
            createWall(14 * 16, 18 * 16, 4 * 16, 2 * 16),
            createWall(14 * 16, 24 * 16, 4 * 16, 2 * 16),
            createWall(14 * 16, 30 * 16, 4 * 16, 2 * 16),
            createWall(18 * 16, 0, 14 * 16, fullScreen),
            createActivePoint(oneHalf - 8, oneHalf - 8, 0),
            createPassivePoint(oneHalf - 8, 22 * 16 - 8, 0, 10)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createWall(0, 0, fullScreen, 2 * 16),
            createWall(0, 6 * 16, fullScreen, 2 * 16),
            createWall(0, 12 * 16, fullScreen, 2 * 16),
            createWall(0, 18 * 16, fullScreen, 14 * 16),
            createWall(0, 0, 2 * 16, fullScreen),
            createWall(6 * 16, 0, 2 * 16, fullScreen),
            createWall(12 * 16, 0, 2 * 16, fullScreen),
            createWall(18 * 16, 0, 2 * 16, fullScreen),
            createWall(24 * 16, 0, 2 * 16, fullScreen),
            createWall(30 * 16, 0, 2 * 16, fullScreen),
            createPassivePoint(4 * 16 - 8, oneHalf - 8, 0, 16),
            createPassivePoint(28 * 16 - 8, oneHalf - 8, 0, 16),
            loopFireBombs(8 * 16, 2 * 16, 4 * 16, 4 * 16, 0, 2, 1),
            loopFireBombs(20 * 16, 2 * 16, 4 * 16, 4 * 16, 0, 2, 1),
            loopFireBombs(2 * 16, 8 * 16, 4 * 16, 4 * 16, 0, 2, 1),
            loopFireBombs(14 * 16, 8 * 16, 4 * 16, 4 * 16, 0, 2, 1),
            loopFireBombs(26 * 16, 8 * 16, 4 * 16, 4 * 16, 0, 2, 1),
            loopFireBombs(8 * 16, 14 * 16, 4 * 16, 4 * 16, 0, 2, 1),
            loopFireBombs(20 * 16, 14 * 16, 4 * 16, 4 * 16, 0, 2, 1),

            createActivePoint(oneHalf - 8, 4 * 16 - 8, 3)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createWall(0, 0, 14 * 16, fullScreen),
            createWall(18 * 16, 0, 14 * 16, fullScreen),
            createActivePoint(oneHalf - 8, pointEight - 8, 0),
            fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 0, 5)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createActivePoint(oneHalf - 8, pointOne - 8, 0),
            loopFireMovingHorizontalLasers(0, 32, 2, 0, 1, 4),
            loopFireMovingHorizontalLasers(0, 32, 2, 2, 1, 4),
            loopFireMovingHorizontalLasers(0, 32, 2, 4, 1, 4),
            loopFireMovingHorizontalLasers(0, 32, 2, 6, 1, 4)
        ]);

        cancelAwaitChain = false;

        console.log("Level 3 completed.");
        increaseLevel();


        await Promise.all([
            createActivePoint(oneHalf - 8, pointOne - 8, 0),
            fireMovingHorizontalLaser(0, 32, 2, 1, 20),
            fireMovingHorizontalLaser(0, 32, 1.25, 1, 20),
            fireMovingHorizontalLaser(0, 32, 0.75, 1, 20)
        ]);

        cancelAwaitChain = false;

        console.log("Level 3 completed.");
        increaseLevel();
    } catch (error) {
        console.log("Level 1 restarted.");
    };
};

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelTwo() {
    try {

    } catch (error) {
        console.log("Level 2 restarted.");
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
async function restartLevel(blockieDied) {
    gameState = "restartingLevel";

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

    updateAllObjects();
    for (let i = 0; i < allObjects.length; i++) {
        rejectInstances(allObjects[i]);
    };

    //Animates Blockie's destruction.
    blockie.state = "destructing";
    blockie.sx = 0;

    //Removes all points collected in the level.
    currentLevelPoints = 0;

    //Animates Blockie's destruction and a game over screen if he dies, but skips over that if P is pressed.
    if (blockieDied) {
        await new Promise((resolve, reject) => {
            let drawGameOverScreen = setTimeout(() => {
                //Draws the game over screen.
                document.getElementById("messageDisplayer").innerHTML = "Determination is key!";
                gameState = "displayingMessage";
                resolve("resolved");
            }, 1.5 * 1000);
        });

        await new Promise((resolve, reject) => {
            //Restarts the game.
            function resumePlaying() {
                if (keysDown[16] || keysDown[32]) {
                    //Prevents dashing immediatley after restarting the game.
                    delete keysDown[16];
                    delete keysDown[32];

                    document.getElementById("messageDisplayer").innerHTML = "";

                    gameState = "playing";
                    blockie.state = "playing";

                    controlLevel();

                    resolve("resolved");
                } else {
                    window.requestAnimationFrame(resumePlaying);
                };
            };

            window.requestAnimationFrame(resumePlaying);
        });
    } else {
        gameState = "playing";
        blockie.state = "playing";

        controlLevel();
    };
};

async function increaseLevel() {
    gameState = "finishingLevel";
    blockie.angleMovingDegrees = -180;

    await new Promise((resolve, reject) => {
        let partyHatInstance = new PartyHat();
        partyHats.push(partyHatInstance);

        function animateFinishedLevelHat() {
            partyHatInstance.y += Math.min(2, (blockie.y - partyHatInstance.y - partyHatInstance.height));

            if (partyHatInstance.y + partyHatInstance.height !== blockie.y) {
                window.requestAnimationFrame(animateFinishedLevelHat);
            } else {
                partyHats.splice(0);

                document.getElementById("messageDisplayer").innerHTML = `Our champion!<br>You beat level ${currentLevel}!`;
                gameState = "displayingMessage";
                resolve("resolved");
            };
        };

        window.requestAnimationFrame(animateFinishedLevelHat);
    });

    await new Promise((resolve, reject) => {
        function resumePlaying() {
            //Restarts the game.
            if (keysDown[16] || keysDown[32]) {
                //Prevents dashing immediatley after restarting the game.
                delete keysDown[16];
                delete keysDown[32];

                document.getElementById("messageDisplayer").innerHTML = "";
                gameState = "playing";
                blockie.state = "playing";

                //Points are only made permanent once a level is completed and then it is reset.
                permanentPoints += currentLevelPoints;
                currentLevelPoints = 0;

                currentLevel++;
                controlLevel();

                resolve("resolved");
            } else {
                window.requestAnimationFrame(resumePlaying);
            };
        };

        window.requestAnimationFrame(resumePlaying);
    });
};

function controlLevel() {
    switch (currentLevel) {
        case 1:
            levelOne();
            break;
        case 2:
            levelTwo();
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
}

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

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireHorizontalLasers(y, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    await setWaitingTimeout(initialWaitingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireHorizontalLaser(y, height, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireHorizontalLaser(y, height, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new HorizontalLaser(y, height);
    horizontalLasers.push(instance);

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
            let instanceIndex = horizontalLasers.indexOf(instance);
            horizontalLasers.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
    });
};

//Continuously recreates the same instance until the activePoint is touched.
async function loopFireVerticalLasers(x, width, initialWaitingSeconds, waitingSeconds, firingSeconds) {
    await setWaitingTimeout(initialWaitingSeconds);

    //Creates a new instance after each previous one has resolved.
    while (!cancelAwaitChain) {
        await fireVerticalLaser(x, width, waitingSeconds, firingSeconds);
    };

    //Cancels the next await if the current screen is being resolved by an activePoint.
    return;
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireVerticalLaser(x, width, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new VerticalLaser(x, width);
    verticalLasers.push(instance);

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
            let instanceIndex = verticalLasers.indexOf(instance);
            verticalLasers.splice(instanceIndex, 1);
            resolve("resolved");
        }, firingSeconds * 1000);
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

//Instance Helper Functions

function updateAllObjects() {
    allObjects = [
        waitingTimeouts,
        passivePoints,
        activePoints,
        horizontalLasers,
        verticalLasers,
        movingHorizontalLasers,
        movingVerticalLasers,
        bombs,
        walls
    ];
};

function updateAllInteractiveObjects() {
    allObjects = [
        waitingTimeouts,
        passivePoints,
        activePoints,
        horizontalLasers,
        verticalLasers,
        movingHorizontalLasers,
        movingVerticalLasers,
        bombs
    ];
};

//Moves lasers by adding speed to their location every step.
function moveMovingHorizontalLasers() {
    for (let i = 0; i < movingHorizontalLasers.length; i++) {
        if (movingHorizontalLasers[i].state !== "warning") {
            movingHorizontalLasers[i].y += movingHorizontalLasers[i].speed;
        };
    };
};

//Moves lasers by adding speed to their location every step.
function moveMovingVerticalLasers() {
    for (let i = 0; i < movingVerticalLasers.length; i++) {
        if (movingVerticalLasers[i].state !== "warning") {
            movingVerticalLasers[i].x += movingVerticalLasers[i].speed;
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
        blockie.sx = blockie.spriteSideLength * (Math.round(blockie.angleMovingDegrees / 45) + 4);
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
            blockie.sx += blockie.spriteSideLength;
        }, 0.5 * 1000);
        addCurrentTimeout(animateBlockieDestructing);
    };
};

function drawBlockie() {
    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
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
}

function drawHorizontalLasers() {
    for (let i = 0; i < horizontalLasers.length; i++) {
        let currentInstance = horizontalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = "#FF51EF";
                context.strokeRect(currentInstance.x + 16, currentInstance.y, 16, currentInstance.height);
                context.strokeRect(currentInstance.width - 32, currentInstance.y, 16, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawVerticalLasers() {
    for (let i = 0; i < verticalLasers.length; i++) {
        let currentInstance = verticalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = "#FF51EF";
                context.strokeRect(currentInstance.x, currentInstance.y + 16, currentInstance.width, 16);
                context.strokeRect(currentInstance.x, currentInstance.height - 32, currentInstance.width, 16);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
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

function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        let currentInstance = walls[i];
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
    for (let i = 0; i < classArray.length; i++) {
        checkInstancesColliding(blockie, classArray[i]);
    };
};

function checkTestCollisionsWithClass(instanceOneX, instanceOneY, classArray) {
    preventingMovement = false;

    for (let i = 0; i < classArray.length; i++) {
        checkTestInstancesColliding(blockie, instanceOneX, instanceOneY, classArray[i]);
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
    gameScale = Math.min(window.innerWidth / 512, window.innerHeight / 617);

    //Changes the scale of the game's CSS container.
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.style.transform = "scale(" + gameScale + ")";

    window.requestAnimationFrame(scaleGame);
}

//Micellaneous Functions

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
        restartLevel(false);
    };

    if (gameState === "playing") {
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
                blockie.targetXLocation = blockie.x + blockie.dx;
                blockie.targetYLocation = blockie.y + blockie.dy;
            } else {
                //Accounts for possible changes in Blockie's location due to respawning or something else that isn't an input.
                blockie.targetXLocation = blockie.x;
                blockie.targetYLocation = blockie.y;
            };

            //Movement Obstacles

            checkTestCollisionsWithClass(blockie.targetXLocation, blockie.targetYLocation, walls);

            //Blockie's movement will be prevented on some axes if he is touching a wall at his target location.
            if (preventingMovement) {
                blockie.targetXLocation = blockie.x;
                blockie.targetYLocation = blockie.y;

                let xChange = 0;
                let yChange = 0;
                let xTestingDistance = 0;
                let yTestingDistance = 0;

                //This checks for the last available x location after Blockie has already moved in his desired direction. This 
                //allows for moving along walls while moving in a diagonal direction.
                if (Math.abs(blockie.dx - xTestingDistance) < 1) {
                    xChange = blockie.dx - xTestingDistance;
                } else {
                    xChange = Math.sign(blockie.dx);
                };

                checkTestCollisionsWithClass(blockie.targetXLocation + xChange, blockie.targetYLocation, walls);

                while (!preventingMovement && Math.abs(xTestingDistance) <= Math.abs(blockie.dx) - 1) {
                    blockie.targetXLocation += xChange;
                    xTestingDistance += xChange;

                    if (Math.abs(blockie.dx - xTestingDistance) < 1) {
                        xChange = blockie.dx - xTestingDistance;
                    } else {
                        xChange = Math.sign(blockie.dx);
                    };

                    checkTestCollisionsWithClass(blockie.targetXLocation + xChange, blockie.targetYLocation, walls);
                };

                //This checks for the last available y location after Blockie has already moved in his desired direction. This 
                //allows for moving along walls while moving in a diagonal direction.
                if (Math.abs(blockie.dy - yTestingDistance) < 1) {
                    yChange = blockie.dy - yTestingDistance;
                } else {
                    yChange = Math.sign(blockie.dy);
                };

                checkTestCollisionsWithClass(blockie.targetXLocation, blockie.targetYLocation + yChange, walls);

                while (!preventingMovement && Math.abs(yTestingDistance) <= Math.abs(blockie.dy) - 1) {
                    blockie.targetYLocation += yChange;
                    yTestingDistance += yChange;

                    if (Math.abs(blockie.dy - yTestingDistance) < 1) {
                        yChange = blockie.dy - yTestingDistance;
                    } else {
                        yChange = Math.sign(blockie.dy);
                    };

                    checkTestCollisionsWithClass(blockie.targetXLocation, blockie.targetYLocation + yChange, walls);
                };
            };

            //Updates Blockie's location if it is not off of the canvas. If it is off of the canvas, Blockie will move towards
            //the last available space to avoid a gap.
            if (blockie.targetXLocation <= 0) {
                blockie.targetXLocation = 0;
            } else if ((blockie.targetXLocation + blockie.width) >= canvas.width) {
                blockie.targetXLocation = canvas.width - blockie.width;
            };

            if (blockie.targetYLocation <= 0) {
                blockie.targetYLocation = 0;
            } else if ((blockie.targetYLocation + blockie.height) >= canvas.height) {
                blockie.targetYLocation = canvas.height - blockie.height;
            };

            blockie.x = blockie.targetXLocation;
            blockie.y = blockie.targetYLocation;
        };

        //Other Instances' Movements

        moveMovingHorizontalLasers();
        moveMovingVerticalLasers();

        //Collision Handling

        collidingInstances.splice(0);

        updateAllInteractiveObjects();
        for (let i = 0; i < allObjects.length; i++) {
            checkCollisionsWithClass(allObjects[i]);
        };

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
            } else if (collidingInstances[i].constructor.name === "ActivePoint") {
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

                updateAllObjects();
                for (let i = 0; i < allObjects.length; i++) {
                    resolveInstances(allObjects[i]);
                };

                //Allows for Blockie to touch activePoints if they are underneath collisions, since he won't die.
                break;
            } else {
                restartLevel(true);
                break;
            };
        };
    };

    //Recalls the gameLoop for the next frame.
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

    if (gameState !== "displayingMessage") {
        animateBlockie();
        drawBlockie();
    };

    if (gameState === "playing") {
        drawWalls();
        drawPassivePoints();
        drawActivePoints();
        drawHorizontalLasers();
        drawVerticalLasers();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawBombs();
    } else if (gameState === "finishingLevel") {
        drawPartyHats();
    };

    window.requestAnimationFrame(drawingLoop);
};

//Game Start

levelOne();

initializeKeyInputs();
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(scaleGame);