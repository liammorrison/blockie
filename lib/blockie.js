"use strict";

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
var levelOne = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        initializeLevel(pointTwo + blockieAdjustment, oneHalf + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context.next = 5;
                        return Promise.all([createWall(0, 0, fullScreen, threeEigths), createWall(0, fiveEigths, fullScreen, threeEigths), createActivePoint(pointSeven - 8, oneHalf - 8, 0), createPassivePoint(oneHalf - 8, oneHalf - 8, 0, 10)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context.next = 8;
                        return Promise.all([createWall(0, 0, fullScreen, threeEigths), createWall(0, fiveEigths, oneEigth, threeEigths), createWall(oneFourth, fiveEigths, oneHalf, oneFourth), createWall(sevenEigths, fiveEigths, oneEigth, threeEigths), createPassivePoint(pointTwo - 8, pointEight - 8, 0, 15), createPassivePoint(pointSeven - 8, pointEight - 8, 0, 15), createActivePoint(pointTwo - 8, oneHalf - 8, 4)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context.next = 11;
                        return Promise.all([createWall(0, 0, threeEigths, threeEigths), createWall(0, fiveEigths, threeEigths, threeEigths), createWall(fiveEigths, 0, threeEigths, fullScreen), createActivePoint(oneHalf - 8, sevenEigths - 8, 0), createPassivePoint(oneHalf - 8, oneEigth - 8, 0, 10)]);

                    case 11:

                        cancelAwaitChain = false;

                        console.log("Level 1 completed.");
                        increaseLevel();
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](0);

                        console.log("Level 1 restarted.");

                    case 19:
                        ;

                    case 20:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 16]]);
    }));

    return function levelOne() {
        return _ref.apply(this, arguments);
    };
}();

var levelTwo = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context2.next = 5;
                        return Promise.all([createWall(0, 0, fullScreen, threeFourths), createPassivePoint(pointTwo - 8, sevenEigths - 8, 0, 10), loopFireVerticalLasers(oneHalf - 8, 16, 0, 1, 2), createActivePoint(sevenEigths - 8, sevenEigths - 8, 3)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context2.next = 8;
                        return Promise.all([createActivePoint(oneHalf - 8, sevenEigths - 8, 0), fireBomb(threeFourths, threeFourths, oneFourth, oneFourth, 1, 3)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context2.next = 11;
                        return Promise.all([createWall(0, 0, threeEigths, fullScreen), createWall(fiveEigths, 0, threeEigths, fullScreen), createActivePoint(oneHalf - 8, pointTwo - 8, 0), fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 1, 5)]);

                    case 11:

                        cancelAwaitChain = false;

                        _context2.next = 14;
                        return Promise.all([createWall(0, 0, threeEigths, threeEigths), createWall(fiveEigths, 0, threeEigths, threeEigths), createWall(0, fiveEigths, threeEigths, threeEigths), createWall(fiveEigths, fiveEigths, threeEigths, threeEigths), createActivePoint(oneHalf - 8, pointEight - 8, 0), createPassivePoint(pointOne - 8, oneHalf - 8, 0, 12), createPassivePoint(pointEight - 8, oneHalf - 8, 0, 12), loopFireBombs(threeEigths, fiveEigths, oneFourth, oneFourth, 0, 1, 2)]);

                    case 14:

                        cancelAwaitChain = false;

                        console.log("Level 2 completed.");
                        increaseLevel();
                        _context2.next = 22;
                        break;

                    case 19:
                        _context2.prev = 19;
                        _context2.t0 = _context2["catch"](0);

                        console.log("Level 2 restarted.");

                    case 22:
                        ;

                    case 23:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 19]]);
    }));

    return function levelTwo() {
        return _ref2.apply(this, arguments);
    };
}();

