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

                        initializeLevel(canvas.width / 2 - blockie.width / 2, 22 * 16);

                        _context.next = 4;
                        return Promise.all([fireMovingHorizontalLaser(canvas.height - 16, 16, -0.75, 0, 6), fireMovingHorizontalLaser(0, 16, 0.5, 2, 4), fireMovingHorizontalLaser(100, 16, 0.5, 3, 3), fireMovingVerticalLaser(canvas.width - 16, 16, -0.75, 0, 6), fireMovingVerticalLaser(0, 16, 0.5, 2, 4), fireMovingVerticalLaser(100, 16, 0.5, 3, 3)]);

                    case 4:

                        console.log("Level 1 completed.");
                        increaseLevel();
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](0);

                        console.log("Level 1 restarted.");

                    case 11:
                        ;

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function levelOne() {
        return _ref.apply(this, arguments);
    };
}();

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
var levelTwo = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            initializeLevel(canvas.width / 2 - blockie.width / 2, canvas.height / 2 - blockie.height / 2);

                            console.log("Level 2 completed.");
                            currentLevel++;
                        } catch (error) {
                            console.log("Level 2 restarted.");
                        };

                    case 2:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function levelTwo() {
        return _ref2.apply(this, arguments);
    };
}();

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
var restartLevel = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        gameState = "restartingLevel";

                        //Stops all currently-running timers so that they stop hurting performance and don't execute after resetting.
                        for (i = 0; i < currentTimers.length; i++) {
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

                        _context3.next = 22;
                        return new Promise(function (resolve, reject) {
                            var drawGameOverScreen = setTimeout(function () {
                                //Draws the game over screen.
                                context.clearRect(0, 0, canvas.width, canvas.height);
                                document.getElementById("messageDisplayer").innerHTML = "You Are Dead.";
                                resolve("resolved");
                            }, 1.5 * 1000);
                        });

                    case 22:

                        diplayingGameOverScreen = true;

                        _context3.next = 25;
                        return new Promise(function (resolve, reject) {
                            var resumeGame = setTimeout(function () {
                                //Restarts the game.
                                diplayingGameOverScreen = false;
                                gameState = "playing";
                                blockie.state = "playing";
                                controlLevel();
                                document.getElementById("messageDisplayer").innerHTML = "";
                                window.requestAnimationFrame(gameLoop);
                            }, 1000);
                        });

                    case 25:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function restartLevel() {
        return _ref3.apply(this, arguments);
    };
}();

