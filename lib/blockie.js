"use strict";

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
var levelOne = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        initializeLevel(threeSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context.next = 5;
                        return Promise.all([createWall(0, 0, fullScreen, threeEigths), createWall(0, fiveEigths, fullScreen, threeEigths), createActivePoint(thirteenSixteenths - 8, oneHalf - 8, 0), createPassivePoint(oneHalf - 8, oneHalf - 8, 0, 10)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context.next = 8;
                        return Promise.all([createWall(0, 0, fullScreen, threeEigths), createWall(0, fiveEigths, oneEigth, threeEigths), createWall(oneFourth, fiveEigths, oneHalf, oneFourth), createWall(sevenEigths, fiveEigths, oneEigth, threeEigths), createPassivePoint(threeSixteenths - 8, fifteenSixteenths - 8, 0, 15), createPassivePoint(thirteenSixteenths - 8, fifteenSixteenths - 8, 0, 15), createActivePoint(threeSixteenths - 8, oneHalf - 8, 4)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context.next = 11;
                        return Promise.all([createWall(0, 0, threeEigths, threeEigths), createWall(0, fiveEigths, threeEigths, threeEigths), createWall(fiveEigths, 0, threeEigths, fullScreen), createActivePoint(oneHalf - 8, sevenEigths - 8, 0), createPassivePoint(oneHalf - 8, oneEigth - 8, 0, 10)]);

                    case 11:

                        cancelAwaitChain = false;

                        increaseLevel();
                        _context.next = 17;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](0);

                    case 17:
                        ;

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 15]]);
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
                        return Promise.all([createWall(0, 0, fullScreen, threeFourths), createPassivePoint(threeSixteenths - 8, sevenEigths - 8, 0, 10), loopFireBombs(oneHalf - 16, threeFourths, 32, oneFourth, 2.2, 1, 1), createActivePoint(sevenEigths - 8, sevenEigths - 8, 2)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context2.next = 8;
                        return Promise.all([createActivePoint(oneHalf - 8, sevenEigths - 8, 0), fireBomb(threeFourths, threeFourths, oneFourth, oneFourth, 1, 3)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context2.next = 11;
                        return Promise.all([createWall(0, 0, threeEigths, fullScreen), createWall(fiveEigths, 0, threeEigths, fullScreen), createActivePoint(oneHalf - 8, threeSixteenths - 8, 0), fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 1, 5)]);

                    case 11:

                        cancelAwaitChain = false;

                        _context2.next = 14;
                        return Promise.all([createWall(0, 0, threeEigths, threeEigths), createWall(fiveEigths, 0, threeEigths, threeEigths), createWall(0, fiveEigths, threeEigths, threeEigths), createWall(fiveEigths, fiveEigths, threeEigths, threeEigths), createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0), createPassivePoint(oneSixteenth - 8, oneHalf - 8, 0, 12), createPassivePoint(fifteenSixteenths - 8, oneHalf - 8, 0, 12), loopFireBombs(threeEigths, fiveEigths, oneFourth, oneFourth, 0, 1, 2)]);

                    case 14:

                        cancelAwaitChain = false;

                        increaseLevel();
                        _context2.next = 20;
                        break;

                    case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2["catch"](0);

                    case 20:
                        ;

                    case 21:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 18]]);
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
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function levelThree() {
        return _ref3.apply(this, arguments);
    };
}();

var levelFour = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function levelFour() {
        return _ref4.apply(this, arguments);
    };
}();

var levelFive = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function levelFive() {
        return _ref5.apply(this, arguments);
    };
}();

var levelSix = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function levelSix() {
        return _ref6.apply(this, arguments);
    };
}();

var levelSeven = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function levelSeven() {
        return _ref7.apply(this, arguments);
    };
}();

var levelEight = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function levelEight() {
        return _ref8.apply(this, arguments);
    };
}();

var levelNine = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function levelNine() {
        return _ref9.apply(this, arguments);
    };
}();

var levelTen = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function levelTen() {
        return _ref10.apply(this, arguments);
    };
}();

var levelEleven = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));

    return function levelEleven() {
        return _ref11.apply(this, arguments);
    };
}();

var levelTwelve = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));

    return function levelTwelve() {
        return _ref12.apply(this, arguments);
    };
}();

var levelEnd = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        try {} catch (error) {};

                    case 2:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));

    return function levelEnd() {
        return _ref13.apply(this, arguments);
    };
}();

//Resets the initial values for the beginning of every level.