var levelThree = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context3.next = 5;
                        return Promise.all([createWall(0, 0, 14 * 16, fullScreen), createWall(14 * 16, 0, 4 * 16, 14 * 16), createWall(14 * 16, 18 * 16, 4 * 16, 2 * 16), createWall(14 * 16, 24 * 16, 4 * 16, 2 * 16), createWall(14 * 16, 30 * 16, 4 * 16, 2 * 16), createWall(18 * 16, 0, 14 * 16, fullScreen), createActivePoint(oneHalf - 8, oneHalf - 8, 0), createPassivePoint(oneHalf - 8, 22 * 16 - 8, 0, 10)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context3.next = 8;
                        return Promise.all([createWall(0, 0, fullScreen, 2 * 16), createWall(0, 6 * 16, fullScreen, 2 * 16), createWall(0, 12 * 16, fullScreen, 2 * 16), createWall(0, 18 * 16, fullScreen, 14 * 16), createWall(0, 0, 2 * 16, fullScreen), createWall(6 * 16, 0, 2 * 16, fullScreen), createWall(12 * 16, 0, 2 * 16, fullScreen), createWall(18 * 16, 0, 2 * 16, fullScreen), createWall(24 * 16, 0, 2 * 16, fullScreen), createWall(30 * 16, 0, 2 * 16, fullScreen), createPassivePoint(4 * 16 - 8, oneHalf - 8, 0, 16), createPassivePoint(28 * 16 - 8, oneHalf - 8, 0, 16), loopFireBombs(8 * 16, 2 * 16, 4 * 16, 4 * 16, 0, 2, 1), loopFireBombs(20 * 16, 2 * 16, 4 * 16, 4 * 16, 0, 2, 1), loopFireBombs(2 * 16, 8 * 16, 4 * 16, 4 * 16, 0, 2, 1), loopFireBombs(14 * 16, 8 * 16, 4 * 16, 4 * 16, 0, 2, 1), loopFireBombs(26 * 16, 8 * 16, 4 * 16, 4 * 16, 0, 2, 1), loopFireBombs(8 * 16, 14 * 16, 4 * 16, 4 * 16, 0, 2, 1), loopFireBombs(20 * 16, 14 * 16, 4 * 16, 4 * 16, 0, 2, 1), createActivePoint(oneHalf - 8, 4 * 16 - 8, 3)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context3.next = 11;
                        return Promise.all([createWall(0, 0, 14 * 16, fullScreen), createWall(18 * 16, 0, 14 * 16, fullScreen), createActivePoint(oneHalf - 8, pointEight - 8, 0), fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 0, 5)]);

                    case 11:

                        cancelAwaitChain = false;

                        _context3.next = 14;
                        return Promise.all([createActivePoint(oneHalf - 8, pointOne - 8, 0), loopFireMovingHorizontalLasers(0, 32, 2, 0, 1, 4), loopFireMovingHorizontalLasers(0, 32, 2, 2, 1, 4), loopFireMovingHorizontalLasers(0, 32, 2, 4, 1, 4), loopFireMovingHorizontalLasers(0, 32, 2, 6, 1, 4)]);

                    case 14:

                        cancelAwaitChain = false;

                        destroyCountdownTimer();

                        console.log("Level 3 completed.");
                        increaseLevel();
                        _context3.next = 23;
                        break;

                    case 20:
                        _context3.prev = 20;
                        _context3.t0 = _context3["catch"](0);

                        console.log("Level 3 restarted.");

                    case 23:
                        ;

                    case 24:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 20]]);
    }));

    return function levelThree() {
        return _ref3.apply(this, arguments);
    };
}();

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
var restartLevel = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(reason) {
        var i, _i, _i2;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        //Stops all currently-running timeouts so that they stop hurting performance and don't execute after reseting.
                        for (i = 0; i < currentTimeouts.length; i++) {
                            clearTimeout(currentTimeouts[i]);
                        };

                        currentTimeouts.splice(0);

                        //Stops all currently-running timeouts so that they stop hurting performance and don't execute after reseting.
                        for (_i = 0; _i < currentIntervals.length; _i++) {
                            clearInterval(currentIntervals[_i]);
                        };

                        currentIntervals.splice(0);

                        updateAllObjects();
                        for (_i2 = 0; _i2 < allObjects.length; _i2++) {
                            rejectInstances(allObjects[_i2]);
                        };

                        destroyCountdownTimer();

                        //Removes all points collected in the level.
                        currentLevelPoints = 0;

                        //Switches how the game resets based on how it triggered.

                        if (!(reason === "died")) {
                            _context4.next = 19;
                            break;
                        }

                        gameState = "animatingBlockieDestruction";

                        //Animates Blockie's destruction.
                        blockie.state = "destructing";
                        blockie.sx = 0;

                        _context4.next = 17;
                        return displayMessage("Determination is your only asset.");

                    case 17:
                        _context4.next = 30;
                        break;

                    case 19:
                        if (!(reason === "keyPressed")) {
                            _context4.next = 24;
                            break;
                        }

                        blockie.state = "playing";
                        controlLevel();
                        _context4.next = 30;
                        break;

                    case 24:
                        if (!(reason === "countdownTimer")) {
                            _context4.next = 30;
                            break;
                        }

                        gameState = "playingCutscene";
                        _context4.next = 28;
                        return playCutscene(spCountdownDestructionScene);

                    case 28:
                        _context4.next = 30;
                        return displayMessage("You've failed another world.");

                    case 30:
                        ;

                    case 31:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function restartLevel(_x) {
        return _ref4.apply(this, arguments);
    };
}();

