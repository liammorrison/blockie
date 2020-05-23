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
                        initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

                        _context.next = 3;
                        return Promise.all([fireHorizontalLaser(300, 16, 4), fireHorizontalLaser(100, 16, 3)]);

                    case 3:
                        _context.next = 5;
                        return fireHorizontalLaser(100, 16, 3);

                    case 5:

                        console.log("level is done");

                    case 6:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function levelOne() {
        return _ref.apply(this, arguments);
    };
}();

//Instance Functions

//Creates an instance of a laser and adds it to an array so that it can be drawn and used in collision checking more easily.
//When the timer ends, the instance is deleted.
var fireHorizontalLaser = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(y, height, seconds) {
        var promiseTimer, instance, instanceIndex;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        promiseTimer = void 0;

                        //Creates an instance of an object, adds it to the end of its object's array, and assigns its key-value pairs.

                        instance = new horizontalLaser();

                        horizontalLasers.push(instance);
                        instanceIndex = horizontalLasers.indexOf(instance);

                        horizontalLasers[instanceIndex].y = y;
                        horizontalLasers[instanceIndex].height = height;

                        //Creates a timer that resolves promises in the levelController and deletes the instance from its array (so that it isn't drawn
                        //or collided with anymore).
                        return _context2.abrupt("return", new Promise(function (resolve) {
                            promiseTimer = setTimeout(function () {
                                removeCurrentTimer(promiseTimer);
                                instanceIndex = horizontalLasers.indexOf(instance);
                                horizontalLasers.splice(instanceIndex, 1);
                                console.log("resolved");
                                resolve("resolved");
                            }, seconds * 1000);
                            addCurrentTimer(promiseTimer);
                        }));

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function fireHorizontalLaser(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Game Setup

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.fillStyle = "white";

//Variables

var KeysPressed = {};
var xInput = 0;
var yInput = 0;
var colliding = false;
var gameState = "playing";

//Arrays

var currentTimers = [];
var horizontalLasers = [];

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

    //Loads Blockie"s sprite map. It is one large sprite map to avoid loading many individual 
    //sprite files.
    this.sprite = document.createElement("img");
    this.sprite.src = "../images/blockie.png";
};

;

var horizontalLaser = function horizontalLaser() {
    _classCallCheck(this, horizontalLaser);

    this.x = 0;
    this.y = 100;
    this.width = canvas.width;
    this.height = 32;
};

;

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

    //Stops all timers (prevents promises from continuing).
    for (var i = 0; i < currentTimers.length; i++) {
        clearTimeout(currentTimers[i]);
    }

    //Destroys every instance.
    currentTimers.splice(0);
    horizontalLasers.splice(0);

    setTimeout(function () {
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
        console.log("restarting level.");
    } else {
        window.requestAnimationFrame(controlRestartingLevel);
    };
};

//Adds a currently-running timer to an array so that it can be easily deactivated when the game restarts.
function addCurrentTimer(timer) {
    currentTimers.push(timer);
};

//Removes a timer from the array of currently-running arrays (preferably after it's inside code has been ran).
function removeCurrentTimer(timer) {
    var currentTimerIndex = currentTimers.indexOf(timer);
    currentTimers.splice(currentTimerIndex, 1);
};;

//Drawing Functions

function drawHorizontalLasers() {
    for (var i = 0; i < horizontalLasers.length; i++) {
        var currentInstance = horizontalLasers[i];
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    }
}

//Micellaneous Functions

//Determines if two objects are "colliding".
function checkSpritesColliding(instanceOne, instanceTwo) {
    var xColliding = false;
    var yColliding = false;

    if (instanceTwo.x <= instanceOne.x && instanceOne.x <= instanceTwo.x + instanceTwo.width) {
        xColliding = true;
    } else if (instanceOne.x <= instanceTwo.x && instanceTwo.x <= instanceOne.x + instanceOne.width) {
        xColliding = true;
    }

    if (instanceTwo.y <= instanceOne.y && instanceOne.y <= instanceTwo.y + instanceTwo.height) {
        yColliding = true;
    } else if (instanceOne.y <= instanceTwo.y && instanceTwo.y <= instanceOne.y + instanceOne.height) {
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

var blockie = new Player();

//Game loop

//Adds all currently pressed keys as a keyCode with a pair of true in the KeysPressed object. .keyCode is used instead of .key so 
//that capital letters can't cause unwanted movements.
document.addEventListener("keydown", function (e) {
    KeysPressed[e.keyCode] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener("keyup", function (e) {
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

    //Drawing

    //sx is the location on the blockie.png sprite map and it determines the sprite's direction facing. 
    //It starts at the idle image, then goes to the top-left, and then continues in a clockwise direction.
    blockie.sx = blockie.spriteSideLength * (Math.round(blockie.angleMovingDegrees / 45) + 4);

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);

    drawHorizontalLasers();

    //Fail state.

    //Resets the collision flag to recheck every frame.
    colliding = false;

    for (var i = 0; i < horizontalLasers.length; i++) {
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
//# sourceMappingURL=blockie.js.map