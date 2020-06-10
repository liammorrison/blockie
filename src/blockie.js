//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

let gameState = "playing";
let displayingGameOverScreen = false;

let currentLevel = 1;

let permanentPoints = 0;
let currentLevelPoints = 0;

let xInput = 0;
let yInput = 0;

let colliding = false;

let arrowLeftAlreadyPressed = false;
let arrowUpAlreadyPressed = false;
let arrowRightAlreadyPressed = false;
let arrowDownAlreadyPressed = false;
let shiftAlreadyPressed = false;
let spaceAlreadyPressed = false;

let recoveringFromDash = false;
let allowDashAgain = true;
let dashDistance = 88;
let dashRecoverySeconds = 0.3;
let allowDashAgainSeconds = 0.9;

//Used to stop async/await functions by preventing another await to run. Used when Blockie touches activePoints and the current
//screen needs to stop running, yet everything cannot be rejected (because that would stop the level too). Each async function
//that needs to be affected pushes their unique cancelAwaitChain here to be set to true. This can't be one global variable because 
//each async function can end at any time, so it would be unclear when to set the global variable back to false.
let cancelAwaitChain = false;

//Loads Blockie's sprite maps. They are large sprite maps to avoid loading many individual sprite files.
let spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

let spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

let spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

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
        this.testXLocation = this.x;
        this.testYLocation = this.y;

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

        //Used to draw the remaining seconds meter above the instance.
        this.totalFiringSeconds = totalFiringSeconds;
        this.remainingFiringSeconds = 0;
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

//Functions

//Level-Handling Functions