var increaseLevel = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        gameState = "finishingLevel";

                        blockie.angleMovingDegrees = -180;

                        //Points are only made permanent once a level is completed.
                        updateLevelPoints(currentLevel);
                        currentLevelPoints = 0;
                        calculateTotalPoints();

                        console.log("total points: " + totalPoints);

                        currentLevel++;

                        //Waits for the PartyHat to descend on to Blockie's head.
                        _context5.next = 9;
                        return new Promise(function (resolve, reject) {
                            var partyHatInstance = new PartyHat();
                            partyHats.push(partyHatInstance);

                            function animateFinishedLevelHat() {
                                partyHatInstance.y += Math.min(2, blockie.y - partyHatInstance.y - partyHatInstance.height);

                                if (partyHatInstance.y + partyHatInstance.height !== blockie.y) {
                                    //Continuously recalls the function until the PartyHat reaches Blockie's head.
                                    window.requestAnimationFrame(animateFinishedLevelHat);
                                } else {
                                    resolve("resolved");
                                };
                            };

                            window.requestAnimationFrame(animateFinishedLevelHat);
                        });

                    case 9:
                        _context5.next = 11;
                        return displayMessage("You haven't escaped yet.");

                    case 11:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function increaseLevel() {
        return _ref5.apply(this, arguments);
    };
}();