//Sets the timers that cause the collision instance to "blink" 2 times before firing. All warning timers are set at the same length 
//to allow the player to predict collisions.
var setWarningTimers = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(instanceAffecting, instanceAffectingObjectArray) {
        var warningSeconds;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        warningSeconds = 1;

                        //Each timer sets the affected instance's timer and reject function equal to a new "blinking" timer for a bit.

                        _context4.next = 3;
                        return new Promise(function (resolve, reject) {
                            instanceAffecting.timer = setTimeout(function () {
                                instanceAffecting.visible = false;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);

                            instanceAffecting.externalReject = reject;
                        });

                    case 3:
                        _context4.next = 5;
                        return new Promise(function (resolve, reject) {
                            instanceAffecting.timer = setTimeout(function () {
                                instanceAffecting.visible = true;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);

                            instanceAffecting.externalReject = reject;
                        });

                    case 5:
                        _context4.next = 7;
                        return new Promise(function (resolve, reject) {
                            instanceAffecting.timer = setTimeout(function () {
                                instanceAffecting.visible = false;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);

                            instanceAffecting.externalReject = reject;
                        });

                    case 7:
                        return _context4.abrupt("return", new Promise(function (resolve, reject) {
                            instanceAffecting.timer = setTimeout(function () {
                                instanceAffecting.state = "firing";
                                instanceAffecting.visible = true;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);

                            instanceAffecting.externalReject = reject;
                        }));

                    case 8:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function setWarningTimers(_x, _x2) {
        return _ref4.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createPoint = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(x, y, waitingSeconds, activeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return setWaitingTimer(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new Point(x, y);

                        points.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context5.next = 6;
                        return setWarningTimers(instance, points);

                    case 6:
                        return _context5.abrupt("return", new Promise(function (resolve, reject) {
                            instance.timer = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = points.indexOf(instance);
                                points.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, activeSeconds * 1000);

                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        }));

                    case 7:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function createPoint(_x3, _x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireHorizontalLaser = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(y, height, waitingSeconds, activeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return setWaitingTimer(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new HorizontalLaser(y, height);

                        horizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context6.next = 6;
                        return setWarningTimers(instance, horizontalLasers);

                    case 6:
                        return _context6.abrupt("return", new Promise(function (resolve, reject) {
                            instance.timer = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = horizontalLasers.indexOf(instance);
                                horizontalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, activeSeconds * 1000);

                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalReject = reject;
                        }));

                    case 7:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function fireHorizontalLaser(_x7, _x8, _x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireVerticalLaser = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(x, width, waitingSeconds, activeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return setWaitingTimer(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new VerticalLaser(x, width);

                        verticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context7.next = 6;
                        return setWarningTimers(instance, verticalLasers);

                    case 6:
                        return _context7.abrupt("return", new Promise(function (resolve, reject) {
                            instance.timer = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = verticalLasers.indexOf(instance);
                                verticalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, activeSeconds * 1000);

                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalReject = reject;
                        }));

                    case 7:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function fireVerticalLaser(_x11, _x12, _x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingHorizontalLaser = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(y, height, speed, waitingSeconds, activeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return setWaitingTimer(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingHorizontalLaser(y, height, speed);

                        movingHorizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context8.next = 6;
                        return setWarningTimers(instance, movingHorizontalLasers);

                    case 6:
                        return _context8.abrupt("return", new Promise(function (resolve, reject) {
                            instance.timer = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = movingHorizontalLasers.indexOf(instance);
                                movingHorizontalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, activeSeconds * 1000);

                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalReject = reject;
                        }));

                    case 7:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function fireMovingHorizontalLaser(_x15, _x16, _x17, _x18, _x19) {
        return _ref8.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingVerticalLaser = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(x, width, speed, waitingSeconds, activeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return setWaitingTimer(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingVerticalLaser(x, width, speed);

                        movingVerticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context9.next = 6;
                        return setWarningTimers(instance, movingVerticalLasers);

                    case 6:
                        return _context9.abrupt("return", new Promise(function (resolve, reject) {
                            instance.timer = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = movingVerticalLasers.indexOf(instance);
                                movingVerticalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, activeSeconds * 1000);

                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalReject = reject;
                        }));

                    case 7:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function fireMovingVerticalLaser(_x20, _x21, _x22, _x23, _x24) {
        return _ref9.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireBomb = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(x, y, width, height, waitingSeconds, activeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return setWaitingTimer(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new Bomb(x, y, width, height);

                        bombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context10.next = 6;
                        return setWarningTimers(instance, bombs);

                    case 6:
                        return _context10.abrupt("return", new Promise(function (resolve, reject) {
                            instance.timer = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = bombs.indexOf(instance);
                                bombs.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, activeSeconds * 1000);

                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalReject = reject;
                        }));

                    case 7:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function fireBomb(_x25, _x26, _x27, _x28, _x29, _x30) {
        return _ref10.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Game Setup

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

var gameState = "playing";
var diplayingGameOverScreen = false;
var KeysPressed = [];

var currentLevel = 1;

var permanentPoints = 0;
var currentLevelPoints = 0;

var xInput = 0;
var yInput = 0;

var colliding = false;

var recoveringFromDash = false;
var allowDashAgain = true;
var dashDistance = 80;

//Loads Blockie's sprite maps. They are large sprite maps to avoid loading many individual sprite files.
var spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

var spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

var spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

//Arrays
var waitingTimers = [];
var points = [];
var horizontalLasers = [];
var verticalLasers = [];
var bombs = [];
var movingHorizontalLasers = [];
var movingVerticalLasers = [];

var currentTimers = [];

var collidingInstances = [];

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

var WaitingTimer = function WaitingTimer() {
    _classCallCheck(this, WaitingTimer);

    //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
    this.externalReject;
    this.timer;
};

;

var Point = function Point(x, y) {
    _classCallCheck(this, Point);

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

;

var HorizontalLaser = function HorizontalLaser(y, height) {
    _classCallCheck(this, HorizontalLaser);

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

;

var VerticalLaser = function VerticalLaser(x, width) {
    _classCallCheck(this, VerticalLaser);

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

;

var MovingHorizontalLaser = function MovingHorizontalLaser(y, height, speed) {
    _classCallCheck(this, MovingHorizontalLaser);

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

;

var MovingVerticalLaser = function MovingVerticalLaser(x, width, speed) {
    _classCallCheck(this, MovingVerticalLaser);

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

;

var Bomb = function Bomb(x, y, width, height) {
    _classCallCheck(this, Bomb);

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

;;;

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
};;

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
    var initialArrayLength = objectArray.length;

    for (var i = initialArrayLength - 1; i >= 0; i--) {
        //Rejects the instances' Promises and timers and destroys the instances.
        var instance = objectArray[i];
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
    var currentTimerIndex = currentTimers.indexOf(timer);
    currentTimers.splice(currentTimerIndex, 1);
};

//Instance Functions

//Creates a WaitingTimer instance, and awaits for its resolution to then create the root collision instance. This is meant to allow
//for instances to spawn at different times concurrently (using Promise.all) or spawn a bit after another's destruction.
function setWaitingTimer(waitingSeconds) {
    //Creates an instance and sets all of its initial properties.
    var instance = new WaitingTimer();
    waitingTimers.push(instance);

    return new Promise(function (resolve, reject) {
        instance.timer = setTimeout(function () {
            //Removes the instance from its object array once it is "destroyed".
            var instanceIndex = waitingTimers.indexOf(instance);
            waitingTimers.splice(instanceIndex, 1);

            resolve("resolved");
        }, waitingSeconds * 1000);

        instance.externalReject = reject;
    });
};;;;;;;;

//Instance Helper Functions

//Moves lasers by adding speed to their location every step.
function moveMovingHorizontalLasers() {
    for (var i = 0; i < movingHorizontalLasers.length; i++) {
        if (movingHorizontalLasers[i].state !== "warning") {
            movingHorizontalLasers[i].y += movingHorizontalLasers[i].speed;
        };
    };
};

//Moves lasers by adding speed to their location every step.
function moveMovingVerticalLasers() {
    for (var i = 0; i < movingVerticalLasers.length; i++) {
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

        var endAnimateBlockieDestructing = setTimeout(function () {
            clearInterval(animateBlockieDestructing);
            removeCurrentTimer(animateBlockieDestructing);
            removeCurrentTimer(endAnimateBlockieDestructing);
        }, 1.5 * 1000);
        addCurrentTimer(endAnimateBlockieDestructing);

        var animateBlockieDestructing = setInterval(function () {
            blockie.sx += blockie.spriteSideLength;
        }, 0.5 * 1000);
        addCurrentTimer(animateBlockieDestructing);
    };

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPoints() {
    for (var i = 0; i < points.length; i++) {
        var currentInstance = points[i];
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
    for (var i = 0; i < horizontalLasers.length; i++) {
        var currentInstance = horizontalLasers[i];
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
    for (var i = 0; i < verticalLasers.length; i++) {
        var currentInstance = verticalLasers[i];
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
    for (var i = 0; i < movingHorizontalLasers.length; i++) {
        var currentInstance = movingHorizontalLasers[i];
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
    for (var i = 0; i < movingVerticalLasers.length; i++) {
        var currentInstance = movingVerticalLasers[i];
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
    for (var i = 0; i < bombs.length; i++) {
        var currentInstance = bombs[i];
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
    for (var i = 0; i < classArray.length; i++) {
        checkSpritesColliding(blockie, classArray[i]);
    };
};

//Determines if two instances are "colliding". They cannot be colliding if one is in the warning state.
function checkSpritesColliding(instanceOne, instanceTwo) {
    var xColliding = false;
    var yColliding = false;

    if (instanceTwo.x <= instanceOne.x && instanceOne.x <= instanceTwo.x + instanceTwo.width && instanceTwo.state === "firing") {
        xColliding = true;
    } else if (instanceOne.x <= instanceTwo.x && instanceTwo.x <= instanceOne.x + instanceOne.width && instanceTwo.state === "firing") {
        xColliding = true;
    };

    if (instanceTwo.y <= instanceOne.y && instanceOne.y <= instanceTwo.y + instanceTwo.height && instanceTwo.state === "firing") {
        yColliding = true;
    } else if (instanceOne.y <= instanceTwo.y && instanceTwo.y <= instanceOne.y + instanceOne.height && instanceTwo.state === "firing") {
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
    document.addEventListener("keydown", function (e) {
        KeysPressed[e.keyCode] = true;
    });

    //Deletes all currently unpressed keys from the KeysPressed object.
    document.addEventListener("keyup", function (e) {
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

            var endDashRecoveryTime = 0.3;
            var endDashRecovery = setTimeout(function () {
                recoveringFromDash = false;
                allowDashAgain = false;
                blockie.state = "playing";
                removeCurrentTimer(endDashRecovery);
            }, endDashRecoveryTime * 1000);
            addCurrentTimer(endDashRecovery);

            var resetAllowDashAgainTime = 0.9;
            var resetAllowDashAgain = setTimeout(function () {
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

    for (var i = 0; i < collidingInstances.length; i++) {
        if (collidingInstances[i].constructor.name === "Point") {
            //Adds points to the current level's total.
            currentLevelPoints++;

            //Resolves the Point's Promise and destroys the instance once it is touched.
            var collidingPoint = collidingInstances[i];
            collidingPoint.externalResolve();
            clearTimeout(collidingPoint.timer);
            var instanceIndex = points.indexOf(collidingPoint);
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

var blockie = new Player();
levelOne();

window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
//# sourceMappingURL=blockie.js.map