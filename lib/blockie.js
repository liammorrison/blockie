"use strict";

//Functions

//Level-Handling Functions

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
var levelOne = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

                        _context.next = 4;
                        return Promise.all([fireHorizontalLaser(300, 16, 2), fireHorizontalLaser(100, 16, 2), fireVerticalLaser(100, 16, 2)]);

                    case 4:
                        _context.next = 6;
                        return Promise.all([fireHorizontalLaser(100, 16, 2), fireBomb(200, 200, 64, 64, 2)]);

                    case 6:

                        console.log("Level completed.");
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](0);

                        console.log("Level restarted.");

                    case 12:
                        ;

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 9]]);
    }));

    return function levelOne() {
        return _ref.apply(this, arguments);
    };
}();

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
var restartLevel = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var i, _i, resumeGame;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        gameState = "restartingLevel";

                        //Calls the reject function on every currently-running promise so that they stop hurting performance.
                        for (i = 0; i < currentPromiseRejectFunctions.length; i++) {
                            currentPromiseRejectFunctions[i]();
                        }

                        //Stops all currently-running timers so that they stop hurting performance.
                        for (_i = 0; _i < currentTimers.length; _i++) {
                            clearTimeout(currentTimers[_i]);
                        }

                        currentPromiseRejectFunctions.splice(0);
                        currentTimers.splice(0);

                        blockie.state = "destructing";
                        blockie.sx = 0;

                        _context2.next = 9;
                        return new Promise(function (resolve, reject) {
                            var drawGameOverScreen = setTimeout(function () {
                                //Draws the game over screen.
                                context.clearRect(0, 0, canvas.width, canvas.height);
                                document.getElementById("messageDisplayer").innerHTML = "You Are Dead.";
                                resolve("resolved");
                            }, 1.5 * 1000);
                        });

                    case 9:

                        //Removes all references to instances from arrays.
                        horizontalLasers.splice(0);
                        verticalLasers.splice(0);
                        bombs.splice(0);

                        diplayingGameOverScreen = true;

                        //Restarts the game after the timer ends.
                        resumeGame = setTimeout(function () {
                            diplayingGameOverScreen = false;
                            gameState = "playing";
                            blockie.state = "playing";
                            levelOne();
                            document.getElementById("messageDisplayer").innerHTML = "";
                            window.requestAnimationFrame(controlRestartingLevel);
                        }, 1000);

                    case 14:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function restartLevel() {
        return _ref2.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Game Setup

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.fillStyle = "white";
context.strokeStyle = "#FFFFFF";
context.lineWidth = 5;

//Variables

var KeysPressed = [];
var xInput = 0;
var yInput = 0;
var colliding = false;
var gameState = "playing";
var diplayingGameOverScreen = false;

//Loads Blockie's sprite maps. They are large sprite maps to avoid loading many individual sprite files.
var spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

var spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";
spBlockieDestructing.style.zIndex = "1000000000";

//Arrays

var currentPromiseRejectFunctions = [];
var currentTimers = [];

var horizontalLasers = [];
var verticalLasers = [];
var bombs = [];

//Classes

var Player = function Player() {
    _classCallCheck(this, Player);

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

;

var horizontalLaser = function horizontalLaser() {
    _classCallCheck(this, horizontalLaser);

    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = 0;

    //When created, the instance begins its warning state to provide visual feedback.
    this.state = "warning";
    this.visible = true;
};

;

var verticalLaser = function verticalLaser() {
    _classCallCheck(this, verticalLaser);

    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = canvas.height;

    //When created, the instance begins its warning state to provide visual feedback.
    this.state = "warning";
    this.visible = true;
};

;

var bomb = function bomb() {
    _classCallCheck(this, bomb);

    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    //When created, the instance begins its warning state to provide visual feedback.
    this.state = "warning";
    this.visible = true;
};

;

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    blockie.x = blockieX;
    blockie.y = blockieY;
    window.requestAnimationFrame(gameLoop);
};;

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
    var currentPromiseRejectFunctionIndex = currentPromiseRejectFunctions.indexOf(promise);
    currentPromiseRejectFunctions.splice(currentPromiseRejectFunctionIndex, 1);
};