//Shows a message and awaits a player input to continue the game.
var displayMessage = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(message) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return new Promise(function (resolve, reject) {
                            var drawGameOverScreen = setTimeout(function () {
                                //Placed here to draw Blockie with a PartyHat during increaseLevel().
                                partyHats.splice(0);

                                //Draws the game over screen.
                                document.getElementById("messageDisplayer").innerHTML = message;
                                gameState = "displayingMessage";
                                resolve("resolved");
                            }, 1000);
                        });

                    case 2:
                        _context6.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Restarts the game once acceptable keys are pressed.
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
                                    //Continuously recalls the function until an acceptable key is pressed.
                                    window.requestAnimationFrame(resumePlaying);
                                };
                            };

                            window.requestAnimationFrame(resumePlaying);
                        });

                    case 4:
                        return _context6.abrupt("return", _context6.sent);

                    case 5:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function displayMessage(_x2) {
        return _ref6.apply(this, arguments);
    };
}();

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
var setWarningTimeouts = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(instanceAffecting) {
        var warningSeconds;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.
                        warningSeconds = 1;
                        _context7.next = 3;
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
                        if (!cancelAwaitChain) {
                            _context7.next = 5;
                            break;
                        }

                        return _context7.abrupt("return");

                    case 5:
                        _context7.next = 7;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                instanceAffecting.visible = true;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        });

                    case 7:
                        if (!cancelAwaitChain) {
                            _context7.next = 9;
                            break;
                        }

                        return _context7.abrupt("return");

                    case 9:
                        _context7.next = 11;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                instanceAffecting.visible = false;

                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        });

                    case 11:
                        if (!cancelAwaitChain) {
                            _context7.next = 13;
                            break;
                        }

                        return _context7.abrupt("return");

                    case 13:
                        _context7.next = 15;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instanceAffecting.externalResolve = resolve;
                            instanceAffecting.externalReject = reject;

                            instanceAffecting.timeout = setTimeout(function () {
                                //Makes the affected instance visible and collidable.
                                instanceAffecting.state = "firing";
                                instanceAffecting.visible = true;
                                resolve("resolved");
                            }, warningSeconds * 0.25 * 1000);
                        });

                    case 15:
                        return _context7.abrupt("return", _context7.sent);

                    case 16:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function setWarningTimeouts(_x3) {
        return _ref7.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createPassivePoint = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(x, y, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context8.next = 4;
                            break;
                        }

                        return _context8.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new PassivePoint(x, y, firingSeconds);

                        passivePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context8.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context8.next = 10;
                            break;
                        }

                        return _context8.abrupt("return");

                    case 10:
                        _context8.next = 12;
                        return new Promise(function (resolve, reject) {
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

                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = passivePoints.indexOf(instance);
                                passivePoints.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context8.abrupt("return", _context8.sent);

                    case 13:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function createPassivePoint(_x4, _x5, _x6, _x7) {
        return _ref8.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createActivePoint = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(x, y, waitingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context9.next = 4;
                            break;
                        }

                        return _context9.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new ActivePoint(x, y);

                        activePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context9.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context9.next = 10;
                            break;
                        }

                        return _context9.abrupt("return");

                    case 10:
                        _context9.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 12:
                        return _context9.abrupt("return", _context9.sent);

                    case 13:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function createActivePoint(_x8, _x9, _x10) {
        return _ref9.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireHorizontalLasers = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(y, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (cancelAwaitChain) {
                            _context10.next = 7;
                            break;
                        }

                        _context10.next = 5;
                        return fireHorizontalLaser(y, height, waitingSeconds, firingSeconds);

                    case 5:
                        _context10.next = 2;
                        break;

                    case 7:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context10.abrupt("return");

                    case 9:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function loopFireHorizontalLasers(_x11, _x12, _x13, _x14, _x15) {
        return _ref10.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireHorizontalLaser = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(y, height, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context11.next = 4;
                            break;
                        }

                        return _context11.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new HorizontalLaser(y, height);

                        horizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context11.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context11.next = 10;
                            break;
                        }

                        return _context11.abrupt("return");

                    case 10:
                        _context11.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = horizontalLasers.indexOf(instance);
                                horizontalLasers.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context11.abrupt("return", _context11.sent);

                    case 13:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));

    return function fireHorizontalLaser(_x16, _x17, _x18, _x19) {
        return _ref11.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireVerticalLasers = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(x, width, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (cancelAwaitChain) {
                            _context12.next = 7;
                            break;
                        }

                        _context12.next = 5;
                        return fireVerticalLaser(x, width, waitingSeconds, firingSeconds);

                    case 5:
                        _context12.next = 2;
                        break;

                    case 7:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context12.abrupt("return");

                    case 9:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));

    return function loopFireVerticalLasers(_x20, _x21, _x22, _x23, _x24) {
        return _ref12.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireVerticalLaser = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(x, width, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        _context13.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context13.next = 4;
                            break;
                        }

                        return _context13.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new VerticalLaser(x, width);

                        verticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context13.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context13.next = 10;
                            break;
                        }

                        return _context13.abrupt("return");

                    case 10:
                        _context13.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = verticalLasers.indexOf(instance);
                                verticalLasers.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context13.abrupt("return", _context13.sent);

                    case 13:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));

    return function fireVerticalLaser(_x25, _x26, _x27, _x28) {
        return _ref13.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingHorizontalLasers = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(y, height, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        _context14.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (cancelAwaitChain) {
                            _context14.next = 7;
                            break;
                        }

                        _context14.next = 5;
                        return fireMovingHorizontalLaser(y, height, speed, waitingSeconds, firingSeconds);

                    case 5:
                        _context14.next = 2;
                        break;

                    case 7:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context14.abrupt("return");

                    case 9:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function loopFireMovingHorizontalLasers(_x29, _x30, _x31, _x32, _x33, _x34) {
        return _ref14.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingHorizontalLaser = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(y, height, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context15.next = 4;
                            break;
                        }

                        return _context15.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingHorizontalLaser(y, height, speed);

                        movingHorizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context15.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context15.next = 10;
                            break;
                        }

                        return _context15.abrupt("return");

                    case 10:
                        _context15.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = movingHorizontalLasers.indexOf(instance);
                                movingHorizontalLasers.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context15.abrupt("return", _context15.sent);

                    case 13:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));

    return function fireMovingHorizontalLaser(_x35, _x36, _x37, _x38, _x39) {
        return _ref15.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingVerticalLasers = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(x, width, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (cancelAwaitChain) {
                            _context16.next = 7;
                            break;
                        }

                        _context16.next = 5;
                        return fireMovingVerticalLaser(x, width, speed, waitingSeconds, firingSeconds);

                    case 5:
                        _context16.next = 2;
                        break;

                    case 7:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context16.abrupt("return");

                    case 9:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this);
    }));

    return function loopFireMovingVerticalLasers(_x40, _x41, _x42, _x43, _x44, _x45) {
        return _ref16.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingVerticalLaser = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(x, width, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        _context17.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context17.next = 4;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingVerticalLaser(x, width, speed);

                        movingVerticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context17.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context17.next = 10;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 10:
                        _context17.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = movingVerticalLasers.indexOf(instance);
                                movingVerticalLasers.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context17.abrupt("return", _context17.sent);

                    case 13:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));

    return function fireMovingVerticalLaser(_x46, _x47, _x48, _x49, _x50) {
        return _ref17.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireBombs = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(x, y, width, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        _context18.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (cancelAwaitChain) {
                            _context18.next = 7;
                            break;
                        }

                        _context18.next = 5;
                        return fireBomb(x, y, width, height, waitingSeconds, firingSeconds);

                    case 5:
                        _context18.next = 2;
                        break;

                    case 7:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context18.abrupt("return");

                    case 9:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));

    return function loopFireBombs(_x51, _x52, _x53, _x54, _x55, _x56, _x57) {
        return _ref18.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireBomb = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(x, y, width, height, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        _context19.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context19.next = 4;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new Bomb(x, y, width, height);

                        bombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context19.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context19.next = 10;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 10:
                        _context19.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = bombs.indexOf(instance);
                                bombs.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context19.abrupt("return", _context19.sent);

                    case 13:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, this);
    }));

    return function fireBomb(_x58, _x59, _x60, _x61, _x62, _x63) {
        return _ref19.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createWall = function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(x, y, width, height) {
        var instance;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        //Creates an instance and sets all of its initial properties.
                        instance = new Wall(x, y, width, height);

                        walls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context20.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 4:
                        return _context20.abrupt("return", _context20.sent);

                    case 5:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));

    return function createWall(_x64, _x65, _x66, _x67) {
        return _ref20.apply(this, arguments);
    };
}();