//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
var restartLevel = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(reason) {
        var i, _i, _i2;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
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

                        updateAllInstances();
                        for (_i2 = 0; _i2 < allInstances.length; _i2++) {
                            rejectInstances(allInstances[_i2]);
                        };

                        destroyCountdownTimer();

                        //Removes all points collected in the level.
                        currentLevelPoints = 0;

                        //Switches how the game resets based on how it triggered.

                        if (!(reason === "died")) {
                            _context14.next = 19;
                            break;
                        }

                        gameState = "animatingBlockieDestruction";

                        //Animates Blockie's destruction.
                        blockie.state = "destructing";
                        blockie.sx = 0;

                        _context14.next = 17;
                        return displayMessage("Determination is your only asset.", "restartLevel");

                    case 17:
                        _context14.next = 30;
                        break;

                    case 19:
                        if (!(reason === "keyPressed")) {
                            _context14.next = 24;
                            break;
                        }

                        resetBlockieState();
                        callLevel(currentLevel);
                        _context14.next = 30;
                        break;

                    case 24:
                        if (!(reason === "countdownTimer")) {
                            _context14.next = 30;
                            break;
                        }

                        gameState = "playingCutscene";
                        _context14.next = 28;
                        return playCutscene(spCountdownDestructionScene, 0.17);

                    case 28:
                        _context14.next = 30;
                        return displayMessage("You've failed another world.", "restartLevel");

                    case 30:
                        ;

                    case 31:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function restartLevel(_x) {
        return _ref14.apply(this, arguments);
    };
}();

var increaseLevel = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        gameState = "finishingLevel";

                        blockie.angleMovingDegrees = -180;

                        //Points are only made permanent once a level is completed.
                        updateLevelPoints(currentLevel);
                        currentLevelPoints = 0;
                        calculateTotalPoints();

                        currentLevel++;

                        //Waits for the PartyHat to descend on to Blockie's head.
                        _context15.next = 8;
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

                    case 8:
                        _context15.next = 10;
                        return displayMessage("You haven't escaped yet.", "enterLevelMenu");

                    case 10:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));

    return function increaseLevel() {
        return _ref15.apply(this, arguments);
    };
}();

