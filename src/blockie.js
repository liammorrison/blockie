//Game Setup

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

let gameState = "playing";
let diplayingGameOverScreen = false;
let KeysPressed = [];

let currentLevel = 1;

let permanentPoints = 0;
let currentLevelPoints = 0;

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
let waitingTimers = [];
let points = [];
let horizontalLasers = [];
let verticalLasers = [];
let bombs = [];
let movingHorizontalLasers = [];
let movingVerticalLasers = [];

let currentTimers = [];

let collidingInstances = [];

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

class waitingTimer {
    constructor() {
        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalReject;
        this.timer;
    };
};

class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;

        //When created, the instance begins its warning state to provide visual feedback.
        this.state = "warning";
        this.visible = true;

        //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
        this.externalResolve;
        this.externalReject;
        this.timer;
    };
};

class horizontalLaser {
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
        this.timer;
    };
};

class verticalLaser {
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
        this.timer;
    };
};

class movingHorizontalLaser {
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
        this.timer;
    };
};

class movingVerticalLaser {
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
        this.timer;
    };
};

class bomb {
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
        this.timer;
    };
};

//Functions

//Level-Handling Functions

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelOne() {
    try {
        initializeLevel(canvas.width / 2 - blockie.width / 2, 22 * 16);

        await Promise.all([
            fireMovingHorizontalLaser(canvas.height - 16, 16, -0.75, 0, 6),
            fireMovingHorizontalLaser(0, 16, 0.5, 2, 4),
            fireMovingHorizontalLaser(100, 16, 0.5, 3, 3),
            fireMovingVerticalLaser(canvas.width - 16, 16, -0.75, 0, 6),
            fireMovingVerticalLaser(0, 16, 0.5, 2, 4),
            fireMovingVerticalLaser(100, 16, 0.5, 3, 3)
        ]);

        console.log("Level 1 completed.");
        increaseLevel();
    } catch (error) {
        console.log("Level 1 restarted.");
    };
};

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
async function levelTwo() {
    try {
        initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

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
    diplayingGameOverScreen = false;

    blockie.x = blockieX;
    blockie.y = blockieY;

    currentLevelPoints = 0;

    recoveringFromDash = false;
    allowDashAgain = true;
};

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
async function restartLevel() {
    gameState = "restartingLevel";

    //Stops all currently-running timers so that they stop hurting performance and don't execute after resetting.
    for (let i = 0; i < currentTimers.length; i++) {
        clearTimeout(currentTimers[i]);
    };

    currentTimers.splice(0);

    rejectInstances(waitingTimers);
    rejectInstances(points);
    rejectInstances(horizontalLasers);
    rejectInstances(verticalLasers);
    rejectInstances(movingHorizontalLasers);
    rejectInstances(movingVerticalLasers);
    rejectInstances(bombs);

    //Removes all references to instances from arrays.
    waitingTimers.splice(0);
    points.splice(0);
    horizontalLasers.splice(0);
    verticalLasers.splice(0);
    movingHorizontalLasers.splice(0);
    movingVerticalLasers.splice(0);
    bombs.splice(0);

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

    diplayingGameOverScreen = true;

    await new Promise((resolve, reject) => {
        let resumeGame = setTimeout(() => {
            //Restarts the game.
            diplayingGameOverScreen = false;
            gameState = "playing";
            blockie.state = "playing";
            controlLevel();
            document.getElementById("messageDisplayer").innerHTML = "";
            window.requestAnimationFrame(gameLoop);
        }, 1000);
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

function rejectInstances(objectArray) {
    //The for loop's length is determined before it starts to avoid missing the first element.
    let initialArrayLength = objectArray.length;

    for (let i = initialArrayLength - 1; i >= 0; i--) {
        //Rejects the instances' Promises and timers and destroys the instances.
        let instance = objectArray[i];
        instance.externalReject();
        clearTimeout(instance.timer);
        objectArray.splice(i, 1);
    };
};

//Adds a currently-running timer to an array so that it can be easily deactivated when the game restarts.
function addCurrentTimer(timer) {
    currentTimers.push(timer);
};

//Removes a timer from the array of currently-running timers.
function removeCurrentTimer(timer) {
    let currentTimerIndex = currentTimers.indexOf(timer);
    currentTimers.splice(currentTimerIndex, 1);
};

//Instance Functions

//Creates a waitingTimer instance, and awaits for its resolution to then create the root collision instance. This is meant to allow
//for instances to spawn at different times concurrently (using Promise.all) or spawn a bit after another's destruction.
function setWaitingTimer(waitingSeconds) {
    //Creates an instance and sets all of its initial properties.
    let waitingTimerInstance = new waitingTimer();
    waitingTimers.push(waitingTimerInstance);

    return new Promise((resolve, reject) => {
        waitingTimerInstance.timer = setTimeout(() => {
            //Removes the instance from its object array once it is "destroyed".
            let waitingTimerInstanceIndex = waitingTimers.indexOf(waitingTimerInstance);
            waitingTimers.splice(waitingTimerInstanceIndex, 1);

            resolve("resolved");
        }, waitingSeconds * 1000);

        waitingTimerInstance.externalReject = reject;
    });
};

//Sets the timers that cause the collision instance to "blink" 2 times before firing. All warning timers are set at the same length 
//to allow the player to predict collisions.
async function setWarningTimers(instanceAffecting, instanceAffectingObjectArray) {
    let warningSeconds = 1;

    //Each timer sets the affected instance's timer and reject function equal to a new "blinking" timer for a bit.
    await new Promise((resolve, reject) => {
        instanceAffecting.timer = setTimeout(() => {
            instanceAffecting.visible = false;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);

        instanceAffecting.externalReject = reject;
    });

    await new Promise((resolve, reject) => {
        instanceAffecting.timer = setTimeout(() => {
            instanceAffecting.visible = true;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);

        instanceAffecting.externalReject = reject;
    });

    await new Promise((resolve, reject) => {
        instanceAffecting.timer = setTimeout(() => {
            instanceAffecting.visible = false;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);

        instanceAffecting.externalReject = reject;
    });

    //The function finally resolves once the second "blink" ends. The affected instance can then collide with Blockie.
    return new Promise((resolve, reject) => {
        instanceAffecting.timer = setTimeout(() => {
            instanceAffecting.state = "firing";
            instanceAffecting.visible = true;

            resolve("resolved");
        }, warningSeconds * 0.25 * 1000);

        instanceAffecting.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function createPoint(x, y, waitingSeconds, activeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimer(waitingSeconds);

    //Creates an instance and sets all of its initial properties.
    let pointInstance = new point(x, y);
    points.push(pointInstance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimers(pointInstance, points);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        pointInstance.timer = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let pointInstanceIndex = points.indexOf(pointInstance);
            points.splice(pointInstanceIndex, 1);

            resolve("resolved");
        }, activeSeconds * 1000);

        //Links the instance's deactivation functions to itself to allow outside callings.
        pointInstance.externalResolve = resolve;
        pointInstance.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireHorizontalLaser(y, height, waitingSeconds, activeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimer(waitingSeconds);

    //Creates an instance and sets all of its initial properties.
    let horizontalLaserInstance = new horizontalLaser(y, height);
    horizontalLasers.push(horizontalLaserInstance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimers(horizontalLaserInstance, horizontalLasers);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        horizontalLaserInstance.timer = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let horizontalLaserInstanceIndex = horizontalLasers.indexOf(horizontalLaserInstance);
            horizontalLasers.splice(horizontalLaserInstanceIndex, 1);

            resolve("resolved");
        }, activeSeconds * 1000);

        //Links the instance's deactivation functions to itself to allow outside callings.
        horizontalLaserInstance.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireVerticalLaser(x, width, waitingSeconds, activeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimer(waitingSeconds);

    //Creates an instance and sets all of its initial properties.
    let verticalLaserInstance = new verticalLaser(x, width);
    verticalLasers.push(verticalLaserInstance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimers(verticalLaserInstance, verticalLasers);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        verticalLaserInstance.timer = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let verticalLaserInstanceIndex = verticalLasers.indexOf(verticalLaserInstance);
            verticalLasers.splice(verticalLaserInstanceIndex, 1);

            resolve("resolved");
        }, activeSeconds * 1000);

        //Links the instance's deactivation functions to itself to allow outside callings.
        verticalLaserInstance.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingHorizontalLaser(y, height, speed, waitingSeconds, activeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimer(waitingSeconds);

    //Creates an instance and sets all of its initial properties.
    let movingHorizontalLaserInstance = new movingHorizontalLaser(y, height, speed);
    movingHorizontalLasers.push(movingHorizontalLaserInstance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimers(movingHorizontalLaserInstance, movingHorizontalLasers);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        movingHorizontalLaserInstance.timer = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let movingHorizontalLaserInstanceIndex = movingHorizontalLasers.indexOf(movingHorizontalLaserInstance);
            movingHorizontalLasers.splice(movingHorizontalLaserInstanceIndex, 1);

            resolve("resolved");
        }, activeSeconds * 1000);

        //Links the instance's deactivation functions to itself to allow outside callings.
        movingHorizontalLaserInstance.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireMovingVerticalLaser(x, width, speed, waitingSeconds, activeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimer(waitingSeconds);

    //Creates an instance and sets all of its initial properties.
    let movingVerticalLaserInstance = new movingVerticalLaser(x, width, speed);
    movingVerticalLasers.push(movingVerticalLaserInstance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimers(movingVerticalLaserInstance, movingVerticalLasers);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        movingVerticalLaserInstance.timer = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let movingVerticalLaserInstanceIndex = movingVerticalLasers.indexOf(movingVerticalLaserInstance);
            movingVerticalLasers.splice(movingVerticalLaserInstanceIndex, 1);

            resolve("resolved");
        }, activeSeconds * 1000);

        //Links the instance's deactivation functions to itself to allow outside callings.
        movingVerticalLaserInstance.externalReject = reject;
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
async function fireBomb(x, y, width, height, waitingSeconds, activeSeconds) {
    //Waits to create the instance to allow for pauses and staggered collision instances.
    await setWaitingTimer(waitingSeconds);

    //Creates an instance and sets all of its initial properties.
    let bombInstance = new bomb(x, y, width, height);
    bombs.push(bombInstance);

    //Creates the "blinking" effect for warning of a collision.
    await setWarningTimers(bombInstance, bombs);

    //Creates a timer for the instance's destruction.
    return new Promise((resolve, reject) => {
        instance.timer = setTimeout(() => {
            //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
            let bombInstanceIndex = bombs.indexOf(bombInstance);
            bombs.splice(bombInstanceIndex, 1);

            resolve("resolved");
        }, activeSeconds * 1000);

        //Links the instance's deactivation functions to itself to allow outside callings.
        bombInstance.externalReject = reject;
    });
};

//Instance Helper Functions

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

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPoints() {
    for (let i = 0; i < points.length; i++) {
        let currentInstance = points[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = "Lime";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "Lime";
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawHorizontalLasers() {
    for (let i = 0; i < horizontalLasers.length; i++) {
        let currentInstance = horizontalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = "#FF9C17";
                context.strokeRect(currentInstance.x + 12, currentInstance.y, 16, currentInstance.height);
                context.strokeRect(currentInstance.width - 28, currentInstance.y, 16, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF9C17";
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
                context.strokeStyle = "#FF9C17";
                context.strokeRect(currentInstance.x, currentInstance.y + 12, currentInstance.width, 16);
                context.strokeRect(currentInstance.x, currentInstance.height - 28, currentInstance.width, 16);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF9C17";
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
                context.fillStyle = "#FF9C17";

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Left warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + 8, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.lineTo(currentInstance.x + 16, currentInstance.y + currentInstance.height * Math.max(0, Math.sign(currentInstance.speed)));
                context.lineTo(currentInstance.x + 24, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.fill();

                //Right warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.width - 8, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.lineTo(currentInstance.width - 16, currentInstance.y + currentInstance.height * Math.max(0, Math.sign(currentInstance.speed)));
                context.lineTo(currentInstance.width - 24, currentInstance.y + currentInstance.height * Math.abs(Math.min(0, Math.sign(currentInstance.speed))));
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF9C17";
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
                context.fillStyle = "#FF9C17";

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Top warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.y + 8);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(0, Math.sign(currentInstance.speed)), currentInstance.y + 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.y + 24);
                context.fill();

                //Bottom warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.height - 8);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(0, Math.sign(currentInstance.speed)), currentInstance.height - 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(0, Math.sign(currentInstance.speed))), currentInstance.height - 24);
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF9C17";
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
                context.strokeStyle = "#FF9C17";
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "##FF9C17";
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
    collidingInstances.splice(0);

    checkCollisionsWithClass(points);
    checkCollisionsWithClass(horizontalLasers);
    checkCollisionsWithClass(verticalLasers);
    checkCollisionsWithClass(movingHorizontalLasers);
    checkCollisionsWithClass(movingVerticalLasers);
    checkCollisionsWithClass(bombs);

    for (let i = 0; i < collidingInstances.length; i++) {
        if (collidingInstances[i].constructor.name === "point") {
            //Adds points to the current level's total.
            currentLevelPoints++;

            //Resolves the point's Promise and destroys the instance once it is touched.
            let collidingPoint = collidingInstances[i];
            collidingPoint.externalResolve();
            clearTimeout(collidingPoint.timer);
            let instanceIndex = points.indexOf(collidingPoint);
            points.splice(instanceIndex, 1);
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
    if (!diplayingGameOverScreen) {
        //Updates the amount of points in the gameInfo div.
        document.getElementById("currentPoints").innerHTML = "Points: " + (permanentPoints + currentLevelPoints);

        //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawHorizontalLasers();
        drawVerticalLasers();
        drawBombs();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawPoints();

        //Blockie is drawn last to appear over other instances when being destroyed.
        drawBlockie();
    };

    window.requestAnimationFrame(drawingLoop);
};

//Game Start

let blockie = new Player();
levelOne();

window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);