//Cutscene Functions

//Waits for a small cutscene to finish.
var playCutscene = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(scene) {
        var secondsPerFrame, cutsceneSideLength, cutscenesx, lastFramesx, cutscene;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        secondsPerFrame = 0.15;
                        cutsceneSideLength = 128;
                        cutscenesx = 0;
                        lastFramesx = scene.naturalWidth - cutsceneSideLength;

                        //Each time the frame changes, the next sprite in the sprite map is shown.

                        cutscene = setInterval(function () {
                            cutscenesx += cutsceneSideLength;
                        }, secondsPerFrame * 1000);
                        return _context21.abrupt("return", new Promise(function (resolve, reject) {
                            function drawCutscene() {
                                //Draws a border around the small cutscene in the center of the canvas.
                                context.strokeStyle = "#FFFFFF";
                                context.drawImage(scene, cutscenesx, 0, cutsceneSideLength, cutsceneSideLength, 192, 192, cutsceneSideLength, cutsceneSideLength);
                                context.strokeRect(192, 192, cutsceneSideLength, cutsceneSideLength);

                                //Resolves the Promise if the cutscene is over.
                                if (cutscenesx > lastFramesx) {
                                    resolve("resolved");
                                } else {
                                    //Continuously recalls the function until the animation is completed.
                                    window.requestAnimationFrame(drawCutscene);
                                };
                            };

                            window.requestAnimationFrame(drawCutscene);
                        }));

                    case 6:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));

    return function playCutscene(_x68) {
        return _ref21.apply(this, arguments);
    };
}();