//Shows a message and awaits a player input to continue the game.
var displayMessage = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(message, endAction) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.next = 2;
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
                        _context16.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Restarts the game once acceptable keys are pressed.
                            function resumePlaying() {
                                if (keysDown[16] || keysDown[32]) {
                                    document.getElementById("messageDisplayer").innerHTML = "";

                                    switch (endAction) {
                                        case "restartLevel":
                                            gameState = "playing";
                                            resetBlockieState();
                                            callLevel(currentLevel);
                                            break;
                                        case "enterLevelMenu":
                                            initializeLevelMenu();
                                            break;
                                        case "continueLevel":
                                            //Does nothing because the levels automatically progress after displayMessage() has resolved.
                                            break;
                                    };

                                    resolve("resolved");
                                } else {
                                    //Continuously recalls the function until an acceptable key is pressed.
                                    window.requestAnimationFrame(resumePlaying);
                                };
                            };

                            window.requestAnimationFrame(resumePlaying);
                        });

                    case 4:
                        return _context16.abrupt("return", _context16.sent);

                    case 5:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this);
    }));

    return function displayMessage(_x2, _x3) {
        return _ref16.apply(this, arguments);
    };
}();

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
var setWarningTimeouts = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(instanceAffecting) {
        var warningSeconds;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.
                        warningSeconds = 1;
                        _context17.next = 3;
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
                            _context17.next = 5;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 5:
                        _context17.next = 7;
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
                            _context17.next = 9;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 9:
                        _context17.next = 11;
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
                            _context17.next = 13;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 13:
                        _context17.next = 15;
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
                        return _context17.abrupt("return", _context17.sent);

                    case 16:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));

    return function setWarningTimeouts(_x4) {
        return _ref17.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createPassivePoint = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(x, y, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        _context18.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context18.next = 4;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new PassivePoint(x, y, firingSeconds);

                        passivePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context18.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context18.next = 10;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 10:
                        _context18.next = 12;
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
                        return _context18.abrupt("return", _context18.sent);

                    case 13:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));

    return function createPassivePoint(_x5, _x6, _x7, _x8) {
        return _ref18.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingPassivePoint = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(x, y, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
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
                        instance = new MovingPassivePoint(x, y, xSpeed, ySpeed, firingSeconds);

                        movingPassivePoints.push(instance);

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
                                var instanceIndex = movingPassivePoints.indexOf(instance);
                                movingPassivePoints.splice(instanceIndex, 1);
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

    return function fireMovingPassivePoint(_x9, _x10, _x11, _x12, _x13, _x14) {
        return _ref19.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createActivePoint = function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(x, y, waitingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        _context20.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context20.next = 4;
                            break;
                        }

                        return _context20.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new ActivePoint(x, y);

                        activePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context20.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context20.next = 10;
                            break;
                        }

                        return _context20.abrupt("return");

                    case 10:
                        _context20.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 12:
                        return _context20.abrupt("return", _context20.sent);

                    case 13:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));

    return function createActivePoint(_x15, _x16, _x17) {
        return _ref20.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingActivePoint = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(x, y, xSpeed, ySpeed, waitingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        _context21.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context21.next = 4;
                            break;
                        }

                        return _context21.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingActivePoint(x, y, xSpeed, ySpeed);

                        movingActivePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context21.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context21.next = 10;
                            break;
                        }

                        return _context21.abrupt("return");

                    case 10:
                        _context21.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 12:
                        return _context21.abrupt("return", _context21.sent);

                    case 13:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));

    return function fireMovingActivePoint(_x18, _x19, _x20, _x21, _x22) {
        return _ref21.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingHorizontalLasers = function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(y, height, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        _context22.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context22.next = 4;
                        return fireMovingHorizontalLaser(y, height, speed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context22.next = 9;
                            break;
                        }

                        _context22.next = 7;
                        return fireMovingHorizontalLaser(y, height, speed, waitingSeconds, firingSeconds);

                    case 7:
                        _context22.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context22.abrupt("return");

                    case 11:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, this);
    }));

    return function loopFireMovingHorizontalLasers(_x23, _x24, _x25, _x26, _x27, _x28) {
        return _ref22.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingHorizontalLaser = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(y, height, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        _context23.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context23.next = 4;
                            break;
                        }

                        return _context23.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingHorizontalLaser(y, height, speed);

                        movingHorizontalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context23.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context23.next = 10;
                            break;
                        }

                        return _context23.abrupt("return");

                    case 10:
                        _context23.next = 12;
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
                        return _context23.abrupt("return", _context23.sent);

                    case 13:
                    case "end":
                        return _context23.stop();
                }
            }
        }, _callee23, this);
    }));

    return function fireMovingHorizontalLaser(_x29, _x30, _x31, _x32, _x33) {
        return _ref23.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingVerticalLasers = function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(x, width, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        _context24.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context24.next = 4;
                        return fireMovingVerticalLaser(x, width, speed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context24.next = 9;
                            break;
                        }

                        _context24.next = 7;
                        return fireMovingVerticalLaser(x, width, speed, waitingSeconds, firingSeconds);

                    case 7:
                        _context24.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context24.abrupt("return");

                    case 11:
                    case "end":
                        return _context24.stop();
                }
            }
        }, _callee24, this);
    }));

    return function loopFireMovingVerticalLasers(_x34, _x35, _x36, _x37, _x38, _x39) {
        return _ref24.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingVerticalLaser = function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(x, width, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        _context25.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context25.next = 4;
                            break;
                        }

                        return _context25.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingVerticalLaser(x, width, speed);

                        movingVerticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context25.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context25.next = 10;
                            break;
                        }

                        return _context25.abrupt("return");

                    case 10:
                        _context25.next = 12;
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
                        return _context25.abrupt("return", _context25.sent);

                    case 13:
                    case "end":
                        return _context25.stop();
                }
            }
        }, _callee25, this);
    }));

    return function fireMovingVerticalLaser(_x40, _x41, _x42, _x43, _x44) {
        return _ref25.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireBombs = function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(x, y, width, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        _context26.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context26.next = 4;
                        return fireBomb(x, y, width, height, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context26.next = 9;
                            break;
                        }

                        _context26.next = 7;
                        return fireBomb(x, y, width, height, waitingSeconds, firingSeconds);

                    case 7:
                        _context26.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context26.abrupt("return");

                    case 11:
                    case "end":
                        return _context26.stop();
                }
            }
        }, _callee26, this);
    }));

    return function loopFireBombs(_x45, _x46, _x47, _x48, _x49, _x50, _x51) {
        return _ref26.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireBomb = function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(x, y, width, height, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        _context27.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context27.next = 4;
                            break;
                        }

                        return _context27.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new Bomb(x, y, width, height);

                        bombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context27.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context27.next = 10;
                            break;
                        }

                        return _context27.abrupt("return");

                    case 10:
                        _context27.next = 12;
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
                        return _context27.abrupt("return", _context27.sent);

                    case 13:
                    case "end":
                        return _context27.stop();
                }
            }
        }, _callee27, this);
    }));

    return function fireBomb(_x52, _x53, _x54, _x55, _x56, _x57) {
        return _ref27.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingBombs = function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        _context28.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context28.next = 4;
                        return fireMovingBomb(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context28.next = 9;
                            break;
                        }

                        _context28.next = 7;
                        return fireMovingBomb(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);

                    case 7:
                        _context28.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context28.abrupt("return");

                    case 11:
                    case "end":
                        return _context28.stop();
                }
            }
        }, _callee28, this);
    }));

    return function loopFireMovingBombs(_x58, _x59, _x60, _x61, _x62, _x63, _x64, _x65, _x66) {
        return _ref28.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingBomb = function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        _context29.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context29.next = 4;
                            break;
                        }

                        return _context29.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);

                        movingBombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context29.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context29.next = 10;
                            break;
                        }

                        return _context29.abrupt("return");

                    case 10:
                        _context29.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = movingBombs.indexOf(instance);
                                movingBombs.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 12:
                        return _context29.abrupt("return", _context29.sent);

                    case 13:
                    case "end":
                        return _context29.stop();
                }
            }
        }, _callee29, this);
    }));

    return function fireMovingBomb(_x67, _x68, _x69, _x70, _x71, _x72, _x73, _x74) {
        return _ref29.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireContinuallyMovingBomb = function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
                switch (_context30.prev = _context30.next) {
                    case 0:
                        _context30.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context30.next = 4;
                            break;
                        }

                        return _context30.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);

                        movingBombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context30.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context30.next = 10;
                            break;
                        }

                        return _context30.abrupt("return");

                    case 10:
                        _context30.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            //Continually switches the sign of the wall's speed over each interval of the set parameter of time.
                            function directionChangeTimeout() {
                                instance.timeout = setTimeout(function () {
                                    directionChangeTimeout();

                                    //Makes the wall switch directions.
                                    instance.xSpeed *= -1;
                                    instance.ySpeed *= -1;
                                }, directionChangeSeconds * 1000);
                            };

                            directionChangeTimeout();
                        });

                    case 12:
                        return _context30.abrupt("return", _context30.sent);

                    case 13:
                    case "end":
                        return _context30.stop();
                }
            }
        }, _callee30, this);
    }));

    return function fireContinuallyMovingBomb(_x75, _x76, _x77, _x78, _x79, _x80, _x81, _x82) {
        return _ref30.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createWall = function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(x, y, width, height) {
        var instance;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        //Creates an instance and sets all of its initial properties.
                        instance = new Wall(x, y, width, height);

                        walls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context31.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 4:
                        return _context31.abrupt("return", _context31.sent);

                    case 5:
                    case "end":
                        return _context31.stop();
                }
            }
        }, _callee31, this);
    }));

    return function createWall(_x83, _x84, _x85, _x86) {
        return _ref31.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingWalls = function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        _context32.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context32.next = 4;
                        return fireMovingWall(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context32.next = 9;
                            break;
                        }

                        _context32.next = 7;
                        return fireMovingWall(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);

                    case 7:
                        _context32.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context32.abrupt("return");

                    case 11:
                    case "end":
                        return _context32.stop();
                }
            }
        }, _callee32, this);
    }));

    return function loopFireMovingWalls(_x87, _x88, _x89, _x90, _x91, _x92, _x93, _x94, _x95) {
        return _ref32.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingWall = function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        _context33.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context33.next = 4;
                            break;
                        }

                        return _context33.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);

                        movingWalls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context33.next = 8;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = movingWalls.indexOf(instance);
                                movingWalls.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
                        });

                    case 8:
                        return _context33.abrupt("return", _context33.sent);

                    case 9:
                    case "end":
                        return _context33.stop();
                }
            }
        }, _callee33, this);
    }));

    return function fireMovingWall(_x96, _x97, _x98, _x99, _x100, _x101, _x102, _x103) {
        return _ref33.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireContinuallyMovingWall = function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
            while (1) {
                switch (_context34.prev = _context34.next) {
                    case 0:
                        _context34.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context34.next = 4;
                            break;
                        }

                        return _context34.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);

                        movingWalls.push(instance);

                        //Creates a timeout for the instance's direction changing and links its deactivation functions.
                        _context34.next = 8;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            //Continually switches the sign of the wall's speed over each interval of the set parameter of time.
                            function directionChangeTimeout() {
                                instance.timeout = setTimeout(function () {
                                    directionChangeTimeout();

                                    //Makes the wall switch directions.
                                    instance.xSpeed *= -1;
                                    instance.ySpeed *= -1;
                                }, directionChangeSeconds * 1000);
                            };

                            directionChangeTimeout();
                        });

                    case 8:
                        return _context34.abrupt("return", _context34.sent);

                    case 9:
                    case "end":
                        return _context34.stop();
                }
            }
        }, _callee34, this);
    }));

    return function fireContinuallyMovingWall(_x104, _x105, _x106, _x107, _x108, _x109, _x110, _x111) {
        return _ref34.apply(this, arguments);
    };
}();