//Removes a timer from the array of currently-running timers (it's inside code is ran in the restartLevel function).
function removeCurrentTimer(timer) {
    var currentTimerIndex = currentTimers.indexOf(timer);
    currentTimers.splice(currentTimerIndex, 1);
};

//Instance Functions

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
function fireHorizontalLaser(y, height, totalSeconds) {
    //Creates an instance and sets all of its key-value pairs.
    var instance = new horizontalLaser();
    horizontalLasers.push(instance);
    instance.y = y;
    instance.height = height;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise(function (resolve, reject) {
        var endFiring = setTimeout(function () {
            //Removes the instance from all related arrays once it is "destroyed".
            var instanceIndex = horizontalLasers.indexOf(instance);
            horizontalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, totalSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
function fireVerticalLaser(x, width, totalSeconds) {
    //Creates an instance and sets all of its key-value pairs.
    var instance = new verticalLaser();
    verticalLasers.push(instance);
    instance.x = x;
    instance.width = width;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise(function (resolve, reject) {
        var endFiring = setTimeout(function () {
            //Removes the instance from all related arrays once it is "destroyed".
            var instanceIndex = verticalLasers.indexOf(instance);
            verticalLasers.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, totalSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
function fireBomb(x, y, width, height, totalSeconds) {
    //Creates an instance and sets all of its key-value pairs.
    var instance = new bomb();
    bombs.push(instance);
    instance.x = x;
    instance.y = y;
    instance.width = width;
    instance.height = height;

    //Creates the "blinking" effect for warning of a collision.
    setWarningTimers(instance);

    //Creates a timer for the instance's destruction.
    return new Promise(function (resolve, reject) {
        var endFiring = setTimeout(function () {
            //Removes the instance from all related arrays once it is "destroyed".
            var instanceIndex = bombs.indexOf(instance);
            bombs.splice(instanceIndex, 1);
            removeCurrentPromiseRejectFunction(reject);
            removeCurrentTimer(endFiring);

            console.log("Promise resolved.");
            resolve("resolved");
        }, totalSeconds * 1000);

        //Adds the instance to its deactivation arrays.
        addCurrentPromiseRejectFunction(reject);
        addCurrentTimer(endFiring);
    });
};

//Sets the timers that cause the collision instance to "blink" 3 times before firing. Class keys are named the same among objects to 
//allow this function to work on all objects. All warning timers are set at the same length to allow the player to predict collisions.
function setWarningTimers(instance) {
    var warningInvisibleOne = setTimeout(function () {
        instance.visible = false;
        removeCurrentTimer(warningInvisibleOne);
    }, 0.25 * 1000);
    addCurrentTimer(warningInvisibleOne);

    var warningVisibleTwo = setTimeout(function () {
        instance.visible = true;
        removeCurrentTimer(warningVisibleTwo);
    }, 0.5 * 1000);
    addCurrentTimer(warningVisibleTwo);

    var warningInvisibleTwo = setTimeout(function () {
        instance.visible = false;
        removeCurrentTimer(warningInvisibleTwo);
    }, 0.75 * 1000);
    addCurrentTimer(warningInvisibleTwo);

    var fire = setTimeout(function () {
        instance.state = "firing";
        instance.visible = true;
        removeCurrentTimer(fire);
    }, 1000);
    addCurrentTimer(fire);
}

//Drawing Functions

function drawHorizontalLasers() {
    for (var i = 0; i < horizontalLasers.length; i++) {
        var currentInstance = horizontalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeRect(currentInstance.x + 8, currentInstance.y, 16, currentInstance.height);
                context.strokeRect(currentInstance.width - 24, currentInstance.y, 16, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            }
        }
    }
}

function drawVerticalLasers() {
    for (var i = 0; i < verticalLasers.length; i++) {
        var currentInstance = verticalLasers[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeRect(currentInstance.x, currentInstance.y + 8, currentInstance.width, 16);
                context.strokeRect(currentInstance.x, currentInstance.height - 24, currentInstance.width, 16);
            } else if (currentInstance.state == "firing") {
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            }
        }
    }
}

function drawBombs() {
    for (var i = 0; i < bombs.length; i++) {
        var currentInstance = bombs[i];
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            }
        }
    }
}

//Micellaneous Functions

function initializeKeyInputs() {
    //Adds all currently pressed keys as a keyCode with a pair of true in the KeysPressed object. .keyCode is used instead of .key so 
    //that capital letters can't cause unwanted movements.
    document.addEventListener("keydown", function (e) {
        KeysPressed[e.keyCode] = true;
    });

    //Deletes all currently unpressed keys from the KeysPressed object.
    document.addEventListener("keyup", function (e) {
        delete KeysPressed[e.keyCode];
    });
};

//Determines if two instances are "colliding". They cannot be colliding if one is in the warning state.
function checkSpritesColliding(instanceOne, instanceTwo) {
    var xColliding = false;
    var yColliding = false;

    if (instanceTwo.x <= instanceOne.x && instanceOne.x <= instanceTwo.x + instanceTwo.width && instanceTwo.state !== "warning") {
        xColliding = true;
    } else if (instanceOne.x <= instanceTwo.x && instanceTwo.x <= instanceOne.x + instanceOne.width && instanceTwo.state !== "warning") {
        xColliding = true;
    }

    if (instanceTwo.y <= instanceOne.y && instanceOne.y <= instanceTwo.y + instanceTwo.height && instanceTwo.state !== "warning") {
        yColliding = true;
    } else if (instanceOne.y <= instanceTwo.y && instanceTwo.y <= instanceOne.y + instanceOne.height && instanceTwo.state !== "warning") {
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

//Game loop

initializeKeyInputs();

function gameLoop() {
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
    if (!(blockie.testXLocation <= 0 || blockie.testXLocation + blockie.width >= canvas.width)) {
        blockie.x = blockie.testXLocation;
    } else if (blockie.testXLocation <= 0) {
        blockie.x = 0;
    } else if (blockie.testXLocation + blockie.width >= canvas.width) {
        blockie.x = canvas.width - blockie.width;
    };

    if (!(blockie.testYLocation <= 0 || blockie.testYLocation + blockie.height >= canvas.height)) {
        blockie.y = blockie.testYLocation;
    } else if (blockie.testYLocation <= 0) {
        blockie.y = 0;
    } else if (blockie.testYLocation + blockie.height >= canvas.height) {
        blockie.y = canvas.height - blockie.height;
    };

    //Fail state.

    //Resets the collision flag to recheck every frame.
    colliding = false;

    for (var i = 0; i < horizontalLasers.length; i++) {
        checkSpritesColliding(blockie, horizontalLasers[i]);
    };

    for (var _i2 = 0; _i2 < verticalLasers.length; _i2++) {
        checkSpritesColliding(blockie, verticalLasers[_i2]);
    };

    for (var _i3 = 0; _i3 < bombs.length; _i3++) {
        checkSpritesColliding(blockie, bombs[_i3]);
    };

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
        } else if (blockie.state === "destructing") {
            blockie.sprite = spBlockieDestructing;

            var endAnimateBlockieDestructing = setTimeout(function () {
                clearInterval(animateBlockieDestructing);
            }, 1.5 * 1000);

            var animateBlockieDestructing = setInterval(function () {
                blockie.sx += blockie.spriteSideLength;
            }, 0.5 * 1000);
        }

        drawHorizontalLasers();
        drawVerticalLasers();
        drawBombs();

        context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
    }

    window.requestAnimationFrame(drawingLoop);
};

//Game Start

var blockie = new Player();
levelOne();

window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(controlRestartingLevel);
//# sourceMappingURL=blockie.js.map