//Micellaneous Functions

//Creates a timer that resets the level if the counter reaches 0.


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Game Setup

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.lineWidth = 4;

//Variables

var gameState = "playing";

var currentLevel = 1;

var currentLevelPoints = 0;
var totalPoints = 0;

var xInput = 0;
var yInput = 0;

var preventingMovement = false;

var arrowLeftAlreadyPressed = false;
var arrowUpAlreadyPressed = false;
var arrowRightAlreadyPressed = false;
var arrowDownAlreadyPressed = false;
var shiftAlreadyPressed = false;
var spaceAlreadyPressed = false;
var pAlreadyPressed = false;

var recoveringFromDash = false;
var allowDashAgain = true;
var dashDistance = 96;
var dashRecoverySeconds = 0.3;
var allowDashAgainSeconds = 0.9;

//Used to stop async/await functions by preventing another await to run. Used when Blockie touches activePoints and the current
//instances needs to stop running, yet everything cannot be rejected (because that would stop the level too).
var cancelAwaitChain = false;

//Sprite maps. 

//These are used when drawing to easily reference sprites. They are large sprite maps to avoid loading many individual sprite 
//files (which would hurt performance).

var spBlockiePlaying = document.createElement("img");
spBlockiePlaying.src = "../images/spBlockiePlaying.png";

var spBlockieDestructing = document.createElement("img");
spBlockieDestructing.src = "../images/spBlockieDestructing.png";

var spBlockieRecoveringFromDash = document.createElement("img");
spBlockieRecoveringFromDash.src = "../images/spBlockieRecoveringFromDash.png";

var spCountdownDestructionScene = document.createElement("img");
spCountdownDestructionScene.src = "../images/spCountdownDestructionScene.png";

var gameScale = 1;

var countdown = 0;

//Arrays

var keysDown = [];

var waitingTimeouts = [];
var passivePoints = [];
var activePoints = [];
var horizontalLasers = [];
var verticalLasers = [];
var movingHorizontalLasers = [];
var movingVerticalLasers = [];
var bombs = [];
var walls = [];
var partyHats = [];

//allObjects is used to make destroying all instances (reject or resolve) possible with a for loop.
var allObjects = [];

var currentTimeouts = [];
var currentIntervals = [];

var collidingInstances = [];

var levelPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    this.targetXLocation = this.x;
    this.targetYLocation = this.y;

    this.state = "playing";

    this.sprite = spBlockiePlaying;
    this.sx = 0;

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

var Wall = function Wall(x, y, width, height) {
    _classCallCheck(this, Wall);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
    this.externalReject;
    this.timeout;
};

var PartyHat = function PartyHat() {
    _classCallCheck(this, PartyHat);

    this.x = blockie.x + 8;
    this.y = -20;
    this.width = 16;
    this.height = 20;
};

;

var blockie = new Player();

//Functions

//Level-Handling Functions

//Since these are frequently used numbers, they are variables for simplicity. The canvas' width and height are the same, so they 
//work with both axes.
var oneEigth = 4 * 16;
var oneFourth = 8 * 16;
var threeEigths = 12 * 16;
var oneHalf = canvas.width / 2;
var fiveEigths = 20 * 16;
var threeFourths = 24 * 16;
var sevenEigths = 28 * 16;
var fullScreen = 32 * 16;

