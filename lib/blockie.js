"use strict";

//Levels are a series of obstacles and objectives that appear in specific orders and time periods using async/await.
var levelOne = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, oneEigth + blockieAdjustment);

                        createCountdownTimer(35);

                        cancelAwaitChain = false;

                        _context.next = 6;
                        return Promise.all([createWall(threeEigths, 0, oneSixteenth, sevenEigths), createWall(oneEigth, 0, oneFourth, sevenSixteenths), createWall(oneEigth, nineSixteenths, oneFourth, fiveSixteenths), createWall(nineSixteenths, 0, sevenSixteenths, wholeScreen), createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0), createPassivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0, 9), fireMovingVerticalLaser(27 * 16, 16, -1, 2, 9), fireMovingVerticalLaser(29 * 16, 16, -1, 2, 9), fireMovingVerticalLaser(wholeScreen - 16, 16, -1, 2, 9)]);

                    case 6:

                        cancelAwaitChain = false;

                        _context.next = 9;
                        return Promise.all([createWall(oneEigth, 0, fiveSixteenths, sevenEigths), createWall(nineSixteenths, 0, oneHalf, wholeScreen), createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), loopFireBombs(0, 0, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(0, oneEigth, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(0, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(0, threeEigths, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(0, oneHalf, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(0, fiveEigths, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(0, threeFourths, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(0, sevenEigths, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, 0, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneEigth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, threeEigths, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneHalf, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(sevenSixteenths, threeFourths, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, sevenEigths, oneEigth, oneEigth, 1, 0.5, 0.5)]);

                    case 9:

                        cancelAwaitChain = false;

                        _context.next = 12;
                        return Promise.all([createWall(0, 0, sevenSixteenths, wholeScreen), createWall(nineSixteenths, 0, sevenSixteenths, oneFourth), createWall(nineSixteenths, oneFourth, oneSixteenth, threeEigths), createWall(nineSixteenths, threeFourths, threeSixteenths, oneFourth), createWall(threeFourths, oneFourth, oneFourth, threeFourths), createActivePoint(oneHalf - 8, sevenEigths - 8, 0), createPassivePoint(elevenSixteenths - 8, fiveSixteenths - 8, 0, 5)]);

                    case 12:

                        cancelAwaitChain = false;

                        _context.next = 15;
                        return Promise.all([createWall(0, 0, wholeScreen, oneFourth), createWall(0, oneFourth, oneFourth, thirteenSixteenths), createWall(threeFourths, oneFourth, oneFourth, thirteenSixteenths), createWall(oneFourth, oneFourth, threeSixteenths, threeSixteenths), createWall(nineSixteenths, oneFourth, threeSixteenths, threeSixteenths), createWall(oneFourth, nineSixteenths, threeSixteenths, sevenSixteenths), createWall(nineSixteenths, nineSixteenths, threeSixteenths, sevenSixteenths), createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth), fireBomb(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 0.7, 0.7), fireBomb(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 1.4, 0.7), fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7), fireBomb(oneFourth, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7), fireBomb(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7), fireMovingHorizontalLaser(0, 32, 2, 2.1, 10), createActivePoint(oneHalf - 8, oneHalf - 8, 3)]);

                    case 15:

                        cancelAwaitChain = false;

                        _context.next = 18;
                        return Promise.all([fireBomb(16, 0, fifteenSixteenths, oneEigth, 0, 1), fireBomb(16, threeEigths, fifteenSixteenths, oneFourth, 0.15, 1), fireBomb(16, sevenEigths, fifteenSixteenths, oneEigth, 0.3, 1), fireBomb(0, 16, oneEigth, fifteenSixteenths, 2.45, 1), fireBomb(threeEigths, 16, oneFourth, fifteenSixteenths, 2.6, 1), fireBomb(sevenEigths, 16, oneEigth, fifteenSixteenths, 2.75, 1), createActivePoint(oneHalf - 8, oneHalf - 8, 7), fireBomb(oneEigth, 16, oneFourth, fifteenSixteenths, 4.75, 1), fireBomb(fiveEigths, 16, oneFourth, fifteenSixteenths, 4.9, 1), fireBomb(16, oneEigth, fifteenSixteenths, oneFourth, 5.05, 1), fireBomb(16, fiveEigths, fifteenSixteenths, oneFourth, 5.2, 1)]);

                    case 18:

                        cancelAwaitChain = false;

                        destroyCountdownTimer();

                        endLevel();
                        _context.next = 25;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context["catch"](0);

                    case 25:
                        ;

                    case 26:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 23]]);
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
                        try {} catch (error) {};

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

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
var stopLevel = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(reason) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        stopAudioElement(currentSong);

                        rejectAllInstances();
                        stopUniqueTimingEvents();

                        //Stops the countdown timer for levels 4 + 8 + 12.
                        destroyCountdownTimer();

                        //Removes all points collected in the level.
                        currentLevelPoints = 0;

                        //Resets all keys to avoid having button presses activate after the level has stopped.
                        keysDown.splice(0);

                        //Switches how the game resets based on how it triggered.

                        if (!(reason === "died")) {
                            _context14.next = 15;
                            break;
                        }

                        gameState = "animatingBlockieDestruction";

                        //Animates Blockie's destruction.
                        blockie.state = "destructing";
                        blockie.sx = 0;

                        //Waits half a second before displaying a message.
                        _context14.next = 12;
                        return new Promise(function (resolve, reject) {
                            var continueDestruction = setTimeout(function () {
                                resolve("resolved");
                            }, 500);
                        });

                    case 12:

                        displayMessage("This was only a setback. <br>Progress, Blockie!", "restartLevel");
                        _context14.next = 34;
                        break;

                    case 15:
                        if (!(reason === "restartLevelPressed")) {
                            _context14.next = 19;
                            break;
                        }

                        callCurrentLevel();
                        _context14.next = 34;
                        break;

                    case 19:
                        if (!(reason === "lostFocus")) {
                            _context14.next = 23;
                            break;
                        }

                        displayMessage("Do not be afraid. <br>Conquer fear. <br>Do not click on other tabs/apps.", "restartLevel");
                        _context14.next = 34;
                        break;

                    case 23:
                        if (!(reason === "enterMenuPressed")) {
                            _context14.next = 27;
                            break;
                        }

                        initializeLevelMenu();
                        _context14.next = 34;
                        break;

                    case 27:
                        if (!(reason === "countdownTimerEnded")) {
                            _context14.next = 34;
                            break;
                        }

                        gameState = "playingCutscene";

                        //Waits half a second before displaying a message.
                        _context14.next = 31;
                        return new Promise(function (resolve, reject) {
                            var continueDestruction = setTimeout(function () {
                                resolve("resolved");
                            }, 500);
                        });

                    case 31:
                        _context14.next = 33;
                        return playCutscene(spCountdownDestructionScene, 0.17);

                    case 33:
                        displayMessage("You've failed another world.", "restartLevel");

                    case 34:
                        ;

                    case 35:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function stopLevel(_x) {
        return _ref14.apply(this, arguments);
    };
}();

var endLevel = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        stopAudioElement(currentSong);

                        gameState = "finishingLevel";

                        //Points are only made permanent once a level is completed and only the high score is recorded in earnedPoints.
                        if (earnedPoints[currentLevelNum - 1] < currentLevelPoints) {
                            earnedPoints[currentLevelNum - 1] = currentLevelPoints;
                        };

                        //Unlocks the next level (because arrays are 0-indexed) which allows it to be seen and selected in the menu.
                        numUnlockedLevels = Math.max(currentLevelNum + 1, numUnlockedLevels);
                        numUnlockedLevels = Math.min(numUnlockedLevels, 13);

                        //Makes Blockie face the player during the PartyHat animation.
                        blockie.angleMovingDegrees = -180;

                        //Waits for the PartyHat to descend on to Blockie's head.
                        _context15.next = 9;
                        return new Promise(function (resolve, reject) {
                            var partyHatInstance = new PartyHat();
                            partyHats.push(partyHatInstance);

                            function animateFinishedLevelHat() {
                                partyHatInstance.y += Math.min(blockie.y - partyHatInstance.y - partyHatInstance.height, 2);

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
                        _context15.next = 11;
                        return displayMessage(levelMessages[currentLevelNum - 1], "enterLevelMenu");

                    case 11:

                        //currentLevelPoints is set to 0 because it is only a temporary holder of points for each run on a level. earnedPoints[] stores
                        //the currentLevelPoints permanently if it is a high score.
                        currentLevelPoints = 0;

                    case 12:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));

    return function endLevel() {
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
                        gameState = "displayingMessage";

                        //Forces the player to read the message for 1 second before they can continue the game.
                        _context16.next = 3;
                        return new Promise(function (resolve, reject) {
                            var drawGameOverScreen = setTimeout(function () {
                                //Placed here to draw Blockie with a PartyHat during endLevel().
                                partyHats.splice(0);

                                //Draws the game over screen.
                                document.getElementById("messageDisplayer").innerHTML = message;

                                resolve("resolved");
                            }, 1000);
                        });

                    case 3:
                        _context16.next = 5;
                        return new Promise(function (resolve, reject) {
                            //Restarts the game once acceptable keys are pressed.
                            function resumePlaying() {
                                //Shift and Space key handler.
                                if (keysDown[16] || keysDown[32]) {
                                    //Prevents the key from being counted as pressed down again (until the key is lifted again).
                                    delete keysDown[16];
                                    delete keysDown[32];

                                    stopMessage();
                                } else {
                                    //Continuously recalls the function until an acceptable key is pressed.
                                    window.requestAnimationFrame(resumePlaying);
                                };

                                function stopMessage() {
                                    document.getElementById("messageDisplayer").innerHTML = "";

                                    switch (endAction) {
                                        case "restartLevel":
                                            gameState = "playing";
                                            resetBlockieState();
                                            callCurrentLevel();
                                            break;
                                        case "enterLevelMenu":
                                            initializeLevelMenu();
                                            break;
                                        case "continueLevel":
                                            //Does nothing because the levels automatically progress after displayMessage() has resolved.
                                            break;
                                    };

                                    resolve("resolved");
                                };
                            };

                            window.requestAnimationFrame(resumePlaying);
                        });

                    case 5:
                        return _context16.abrupt("return", _context16.sent);

                    case 6:
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

//Instance Functions

//Creates a WaitingTimeout instance, and awaits for its resolution to then create the root collision instance. This is meant to allow
//for instances to spawn at different times concurrently (using Promise.all) or spawn a bit after another's destruction.
var setWaitingTimeout = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(waitingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        //Creates an instance and sets all of its initial properties.
                        instance = new WaitingTimeout();

                        waitingTimeouts.push(instance);

                        return _context17.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = waitingTimeouts.indexOf(instance);
                                waitingTimeouts.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, waitingSeconds * 1000);
                        }));

                    case 3:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));

    return function setWaitingTimeout(_x4) {
        return _ref17.apply(this, arguments);
    };
}();

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
var setWarningTimeouts = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(instanceAffecting) {
        var warningSeconds;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.
                        warningSeconds = 1;
                        _context18.next = 3;
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
                            _context18.next = 5;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 5:
                        _context18.next = 7;
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
                            _context18.next = 9;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 9:
                        _context18.next = 11;
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
                            _context18.next = 13;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 13:
                        _context18.next = 15;
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
                        return _context18.abrupt("return", _context18.sent);

                    case 16:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));

    return function setWarningTimeouts(_x5) {
        return _ref18.apply(this, arguments);
    };
}();