//Cutscene Functions

//Waits for a small cutscene to finish.
var playCutscene = function () {
    var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(scene, secondsPerFrame) {
        var cutsceneSideLength, cutscenesx, lastFramesx, cutscene;
        return regeneratorRuntime.wrap(function _callee35$(_context35) {
            while (1) {
                switch (_context35.prev = _context35.next) {
                    case 0:
                        cutsceneSideLength = 512;
                        cutscenesx = 0;
                        lastFramesx = scene.naturalWidth - cutsceneSideLength;

                        //Each time the frame changes, the next sprite in the sprite map is shown.

                        cutscene = setInterval(function () {
                            cutscenesx += cutsceneSideLength;
                        }, secondsPerFrame * 1000);
                        return _context35.abrupt("return", new Promise(function (resolve, reject) {
                            function drawCutscene() {
                                context.drawImage(scene, cutscenesx, 0, cutsceneSideLength, cutsceneSideLength, 0, 0, cutsceneSideLength, cutsceneSideLength);

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

                    case 5:
                    case "end":
                        return _context35.stop();
                }
            }
        }, _callee35, this);
    }));

    return function playCutscene(_x112, _x113) {
        return _ref35.apply(this, arguments);
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
var keysHeld = [];

//tapKeys holds all of the keys that are only supposed to be active for one frame after being pressed.
var tapKeys = [16, 32, 37, 38, 39, 40, 80];

var waitingTimeouts = [];
var passivePoints = [];
var movingPassivePoints = [];
var activePoints = [];
var movingActivePoints = [];
var movingHorizontalLasers = [];
var movingVerticalLasers = [];
var bombs = [];
var movingBombs = [];
var walls = [];
var movingWalls = [];
var partyHats = [];

//Used in for loops to apply a function to many objects.
var allInstances = [];
var allInteractiveInstances = [];
var allCollisionInstances = [];

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
    this.xTarget = this.x;
    this.yTarget = this.y;

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

var MovingPassivePoint = function MovingPassivePoint(x, y, xSpeed, ySpeed, totalFiringSeconds) {
    _classCallCheck(this, MovingPassivePoint);

    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

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

var MovingActivePoint = function MovingActivePoint(x, y, xSpeed, ySpeed, totalFiringSeconds) {
    _classCallCheck(this, MovingActivePoint);

    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    //When created, the instance begins its warning state to provide visual feedback.
    this.state = "warning";
    this.visible = true;

    //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
    this.externalResolve;
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

var MovingBomb = function MovingBomb(x, y, width, height, xSpeed, ySpeed) {
    _classCallCheck(this, MovingBomb);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

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

    //Walls are always "firing" and visible.
    this.state = "firing";
    this.visible = true;

    //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
    this.externalReject;
    this.timeout;
};

var MovingWall = function MovingWall(x, y, width, height, xSpeed, ySpeed) {
    _classCallCheck(this, MovingWall);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    //Walls are always "firing" and visible.
    this.state = "firing";
    this.visible = true;

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
var oneSixteenth = 2 * 16;
var oneEigth = 4 * 16;
var threeSixteenths = 6 * 16;
var oneFourth = 8 * 16;
var fiveSixteenths = 10 * 16;
var threeEigths = 12 * 16;
var sevenSixteenths = 14 * 16;
var oneHalf = canvas.width / 2;
var nineSixteenths = 18 * 16;
var fiveEigths = 20 * 16;
var elevenSixteenths = 22 * 16;
var threeFourths = 24 * 16;
var thirteenSixteenths = 26 * 16;
var sevenEigths = 28 * 16;
var fifteenSixteenths = 30 * 16;
var fullScreen = 32 * 16;

var blockieAdjustment = -blockie.width / 2;;

;

;

;

;

;

;

;

;

;

;

;

function initializeLevel(blockieX, blockieY) {
    gameState = "playing";

    blockie.x = blockieX;
    blockie.y = blockieY;

    recoveringFromDash = false;
    allowDashAgain = true;
};;

;

function callLevel(levelNum) {
    switch (levelNum) {
        case 1:
            levelOne();
            break;
        case 2:
            levelTwo();
            break;
        case 3:
            levelThree();
            break;
        case 4:
            levelFour();
            break;
        case 5:
            levelFive();
            break;
        case 6:
            levelSix();
            break;
        case 7:
            levelSeven();
            break;
        case 8:
            levelEight();
            break;
        case 9:
            levelNine();
            break;
        case 10:
            levelTen();
            break;
        case 11:
            levelEleven();
            break;
        case 12:
            levelTwelve();
            break;
        case 13:
            levelEnd();
            break;
    };
};

function initializeLevelMenu() {
    var menuIconArray = document.querySelectorAll(".menuIcon");

    //Makes all HTML menu elements visible.
    for (var i = 0; i < menuIconArray.length; i++) {
        menuIconArray[i].style.visibility = "visible";
    };

    //Clicking Handling

    function controlLevelIconClicks(iconNum) {
        //Makes all HTML menu elements invisible.
        for (var _i3 = 0; _i3 < menuIconArray.length; _i3++) {
            menuIconArray[_i3].style.visibility = "hidden";
        };

        //Stops listening if any menu elements are clicked.

        var _loop = function _loop(_i4) {
            menuIconArray[_i4].removeEventListener("click", function () {
                controlLevelIconClicks(_i4 + 1);
            });
        };

        for (var _i4 = 0; _i4 < menuIconArray.length; _i4++) {
            _loop(_i4);
        };

        //Begins the level that the player clicked the corresponding icon for.
        callLevel(iconNum);
    };

    //Listens for if the player clicks on any menu icons and calls that level.

    var _loop2 = function _loop2(_i5) {
        menuIconArray[_i5].addEventListener("click", function () {
            controlLevelIconClicks(_i5 + 1);
        });
    };

    for (var _i5 = 0; _i5 < menuIconArray.length; _i5++) {
        _loop2(_i5);
    };

    //Hovering Handling

    function highlightLevelIconHovering(iconNum) {
        menuIconArray[iconNum].style.outline = "5px solid #741EFF";
        menuIconArray[iconNum].style.color = "#741EFF";
        menuIconArray[iconNum].style.backgroundColor = "#FF51EF";
    };

    //Listens for if the player hovers over any menu icons and colors that element (if they aren't using the keys to navigate 
    //the menu).

    var _loop3 = function _loop3(_i6) {
        menuIconArray[_i6].addEventListener("mouseover", function () {
            highlightLevelIconHovering(_i6);
        });
    };

    for (var _i6 = 0; _i6 < menuIconArray.length; _i6++) {
        _loop3(_i6);
    };

    function revertLevelIconHovering(iconNum) {
        menuIconArray[iconNum].style.outline = "5px solid white";
        menuIconArray[iconNum].style.color = "white";
        menuIconArray[iconNum].style.backgroundColor = "black";
    };

    //Listens for if the player stops hovering over any menu icons and makes that element's color white again.

    var _loop4 = function _loop4(_i7) {
        menuIconArray[_i7].addEventListener("mouseleave", function () {
            revertLevelIconHovering(_i7);
        });
    };

    for (var _i7 = 0; _i7 < menuIconArray.length; _i7++) {
        _loop4(_i7);
    };
};;

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
};

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
};

//Adjusts Blockie's location to prevent wall clipping in screen transitions.
function moveBlockie(x, y) {
    blockie.x = x;
    blockie.y = y;
};

function moveBlockieAwayFromMovingWalls() {
    //Loops through each moving wall that Blockie is touching and pushes Blockie away from it.
    checkCollisionsWithClass(movingWalls);
    for (var i = 0; i < collidingInstances.length; i++) {
        var collidingMovingWallInstance = collidingInstances[i];
        preventingMovement = false;

        //Checks if Blockie would be not touching the current moving wall if he moved with the wall's xSpeed, and if so, 
        //"pushes" Blockie there.
        preventingMovement = false;
        checkBlockieOutsideBorder(blockie, blockie.x + collidingMovingWallInstance.xSpeed, blockie.y);
        checkTestInstancesColliding(blockie, blockie.x + collidingMovingWallInstance.xSpeed, blockie.y, collidingMovingWallInstance);
        if (!preventingMovement) {
            blockie.x += collidingMovingWallInstance.xSpeed;
            break;
        };

        //Checks if Blockie would be not touching the current moving wall if he moved with the wall's ySpeed, and if so, 
        //"pushes" Blockie there.
        preventingMovement = false;
        checkBlockieOutsideBorder(blockie, blockie.x, blockie.y + collidingMovingWallInstance.ySpeed);
        checkTestInstancesColliding(blockie, blockie.x, blockie.y + collidingMovingWallInstance.ySpeed, collidingMovingWallInstance);
        if (!preventingMovement) {
            blockie.y += collidingMovingWallInstance.ySpeed;
            break;
        };
    };
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
};;;;;;;;;;;;;;;;;;;

//Instance Helper Functions

function updateAllInstances() {
    allInstances = [waitingTimeouts, passivePoints, movingPassivePoints, activePoints, movingActivePoints, movingHorizontalLasers, movingVerticalLasers, bombs, movingBombs, walls, movingWalls];
};

function updateAllInteractiveInstances() {
    allInteractiveInstances = [waitingTimeouts, passivePoints, movingPassivePoints, activePoints, movingActivePoints, movingHorizontalLasers, movingVerticalLasers, bombs, movingBombs];
};

function updateAllCollisionInstances() {
    allCollisionInstances = [walls, movingWalls];
};

//Moves instances by adding speed to their location every step.
function moveMovingHorizontalLasers() {
    for (var i = 0; i < movingHorizontalLasers.length; i++) {
        if (movingHorizontalLasers[i].state !== "warning") {
            movingHorizontalLasers[i].y += movingHorizontalLasers[i].speed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingVerticalLasers() {
    for (var i = 0; i < movingVerticalLasers.length; i++) {
        if (movingVerticalLasers[i].state !== "warning") {
            movingVerticalLasers[i].x += movingVerticalLasers[i].speed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingPassivePoints() {
    for (var i = 0; i < movingPassivePoints.length; i++) {
        if (movingPassivePoints[i].state !== "warning") {
            movingPassivePoints[i].x += movingPassivePoints[i].xSpeed;
            movingPassivePoints[i].y += movingPassivePoints[i].ySpeed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingActivePoints() {
    for (var i = 0; i < movingActivePoints.length; i++) {
        if (movingActivePoints[i].state !== "warning") {
            movingActivePoints[i].x += movingActivePoints[i].xSpeed;
            movingActivePoints[i].y += movingActivePoints[i].ySpeed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingBombs() {
    for (var i = 0; i < movingBombs.length; i++) {
        if (movingBombs[i].state !== "warning") {
            movingBombs[i].x += movingBombs[i].xSpeed;
            movingBombs[i].y += movingBombs[i].ySpeed;
        };
    };
};

//Moves instances by adding speed to their location every step.
function moveMovingWalls() {
    for (var i = 0; i < movingWalls.length; i++) {
        if (movingWalls[i].state !== "warning") {
            movingWalls[i].x += movingWalls[i].xSpeed;
            movingWalls[i].y += movingWalls[i].ySpeed;
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

function drawMovingPassivePoints() {
    for (var i = 0; i < movingPassivePoints.length; i++) {
        var currentInstance = movingPassivePoints[i];

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
};

function drawMovingActivePoints() {
    for (var i = 0; i < movingActivePoints.length; i++) {
        var currentInstance = movingActivePoints[i];

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

function drawMovingBombs() {
    for (var i = 0; i < movingBombs.length; i++) {
        var currentInstance = movingBombs[i];
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

function drawMovingWalls() {
    for (var i = 0; i < movingWalls.length; i++) {
        var currentInstance = movingWalls[i];
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
    collidingInstances.splice(0);

    for (var i = 0; i < classArray.length; i++) {
        checkInstancesColliding(blockie, classArray[i]);
    };
};

function checkCollisionsWithClasses(classesArray) {
    collidingInstances.splice(0);

    for (var i = 0; i < classesArray.length; i++) {
        var currentClass = classesArray[i];
        for (var _i8 = 0; _i8 < currentClass.length; _i8++) {
            checkInstancesColliding(blockie, currentClass[_i8]);
        };
    };
};

function checkTestCollisionsWithClasses(instanceOneX, instanceOneY, classesArray) {
    preventingMovement = false;

    checkBlockieOutsideBorder(blockie, instanceOneX, instanceOneY);

    for (var i = 0; i < classesArray.length; i++) {
        var currentClass = classesArray[i];
        for (var _i9 = 0; _i9 < currentClass.length; _i9++) {
            checkTestInstancesColliding(blockie, instanceOneX, instanceOneY, currentClass[_i9]);
        };
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
    }
};

//Checks if an instance (Blockie) is outside of the game canvas.
function checkBlockieOutsideBorder(instanceOne, instanceOneX, instanceOneY) {
    if (instanceOneX < 0 || canvas.width < instanceOneX + instanceOne.width) {
        preventingMovement = true;
    } else if (instanceOneY < 0 || canvas.height < instanceOneY + instanceOne.height) {
        preventingMovement = true;
    };
}

//Input Functions

function initializeKeyInputs() {
    document.addEventListener("keydown", function (e) {
        //Prevents tapKeys from being set to true after 1 frame of being pressed.
        for (var i = 0; i < tapKeys.length; i++) {
            delete keysDown[tapKeys[i]];
        };

        //Adds all pressed keys to an array for game loops to react to without having to create a unique eventListener for every 
        //possible input.
        if (!keysHeld[e.keyCode]) {
            keysDown[e.keyCode] = true;
            keysHeld[e.keyCode] = true;
        };
    });

    //Removes lifted keys from the keysDown array so that they can no longer call their associated functions.
    document.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
        delete keysHeld[e.keyCode];
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
    if (gameState === "playing") {
        //Restarts the level if P is pressed.
        if (keysDown[80]) {
            restartLevel("keyPressed");
        };

        //Other Instances' Movements

        moveMovingPassivePoints();
        moveMovingActivePoints();
        moveMovingHorizontalLasers();
        moveMovingVerticalLasers();
        moveMovingBombs();
        moveMovingWalls();

        //Collision Handling

        //"Pushes" Blockie away from walls that just moved to his location. Needed to allow Blockie to move.
        moveBlockieAwayFromMovingWalls();

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
                blockie.xTarget = blockie.x + blockie.dx;
                blockie.yTarget = blockie.y + blockie.dy;
            } else {
                //Accounts for possible changes in Blockie's location due to respawning or something else that isn't an input.
                blockie.xTarget = blockie.x;
                blockie.yTarget = blockie.y;
            };

            //Movement Obstacles

            updateAllCollisionInstances();
            checkTestCollisionsWithClasses(blockie.xTarget, blockie.yTarget, allCollisionInstances);

            //Moves Blockie to an open space if he is trying to move into a collision instance.
            if (preventingMovement) {
                //Resets Blockie's target location to his current location because there is a 100% chance that space is clear.
                blockie.xTarget = blockie.x;
                blockie.yTarget = blockie.y;

                var xChange = 0;
                var yChange = 0;
                var xDir = Math.sign(blockie.dx);
                var yDir = Math.sign(blockie.dy);
                var lastAvailableX = blockie.xTarget;
                var lastAvailableY = blockie.yTarget;

                //Finds the last free space in the direction that Blockie is moving in. Stops checking for more spaces once 
                //Blockie has moved past his dx or dy each frame.
                while (Math.abs(xChange) < Math.abs(blockie.dx) || Math.abs(yChange) < Math.abs(blockie.dy)) {
                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dx) - xChange < 1) {
                        xChange += blockie.dx - xChange;
                    } else {
                        xChange += xDir;
                    };

                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dy) - yChange < 1) {
                        yChange += blockie.dy - yChange;
                    } else {
                        yChange += yDir;
                    };

                    //Checks if each increment is empty and replaces the last available location with it.
                    checkTestCollisionsWithClasses(blockie.xTarget + xChange, blockie.yTarget + yChange, allCollisionInstances);
                    if (!preventingMovement) {
                        lastAvailableX = blockie.xTarget + xChange;
                        lastAvailableY = blockie.yTarget + yChange;
                    };
                };

                //Sets Blockie's location to the last available one in the direction that he's moving in.
                blockie.xTarget = lastAvailableX;
                blockie.yTarget = lastAvailableY;

                //Resets dx and dy to be relative to his new position.
                blockie.dx = blockie.x + blockie.dx - blockie.xTarget;
                blockie.dy = blockie.y + blockie.dy - blockie.yTarget;
                xChange = 0;
                yChange = 0;

                //Independently checks along the x-axis for an available space after moving in Blockie's exact direction (this
                //only activates when moving diagonally and allows for "sliding").
                while (Math.abs(xChange) < Math.abs(blockie.dx)) {
                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dx) - xChange < 1) {
                        xChange += blockie.dx - xChange;
                    } else {
                        xChange += xDir;
                    };

                    //Checks if each increment is empty and replaces the last available location with it.
                    checkTestCollisionsWithClasses(blockie.xTarget + xChange, blockie.yTarget, allCollisionInstances);
                    if (!preventingMovement) {
                        lastAvailableX = blockie.xTarget + xChange;
                    };
                };

                blockie.xTarget = lastAvailableX;

                //Independently checks along the y-axis for an available space after moving in Blockie's exact direction (this
                //only activates when moving diagonally and allows for "sliding").
                while (Math.abs(yChange) < Math.abs(blockie.dy)) {
                    //Allows for Blockie to move in non-integer increments.
                    if (Math.abs(blockie.dy) - yChange < 1) {
                        yChange += blockie.dy - yChange;
                    } else {
                        yChange += yDir;
                    };

                    //Checks if each increment is empty and replaces the last available location with it.
                    checkTestCollisionsWithClasses(blockie.xTarget, blockie.yTarget + yChange, allCollisionInstances);
                    if (!preventingMovement) {
                        lastAvailableY = blockie.yTarget + yChange;
                    };
                };

                blockie.yTarget = lastAvailableY;
            };

            blockie.x = blockie.xTarget;
            blockie.y = blockie.yTarget;
        };

        //Collision Handling

        //"Pushes" Blockie away from walls that he moved to.
        moveBlockieAwayFromMovingWalls();

        //Is Blockie Being Crushed?

        //Checks if Blockie is colliding after everything has moved, and if so, restarts the level.
        checkTestCollisionsWithClasses(blockie.x, blockie.y, allCollisionInstances);
        if (preventingMovement) {
            restartLevel("died");
        };

        //Interactivity Handling

        updateAllInteractiveInstances();
        checkCollisionsWithClasses(allInteractiveInstances);

        for (var i = 0; i < collidingInstances.length; i++) {
            if (collidingInstances[i].constructor.name === "PassivePoint") {
                //Adds points to the current level's total.
                currentLevelPoints++;

                //Resolves the PassivePoint's Promise and destroys the instance once it is touched.
                var collidingPoint = collidingInstances[i];
                collidingPoint.externalResolve();
                clearTimeout(collidingPoint.timeout);
                var instanceIndex = passivePoints.indexOf(collidingPoint);
                passivePoints.splice(instanceIndex, 1);
            } else if (collidingInstances[i].constructor.name === "MovingPassivePoint") {
                //Adds points to the current level's total.
                currentLevelPoints++;

                //Resolves the PassivePoint's Promise and destroys the instance once it is touched.
                var _collidingPoint = collidingInstances[i];
                _collidingPoint.externalResolve();
                clearTimeout(_collidingPoint.timeout);
                var _instanceIndex = movingPassivePoints.indexOf(_collidingPoint);
                movingPassivePoints.splice(_instanceIndex, 1);
            } else if (collidingInstances[i].constructor.name === "ActivePoint" || collidingInstances[i].constructor.name === "MovingActivePoint") {
                //Adds points to the current level's total.
                currentLevelPoints++;

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (var _i10 = 0; _i10 < currentTimeouts.length; _i10++) {
                    clearTimeout(currentTimeouts[_i10]);
                };

                currentTimeouts.splice(0);

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (var _i11 = 0; _i11 < currentIntervals.length; _i11++) {
                    clearInterval(currentIntervals[_i11]);
                };

                currentIntervals.splice(0);

                resetBlockieState();

                cancelAwaitChain = true;

                updateAllInstances();
                for (var _i12 = 0; _i12 < allInstances.length; _i12++) {
                    resolveInstances(allInstances[_i12]);
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
        drawPassivePoints();
        drawMovingPassivePoints();
        drawActivePoints();
        drawMovingActivePoints();
        drawWalls();
        drawMovingWalls();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawBombs();
        drawMovingBombs();
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