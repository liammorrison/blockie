//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.fillStyle = "white";

//Variables

let KeysPressed = {};
let xInput = 0;
let yInput = 0;
let colliding = false;
let gameState = "playing";

//Arrays

let currentPromiseRejectFunctions = [];
let currentTimers = [];
let horizontalLasers = [];

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

        //Loads Blockie"s sprite map. It is one large sprite map to avoid loading many individual 
        //sprite files.
        this.sprite = document.createElement("img");
        this.sprite.src = "../images/blockie.png";
    };
};

class horizontalLaser {
    constructor() {
        this.x = 0;
        this.y = 100;
        this.width = canvas.width;
        this.height = 32;
    }
}

//Functions

//Level-Handling Functions

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

        await Promise.all([
            fireHorizontalLaser(300, 16, 4),
            fireHorizontalLaser(100, 16, 3)
        ]);

        await fireHorizontalLaser(100, 16, 3);

        console.log("Level completed.");
    } catch (error) {
        console.log("Level restarted.");
    }

};

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    window.requestAnimationFrame(gameLoop);
    blockie.x = blockieX;
    blockie.y = blockieY;
}

//Clears all arrays, clears the canvas, displays the game over screen, and waits to then restart the current level.
function restartLevel() {
    //Draws only the game over screen.
    gameState = "restartingLevel";
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("messageDisplayer").innerHTML = "You Are Dead.";

    //Stops all currently-running timers so that they stop hurting performance.
    for (let i = 0; i < currentTimers.length; i++) {
        clearTimeout(currentTimers[i]);
    }

    //Calls the reject function on every currently-running promise so that they stop hurting performance.
    for (let i = 0; i < currentPromiseRejectFunctions.length; i++) {
        currentPromiseRejectFunctions[i]();
    }

    //Removes all references to instances from arrays.
    currentPromiseRejectFunctions.splice(0);
    currentTimers.splice(0);
    horizontalLasers.splice(0);

    //Restarts the game after the timer ends.
    setTimeout(() => {
        levelOne();
        document.getElementById("messageDisplayer").innerHTML = "";
        gameState = "playing";
        window.requestAnimationFrame(controlRestartingLevel);
    }, 1000);
};

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

//Creates an instance of a laser and adds it to an array so that it can be drawn and used in collision checking more easily.
//When the timer ends, the instance is deleted.
function fireHorizontalLaser(y, height, seconds) {
    let promiseTimer;

    //Creates an instance of an object, adds it to the end of its object's array, and assigns its key-value pairs.
    let instance = new horizontalLaser();
    horizontalLasers.push(instance);
    let instanceIndex = horizontalLasers.indexOf(instance);
    horizontalLasers[instanceIndex].y = y;
    horizontalLasers[instanceIndex].height = height;

    //Creates a timer that resolves promises in the levelController and deletes the instance from its array (so that it isn't drawn
    //or collided with anymore).
    return new Promise((resolve, reject) => {
        promiseTimer = setTimeout(() => {
            //Removes the instance from all related arrays because it is now "destroyed".
            instanceIndex = horizontalLasers.indexOf(instance);
            horizontalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(promiseTimer);

            console.log("Promise resolved.");
            resolve("resolved");
        }, seconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(promiseTimer);
    });
};

//Drawing Functions

function drawHorizontalLasers() {
    for (let i = 0; i < horizontalLasers.length; i++) {
        let currentInstance = horizontalLasers[i];
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    }
}

//Micellaneous Functions

//Determines if two objects are "colliding".
function checkSpritesColliding(instanceOne, instanceTwo) {
    let xColliding = false;
    let yColliding = false;

    if ((instanceTwo.x <= instanceOne.x) && (instanceOne.x <= instanceTwo.x + instanceTwo.width)) {
        xColliding = true;
    } else if ((instanceOne.x <= instanceTwo.x) && (instanceTwo.x <= instanceOne.x + instanceOne.width)) {
        xColliding = true;
    }

    if ((instanceTwo.y <= instanceOne.y) && (instanceOne.y <= instanceTwo.y + instanceTwo.height)) {
        yColliding = true;
    } else if ((instanceOne.y <= instanceTwo.y) && (instanceTwo.y <= instanceOne.y + instanceOne.height)) {
        yColliding = true;
    }

    //The instances must have an overlapping area (x and y components) for there to be a collision.
    if (xColliding && yColliding) {
        colliding = true;
    }
}

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
};

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

const blockie = new Player();

//Game loop

//Adds all currently pressed keys as a keyCode with a pair of true in the KeysPressed object. .keyCode is used instead of .key so 
//that capital letters can't cause unwanted movements.
document.addEventListener("keydown", e => {
    KeysPressed[e.keyCode] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener("keyup", e => {
    delete KeysPressed[e.keyCode];
});

function gameLoop() {
    //Clears the canvas so that it can later be redrawn with updated locations and instances.
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Blockie's Movement

    //xInput and yInput are both used to determine the angle that Blockie is moving in.
    xInput = 0;
    yInput = 0;

    //By the way atan2() works, all -y values return negative angles; therefore, the idle state image (image 0)
    //must be set at -180 degrees and all angles must be increased by 180 degrees to rotate from the top-left in a 
    //clockwise direction continuously.
    blockie.angleMovingDegrees = -180;

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

    if (xInput !== 0 || yInput !== 0) {
        //Finds the angle that Blockie is moving in radians based on the inputs.
        blockie.angleMovingRadians = calculateAngleRadians(xInput, yInput);

        //Converted to make the direction of the sprite more discernible.
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

    //Drawing

    //sx is the location on the blockie.png sprite map and it determines the sprite's direction facing. 
    //It starts at the idle image, then goes to the top-left, and then continues in a clockwise direction.
    blockie.sx = blockie.spriteSideLength * (Math.round(blockie.angleMovingDegrees / 45) + 4);

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);

    drawHorizontalLasers();

    //Fail state.

    //Resets the collision flag to recheck every frame.
    colliding = false;

    for (let i = 0; i < horizontalLasers.length; i++) {
        checkSpritesColliding(blockie, horizontalLasers[i]);
        if (colliding) {
            restartLevel();
            break;
        };
    };

    //Recalls the gameLoop for the next frame.
    if (gameState === "playing") {
        window.requestAnimationFrame(gameLoop);
    };
};

levelOne();

window.requestAnimationFrame(controlRestartingLevel);