//Creates a endScreenTimeout instance, and awaits for its resolution to then end the current screen and continue the level async/await
//function.
var setEndScreenTimeout = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(seconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        //Creates an instance and sets all of its initial properties.
                        instance = new EndScreenTimeout();

                        endScreenTimeouts.push(instance);

                        return _context19.abrupt("return", new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;

                            instance.timeout = setTimeout(function () {
                                endScreen();
                            }, seconds * 1000);
                        }));

                    case 3:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, this);
    }));

    return function setEndScreenTimeout(_x6) {
        return _ref19.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createPassivePoint = function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(x, y, waitingSeconds, firingSeconds) {
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
                        instance = new PassivePoint(x, y, firingSeconds);

                        passivePoints.push(instance);

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

                            //Sets an interval to the length of the firingSeconds which counts down the semi-accurate remaining length of the timeout.
                            //This is used in drawing the remaining seconds meter to show the player how much longer the point will exist.
                            instance.remainingFiringSeconds = firingSeconds;
                            var remainingFiringSecondsInterval = setInterval(function () {
                                instance.remainingFiringSeconds -= 0.15;
                            }, 150);
                            addUniqueInterval(remainingFiringSecondsInterval);

                            instance.timeout = setTimeout(function () {
                                removeUniqueInterval(remainingFiringSecondsInterval);

                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = passivePoints.indexOf(instance);
                                passivePoints.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
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

    return function createPassivePoint(_x7, _x8, _x9, _x10) {
        return _ref20.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingPassivePoint = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(x, y, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
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
                        instance = new MovingPassivePoint(x, y, xSpeed, ySpeed, firingSeconds);

                        movingPassivePoints.push(instance);

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

                            //Sets an interval to the length of the firingSeconds which counts down the semi-accurate remaining length of the timeout.
                            //This is used in drawing the remaining seconds meter to show the player how much longer the point will exist.
                            instance.remainingFiringSeconds = firingSeconds;
                            var remainingFiringSecondsInterval = setInterval(function () {
                                instance.remainingFiringSeconds -= 0.15;
                            }, 150);
                            addUniqueInterval(remainingFiringSecondsInterval);

                            instance.timeout = setTimeout(function () {
                                removeUniqueInterval(remainingFiringSecondsInterval);

                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = movingPassivePoints.indexOf(instance);
                                movingPassivePoints.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
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

    return function fireMovingPassivePoint(_x11, _x12, _x13, _x14, _x15, _x16) {
        return _ref21.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createActivePoint = function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(x, y, waitingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        _context22.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context22.next = 4;
                            break;
                        }

                        return _context22.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new ActivePoint(x, y);

                        activePoints.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context22.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context22.next = 10;
                            break;
                        }

                        return _context22.abrupt("return");

                    case 10:
                        _context22.next = 12;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 12:
                        return _context22.abrupt("return", _context22.sent);

                    case 13:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, this);
    }));

    return function createActivePoint(_x17, _x18, _x19) {
        return _ref22.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingActivePoint = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(x, y, xSpeed, ySpeed, waitingSeconds) {
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
                        instance = new MovingActivePoint(x, y, xSpeed, ySpeed);

                        movingActivePoints.push(instance);

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

    return function fireMovingActivePoint(_x20, _x21, _x22, _x23, _x24) {
        return _ref23.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingHorizontalLasers = function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(y, height, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        _context24.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context24.next = 4;
                        return fireMovingHorizontalLaser(y, height, speed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context24.next = 9;
                            break;
                        }

                        _context24.next = 7;
                        return fireMovingHorizontalLaser(y, height, speed, waitingSeconds, firingSeconds);

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

    return function loopFireMovingHorizontalLasers(_x25, _x26, _x27, _x28, _x29, _x30) {
        return _ref24.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingHorizontalLaser = function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(y, height, speed, waitingSeconds, firingSeconds) {
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
                        instance = new MovingHorizontalLaser(y, height, speed);

                        movingHorizontalLasers.push(instance);

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
                                var instanceIndex = movingHorizontalLasers.indexOf(instance);
                                movingHorizontalLasers.splice(instanceIndex, 1);
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

    return function fireMovingHorizontalLaser(_x31, _x32, _x33, _x34, _x35) {
        return _ref25.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingVerticalLasers = function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(x, width, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        _context26.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context26.next = 4;
                        return fireMovingVerticalLaser(x, width, speed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context26.next = 9;
                            break;
                        }

                        _context26.next = 7;
                        return fireMovingVerticalLaser(x, width, speed, waitingSeconds, firingSeconds);

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

    return function loopFireMovingVerticalLasers(_x36, _x37, _x38, _x39, _x40, _x41) {
        return _ref26.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingVerticalLaser = function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(x, width, speed, waitingSeconds, firingSeconds) {
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
                        instance = new MovingVerticalLaser(x, width, speed);

                        movingVerticalLasers.push(instance);

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
                                var instanceIndex = movingVerticalLasers.indexOf(instance);
                                movingVerticalLasers.splice(instanceIndex, 1);
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

    return function fireMovingVerticalLaser(_x42, _x43, _x44, _x45, _x46) {
        return _ref27.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireBombs = function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(x, y, width, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        _context28.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context28.next = 4;
                        return fireBomb(x, y, width, height, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context28.next = 9;
                            break;
                        }

                        _context28.next = 7;
                        return fireBomb(x, y, width, height, waitingSeconds, firingSeconds);

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

    return function loopFireBombs(_x47, _x48, _x49, _x50, _x51, _x52, _x53) {
        return _ref28.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireBomb = function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(x, y, width, height, waitingSeconds, firingSeconds) {
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
                        instance = new Bomb(x, y, width, height);

                        bombs.push(instance);

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
                                var instanceIndex = bombs.indexOf(instance);
                                bombs.splice(instanceIndex, 1);
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

    return function fireBomb(_x54, _x55, _x56, _x57, _x58, _x59) {
        return _ref29.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingBombs = function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
                switch (_context30.prev = _context30.next) {
                    case 0:
                        _context30.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context30.next = 4;
                        return fireMovingBomb(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context30.next = 9;
                            break;
                        }

                        _context30.next = 7;
                        return fireMovingBomb(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);

                    case 7:
                        _context30.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context30.abrupt("return");

                    case 11:
                    case "end":
                        return _context30.stop();
                }
            }
        }, _callee30, this);
    }));

    return function loopFireMovingBombs(_x60, _x61, _x62, _x63, _x64, _x65, _x66, _x67, _x68) {
        return _ref30.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingBomb = function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        _context31.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context31.next = 4;
                            break;
                        }

                        return _context31.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);

                        movingBombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context31.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context31.next = 10;
                            break;
                        }

                        return _context31.abrupt("return");

                    case 10:
                        _context31.next = 12;
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
                        return _context31.abrupt("return", _context31.sent);

                    case 13:
                    case "end":
                        return _context31.stop();
                }
            }
        }, _callee31, this);
    }));

    return function fireMovingBomb(_x69, _x70, _x71, _x72, _x73, _x74, _x75, _x76) {
        return _ref31.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireContinuallyMovingBomb = function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        _context32.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context32.next = 4;
                            break;
                        }

                        return _context32.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);

                        movingBombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context32.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context32.next = 10;
                            break;
                        }

                        return _context32.abrupt("return");

                    case 10:
                        _context32.next = 12;
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
                        return _context32.abrupt("return", _context32.sent);

                    case 13:
                    case "end":
                        return _context32.stop();
                }
            }
        }, _callee32, this);
    }));

    return function fireContinuallyMovingBomb(_x77, _x78, _x79, _x80, _x81, _x82, _x83, _x84) {
        return _ref32.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createWall = function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(x, y, width, height) {
        var instance;
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        //Creates an instance and sets all of its initial properties.
                        instance = new Wall(x, y, width, height);

                        walls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context33.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 4:
                        return _context33.abrupt("return", _context33.sent);

                    case 5:
                    case "end":
                        return _context33.stop();
                }
            }
        }, _callee33, this);
    }));

    return function createWall(_x85, _x86, _x87, _x88) {
        return _ref33.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingWalls = function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
            while (1) {
                switch (_context34.prev = _context34.next) {
                    case 0:
                        _context34.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context34.next = 4;
                        return fireMovingWall(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context34.next = 9;
                            break;
                        }

                        _context34.next = 7;
                        return fireMovingWall(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);

                    case 7:
                        _context34.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context34.abrupt("return");

                    case 11:
                    case "end":
                        return _context34.stop();
                }
            }
        }, _callee34, this);
    }));

    return function loopFireMovingWalls(_x89, _x90, _x91, _x92, _x93, _x94, _x95, _x96, _x97) {
        return _ref34.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingWall = function () {
    var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee35$(_context35) {
            while (1) {
                switch (_context35.prev = _context35.next) {
                    case 0:
                        _context35.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context35.next = 4;
                            break;
                        }

                        return _context35.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);

                        movingWalls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context35.next = 8;
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
                        return _context35.abrupt("return", _context35.sent);

                    case 9:
                    case "end":
                        return _context35.stop();
                }
            }
        }, _callee35, this);
    }));

    return function fireMovingWall(_x98, _x99, _x100, _x101, _x102, _x103, _x104, _x105) {
        return _ref35.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireContinuallyMovingWall = function () {
    var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee36$(_context36) {
            while (1) {
                switch (_context36.prev = _context36.next) {
                    case 0:
                        _context36.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context36.next = 4;
                            break;
                        }

                        return _context36.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);

                        movingWalls.push(instance);

                        //Creates a timeout for the instance's direction changing and links its deactivation functions.
                        _context36.next = 8;
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
                        return _context36.abrupt("return", _context36.sent);

                    case 9:
                    case "end":
                        return _context36.stop();
                }
            }
        }, _callee36, this);
    }));

    return function fireContinuallyMovingWall(_x106, _x107, _x108, _x109, _x110, _x111, _x112, _x113) {
        return _ref36.apply(this, arguments);
    };
}();