var pointOne = 2 * 16;
var pointTwo = 6 * 16;
var pointThree = 10 * 16;
var pointFour = 14 * 16;
var pointFive = 18 * 16;
var pointSix = 22 * 16;
var pointSeven = 26 * 16;
var pointEight = 30 * 16;

var blockieAdjustment = -blockie.width / 2;;

;

;

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    gameState = "playing";

    blockie.x = blockieX;
    blockie.y = blockieY;

    recoveringFromDash = false;
    allowDashAgain = true;
};;

;

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
    };
};

//Level-Handling Helper Functions

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
};;

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
    var instance = new WaitingTimeout();
    waitingTimeouts.push(instance);

    return new Promise(function (resolve, reject) {
        //Links the instance's deactivation functions to itself to allow outside callings.
        instance.externalResolve = resolve;
        instance.externalReject = reject;

        instance.timeout = setTimeout(function () {
            //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
            var instanceIndex = waitingTimeouts.indexOf(instance);
            waitingTimeouts.splice(instanceIndex, 1);
            resolve("resolved");
        }, waitingSeconds * 1000);
    });
};;;;;;;;;;;;;;;

//Instance Helper Functions

function updateAllObjects() {
    allObjects = [waitingTimeouts, passivePoints, activePoints, horizontalLasers, verticalLasers, movingHorizontalLasers, movingVerticalLasers, bombs, walls];
};

function updateAllInteractiveObjects() {
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

        var endAnimateBlockieDestructing = setTimeout(function () {
            clearInterval(animateBlockieDestructing);
            removeCurrentTimeout(animateBlockieDestructing);
            removeCurrentTimeout(endAnimateBlockieDestructing);
        }, 1.5 * 1000);
        addCurrentTimeout(endAnimateBlockieDestructing);

        var animateBlockieDestructing = setInterval(function () {
            blockie.sx += blockie.width;
        }, 0.5 * 1000);
        addCurrentTimeout(animateBlockieDestructing);
    };
};

