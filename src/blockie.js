//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.fillStyle = "white";
context.strokeStyle = "#FFFFFF";
context.lineWidth = 5;

//Variables

let gameState = "playing";
let diplayingGameOverScreen = false;
let KeysPressed = [];

let currentLevel = 1;

let xInput = 0;
let yInput = 0;
let colliding = false;

let recoveringFromDash = false;
let allowDashAgain = true;
let dashDistance = 80;

//Loads Blockie's sprite maps. They are large sprite maps to avoid loading many individual sprite files.
let spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

let spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

let spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

//Arrays

let currentPromiseRejectFunctions = [];
let currentTimers = [];

let horizontalLasers = [];
let verticalLasers = [];
let bombs = [];
let movingHorizontalLasers = [];
let movingVerticalLasers = [];

//Classes

class Player {
    constructor() {
        this.width = 32;
        this.height = 32;
        this.spriteSideLength = 16;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height / 2 - this.height / 2;
        this.sx = 0;
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
    };
};

class horizontalLaser {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = 0;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;
    };
};

class verticalLaser {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = canvas.height;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;
    };
};

class bomb {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;
    }
}

class movingHorizontalLaser {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = 0;
        this.speed = 0;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;
    };
};

class movingVerticalLaser {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = canvas.height;
        this.speed = 0;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;
    };
};

//Functions

//Level-Handling Functions

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

        await fireMovingHorizontalLaser(24 * 16, 16, -1, 0.5, 4.5);
        await fireMovingVerticalLaser(24 * 16, 16, -1, 0.5, 4.5);
        await Promise.all([
            fireMovingHorizontalLaser(0, 16, 1, 0, 7),
            fireMovingVerticalLaser(0, 16, 1, 0, 7)
        ]);
        await Promise.all([
            fireMovingHorizontalLaser(canvas.height - 16, 16, -1.5, 0, 4),
            fireMovingVerticalLaser(canvas.width - 16, 16, -1.5, 1.5, 4),
            fireMovingHorizontalLaser(0, 16, 1.5, 3, 4),
            fireMovingVerticalLaser(0, 16, 1.5, 4.5, 4)
        ]);

        console.log("Level completed.");
        changeLevel();
    } catch (error) {
        console.log("Level restarted.");
    };
};

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelTwo() {
    try {
        initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

        await fireMovingHorizontalLaser(24 * 16, 16, -1, 0.5, 4.5);

        console.log("Level completed.");
        changeLevel();
    } catch (error) {
        console.log("Level restarted.");
    };
};

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    document.getElementById("currentLevel").innerHTML = "Level: " + currentLevel;

    blockie.x = blockieX;
    blockie.y = blockieY;
    colliding = false;
    gameState = "playing";
    diplayingGameOverScreen = false;
    recoveringFromDash = false;
    allowDashAgain = true;
};

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
async function restartLevel() {
    gameState = "restartingLevel";

    //Calls the reject function on every currently-running promise so that they stop hurting performance.
    for (let i = 0; i < currentPromiseRejectFunctions.length; i++) {
        currentPromiseRejectFunctions[i]();
    }

    //Stops all currently-running timers so that they stop hurting performance.
    for (let i = 0; i < currentTimers.length; i++) {
        clearTimeout(currentTimers[i]);
    }

    currentPromiseRejectFunctions.splice(0);
    currentTimers.splice(0);

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

    //Removes all references to instances from arrays.
    horizontalLasers.splice(0);
    verticalLasers.splice(0);
    bombs.splice(0);
    movingHorizontalLasers.splice(0);
    movingVerticalLasers.splice(0);

    diplayingGameOverScreen = true;

    //Restarts the game after the timer ends.
    let resumeGame = setTimeout(() => {
        diplayingGameOverScreen = false;
        gameState = "playing";
        blockie.state = "playing";
        levelOne();
        document.getElementById("messageDisplayer").innerHTML = "";
        window.requestAnimationFrame(controlRestartingLevel);
    }, 1000);
};

function changeLevel() {
    currentLevel++;

    switch (currentLevel) {
        case 2:
            console.log(currentTimers);
            console.log(currentPromiseRejectFunctions);
            levelTwo();
            break;
    }
}

//Level-Handling Helper Functions

//When the game is restarting, all currently-running timers are stopped and their code is ran. This prevents unwanted timers from 
//triggering after restarting (for example, lasers could be destroyed before they're supposed to).
function controlRestartingLevel() {
    if (gameState === "restartingLevel") {
        console.log("Restarting level.");
    } else {
        window.requestAnimationFrame(controlRestartingLevel);
    };
};

