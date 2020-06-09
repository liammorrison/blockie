"use strict";

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
var levelOne = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        initializeLevel(8 * 16 - blockie.width / 2, center - blockie.height / 2);

                        _context.next = 4;
                        return Promise.all([createPassivePoint(center - 8, center - 8, 0, 6), createActivePoint(23 * 16, center - 8, 0, 6), fireBomb(2, 2, maxEdge - 4, 11 * 16 - 4, 0, 6), fireBomb(2, 21 * 16 + 2, maxEdge - 4, 11 * 16 - 4, 0, 6), fireMovingVerticalLaser(0, 32, 1, 1, 5)]);

                    case 4:
                        _context.next = 6;
                        return Promise.all([createActivePoint(8 * 16, center - 8, 0, 5), fireBomb(2, 2, maxEdge - 4, 11 * 16 - 4, 0, 5), fireBomb(2, 21 * 16 + 2, maxEdge - 4, 11 * 16 - 4, 0, 5), fireMovingVerticalLaser(30 * 16, 32, -1.75, 1, 4)]);

                    case 6:
                        _context.next = 8;
                        return Promise.all([createPassivePoint(center - 8, 23 * 16, 0, 2.5), fireMovingHorizontalLaser(8 * 16 - 8, 32, 1.4, 0, 1.75), fireMovingVerticalLaser(0, 32, 1.4, 0, 3.5), fireMovingHorizontalLaser(maxEdge - 32, 32, -1.4, 1.75, 3.5), createPassivePoint(23 * 16, center - 8, 2.25, 2.5), fireMovingVerticalLaser(maxEdge - 32, 32, -1.4, 3.5, 3.5), createPassivePoint(center - 8, 8 * 16, 4.5, 2.5), fireMovingHorizontalLaser(0, 32, 1.4, 5.25, 1.75)]);

                    case 8:
                        _context.next = 10;
                        return Promise.all([createActivePoint(center - 8, center - 8, 0, 6), fireBomb(center - 32, center - 32, 64, 64, 0, 2)]);

                    case 10:

                        console.log("Level 1 completed.");
                        increaseLevel();
                        _context.next = 17;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](0);

                        console.log("Level 1 restarted.");

                    case 17:
                        ;

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 14]]);
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
        var i, _i, _i2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        gameState = "restartingLevel";

                        //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                        for (i = 0; i < currentTimeouts.length; i++) {
                            clearTimeout(currentTimeouts[i]);
                        };

                        currentTimeouts.splice(0);

                        //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                        for (_i = 0; _i < currentIntervals.length; _i++) {
                            clearInterval(currentIntervals[_i]);
                        };

                        currentIntervals.splice(0);

                        updateAllObjects();
                        for (_i2 = 0; _i2 < allObjects.length; _i2++) {
                            rejectInstances(allObjects[_i2]);
                        };

                        blockie.state = "destructing";
                        blockie.sx = 0;

                        _context3.next = 14;
                        return new Promise(function (resolve, reject) {
                            var drawGameOverScreen = setTimeout(function () {
                                //Draws the game over screen.
                                context.clearRect(0, 0, canvas.width, canvas.height);
                                document.getElementById("messageDisplayer").innerHTML = "You Are Dead.";
                                resolve("resolved");
                            }, 1.5 * 1000);
                        });

                    case 14:

                        displayingGameOverScreen = true;

                        _context3.next = 17;
                        return new Promise(function (resolve, reject) {
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

                    case 17:
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

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
var setWarningTimeouts = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(instanceAffecting, instanceAffectingObjectArray) {
        var warningSeconds;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        warningSeconds = 1;

                        //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.

                        _context4.next = 3;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                instanceAffecting.visible = false;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        });

                    case 3:
                        _context4.next = 5;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                instanceAffecting.visible = true;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        });

                    case 5:
                        _context4.next = 7;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                instanceAffecting.visible = false;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        });

                    case 7:
                        return _context4.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                instanceAffecting.state = "firing";
                                instanceAffecting.visible = true;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        }));

                    case 8:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function setWarningTimeouts(_x, _x2) {
        return _ref4.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createPassivePoint = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(x, y, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new PassivePoint(x, y, firingSeconds);

                        passivePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context5.next = 6;
                        return setWarningTimeouts(instance, passivePoints);

                    case 6:
                        return _context5.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            //Sets an interval to the length of the firingSeconds which counts down the semi-accurate remaining length of the timeout.
                            //This is used in drawing the remaining seconds meter to show the player how much longer the point will exist.
                            instance.remainingFiringSeconds = firingSeconds;
                            var remainingFiringSecondsInterval = setInterval(function () {
                                instance.remainingFiringSeconds -= 0.004;
                            }, 1);
                            addCurrentInterval(remainingFiringSecondsInterval);

                            instance.timeout = setTimeout(function () {
                                removeCurrentInterval(remainingFiringSecondsInterval);

                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = passivePoints.indexOf(instance);
                                passivePoints.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function createPassivePoint(_x3, _x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createActivePoint = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(x, y, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new ActivePoint(x, y, firingSeconds);

                        activePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context6.next = 6;
                        return setWarningTimeouts(instance, activePoints);

                    case 6:
                        return _context6.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            //Sets an interval to the length of the firingSeconds which counts down the semi-accurate remaining length of the timeout.
                            //This is used in drawing the remaining seconds meter to show the player how much longer the point will exist.
                            instance.remainingFiringSeconds = firingSeconds;
                            var remainingFiringSecondsInterval = setInterval(function () {
                                instance.remainingFiringSeconds -= 0.004;
                            }, 1);
                            addCurrentInterval(remainingFiringSecondsInterval);

                            instance.timeout = setTimeout(function () {
                                removeCurrentInterval(remainingFiringSecondsInterval);

                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = activePoints.indexOf(instance);
                                activePoints.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function createActivePoint(_x7, _x8, _x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireHorizontalLaser = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(y, height, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new HorizontalLaser(y, height);

                        horizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context7.next = 6;
                        return setWarningTimeouts(instance, horizontalLasers);

                    case 6:
                        return _context7.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = horizontalLasers.indexOf(instance);
                                horizontalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function fireHorizontalLaser(_x11, _x12, _x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireVerticalLaser = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(x, width, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new VerticalLaser(x, width);

                        verticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context8.next = 6;
                        return setWarningTimeouts(instance, verticalLasers);

                    case 6:
                        return _context8.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = verticalLasers.indexOf(instance);
                                verticalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function fireVerticalLaser(_x15, _x16, _x17, _x18) {
        return _ref8.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingHorizontalLaser = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(y, height, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingHorizontalLaser(y, height, speed);

                        movingHorizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context9.next = 6;
                        return setWarningTimeouts(instance, movingHorizontalLasers);

                    case 6:
                        return _context9.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = movingHorizontalLasers.indexOf(instance);
                                movingHorizontalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function fireMovingHorizontalLaser(_x19, _x20, _x21, _x22, _x23) {
        return _ref9.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingVerticalLaser = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(x, width, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingVerticalLaser(x, width, speed);

                        movingVerticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context10.next = 6;
                        return setWarningTimeouts(instance, movingVerticalLasers);

                    case 6:
                        return _context10.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = movingVerticalLasers.indexOf(instance);
                                movingVerticalLasers.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function fireMovingVerticalLaser(_x24, _x25, _x26, _x27, _x28) {
        return _ref10.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireBomb = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(x, y, width, height, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:

                        //Creates an instance and sets all of its initial properties.
                        instance = new Bomb(x, y, width, height);

                        bombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context11.next = 6;
                        return setWarningTimeouts(instance, bombs);

                    case 6:
                        return _context11.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) once it is "destroyed".
                                var instanceIndex = bombs.indexOf(instance);
                                bombs.splice(instanceIndex, 1);

                                resolve("resolved");
                            }, firingSeconds * 1000);
                        }));

                    case 7:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));

    return function fireBomb(_x29, _x30, _x31, _x32, _x33, _x34) {
        return _ref11.apply(this, arguments);
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
var displayingGameOverScreen = false;
var keysDown = [];

var currentLevel = 1;

var permanentPoints = 0;
var currentLevelPoints = 0;

var xInput = 0;
var yInput = 0;

var colliding = false;

var arrowLeftAlreadyPressed = false;
var arrowUpAlreadyPressed = false;
var arrowRightAlreadyPressed = false;
var arrowDownAlreadyPressed = false;
var shiftAlreadyPressed = false;
var spaceAlreadyPressed = false;

var recoveringFromDash = false;
var allowDashAgain = true;
var dashDistance = 88;
var dashRecoverySeconds = 0.3;
var allowDashAgainSeconds = 0.9;

//Loads Blockie's sprite maps. They are large sprite maps to avoid loading many individual sprite files.
var spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

var spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

var spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

//Arrays

var waitingTimeouts = [];
var passivePoints = [];
var activePoints = [];
var horizontalLasers = [];
var verticalLasers = [];
var movingHorizontalLasers = [];
var movingVerticalLasers = [];
var bombs = [];

//allObjects is used to make destroying all instances (reject or resolve) possible with a for loop.
var allObjects = [];

var currentTimeouts = [];
var currentIntervals = [];

var collidingInstances = [];

//Classes

var Player = function Player() {
    _classCallCheck(this, Player);

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

;

var WaitingTimeout = function WaitingTimeout() {
    _classCallCheck(this, WaitingTimeout);

    //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
    this.externalReject;
    this.timeout;
};

;

//The difference between PassivePoints and ActivePoints is that the latter resolve all currently running promises when touched by
//Blockie, while the former do not.

var PassivePoint = function PassivePoint(x, y, totalFiringSeconds) {
    _classCallCheck(this, PassivePoint);

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

;

var ActivePoint = function ActivePoint(x, y, totalFiringSeconds) {
    _classCallCheck(this, ActivePoint);

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
    this.timeout;
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
    this.timeout;
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
    this.timeout;
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
    this.timeout;
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
    this.timeout;
};

;

//Functions

//Level-Handling Functions

//Since these are frequently used numbers, they are variables for simplicity. The canvas' width and height are the same, so they 
//work with both axes.
var center = canvas.width / 2;
var maxEdge = canvas.width;;;

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    document.getElementById("currentLevel").innerHTML = "Level: " + currentLevel;

    gameState = "playing";

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

//Resolves all promises and removes all instances from their object arrays.
function resolveInstances(objectArray) {
    //The for loop's length is determined before it starts to avoid missing the first element.
    var initialArrayLength = objectArray.length;

    for (var i = initialArrayLength - 1; i >= 0; i--) {
        //Rejects the instances' Promises and timeouts and destroys the instances.
        var instance = objectArray[i];
        instance.externalResolve();
        clearTimeout(instance.timeout);
        objectArray.splice(i, 1);
    };
};

//Rejects all promises and removes all instances from their object arrays.
function rejectInstances(objectArray) {
    //The for loop's length is determined before it starts to avoid missing the first element.
    var initialArrayLength = objectArray.length;

    for (var i = initialArrayLength - 1; i >= 0; i--) {
        //Rejects the instances' Promises and timeouts and destroys the instances.
        var instance = objectArray[i];
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
    var currentTimeoutIndex = currentTimeouts.indexOf(timeout);
    currentTimeouts.splice(currentTimeoutIndex, 1);
};

//Adds a currently-running interval to an array so that it can be easily deactivated when the game restarts.
function addCurrentInterval(interval) {
    currentIntervals.push(interval);
};

//Removes a interval from the array of currently-running intervals and clears it.
function removeCurrentInterval(interval) {
    clearInterval(interval);
    var currentIntervalIndex = currentIntervals.indexOf(interval);
    currentIntervals.splice(currentIntervalIndex, 1);
}

//Blockie Functions 

function initializeDash() {
    blockie.state = "recoveringFromDash";
    blockie.speed = dashDistance;
    recoveringFromDash = true;
    allowDashAgain = false;

    var endDashRecovery = setTimeout(function () {
        recoveringFromDash = false;
        blockie.state = "playing";
        removeCurrentTimeout(endDashRecovery);
    }, dashRecoverySeconds * 1000);
    addCurrentTimeout(endDashRecovery);

    //Sets an interval to the length of the dash recovery which counts down the semi-accurate remaining length of the timeout.
    //This is used in drawing the remaining seconds meter to show the player how much more recovery time that they need to wait.
    blockie.remainingDashSeconds = allowDashAgainSeconds;
    var remainingDashSecondsInterval = setInterval(function () {
        blockie.remainingDashSeconds -= 0.004;
    }, 1);
    addCurrentInterval(remainingDashSecondsInterval);

    var resetAllowDashAgain = setTimeout(function () {
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
    var instance = new WaitingTimeout();
    waitingTimeouts.push(instance);

    return new Promise(function (resolve, reject) {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(function () {
            //Removes the instance from its object array once it is "destroyed".
            var instanceIndex = waitingTimeouts.indexOf(instance);
            waitingTimeouts.splice(instanceIndex, 1);

            resolve("resolved");
        }, waitingSeconds * 1000);
    });
};;;;;;;;;

//Instance Helper Functions

function updateAllObjects() {
    allObjects = [waitingTimeouts, passivePoints, activePoints, horizontalLasers, verticalLasers, movingHorizontalLasers, movingVerticalLasers, bombs];
};

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

        var endAnimateBlockieDestructing = setTimeout(function () {
            clearInterval(animateBlockieDestructing);
            removeCurrentTimeout(animateBlockieDestructing);
            removeCurrentTimeout(endAnimateBlockieDestructing);
        }, 1.5 * 1000);
        addCurrentTimeout(endAnimateBlockieDestructing);

        var animateBlockieDestructing = setInterval(function () {
            blockie.sx += blockie.spriteSideLength;
        }, 0.5 * 1000);
        addCurrentTimeout(animateBlockieDestructing);
    };

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPassivePoints() {
    for (var i = 0; i < passivePoints.length; i++) {
        var currentInstance = passivePoints[i];

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
    for (var i = 0; i < activePoints.length; i++) {
        var currentInstance = activePoints[i];

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
    for (var i = 0; i < horizontalLasers.length; i++) {
        var currentInstance = horizontalLasers[i];
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
    for (var i = 0; i < verticalLasers.length; i++) {
        var currentInstance = verticalLasers[i];
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
    for (var i = 0; i < movingHorizontalLasers.length; i++) {
        var currentInstance = movingHorizontalLasers[i];
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
    for (var i = 0; i < movingVerticalLasers.length; i++) {
        var currentInstance = movingVerticalLasers[i];
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
    for (var i = 0; i < bombs.length; i++) {
        var currentInstance = bombs[i];
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

//Input Functions

function initializeKeyInputs() {
    //Adds all currently pressed keys as a keyCode with a pair of true in the keysDown object. .keyCode is used instead of .key so 
    //that capital letters can't cause unwanted movements.
    document.addEventListener("keydown", function (e) {
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
    document.addEventListener("keyup", function (e) {
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

    updateAllObjects();
    for (var i = 0; i < allObjects.length; i++) {
        checkCollisionsWithClass(allObjects[i]);
    };

    for (var _i3 = 0; _i3 < collidingInstances.length; _i3++) {
        if (collidingInstances[_i3].constructor.name === "PassivePoint") {
            //Adds points to the current level's total.
            currentLevelPoints++;

            //Resolves the PassivePoint's Promise and destroys the instance once it is touched.
            var collidingPoint = collidingInstances[_i3];
            collidingPoint.externalResolve();
            clearTimeout(collidingPoint.timeout);
            var instanceIndex = passivePoints.indexOf(collidingPoint);
            passivePoints.splice(instanceIndex, 1);
        } else if (collidingInstances[_i3].constructor.name === "ActivePoint") {
            //Adds points to the current level's total.
            currentLevelPoints++;

            updateAllObjects();
            for (var _i4 = 0; _i4 < allObjects.length; _i4++) {
                resolveInstances(allObjects[_i4]);
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

var blockie = new Player();
levelOne();

initializeKeyInputs();
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
//# sourceMappingURL=blockie.js.map