//Since these are frequently used numbers, they are variables for simplicity. The canvas' width and height are the same, so they 
//work with both axes.
let center = canvas.width / 2;
let maxEdge = canvas.width;

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(8 * 16 - blockie.width / 2, center - blockie.height / 2);

        await Promise.all([
            createPassivePoint(center - 8, center - 8, 0, 6),
            createActivePoint(23 * 16, center - 8, 0, 6),
            fireBomb(2, 2, maxEdge - 4, 11 * 16 - 4, 0, 6),
            fireBomb(2, 21 * 16 + 2, maxEdge - 4, 11 * 16 - 4, 0, 6),

            fireMovingVerticalLaser(0, 32, 1, 1, 5)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createActivePoint(8 * 16, center - 8, 0, 5),
            fireBomb(2, 2, maxEdge - 4, 11 * 16 - 4, 0, 5),
            fireBomb(2, 21 * 16 + 2, maxEdge - 4, 11 * 16 - 4, 0, 5),

            fireMovingVerticalLaser(30 * 16, 32, -1.75, 1, 4)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createPassivePoint(center - 8, 23 * 16, 0, 2.5),
            fireMovingHorizontalLaser(8 * 16 - 8, 32, 1.4, 0, 1.75),
            fireMovingVerticalLaser(0, 32, 1.4, 0, 3.5),

            fireMovingHorizontalLaser(maxEdge - 32, 32, -1.4, 1.75, 3.5),

            createPassivePoint(23 * 16, center - 8, 2.25, 2.5),

            fireMovingVerticalLaser(maxEdge - 32, 32, -1.4, 3.5, 3.5),

            createPassivePoint(center - 8, 8 * 16, 4.5, 2.5),

            fireMovingHorizontalLaser(0, 32, 1.4, 5.25, 1.75)
        ]);

        cancelAwaitChain = false;

        await Promise.all([
            createActivePoint(center - 8, center - 8, 0, 6),
            fireBomb(center - 32, center - 32, 64, 64, 0, 2)
        ]);

        cancelAwaitChain = false;

        console.log("Level 1 completed.");
        increaseLevel();
    } catch (error) {
        console.log("Level 1 restarted.");
    };
};

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelTwo() {
    try {


        console.log("Level 2 completed.");
        currentLevel++;
    } catch (error) {
        console.log("Level 2 restarted.");
    };
};

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    document.getElementById("currentLevel").innerHTML = "Level: " + currentLevel;

    gameState = "playing";

    blockie.x = blockieX;
    blockie.y = blockieY;

    currentLevelPoints = 0;

    recoveringFromDash = false;
    allowDashAgain = true;
};

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
async function restartLevel() {
    gameState = "restartingLevel";

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

    updateAllObjects();
    for (let i = 0; i < allObjects.length; i++) {
        rejectInstances(allObjects[i]);
    };

    blockie.state = "destructing";
    blockie.sx = 0;

    await new Promise((resolve, reject) => {
        let drawGameOverScreen = setTimeout(() => {
            //Draws the game over screen.
            context.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("messageDisplayer").innerHTML = "You Are Dead.";
            resolve("resolved");
        }, 1.5 * 1000);
    });

    displayingGameOverScreen = true;

    await new Promise((resolve, reject) => {
        function resumePlaying() {
            if (keysDown[16] || keysDown[32]) {
                //Restarts the game.
                document.removeEventListener("keydown", resumePlaying);
                displayingGameOverScreen = false;
                gameState = "playing";
                blockie.state = "playing";
                controlLevel();
                document.getElementById("messageDisplayer").innerHTML = "";
                window.requestAnimationFrame(gameLoop);
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

function increaseLevel() {
    currentLevel++;

    //Points are only made permanent once a level is completed.
    permanentPoints += currentLevelPoints;

    controlLevel();
}

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
            //Removes the instance from its object array once it is "destroyed".
            let instanceIndex = waitingTimeouts.indexOf(instance);
            waitingTimeouts.splice(instanceIndex, 1);

            resolve("resolved");
        }, waitingSeconds * 1000);
    });
};

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
async function setWarningTimeouts(instanceAffecting, instanceAffectingObjectArray) {
    let warningSeconds = 1;

    //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.
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
    await setWarningTimeouts(instance, passivePoints);

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

            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = passivePoints.indexOf(instance);
            passivePoints.splice(instanceIndex, 1);

            resolve("resolved");

            console.log("passive point timer");
        }, firingSeconds * 1000);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function createActivePoint(x, y, waitingSeconds, firingSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimeout(waitingSeconds);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates an instance and sets all of its initial properties.
    let instance = new ActivePoint(x, y, firingSeconds);
    activePoints.push(instance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimeouts(instance, activePoints);

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

            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = activePoints.indexOf(instance);
            activePoints.splice(instanceIndex, 1);

            resolve("resolved");

            console.log("active point timer");
        }, firingSeconds * 1000);
    });
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
    await setWarningTimeouts(instance, horizontalLasers);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = horizontalLasers.indexOf(instance);
            horizontalLasers.splice(instanceIndex, 1);

            resolve("resolved");
        }, firingSeconds * 1000);
    });
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
    await setWarningTimeouts(instance, verticalLasers);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = verticalLasers.indexOf(instance);
            verticalLasers.splice(instanceIndex, 1);

            resolve("resolved");
        }, firingSeconds * 1000);
    });
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
    await setWarningTimeouts(instance, movingHorizontalLasers);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = movingHorizontalLasers.indexOf(instance);
            movingHorizontalLasers.splice(instanceIndex, 1);

            resolve("resolved");
        }, firingSeconds * 1000);
    });
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
    await setWarningTimeouts(instance, movingVerticalLasers);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) {
        console.log("supposed to exit");
        return;
    };

    console.log("did not exit");

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = movingVerticalLasers.indexOf(instance);
            movingVerticalLasers.splice(instanceIndex, 1);

            resolve("resolved");

            console.log("moving vertical laser timer");
        }, firingSeconds * 1000);
    });
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
    await setWarningTimeouts(instance, bombs);

    //Cancels the next await if the current screen is being resolved by an activePoint.
    if (cancelAwaitChain) return;

    //Creates a timeout for the instance's destruction and links its deactivation functions.
    return await new Promise((resolve, reject) => {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let instanceIndex = bombs.indexOf(instance);
            bombs.splice(instanceIndex, 1);

            resolve("resolved");

            console.log("bomb timer");
        }, firingSeconds * 1000);
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