//Cutscene Functions

//Waits for a small cutscene to finish.
var playCutscene = function () {
    var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(scene, secondsPerFrame) {
        var cutsceneSideLength, cutscenesx, lastFramesx, cutscene;
        return regeneratorRuntime.wrap(function _callee37$(_context37) {
            while (1) {
                switch (_context37.prev = _context37.next) {
                    case 0:
                        cutsceneSideLength = 512;
                        cutscenesx = 0;
                        lastFramesx = scene.naturalWidth - cutsceneSideLength;

                        //Each time the frame changes, the next sprite in the sprite map is shown.

                        cutscene = setInterval(function () {
                            cutscenesx += cutsceneSideLength;
                        }, secondsPerFrame * 1000);
                        return _context37.abrupt("return", new Promise(function (resolve, reject) {
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
                        return _context37.stop();
                }
            }
        }, _callee37, this);
    }));

    return function playCutscene(_x114, _x115) {
        return _ref37.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Game Setup

//Allows the canvas to be drawn on and interacted with.
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

//Sets the line width for all internal drawing (like the warning flashes for bombs).
context.lineWidth = 4;

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

//Sound Loading

var runningOut = new Audio("../sounds/runningOut.mp3");
runningOut.loop = true;

//Variables

//Holds the level that Blockie is currently playing. Saved in localStorage.
var currentLevelNum = void 0;

//Stores the number of levels that are unlocked (since the game is linear, each newly unlocked level is 1 higher than the previous 
//one). Saved in localStorage.
var numUnlockedLevels = void 0;

//gameState determines which parts of the game and drawing loops run.
var gameState = "playing";

//Used to stop async/await functions by preventing another await to run. Used when Blockie touches activePoints and the current
//instances needs to stop running, yet everything cannot be rejected (because that would stop the level too).
var cancelAwaitChain = false;

//gameScale changes to fit the gameContainer along the most constrained axis.
var gameScale = 1;

//Globally declares the countdown used in createCountdownTimer() to allow it to always be reset when the level ends or completes.
var countdown = 0;

//Temporarily holds the points gathered during the currentLevel. They are transferred to earnedPoints to be made permanent once the
//level is completed.
var currentLevelPoints = 0;

var xInput = 0;
var yInput = 0;

//Determines if Blockie can move based on collisions.
var preventingMovement = false;

var dashDistance = 96;
var recoveringFromDash = false;
var allowDashAgain = true;
var dashRecoverySeconds = 0.3;
var allowDashAgainSeconds = 0.9;

//Holds the index of the levelMenuIcon that is currently being hovered over.
var levelHoveringIconNum = 0;

var purple = "#A600FF";
var orange = "#FF9D00";

var blue = "#0050FC";
var yellow = "#FFEE00";

//Color of walls.
var changingColorOne = purple;

//Color of Bombs and lasers.
var changingColorTwo = orange;

var passivePointColor = "#85BB65";
var activePointColor = "#F02800";
var blockieSurroundingColor = "#378CFF";

//Holds the .mp3 file of the song that is currently playing so that songs can be universally manipulated.
var currentSong = void 0;

//Arrays

//Holds the highest number of points that were touched in a full run of each level. Saved in localStorage.
var earnedPoints = void 0;

//Holds all keys that are pressed.
var keysDown = [];

//Used to prevent keys that have already been pressed from being placed back into the keysDown array until that key has been released.
//Most keys in most circumstances (dashing, menu selection, etc.) delete themselves from the keysDown array on the frame that they are
//used, so this prevents the key from being used in any way until it is released. Some keys in some circumstances (like moving) 
//require the key to remain in keysDown for all the frames that they are held, so those keys are not deleted until they are released.
var keysHeld = [];

//These arrays hold all instances of their class, so that it is easier to draw, activate, and deactivate each obstacle type.

var waitingTimeouts = [];
var endScreenTimeouts = [];
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

//Used in for loops to apply a function to many object types.
var allInstances = [];
var allInteractiveInstances = [];
var allCollisionInstances = [];

//These hold all of the timing events that are not linked to specific instances so that they can be set and cleared manually.
var uniqueTimeouts = [];
var uniqueIntervals = [];

//Holds all instances that Blockie is currently touching and moves him away from walls, then it collects points, and then it killls
//Blockie if he's touching a harmful obstacle.
var collidingInstances = [];

//Holds the total number of points that spawn in each level.
var possiblePoints = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1];

//Holds a unique message that is displayed after completing each level (except the last level).
var levelMessages = ["The world will ask you who you are, <br>and if you do not know, <br>the world will tell you.", "Are you a problem?", "Quite an experience to live in fear, <br>isn't it? <br>That's what it is to be a slave.", "Hell is empty and the devils are here.", "WE HAVE MET THE ENEMY AND HE IS US.", "Salt is good; <br>but if salt has lost its taste, <br>how can its saltiness be restored? <br>It is fit neither for the soil nor for the manure pile; <br>they throw it away.", "If you do not change direction, <br>you may end up where you are heading.", "You're better off dead <br>when your mind's been set <br>from nine until five. <br>How could it be true? <br>Well it's happening to you. <br>So take my advice.", "Not what we have, <br>but what we enjoy, <br>constitutes our abundance.", "Do not store up for yourselves treasures on earth, <br>where moths and vermin destroy, <br>and where thieves break in and steal. <br>For where your treasure is, <br>there your heart will be also.", "Knowledge is having something to say. <br>Wisdom is knowing not to say it.", "Do not work for the food that perishes, <br>but for the food that endures for eternal life.", "It's good that you escaped."];

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
    this.externalResolve;
    this.externalReject;
    this.timeout;
};

;

var EndScreenTimeout = function EndScreenTimeout() {
    _classCallCheck(this, EndScreenTimeout);

    //Allows for each instance to be "destroyed" from an outside source (through level resets, Blockie interaction, etc.).
    this.externalResolve;
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
    this.externalResolve;
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
    this.externalResolve;
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
    this.externalResolve;
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
    this.externalResolve;
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
    this.externalResolve;
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
    this.externalResolve;
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
var wholeScreen = 32 * 16;

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

;

//Ends the current screen (which is a sub-section of a level which is found within a Promise.all([]);) and continues to the next
//part of the async/await level function.
function endScreen() {
    //Causes all async await functions to stop progressing once they reach another cancelAwaitChain breakpoint.
    cancelAwaitChain = true;

    resolveAllInstances();
    stopUniqueTimingEvents();
    resetBlockieState();
};

//Resets the initial values for the beginning of every level.
function initializeLevel(blockieX, blockieY) {
    initializeLevelSong();

    gameState = "playing";

    blockie.x = blockieX;
    blockie.y = blockieY;

    recoveringFromDash = false;
    allowDashAgain = true;
};;

;

function callCurrentLevel() {
    switch (currentLevelNum) {
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

//Initializes all of the variables to either their saved values, which are stored in local storage, or their default values.
function loadSavedData() {
    currentLevelNum = parseInt(localStorage.getItem("currentLevelNum")) || 1;
    numUnlockedLevels = parseInt(localStorage.getItem("numUnlockedLevels")) || 1;

    //This array cannot be short-circuit evaluated becuse .split() doesn't work on null values.
    if (localStorage.getItem("earnedPoints")) {
        earnedPoints = localStorage.getItem("earnedPoints").split(",");
    } else {
        earnedPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    };
};

//Asks the player to start a new game or continue an old game (if save data exists). Unlike the levelMenu, the player must navigate
//this menu with the mouse and click on an icon in order to progress the game so that the game's tab will be considered "active"
//by the browser and be allowed to play audio.
function initializeOpeningScreenMenu() {
    gameState = "inOpeningMenu";

    //Creates an array of all opening menu Icon IDs.
    var openingMenuIconArray = [document.getElementById("newGameMenuIcon")];

    //Continuing the game is only an option if save data exists (when the local storage variables are not set to "undefined").
    if (localStorage.getItem("currentLevelNum") !== "undefined") {
        openingMenuIconArray.push(document.getElementById("continueGameMenuIcon"));
    };

    //Makes all unlocked HTML menu elements visible.
    for (var i = 0; i < openingMenuIconArray.length; i++) {
        openingMenuIconArray[i].style.visibility = "visible";
    };

    //Clicking Handling

    //Starts a new game or continues the old one when an icon is clicked.

    var _loop = function _loop(_i) {
        openingMenuIconArray[_i].addEventListener("click", function () {
            exitOpeningMenu(openingMenuIconArray[_i]);
        });
    };

    for (var _i = 0; _i < openingMenuIconArray.length; _i++) {
        _loop(_i);
    };

    //Hovering Handling

    function highlightLevelIcon(iconNum) {
        openingMenuIconArray[iconNum].style.outline = "5px solid " + changingColorTwo;
        openingMenuIconArray[iconNum].style.color = changingColorTwo;
        openingMenuIconArray[iconNum].style.backgroundColor = changingColorOne;
    };

    function revertLevelIcon(iconNum) {
        openingMenuIconArray[iconNum].style.outline = "5px solid white";
        openingMenuIconArray[iconNum].style.color = "white";
        openingMenuIconArray[iconNum].style.backgroundColor = "black";
    };

    //Listens for if the player hovers over any menu icons and highlights that element.

    var _loop2 = function _loop2(_i2) {
        openingMenuIconArray[_i2].addEventListener("mouseover", function () {
            //Highlights the menuIcon that currently has the mouse over it.
            highlightLevelIcon(_i2);
        });
    };

    for (var _i2 = 0; _i2 < openingMenuIconArray.length; _i2++) {
        _loop2(_i2);
    };

    //Listens for if the player stops hovering over any menu icons and dehighlights that element.

    var _loop3 = function _loop3(_i3) {
        openingMenuIconArray[_i3].addEventListener("mouseout", function () {
            //Dehighlights the menuIcon that had the mouse move away from it.
            revertLevelIcon(_i3);
        });
    };

    for (var _i3 = 0; _i3 < openingMenuIconArray.length; _i3++) {
        _loop3(_i3);
    };

    //Selection Handling

    function exitOpeningMenu(selectedIcon) {
        //Makes all unlocked HTML menu elements hidden.
        for (var _i4 = 0; _i4 < openingMenuIconArray.length; _i4++) {
            openingMenuIconArray[_i4].style.visibility = "hidden";
        };

        //Removes all menu-specific eventListeners and timers.

        var _loop4 = function _loop4(_i5) {
            openingMenuIconArray[_i5].removeEventListener("click", function () {
                exitOpeningMenu(openingMenuIconArray[_i5]);
            });
        };

        for (var _i5 = 0; _i5 < openingMenuIconArray.length; _i5++) {
            _loop4(_i5);
        };

        var _loop5 = function _loop5(_i6) {
            openingMenuIconArray[_i6].removeEventListener("mouseover", function () {
                //Highlights the menuIcon that currently has the mouse over it.
                highlightLevelIcon(_i6);
            });
        };

        for (var _i6 = 0; _i6 < openingMenuIconArray.length; _i6++) {
            _loop5(_i6);
        };

        //Listens for if the player stops hovering over any menu icons and dehighlights that element.

        var _loop6 = function _loop6(_i7) {
            openingMenuIconArray[_i7].removeEventListener("mouseout", function () {
                //Dehighlights the menuIcon that had the mouse move away from it.
                revertLevelIcon(_i7);
            });
        };

        for (var _i7 = 0; _i7 < openingMenuIconArray.length; _i7++) {
            _loop6(_i7);
        };

        //Changes how the game continues depending on the selectedIcon that was pressed.
        if (selectedIcon.id === "newGameMenuIcon") {
            //Deletes all save data, resets the variables, and begins the game.
            localStorage.clear();
            loadSavedData();
            callCurrentLevel();
        } else if (selectedIcon.id === "continueGameMenuIcon") {
            //Loads all save data and enters the levelMenu.
            loadSavedData();
            initializeLevelMenu();
        };
    };
};

function initializeLevelMenu() {
    gameState = "inLevelMenu";

    //Creates an array of all 13 menu Icon IDs.
    var levelMenuIconArray = document.querySelectorAll(".levelMenuIcon");

    //If followMouse is true, then whatever icon that the mouse is over will be highlighted.
    var followMouse = false;

    //This timer allows for keys to be used in menus after half a second of the mouse idling.
    var stopFollowingMouse = void 0;

    //Makes all unlocked HTML menu elements visible.
    for (var i = 0; i < numUnlockedLevels; i++) {
        levelMenuIconArray[i].style.visibility = "visible";
    };

    //Clicking Handling

    //Begins the level that is clicked on (even if followMouse is false).

    var _loop7 = function _loop7(_i8) {
        levelMenuIconArray[_i8].addEventListener("click", function () {
            beginSelectedLevel(_i8 + 1);
        });
    };

    for (var _i8 = 0; _i8 < numUnlockedLevels; _i8++) {
        _loop7(_i8);
    };

    //Hovering Handling

    function highlightLevelIcon(iconNum) {
        levelMenuIconArray[iconNum].style.outline = "5px solid " + changingColorTwo;
        levelMenuIconArray[iconNum].style.color = changingColorTwo;
        levelMenuIconArray[iconNum].style.backgroundColor = changingColorOne;
    };

    function revertLevelIcon(iconNum) {
        levelMenuIconArray[iconNum].style.outline = "5px solid white";
        levelMenuIconArray[iconNum].style.color = "white";
        levelMenuIconArray[iconNum].style.backgroundColor = "black";
    };

    //Stops following the mouse (allows for following keys) after half a second of not moving the mouse.
    function checkFollowMouse() {
        clearTimeout(stopFollowingMouse);
        followMouse = true;
        stopFollowingMouse = setTimeout(function () {
            followMouse = false;
        }, 500);
    };

    document.addEventListener("mousemove", checkFollowMouse);

    //Listens for if the player hovers over any menu icons and highlights that element (if they aren't using the keys to navigate 
    //the menu).

    var _loop8 = function _loop8(_i9) {
        levelMenuIconArray[_i9].addEventListener("mouseover", function () {
            if (followMouse) {
                //Dehighlights the previously highlighted icon as the mouse may be over a different icon, which is then highlighted.
                revertLevelIcon(levelHoveringIconNum);
                levelHoveringIconNum = _i9;
                highlightLevelIcon(levelHoveringIconNum);
            };
        });
    };

    for (var _i9 = 0; _i9 < numUnlockedLevels; _i9++) {
        _loop8(_i9);
    };

    var checkFollowKeys = setInterval(function () {
        //Dehighlights the previous hovering icon (as it may change depending on key inputs during this function).
        revertLevelIcon(levelHoveringIconNum);

        //Moves the levelHoveringIconNum if any keys are pressed.

        //Left
        if (keysDown[65]) {
            levelHoveringIconNum--;
        };

        //Right
        if (keysDown[68]) {
            levelHoveringIconNum++;
        };

        //Up
        if (keysDown[87]) {
            levelHoveringIconNum -= 4;
        };

        //Down
        if (keysDown[83]) {
            levelHoveringIconNum += 4;
        };

        //Limits moving the cursor to only unlocked level icons.
        levelHoveringIconNum = Math.min(levelHoveringIconNum, numUnlockedLevels - 1);
        levelHoveringIconNum = Math.max(levelHoveringIconNum, 0);

        //Highlights the new levelHoveringIconNum (which may be different than the previous hovering icon if a key was pressed).
        highlightLevelIcon(levelHoveringIconNum);

        //Begins the currently highlighted level (even if followMouse is still true).
        if (keysDown[16] || keysDown[32]) {
            //Prevents the keys from being counted as pressed down again (until the key is lifted again).
            delete keysDown[16];
            delete keysDown[32];

            beginSelectedLevel(levelHoveringIconNum + 1);
        };
    }, 120);

    //Selection Handling

    function beginSelectedLevel(iconNum) {
        currentLevelNum = iconNum;

        //Makes all unlocked HTML menu elements hidden.
        for (var _i10 = 0; _i10 < numUnlockedLevels; _i10++) {
            levelMenuIconArray[_i10].style.visibility = "hidden";
        };

        //Removes all menu-specific eventListeners and timers.

        document.removeEventListener("mousemove", checkFollowMouse);

        var _loop9 = function _loop9(_i11) {
            levelMenuIconArray[_i11].removeEventListener("click", function () {
                beginSelectedLevel(_i11 + 1);
            });
        };

        for (var _i11 = 0; _i11 < numUnlockedLevels; _i11++) {
            _loop9(_i11);
        };

        var _loop10 = function _loop10(_i12) {
            levelMenuIconArray[_i12].removeEventListener("mouseover", function () {
                if (followMouse) {
                    revertLevelIcon(levelHoveringIconNum);
                    levelHoveringIconNum = _i12;
                    highlightLevelIcon(levelHoveringIconNum);
                };
            });
        };

        for (var _i12 = 0; _i12 < numUnlockedLevels; _i12++) {
            _loop10(_i12);
        };

        clearInterval(checkFollowKeys);

        //Begins the level that the player clicked the corresponding icon for.
        callCurrentLevel();
    };
};;

//Level-Handling Helper Functions

//Resolves all instances' promises and timeouts and splices them from their instance array.
function resolveAllInstances() {
    //Updates the allInstances array to contain all different instance arrays.
    updateAllInstances();

    //Sorts through each instance array in allInstances. 
    for (var i = 0; i < allInstances.length; i++) {
        //The for loop's length is determined before it starts to avoid missing the first element.
        var initialArrayLength = allInstances[i].length;
        var instanceArray = allInstances[i];

        //Resolves each instance's Promises and timeouts and removes the instance from their instance array.
        for (var j = initialArrayLength - 1; j >= 0; j--) {
            var instance = instanceArray[j];
            instance.externalResolve();
            clearTimeout(instance.timeout);
            instanceArray.splice(j, 1);
        };
    };
};

//Rejects all instances' promises and timeouts and splices them from their instance array.
function rejectAllInstances() {
    //Updates the allInstances array to contain all different instance arrays.
    updateAllInstances();

    //Sorts through each instance array in allInstances. 
    for (var i = 0; i < allInstances.length; i++) {
        //The for loop's length is determined before it starts to avoid missing the first element.
        var initialArrayLength = allInstances[i].length;
        var instanceArray = allInstances[i];

        //Rejects each instance's Promises and timeouts and removes the instance from their instance array.
        for (var j = initialArrayLength - 1; j >= 0; j--) {
            var instance = instanceArray[j];
            instance.externalReject();
            clearTimeout(instance.timeout);
            instanceArray.splice(j, 1);
        };
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

//Timing Functions

//Adds a "unique" timeout to an array so that it can be easily deactivated (when the game stops).
function addUniqueTimeout(timeout) {
    uniqueTimeouts.push(timeout);
};

//Removes a timeout from the array of "unique" timeouts.
function removeUniqueTimeout(timeout) {
    var uniqueTimeoutIndex = uniqueTimeouts.indexOf(timeout);
    uniqueTimeouts.splice(uniqueTimeoutIndex, 1);
};

//Adds a "unique" interval to an array so that it can be easily deactivated (when the game stops).
function addUniqueInterval(interval) {
    uniqueIntervals.push(interval);
};

//Removes a interval from the array of "unique" intervals and clears it.
function removeUniqueInterval(interval) {
    clearInterval(interval);
    var uniqueIntervalIndex = uniqueIntervals.indexOf(interval);
    uniqueIntervals.splice(uniqueIntervalIndex, 1);
};

//Clears and destroys all current timing events.
function stopUniqueTimingEvents() {
    //Clears and deletes from uniqueIntervals all "unique" timeouts so that they don't execute.
    for (var i = 0; i < uniqueTimeouts.length; i++) {
        clearTimeout(uniqueTimeouts[i]);
    };

    uniqueTimeouts.splice(0);

    //Clears and deletes from uniqueIntervals all "unique" intervals so that they don't execute anymore.
    for (var _i13 = 0; _i13 < uniqueIntervals.length; _i13++) {
        clearInterval(uniqueIntervals[_i13]);
    };

    uniqueIntervals.splice(0);
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
        removeUniqueTimeout(endDashRecovery);
    }, dashRecoverySeconds * 1000);
    addUniqueTimeout(endDashRecovery);

    //Sets an interval to the length of the dash recovery which counts down the semi-accurate remaining length of the timeout.
    //This is used in drawing the remaining seconds meter to show the player how much more recovery time that they need to wait.
    blockie.remainingDashSeconds = allowDashAgainSeconds;
    var remainingDashSecondsInterval = setInterval(function () {
        blockie.remainingDashSeconds -= 0.07;
    }, 70);
    addUniqueInterval(remainingDashSecondsInterval);

    var resetAllowDashAgain = setTimeout(function () {
        allowDashAgain = true;
        removeUniqueInterval(remainingDashSecondsInterval);
        removeUniqueTimeout(resetAllowDashAgain);
    }, allowDashAgainSeconds * 1000);
    addUniqueTimeout(resetAllowDashAgain);
};

//Allows for dashing again.
function resetBlockieState() {
    blockie.state = "playing";
    recoveringFromDash = false;
    allowDashAgain = true;

    //Prevents the key from being counted as pressed down again (until the key is lifted again).
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
};;;;;;;;;;;;;;;;;;;;

//Instance Helper Functions

function updateAllInstances() {
    allInstances = [waitingTimeouts, endScreenTimeouts, passivePoints, movingPassivePoints, activePoints, movingActivePoints, movingHorizontalLasers, movingVerticalLasers, bombs, movingBombs, walls, movingWalls];
};

function updateAllInteractiveInstances() {
    allInteractiveInstances = [passivePoints, movingPassivePoints, activePoints, movingActivePoints, movingHorizontalLasers, movingVerticalLasers, bombs, movingBombs];
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
        context.fillStyle = blockieSurroundingColor;
        context.fillRect(blockie.x + 4, blockie.y - 8, 24 * (blockie.remainingDashSeconds / allowDashAgainSeconds), 4);
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
            removeUniqueTimeout(animateBlockieDestructing);
            removeUniqueTimeout(endAnimateBlockieDestructing);
        }, 1.5 * 1000);
        addUniqueTimeout(endAnimateBlockieDestructing);

        var animateBlockieDestructing = setInterval(function () {
            blockie.sx += blockie.width;
        }, 0.5 * 1000);
        addUniqueTimeout(animateBlockieDestructing);
    };
};

function drawBlockie() {
    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.width, blockie.height, blockie.x, blockie.y, blockie.width, blockie.height);
};