function drawBlockie() {
    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.width, blockie.height, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPassivePoints() {
    for (var i = 0; i < passivePoints.length; i++) {
        var currentInstance = passivePoints[i];

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
    for (var i = 0; i < activePoints.length; i++) {
        var currentInstance = activePoints[i];

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
                context.strokeRect(currentInstance.width - 32, currentInstance.y, 16, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
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
                context.strokeRect(currentInstance.x, currentInstance.height - 32, currentInstance.width, 16);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = "#FF51EF";
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
                context.fillStyle = "#FF51EF";
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
                context.fillStyle = "#FF51EF";
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
                context.fillStyle = "#FF51EF";
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawWalls() {
    for (var i = 0; i < walls.length; i++) {
        var currentInstance = walls[i];
        context.fillStyle = "#741EFF";
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawPartyHats() {
    for (var i = 0; i < partyHats.length; i++) {
        var currentInstance = partyHats[i];

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
    for (var i = 0; i < classArray.length; i++) {
        checkInstancesColliding(blockie, classArray[i]);
    };
};

function checkTestCollisionsWithClass(instanceOneX, instanceOneY, classArray) {
    preventingMovement = false;

    for (var i = 0; i < classArray.length; i++) {
        checkTestInstancesColliding(blockie, instanceOneX, instanceOneY, classArray[i]);
    };
};

//Determines if two instances are "colliding". They cannot be colliding if one is in the warning state.
function checkInstancesColliding(instanceOne, instanceTwo) {
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
        collidingInstances.push(instanceTwo);
    };
};

//Determines if two instances are "colliding" (with Blockie's theoretical test locations). They cannot be colliding if one is in 
//the warning state.
function checkTestInstancesColliding(instanceOne, instanceOneX, instanceOneY, instanceTwo) {
    var xColliding = false;
    var yColliding = false;

    if (instanceTwo.x <= instanceOneX && instanceOneX <= instanceTwo.x + instanceTwo.width) {
        xColliding = true;
    } else if (instanceOneX <= instanceTwo.x && instanceTwo.x <= instanceOneX + instanceOne.width) {
        xColliding = true;
    };

    if (instanceTwo.y <= instanceOneY && instanceOneY <= instanceTwo.y + instanceTwo.height) {
        yColliding = true;
    } else if (instanceOneY <= instanceTwo.y && instanceTwo.y <= instanceOneY + instanceOne.height) {
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
    var gameContainer = document.getElementById("gameContainer");
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
    for (var i = 0; i < levelPoints.length; i++) {
        totalPoints += levelPoints[i];
    };
};function createCountdownTimer(totalSeconds) {
    var seconds = totalSeconds;

    //Sets the timer container to be visible.
    var countdownTimerContainer = document.getElementById("countdownTimerContainer");
    countdownTimerContainer.style.visibility = "visible";

    countdown = setInterval(function () {
        //Each interval the amount of seconds decreases and the displayed numbers are calculated.
        seconds--;
        var currentMinutes = Math.floor(seconds / 60);
        var currentSeconds = seconds % 60;

        //The remaining time is displayed.
        var countdownTimer = document.getElementById("countdownTimer");
        countdownTimer.innerHTML = currentMinutes + ":" + currentSeconds;

        //Restarts the level if the timer reaches 0.
        if (seconds <= 0) {
            destroyCountdownTimer();
            restartLevel("countdownTimer");
        };
    }, 1000);
};

//Sets the countdownTimer to be invisible and clears its interval.
function destroyCountdownTimer() {
    var countdownTimerContainer = document.getElementById("countdownTimerContainer");
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

            //Updates Blockie's location if it is not off of the canvas. If it is off of the canvas, Blockie will move towards
            //the last available space to avoid a gap.

            if (blockie.targetXLocation <= 0) {
                blockie.targetXLocation = 0;
            } else if (blockie.targetXLocation + blockie.width >= canvas.width) {
                blockie.targetXLocation = canvas.width - blockie.width;
            };

            if (blockie.targetYLocation <= 0) {
                blockie.targetYLocation = 0;
            } else if (blockie.targetYLocation + blockie.height >= canvas.height) {
                blockie.targetYLocation = canvas.height - blockie.height;
            };

            //Updates Blockie's location if he's touching a wall to the nearest open location.

            checkTestCollisionsWithClass(blockie.targetXLocation, blockie.targetYLocation, walls);

            //Blockie's movement will be prevented on some axes if he is touching a wall at his target location.
            if (preventingMovement) {
                blockie.targetXLocation = blockie.x;
                blockie.targetYLocation = blockie.y;

                var xChange = 0;
                var yChange = 0;
                var xTestingDistance = 0;
                var yTestingDistance = 0;

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

            blockie.x = blockie.targetXLocation;
            blockie.y = blockie.targetYLocation;
        };

        //Other Instances' Movements

        moveMovingHorizontalLasers();
        moveMovingVerticalLasers();

        //Collision Handling

        collidingInstances.splice(0);

        updateAllInteractiveObjects();
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

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (var _i4 = 0; _i4 < currentTimeouts.length; _i4++) {
                    clearTimeout(currentTimeouts[_i4]);
                };

                currentTimeouts.splice(0);

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (var _i5 = 0; _i5 < currentIntervals.length; _i5++) {
                    clearInterval(currentIntervals[_i5]);
                };

                currentIntervals.splice(0);

                resetBlockieState();

                cancelAwaitChain = true;

                updateAllObjects();
                for (var _i6 = 0; _i6 < allObjects.length; _i6++) {
                    resolveInstances(allObjects[_i6]);
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
    document.getElementById("currentPoints").innerHTML = "Points: " + currentLevelPoints + "|7";

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
        drawActivePoints();
        drawHorizontalLasers();
        drawVerticalLasers();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawBombs();
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
//# sourceMappingURL=blockie.js.map