//Adds a currently-running promise to an array so that it can be easily rejected when the game restarts.
function addCurrentPromiseRejectFunction(promise) {
    currentPromiseRejectFunctions.push(promise);
};

//Adds a currently-running timer to an array so that it can be easily deactivated when the game restarts.
function addCurrentTimer(timer) {
    currentTimers.push(timer);
};

//Removes a promise from the array of currently-running promises (it's inside code is ran in the restartLevel function).
function removeCurrentPromiseRejectFunction(promise) {
    let currentPromiseRejectFunctionIndex = currentPromiseRejectFunctions.indexOf(promise);
    currentPromiseRejectFunctions.splice(currentPromiseRejectFunctionIndex, 1);
};

//Removes a timer from the array of currently-running timers (it's inside code is ran in the restartLevel function).
function removeCurrentTimer(timer) {
    let currentTimerIndex = currentTimers.indexOf(timer);
    currentTimers.splice(currentTimerIndex, 1);
};

//Instance Functions

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireHorizontalLaser(y, height, waitingSeconds, activeSeconds) {
    //waitingSeconds is used as a "lag time", meaning that the instance won't exist until its promise is resolved. This is meant to 
    //allow for instances to spawn at different times concurrently (using Promise.all).
    await new Promise((resolve, reject) => {
        let stopWaiting = setTimeout(() => {
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(stopWaiting);

            console.log("Promise resolved.");
            resolve("resolved");
        }, waitingSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(stopWaiting);
    });

    //Creates an instance and sets all of its key-value pairs.
    let instance = new horizontalLaser();
    horizontalLasers.push(instance);
    instance.y = y;
    instance.height = height;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        let endFiring = setTimeout(() => {
            //Removes the instance from all related arrays once it is "destroyed".
            let instanceIndex = horizontalLasers.indexOf(instance);
            horizontalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, activeSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireVerticalLaser(x, width, waitingSeconds, activeSeconds) {
    //waitingSeconds is used as a "lag time", meaning that the instance won't exist until its promise is resolved. This is meant to 
    //allow for instances to spawn at different times concurrently (using Promise.all).
    await new Promise((resolve, reject) => {
        let stopWaiting = setTimeout(() => {
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(stopWaiting);

            console.log("Promise resolved.");
            resolve("resolved");
        }, waitingSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(stopWaiting);
    });

    //Creates an instance and sets all of its key-value pairs.
    let instance = new verticalLaser();
    verticalLasers.push(instance);
    instance.x = x;
    instance.width = width;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        let endFiring = setTimeout(() => {
            //Removes the instance from all related arrays once it is "destroyed".
            let instanceIndex = verticalLasers.indexOf(instance);
            verticalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, activeSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireBomb(x, y, width, height, waitingSeconds, activeSeconds) {
    //waitingSeconds is used as a "lag time", meaning that the instance won't exist until its promise is resolved. This is meant to 
    //allow for instances to spawn at different times concurrently (using Promise.all).
    await new Promise((resolve, reject) => {
        let stopWaiting = setTimeout(() => {
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(stopWaiting);

            console.log("Promise resolved.");
            resolve("resolved");
        }, waitingSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(stopWaiting);
    });

    //Creates an instance and sets all of its key-value pairs.
    let instance = new bomb();
    bombs.push(instance);
    instance.x = x;
    instance.y = y;
    instance.width = width;
    instance.height = height;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        let endFiring = setTimeout(() => {
            //Removes the instance from all related arrays once it is "destroyed".
            let instanceIndex = bombs.indexOf(instance);
            bombs.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, activeSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingHorizontalLaser(y, height, speed, waitingSeconds, activeSeconds) {
    //waitingSeconds is used as a "lag time", meaning that the instance won't exist until its promise is resolved. This is meant to 
    //allow for instances to spawn at different times concurrently (using Promise.all).
    await new Promise((resolve, reject) => {
        let stopWaiting = setTimeout(() => {
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(stopWaiting);

            console.log("Promise resolved.");
            resolve("resolved");
        }, waitingSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(stopWaiting);
    });

    //Creates an instance and sets all of its key-value pairs.
    let instance = new movingHorizontalLaser();
    movingHorizontalLasers.push(instance);
    instance.y = y;
    instance.height = height;
    instance.speed = speed;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        let endFiring = setTimeout(() => {
            //Removes the instance from all related arrays once it is "destroyed".
            let instanceIndex = movingHorizontalLasers.indexOf(instance);
            movingHorizontalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, activeSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingVerticalLaser(x, width, speed, waitingSeconds, activeSeconds) {
    //waitingSeconds is used as a "lag time", meaning that the instance won't exist until its promise is resolved. This is meant to 
    //allow for instances to spawn at different times concurrently (using Promise.all).
    await new Promise((resolve, reject) => {
        let stopWaiting = setTimeout(() => {
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(stopWaiting);

            console.log("Promise resolved.");
            resolve("resolved");
        }, waitingSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(stopWaiting);
    });

    //Creates an instance and sets all of its key-value pairs.
    let instance = new movingVerticalLaser();
    movingVerticalLasers.push(instance);
    instance.x = x;
    instance.width = width;
    instance.speed = speed;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        let endFiring = setTimeout(() => {
            //Removes the instance from all related arrays once it is "destroyed".
            let instanceIndex = movingVerticalLasers.indexOf(instance);
            movingVerticalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, activeSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Instance Helper Functions

//Determines if two instances are "colliding". They cannot be colliding if one is in the warning state.
function checkSpritesColliding(instanceOne, instanceTwo) {
    let xColliding = false;
    let yColliding = false;

    if ((instanceTwo.x <= instanceOne.x) && (instanceOne.x <= instanceTwo.x + instanceTwo.width) && (instanceTwo.state !== "warning")) {
        xColliding = true;
    } else if ((instanceOne.x <= instanceTwo.x) && (instanceTwo.x <= instanceOne.x + instanceOne.width) && (instanceTwo.state !== "warning")) {
        xColliding = true;
    };

    if ((instanceTwo.y <= instanceOne.y) && (instanceOne.y <= instanceTwo.y + instanceTwo.height) && (instanceTwo.state !== "warning")) {
        yColliding = true;
    } else if ((instanceOne.y <= instanceTwo.y) && (instanceTwo.y <= instanceOne.y + instanceOne.height) && (instanceTwo.state !== "warning")) {
        yColliding = true;
    };

    //The instances must have an overlapping area (x and y components) for there to be a collision.
    if (xColliding && yColliding) {
        colliding = true;
    };
};

function moveMovingHorizontalLasers() {
    for (let i = 0; i < movingHorizontalLasers.length; i++) {
        if (movingHorizontalLasers[i].state !== "warning") {
            movingHorizontalLasers[i].y += movingHorizontalLasers[i].speed;
        };
    };
};

function moveMovingVerticalLasers() {
    for (let i = 0; i < movingVerticalLasers.length; i++) {
        if (movingVerticalLasers[i].state !== "warning") {
            movingVerticalLasers[i].x += movingVerticalLasers[i].speed;
        };
    };
};

//Drawing Functions

function drawHorizontalLasers() {
    for (let i = 0; i < horizontalLasers.length; i++) {
        let currentInstance = horizontalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeRect(currentInstance.x + 8, currentInstance.y, 16, currentInstance.height);
                context.strokeRect(currentInstance.width - 24, currentInstance.y, 16, currentInstance.height);
            } else if (currentInstance.state == "firing") {
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
                context.strokeRect(currentInstance.x, currentInstance.y + 8, currentInstance.width, 16);
                context.strokeRect(currentInstance.x, currentInstance.height - 24, currentInstance.width, 16);
            } else if (currentInstance.state == "firing") {
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
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
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
                //Left warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + 8, currentInstance.y);
                context.lineTo(currentInstance.x + 16, currentInstance.y + currentInstance.height * Math.sign(currentInstance.speed));
                context.lineTo(currentInstance.x + 24, currentInstance.y);
                context.fill();

                //Right warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.width - 24, currentInstance.y);
                context.lineTo(currentInstance.width - 16, currentInstance.y + currentInstance.height * Math.sign(currentInstance.speed));
                context.lineTo(currentInstance.width - 8, currentInstance.y);
                context.fill();
            } else if (currentInstance.state == "firing") {
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
                //Top warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x, currentInstance.y + 8);
                context.lineTo(currentInstance.x + currentInstance.width * Math.sign(currentInstance.speed), currentInstance.y + 16);
                context.lineTo(currentInstance.x, currentInstance.y + 24);
                context.fill();

                //Bottom warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x, currentInstance.height - 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.sign(currentInstance.speed), currentInstance.height - 16);
                context.lineTo(currentInstance.x, currentInstance.height - 8);
                context.fill();
            } else if (currentInstance.state == "firing") {
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

//Micellaneous Functions

function initializeKeyInputs() {
    //Adds all currently pressed keys as a keyCode with a pair of true in the KeysPressed object. .keyCode is used instead of .key so 
    //that capital letters can't cause unwanted movements.
    document.addEventListener("keydown", e => {
        KeysPressed[e.keyCode] = true;
    });

    //Deletes all currently unpressed keys from the KeysPressed object.
    document.addEventListener("keyup", e => {
        delete KeysPressed[e.keyCode];
    });
};

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
};

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Sets the timers that cause the collision instance to "blink" 3 times before firing. Class keys are named the same among objects to 
//allow this function to work on all objects. All warning timers are set at the same length to allow the player to predict collisions.
function setWarningTimers(instance) {
    let warningInvisibleOne = setTimeout(() => {
        instance.visible = false;
        removeCurrentTimer(warningInvisibleOne);
    }, 0.25 * 1000);
    addCurrentTimer(warningInvisibleOne);

    let warningVisibleTwo = setTimeout(() => {
        instance.visible = true;
        removeCurrentTimer(warningVisibleTwo);
    }, 0.5 * 1000);
    addCurrentTimer(warningVisibleTwo);

    let warningInvisibleTwo = setTimeout(() => {
        instance.visible = false;
        removeCurrentTimer(warningInvisibleTwo);
    }, 0.75 * 1000);
    addCurrentTimer(warningInvisibleTwo);

    let fire = setTimeout(() => {
        instance.state = "firing";
        instance.visible = true;
        removeCurrentTimer(fire);
    }, 1000);
    addCurrentTimer(fire);
};

//Game loop

initializeKeyInputs();

function gameLoop() {
    //Blockie's Movement

    if (!recoveringFromDash) {
        //xInput and yInput are both used to determine the angle that Blockie is moving in.
        xInput = 0;
        yInput = 0;

        //Each key changes the angle of Blockie's movement.
        if (KeysPressed[68]) {
            xInput += 1;
        };

        if (KeysPressed[65]) {
            xInput -= 1;
        };

        if (KeysPressed[83]) {
            yInput += 1;
        };

        if (KeysPressed[87]) {
            yInput -= 1;
        };

        //Pressing shift causes Blockie to "dash" by increasing his speed, creating a cooldown timer, and playing a recovery animation.
        if (KeysPressed[16] && allowDashAgain && (xInput !== 0 || yInput !== 0)) {
            //This prevents blockie from dashing more than once for each time the Shift key is pressed.
            delete KeysPressed[16];

            blockie.state = "recoveringFromDash";
            blockie.speed = dashDistance;
            recoveringFromDash = true;

            let endDashRecoveryTime = 0.3;
            let endDashRecovery = setTimeout(() => {
                recoveringFromDash = false;
                allowDashAgain = false;
                blockie.state = "playing";
                removeCurrentTimer(endDashRecovery);
            }, endDashRecoveryTime * 1000);
            addCurrentTimer(endDashRecovery);

            let resetAllowDashAgainTime = 0.9;
            let resetAllowDashAgain = setTimeout(() => {
                allowDashAgain = true;
                removeCurrentTimer(resetAllowDashAgain);
            }, resetAllowDashAgainTime * 1000);
            addCurrentTimer(resetAllowDashAgain);
        } else {
            blockie.speed = 2;
        }

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

    checkCollisionsWithClass(horizontalLasers);

    checkCollisionsWithClass(verticalLasers);

    checkCollisionsWithClass(bombs);

    checkCollisionsWithClass(movingHorizontalLasers);

    checkCollisionsWithClass(movingVerticalLasers);

    if (colliding) {
        restartLevel();
    };

    //Recalls the gameLoop for the next frame.
    if (gameState === "playing") {
        window.requestAnimationFrame(gameLoop);
    };
};

//Drawing is handled in a loop that is separate from the gameLoop because the game should still be drawn even while the game is 
//restarting (to draw Blockie's destructing animation).
function drawingLoop() {
    if (!diplayingGameOverScreen) {
        //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
        context.clearRect(0, 0, canvas.width, canvas.height);

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
                removeCurrentTimer(animateBlockieDestructing);
                removeCurrentTimer(endAnimateBlockieDestructing);
            }, 1.5 * 1000);
            addCurrentTimer(endAnimateBlockieDestructing);

            let animateBlockieDestructing = setInterval(() => {
                blockie.sx += blockie.spriteSideLength;
            }, 0.5 * 1000);
            addCurrentTimer(animateBlockieDestructing);
        };

        drawHorizontalLasers();
        drawVerticalLasers();
        drawBombs();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();

        //Blockie is drawn last to appear over other instances when being destroyed.
        context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
    }

    window.requestAnimationFrame(drawingLoop);
};

//Game Start

let blockie = new Player();
levelOne();

window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(controlRestartingLevel);