function drawPassivePoints() {
    for (var i = 0; i < passivePoints.length; i++) {
        var currentInstance = passivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = passivePointColor;
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = passivePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = passivePointColor;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawMovingPassivePoints() {
    for (var i = 0; i < movingPassivePoints.length; i++) {
        var currentInstance = movingPassivePoints[i];

        //Draws the remaining seconds meter for when the point will disappear.
        context.fillStyle = passivePointColor;
        context.fillRect(currentInstance.x, currentInstance.y - 8, currentInstance.width * (currentInstance.remainingFiringSeconds / currentInstance.totalFiringSeconds), 4);

        //Draws the point itself.
        if (currentInstance.visible) {
            //Changes the sprite depending on the state of the instance.
            if (currentInstance.state == "warning") {
                context.strokeStyle = passivePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = passivePointColor;
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
                context.strokeStyle = activePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = activePointColor;
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
                context.strokeStyle = activePointColor;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = activePointColor;
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
                context.fillStyle = changingColorTwo;

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Left warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + 16, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.lineTo(currentInstance.x + 24, currentInstance.y + currentInstance.height * Math.max(Math.sign(currentInstance.speed), 0));
                context.lineTo(currentInstance.x + 32, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.fill();

                //Right warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.width - 16, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.lineTo(currentInstance.width - 24, currentInstance.y + currentInstance.height * Math.max(Math.sign(currentInstance.speed), 0));
                context.lineTo(currentInstance.width - 32, currentInstance.y + currentInstance.height * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)));
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
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
                context.fillStyle = changingColorTwo;

                //Warning triangles are complex because they must face the direction of the laser's speed.
                //Top warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.y + 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(Math.sign(currentInstance.speed), 0), currentInstance.y + 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.y + 32);
                context.fill();

                //Bottom warning triangle.
                context.beginPath();
                context.moveTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.height - 16);
                context.lineTo(currentInstance.x + currentInstance.width * Math.max(Math.sign(currentInstance.speed), 0), currentInstance.height - 24);
                context.lineTo(currentInstance.x + currentInstance.width * Math.abs(Math.min(Math.sign(currentInstance.speed), 0)), currentInstance.height - 32);
                context.fill();
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
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
                context.strokeStyle = changingColorTwo;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
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
                context.strokeStyle = changingColorTwo;
                context.strokeRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            } else if (currentInstance.state == "firing") {
                context.fillStyle = changingColorTwo;
                context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
            };
        };
    };
};