function drawBlockie() {
    //Draws the remaining seconds meter for when Blockie can dash again.
    if (!allowDashAgain && gameState !== "restartingLevel") {
        context.fillStyle = "#FFFFFF";
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

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPassivePoints() {
    for (let i = 0; i < passivePoints.length; i++) {
        let currentInstance = passivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = "#FFFFFF";
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

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = "#FFFFFF";
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

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
                context.strokeRect(currentInstance.width - 24, currentInstance.y, 16, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#741EFF";
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
                context.strokeRect(currentInstance.x, currentInstance.height - 24, currentInstance.width, 16);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#741EFF";
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
                context.fillStyle = "#741EFF";
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
                context.fillStyle = "#741EFF";
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
                context.fillStyle = "#741EFF";
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

//Collision Functions

function checkCollisionsWithClass(classArray) {
    for (let i = 0; i < classArray.length; i++) {
        checkSpritesColliding(blockie, classArray[i]);
    };
};

//Determines if two instances are "colliding". They cannot be colliding if one is in the warning state.
function checkSpritesColliding(instanceOne, instanceTwo) {
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
        colliding = true;
        collidingInstances.push(instanceTwo);
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
        } else {
            delete keysDown[e.keyCode];
        };
    });
};

//Micellaneous Functions

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
};

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Game loop

function gameLoop() {
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

        if (keysDown[16] && allowDashAgain && (xInput !== 0 || yInput !== 0)) {
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
            blockie.testXLocation = blockie.x + blockie.dx;
            blockie.testYLocation = blockie.y + blockie.dy;
        } else {
            //Accounts for possible changes in Blockie's location due to respawning or something else that isn't an input.
            blockie.testXLocation = blockie.x;
            blockie.testYLocation = blockie.y;
        }

        //Updates Blockie's location if it is not off of the canvas. If it is off of the canvas, Blockie will move towards
        //the last available space to avoid a gap (the walls are in rigid locations so nothing more fancy is needed).
        if (!(blockie.testXLocation <= 0 || (blockie.testXLocation + blockie.width) >= canvas.width)) {
            blockie.x = blockie.testXLocation;
        } else if (blockie.testXLocation <= 0) {
            blockie.x = 0;
        } else if ((blockie.testXLocation + blockie.width) >= canvas.width) {
            blockie.x = canvas.width - blockie.width;
        };

        if (!(blockie.testYLocation <= 0 || (blockie.testYLocation + blockie.height) >= canvas.height)) {
            blockie.y = blockie.testYLocation;
        } else if (blockie.testYLocation <= 0) {
            blockie.y = 0;
        } else if ((blockie.testYLocation + blockie.height) >= canvas.height) {
            blockie.y = canvas.height - blockie.height;
        };
    };

    //Other Instances' Movements

    moveMovingHorizontalLasers();
    moveMovingVerticalLasers();

    //Fail state.

    //Resets the collision flag to recheck every frame.
    colliding = false;
    collidingInstances.splice(0);

    updateAllObjects();
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

            blockie.state = "playing";
            recoveringFromDash = false;
            allowDashAgain = true;
            delete keysDown[16];
            delete keysDown[37];
            delete keysDown[38];
            delete keysDown[39];
            delete keysDown[40];

            cancelAwaitChain = true;

            updateAllObjects();
            for (let i = 0; i < allObjects.length; i++) {
                resolveInstances(allObjects[i]);
            };

            //Allows for Blockie to touch activePoints if they are underneath collisions, since he won't die.
            break;
        } else {
            restartLevel();
            break;
        };
    };

    //Recalls the gameLoop for the next frame.
    if (gameState === "playing") {
        window.requestAnimationFrame(gameLoop);
    };
};

//Drawing is handled in a loop that is separate from the gameLoop because the game should still be drawn even while the game is 
//restarting (to draw Blockie's destructing animation).
function drawingLoop() {
    if (!displayingGameOverScreen) {
        //Updates the amount of points in the gameInfo div.
        document.getElementById("currentPoints").innerHTML = "Points: " + (permanentPoints + currentLevelPoints);

        //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawPassivePoints();
        drawActivePoints();
        drawHorizontalLasers();
        drawVerticalLasers();
        drawBombs();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();

        //Blockie is drawn last to appear over other instances when being destroyed.
        drawBlockie();
    };

    window.requestAnimationFrame(drawingLoop);
};

//Game Start

let blockie = new Player();
levelOne();

initializeKeyInputs();
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);