function drawWalls() {
    for (var i = 0; i < walls.length; i++) {
        var currentInstance = walls[i];
        context.fillStyle = changingColorOne;
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawMovingWalls() {
    for (var i = 0; i < movingWalls.length; i++) {
        var currentInstance = movingWalls[i];
        context.fillStyle = changingColorOne;
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    };
};

function drawPartyHats() {
    for (var i = 0; i < partyHats.length; i++) {
        var currentInstance = partyHats[i];

        context.fillStyle = blockieSurroundingColor;

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
        for (var _i14 = 0; _i14 < currentClass.length; _i14++) {
            checkInstancesColliding(blockie, currentClass[_i14]);
        };
    };
};

function checkTestCollisionsWithClasses(instanceOneX, instanceOneY, classesArray) {
    preventingMovement = false;

    checkBlockieOutsideBorder(blockie, instanceOneX, instanceOneY);

    for (var i = 0; i < classesArray.length; i++) {
        var currentClass = classesArray[i];
        for (var _i15 = 0; _i15 < currentClass.length; _i15++) {
            checkTestInstancesColliding(blockie, instanceOneX, instanceOneY, currentClass[_i15]);
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
};;

//Audio Functions

function stopAudioElement(audioElement) {
    audioElement.currentTime = 0;
    audioElement.pause();
};

function initializeLevelSong() {
    if (currentLevelNum == 13) {
        currentSong = runningOut;
    } else if (currentLevelNum % 4 == 0) {
        currentSong = runningOut;
    } else {
        currentSong = runningOut;
    }

    currentSong.play();
};

//Micellaneous Functions

//Creates a timer that resets the level if the counter reaches 0.
function createCountdownTimer(totalSeconds) {
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
            stopLevel("countdownTimerEnded");
        };
    }, 1000);
};

//Sets the countdownTimer to be invisible and clears its interval.
function destroyCountdownTimer() {
    var countdownTimerContainer = document.getElementById("countdownTimerContainer");
    countdownTimerContainer.style.visibility = "hidden";
    clearInterval(countdown);
};

//Allows for the color scheme of the game to be swapped by pressing "i";
function changeColors() {
    if (keysDown[73]) {
        //Prevents the key from being counted as pressed down again (until the key is lifted again).
        delete keysDown[73];

        if (changingColorOne === purple) {
            changingColorOne = blue;
        } else if (changingColorOne === blue) {
            changingColorOne = purple;
        };

        if (changingColorTwo === orange) {
            changingColorTwo = yellow;
        } else if (changingColorTwo === yellow) {
            changingColorTwo = orange;
        };
    };

    window.requestAnimationFrame(changeColors);
};

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
};

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Game loop

function gameLoop() {
    if (gameState === "playing") {
        //Restarts the level if O is pressed.
        if (keysDown[79]) {
            //Prevents the key from being counted as pressed down again (until the key is lifted again).
            delete keysDown[79];

            stopLevel("restartLevelPressed");
        };

        //Enters the level menu if P is pressed.
        if (keysDown[80]) {
            //Prevents the key from being counted as pressed down again (until the key is lifted again).
            delete keysDown[80];

            stopLevel("enterMenuPressed");
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
            //Left
            if (keysDown[65]) {
                xInput--;
            };

            //Right
            if (keysDown[68]) {
                xInput++;
            };

            //Up
            if (keysDown[87]) {
                yInput--;
            };

            //Down
            if (keysDown[83]) {
                yInput++;
            };

            if ((keysDown[16] || keysDown[32]) && allowDashAgain && (xInput !== 0 || yInput !== 0)) {
                //Prevents the keys from being counted as pressed down again (until the key is lifted again).
                delete keysDown[16];
                delete keysDown[32];

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

        //Checks if Blockie is colliding after everything has moved, and if so, restarts the level (because he's being crushed by 
        //walls and/or the canvas's edge).
        checkTestCollisionsWithClasses(blockie.x, blockie.y, allCollisionInstances);
        if (preventingMovement) {
            stopLevel("died");
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

                endScreen();

                //Allows for Blockie to touch activePoints if they are underneath collisions, since the loop stops checking for other
                //collisions once Blockie has touched an active point.
                break;
            } else {
                //Kills Blockie if he's touching a harmful obstacle (bombs and lasers).
                stopLevel("died");
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
    //Updates the high score in the points div of the level that is being played or hovered over.
    if (gameState === "playingCutscene" || gameState === "inOpeningMenu") {
        document.getElementById("points").innerHTML = "";
    } else if (gameState === "inLevelMenu") {
        document.getElementById("points").innerHTML = "Points: " + earnedPoints[levelHoveringIconNum] + "|" + possiblePoints[levelHoveringIconNum];
    } else {
        document.getElementById("points").innerHTML = "Points: " + currentLevelPoints + "|" + possiblePoints[currentLevelNum - 1];
    };

    //Updates the number in the level div of the level that is being played or hovered over.
    if (gameState === "playingCutscene" || gameState === "inOpeningMenu") {
        document.getElementById("level").innerHTML = "";
    } else if (gameState === "inLevelMenu") {
        if (levelHoveringIconNum + 1 < 13) {
            document.getElementById("level").innerHTML = "Level: " + (levelHoveringIconNum + 1);
        } else {
            document.getElementById("level").innerHTML = "Level: END";
        };
    } else {
        document.getElementById("level").innerHTML = "Level: " + currentLevelNum;
    };

    //Clears the canvas so that it can be redrawn with updated locations, instances, and states.
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState !== "displayingMessage" && gameState !== "playingCutscene" && gameState !== "inOpeningMenu" && gameState !== "inLevelMenu") {
        animateBlockie();
        drawBlockie();
    };

    if (gameState === "playing") {
        drawPassivePoints();
        drawMovingPassivePoints();
        drawActivePoints();
        drawMovingHorizontalLasers();
        drawMovingVerticalLasers();
        drawMovingActivePoints();
        drawWalls();
        drawMovingWalls();
        drawBombs();
        drawMovingBombs();
    } else if (gameState === "finishingLevel") {
        drawPartyHats();
    };

    //Continuously recalls the function.
    window.requestAnimationFrame(drawingLoop);
};

//Refresh Handling

window.addEventListener("beforeunload", function () {
    localStorage.setItem("currentLevelNum", currentLevelNum);
    localStorage.setItem("numUnlockedLevels", numUnlockedLevels);
    localStorage.setItem("earnedPoints", earnedPoints);
});

//Check Page Focus

//Since this game uses async-await and timers regularly, having the browser focus on other tabs completely ruins the game's structure
//(timing of instances, etc.); therefore, once the player refocusses on the tab, the level restarts.
function checkPageFocus() {
    if (!document.hasFocus() && gameState === "playing") {
        stopLevel("lostFocus");
    };

    window.requestAnimationFrame(checkPageFocus);
};

//Start Game

initializeOpeningScreenMenu();

initializeKeyInputs();
window.requestAnimationFrame(checkPageFocus);
window.requestAnimationFrame(gameLoop);
window.requestAnimationFrame(drawingLoop);
window.requestAnimationFrame(changeColors);
window.requestAnimationFrame(scaleGame);