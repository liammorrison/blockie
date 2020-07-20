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

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

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

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context2.next = 22;
                        break;

                    case 19:
                        _context2.prev = 19;
                        _context2.t0 = _context2["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

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
                        return Promise.all([createWall(0, 0, sevenSixteenths, fullScreen), createWall(sevenSixteenths, 0, oneEigth, sevenSixteenths), createWall(sevenSixteenths, nineSixteenths, oneEigth, oneSixteenth), createWall(sevenSixteenths, threeFourths, oneEigth, oneSixteenth), createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth), createWall(nineSixteenths, 0, sevenSixteenths, fullScreen), createActivePoint(oneHalf - 8, oneHalf - 8, 0), createPassivePoint(oneHalf - 8, elevenSixteenths - 8, 0, 10)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context3.next = 8;
                        return Promise.all([createWall(0, 0, fullScreen, oneSixteenth), createWall(0, threeSixteenths, fullScreen, oneSixteenth), createWall(0, threeEigths, fullScreen, oneSixteenth), createWall(0, nineSixteenths, fullScreen, sevenSixteenths), createWall(0, 0, oneSixteenth, fullScreen), createWall(threeSixteenths, 0, oneSixteenth, fullScreen), createWall(threeEigths, 0, oneSixteenth, fullScreen), createWall(nineSixteenths, 0, oneSixteenth, fullScreen), createWall(threeFourths, 0, oneSixteenth, fullScreen), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), createPassivePoint(oneEigth - 8, oneHalf - 8, 0, 16), createPassivePoint(sevenEigths - 8, oneHalf - 8, 0, 16), loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 1, 1, 1), loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 1, 1, 1), loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 1, 1, 1), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 1), loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 1), loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 1, 1, 1), loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 1, 1, 1), createActivePoint(oneHalf - 8, oneEigth - 8, 3)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context3.next = 11;
                        return Promise.all([createWall(0, 0, sevenSixteenths, fullScreen), createWall(nineSixteenths, 0, sevenSixteenths, fullScreen), createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0), fireMovingHorizontalLaser(fullScreen - 32, 32, -1.5, 0, 5)]);

                    case 11:

                        cancelAwaitChain = false;

                        _context3.next = 14;
                        return Promise.all([createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), loopFireMovingHorizontalLasers(0, 32, 2, 0, 1, 4), loopFireMovingHorizontalLasers(0, 32, 2, 2, 1, 4), loopFireMovingHorizontalLasers(0, 32, 2, 4, 1, 4), loopFireMovingHorizontalLasers(0, 32, 2, 6, 1, 4)]);

                    case 14:

                        cancelAwaitChain = false;

                        destroyCountdownTimer();

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context3.next = 23;
                        break;

                    case 20:
                        _context3.prev = 20;
                        _context3.t0 = _context3["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

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

var levelFour = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, oneEigth + blockieAdjustment);

                        createCountdownTimer(35);

                        cancelAwaitChain = false;

                        _context4.next = 6;
                        return Promise.all([createWall(threeEigths, 0, oneSixteenth, sevenEigths), createWall(oneEigth, 0, oneFourth, sevenSixteenths), createWall(oneEigth, nineSixteenths, oneFourth, fiveSixteenths), createWall(nineSixteenths, 0, sevenSixteenths, fullScreen), createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0), createPassivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0, 9), fireMovingVerticalLaser(27 * 16, 16, -1, 2, 9), fireMovingVerticalLaser(29 * 16, 16, -1, 2, 9), fireMovingVerticalLaser(fullScreen - 16, 16, -1, 2, 9)]);

                    case 6:

                        cancelAwaitChain = false;

                        _context4.next = 9;
                        return Promise.all([createWall(oneEigth, 0, fiveSixteenths, sevenEigths), createWall(nineSixteenths, 0, oneHalf, fullScreen), createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), loopFireBombs(0, 0, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(0, oneEigth, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(0, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(0, threeEigths, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(0, oneHalf, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(0, fiveEigths, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(0, threeFourths, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(0, sevenEigths, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, 0, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneEigth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, threeEigths, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneHalf, oneEigth, oneEigth, 0.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(sevenSixteenths, threeFourths, oneEigth, oneEigth, 1.5, 0.5, 0.5), loopFireBombs(sevenSixteenths, sevenEigths, oneEigth, oneEigth, 1, 0.5, 0.5)]);

                    case 9:

                        cancelAwaitChain = false;

                        _context4.next = 12;
                        return Promise.all([createWall(0, 0, sevenSixteenths, fullScreen), createWall(nineSixteenths, 0, sevenSixteenths, oneFourth), createWall(nineSixteenths, oneFourth, oneSixteenth, threeEigths), createWall(nineSixteenths, threeFourths, threeSixteenths, oneFourth), createWall(threeFourths, oneFourth, oneFourth, threeFourths), createActivePoint(oneHalf - 8, sevenEigths - 8, 0), createPassivePoint(elevenSixteenths - 8, fiveSixteenths - 8, 0, 5)]);

                    case 12:

                        cancelAwaitChain = false;

                        _context4.next = 15;
                        return Promise.all([createWall(0, 0, fullScreen, oneFourth), createWall(0, oneFourth, oneFourth, thirteenSixteenths), createWall(threeFourths, oneFourth, oneFourth, thirteenSixteenths), createWall(oneFourth, oneFourth, threeSixteenths, threeSixteenths), createWall(nineSixteenths, oneFourth, threeSixteenths, threeSixteenths), createWall(oneFourth, nineSixteenths, threeSixteenths, sevenSixteenths), createWall(nineSixteenths, nineSixteenths, threeSixteenths, sevenSixteenths), createWall(sevenSixteenths, fifteenSixteenths, oneEigth, oneSixteenth), fireBomb(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 0.7, 0.7), fireBomb(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 1.4, 0.7), fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7), fireBomb(oneFourth, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7), fireBomb(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 2.1, 0.7), fireMovingHorizontalLaser(0, 32, 2, 2.1, 10), createActivePoint(oneHalf - 8, oneHalf - 8, 3)]);

                    case 15:

                        cancelAwaitChain = false;

                        _context4.next = 18;
                        return Promise.all([fireBomb(16, 0, fifteenSixteenths, oneEigth, 0, 1), fireBomb(16, threeEigths, fifteenSixteenths, oneFourth, 0.15, 1), fireBomb(16, sevenEigths, fifteenSixteenths, oneEigth, 0.3, 1), fireBomb(0, 16, oneEigth, fifteenSixteenths, 2.45, 1), fireBomb(threeEigths, 16, oneFourth, fifteenSixteenths, 2.6, 1), fireBomb(sevenEigths, 16, oneEigth, fifteenSixteenths, 2.75, 1), createActivePoint(oneHalf - 8, oneHalf - 8, 7), fireBomb(oneEigth, 16, oneFourth, fifteenSixteenths, 4.75, 1), fireBomb(fiveEigths, 16, oneFourth, fifteenSixteenths, 4.9, 1), fireBomb(16, oneEigth, fifteenSixteenths, oneFourth, 5.05, 1), fireBomb(16, fiveEigths, fifteenSixteenths, oneFourth, 5.2, 1)]);

                    case 18:

                        cancelAwaitChain = false;

                        destroyCountdownTimer();

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context4.next = 27;
                        break;

                    case 24:
                        _context4.prev = 24;
                        _context4.t0 = _context4["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 27:
                        ;

                    case 28:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[0, 24]]);
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
                        _context5.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context5.next = 5;
                        return Promise.all([createWall(0, 0, fullScreen, oneFourth), createWall(0, oneFourth, oneFourth, oneHalf), createWall(threeFourths, oneFourth, oneFourth, oneHalf), createWall(0, threeFourths, sevenSixteenths, oneEigth), createWall(nineSixteenths, threeFourths, sevenSixteenths, oneEigth), createActivePoint(oneEigth - 8, fifteenSixteenths - 8, 0), createPassivePoint(sevenEigths - 8, fifteenSixteenths - 8, 2, 7)]);

                    case 5:

                        cancelAwaitChain = false;

                        moveBlockie(oneEigth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);

                        _context5.next = 9;
                        return Promise.all([createWall(oneFourth, oneFourth, threeSixteenths, threeFourths), createWall(sevenSixteenths, threeEigths, oneEigth, fiveEigths), createWall(nineSixteenths, oneFourth, threeSixteenths, threeFourths), createActivePoint(sevenEigths - 8, sevenEigths - 8, 0), createPassivePoint(oneHalf - 8, fiveSixteenths - 8, 5, 7), loopFireBombs(0, oneFourth, oneFourth, oneSixteenth, 0.7, 0, 0.4), loopFireBombs(0, oneHalf, oneFourth, oneSixteenth, 0, 0, 0.4), loopFireBombs(0, threeFourths, oneFourth, oneSixteenth, 0.7, 0, 0.4), fireMovingHorizontalLaser(0, 32, 1.4, 7, 10)]);

                    case 9:

                        cancelAwaitChain = false;

                        moveBlockie(sevenEigths + blockieAdjustment, sevenEigths + blockieAdjustment);

                        _context5.next = 13;
                        return Promise.all([createWall(0, 0, fullScreen, oneSixteenth), createWall(0, threeSixteenths, fullScreen, oneSixteenth), createWall(0, threeEigths, fullScreen, oneSixteenth), createWall(0, nineSixteenths, fullScreen, oneSixteenth), createWall(0, threeFourths, fullScreen, oneSixteenth), createWall(0, fifteenSixteenths, fullScreen, oneSixteenth), createWall(0, 0, oneSixteenth, fullScreen), createWall(threeSixteenths, 0, oneSixteenth, fullScreen), createWall(threeEigths, 0, oneSixteenth, fullScreen), createWall(nineSixteenths, 0, oneSixteenth, fullScreen), createWall(threeFourths, 0, oneSixteenth, fullScreen), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), createActivePoint(oneEigth - 8, oneEigth - 8, 0), createPassivePoint(oneEigth - 8, sevenEigths - 8, 0, 17), createPassivePoint(oneHalf - 8, oneHalf - 8, 7, 7), loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 2, 2, 1), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 2, 2, 1), loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 2, 2, 1), loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 2, 2, 1), loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(fiveEigths, fiveEigths, oneEigth, oneEigth, 2, 2, 1), loopFireBombs(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(oneFourth, thirteenSixteenths, oneEigth, oneEigth, 0, 2, 1), loopFireBombs(fiveEigths, thirteenSixteenths, oneEigth, oneEigth, 0, 2, 1)]);

                    case 13:

                        cancelAwaitChain = false;

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context5.next = 21;
                        break;

                    case 18:
                        _context5.prev = 18;
                        _context5.t0 = _context5["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 21:
                        ;

                    case 22:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[0, 18]]);
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
                        _context6.prev = 0;

                        initializeLevel(oneEigth + blockieAdjustment, oneEigth + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context6.next = 5;
                        return Promise.all([createWall(0, threeSixteenths, thirteenSixteenths, oneFourth), createWall(0, sevenSixteenths, sevenSixteenths, oneEigth), createWall(0, nineSixteenths, fullScreen, sevenSixteenths), createWall(0, 0, oneSixteenth, threeSixteenths), createWall(oneSixteenth, 0, fifteenSixteenths, oneSixteenth), createWall(fifteenSixteenths, oneSixteenth, oneSixteenth, oneHalf), createWall(17 * 16, oneSixteenth, oneSixteenth, oneEigth), createWall(thirteenSixteenths, threeEigths, oneEigth, oneSixteenth), createActivePoint(oneHalf - 8, oneHalf - 8, 0), loopFireBombs(9 * 16, oneSixteenth, oneFourth, oneEigth, 0.75, 0.5, 0.75), loopFireBombs(thirteenSixteenths, oneSixteenth, oneEigth, fiveSixteenths, 0.75, 0.5, 0.75)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context6.next = 8;
                        return Promise.all([createWall(0, 0, fullScreen, oneFourth), createWall(0, oneFourth, oneFourth, oneHalf), createWall(threeFourths, oneFourth, oneFourth, oneHalf), createWall(0, threeFourths, sevenSixteenths, oneEigth), createWall(nineSixteenths, threeFourths, sevenSixteenths, oneEigth), createActivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0), loopFireBombs(oneEigth, sevenEigths, fiveSixteenths, oneEigth, 0, 0.5, 0.75), loopFireBombs(nineSixteenths, sevenEigths, fiveSixteenths, oneEigth, 0, 0.5, 0.75), createPassivePoint(fifteenSixteenths - 8, fifteenSixteenths - 8, 2.5, 7)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context6.next = 11;
                        return Promise.all([createWall(0, 0, sevenSixteenths, sevenEigths), createWall(sevenSixteenths, 0, oneEigth, sevenSixteenths), createWall(nineSixteenths, 0, sevenSixteenths, fullScreen), createActivePoint(oneHalf - 8, oneHalf - 8, 0), fireMovingHorizontalLaser(0, 16, 0.7, 0, 10), fireMovingHorizontalLaser(31 * 16, 16, -1.6, 2, 10)]);

                    case 11:

                        cancelAwaitChain = false;

                        moveBlockie(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);

                        _context6.next = 15;
                        return Promise.all([createActivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0), fireBomb(15 * 16, 15 * 16, oneSixteenth, oneSixteenth, 0.15, 0.5), fireBomb(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 0.3, 0.5), fireBomb(13 * 16, 13 * 16, threeSixteenths, threeSixteenths, 0.45, 0.5), fireBomb(threeEigths, threeEigths, oneFourth, oneFourth, 0.6, 0.5), fireBomb(11 * 16, 11 * 16, fiveSixteenths, fiveSixteenths, 0.75, 0.5), fireBomb(fiveSixteenths, fiveSixteenths, threeEigths, threeEigths, 0.9, 0.5), fireBomb(9 * 16, 9 * 16, sevenSixteenths, sevenSixteenths, 1.05, 0.5), fireBomb(oneFourth, oneFourth, oneHalf, oneHalf, 1.2, 0.5), fireBomb(7 * 16, 7 * 16, nineSixteenths, nineSixteenths, 1.35, 0.5), fireBomb(threeSixteenths, threeSixteenths, fiveEigths, fiveEigths, 1.5, 0.5), fireBomb(5 * 16, 5 * 16, elevenSixteenths, elevenSixteenths, 1.65, 0.5), fireBomb(oneEigth, oneEigth, threeFourths, threeFourths, 1.8, 0.5), fireBomb(3 * 16, 3 * 16, thirteenSixteenths, thirteenSixteenths, 1.95, 0.5), fireBomb(oneSixteenth, oneSixteenth, sevenEigths, sevenEigths, 2.1, 0.5), fireBomb(1 * 16, 1 * 16, fifteenSixteenths, fifteenSixteenths, 2.25, 0.5), fireBomb(0, 0, fullScreen, fullScreen, 2.4, 0.5)]);

                    case 15:

                        cancelAwaitChain = false;

                        moveBlockie(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);

                        _context6.next = 19;
                        return Promise.all([createActivePoint(oneHalf - 8, oneHalf - 8, 0), fireMovingHorizontalLaser(0, oneEigth, 1.4, 0, 10), fireMovingVerticalLaser(sevenEigths, oneEigth, -1.4, 0, 10)]);

                    case 19:

                        cancelAwaitChain = false;

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context6.next = 27;
                        break;

                    case 24:
                        _context6.prev = 24;
                        _context6.t0 = _context6["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 27:
                        ;

                    case 28:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[0, 24]]);
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
                        _context7.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context7.next = 5;
                        return Promise.all([createWall(0, 0, fullScreen, sevenSixteenths), createWall(0, sevenSixteenths, 13 * 16, oneEigth), createWall(nineSixteenths, sevenSixteenths, nineSixteenths, oneEigth), createWall(0, nineSixteenths, oneFourth, oneSixteenth), createWall(oneFourth, nineSixteenths, 5 * 16, 16), createWall(13 * 16, 19 * 16, 5 * 16, 16), createWall(nineSixteenths, nineSixteenths, sevenSixteenths, oneSixteenth), createWall(0, fiveEigths, oneFourth, oneEigth), createWall(13 * 16, fiveEigths, 19 * 16, oneEigth), createWall(0, threeFourths, fullScreen, oneSixteenth), createWall(0, thirteenSixteenths, oneSixteenth, oneEigth), createWall(threeSixteenths, thirteenSixteenths, thirteenSixteenths, oneEigth), createWall(0, fifteenSixteenths, fullScreen, oneSixteenth), createActivePoint(oneEigth - 8, sevenEigths - 8, 0)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context7.next = 8;
                        return Promise.all([createWall(0, 0, threeFourths, oneFourth), createWall(0, oneFourth, oneHalf, oneFourth), createWall(threeFourths, oneFourth, oneFourth, oneFourth), createWall(0, oneHalf, oneFourth, oneFourth), createWall(oneHalf, oneHalf, oneHalf, oneFourth), createWall(oneFourth, threeFourths, threeFourths, oneFourth), createActivePoint(sevenEigths - 8, oneEigth - 8, 0), loopFireBombs(threeFourths, 0, oneFourth, oneFourth, 0, 0.5, 0.5), loopFireBombs(oneHalf, oneFourth, oneFourth, oneFourth, 1, 0.5, 0.5), loopFireBombs(oneFourth, oneHalf, oneFourth, oneFourth, 0, 0.5, 0.5), loopFireBombs(0, threeFourths, oneFourth, oneFourth, 1, 0.5, 0.5)]);

                    case 8:

                        cancelAwaitChain = false;

                        _context7.next = 11;
                        return Promise.all([createWall(0, 0, threeFourths, oneEigth), createWall(0, oneEigth, fiveEigths, oneEigth), createWall(0, oneFourth, oneHalf, oneEigth), createWall(sevenEigths, oneFourth, oneEigth, oneEigth), createWall(0, threeEigths, threeEigths, oneEigth), createWall(threeFourths, threeEigths, oneFourth, oneEigth), createWall(threeFourths, oneHalf, oneFourth, oneEigth), createWall(0, oneHalf, threeEigths, oneEigth), createWall(sevenEigths, fiveEigths, oneEigth, oneEigth), createWall(0, fiveEigths, oneHalf, oneEigth), createWall(0, threeFourths, fiveEigths, oneEigth), createWall(0, sevenEigths, threeFourths, oneEigth), createActivePoint(sevenEigths - 8, sevenEigths - 8, 0), createPassivePoint(sevenSixteenths - 8, oneHalf - 8, 0, 20), loopFireBombs(threeEigths, threeEigths, oneEigth, oneFourth, 2.8, 2.4, 0.7), loopFireBombs(oneHalf, oneFourth, oneEigth, oneHalf, 2.8, 2.4, 0.7), loopFireBombs(fiveEigths, oneEigth, oneEigth, threeFourths, 2.8, 2.4, 0.7)]);

                    case 11:

                        cancelAwaitChain = false;

                        moveBlockie(sevenEigths + blockieAdjustment, sevenEigths + blockieAdjustment);

                        _context7.next = 15;
                        return Promise.all([createWall(0, 0, fullScreen, oneSixteenth), createWall(0, threeSixteenths, fullScreen, oneSixteenth), createWall(0, threeEigths, fullScreen, oneSixteenth), createWall(0, nineSixteenths, fullScreen, oneSixteenth), createWall(0, threeFourths, fullScreen, oneSixteenth), createWall(0, fifteenSixteenths, fullScreen, oneSixteenth), createWall(0, 0, oneSixteenth, fullScreen), createWall(threeSixteenths, 0, oneSixteenth, fullScreen), createWall(threeEigths, 0, oneSixteenth, fullScreen), createWall(nineSixteenths, 0, oneSixteenth, fullScreen), createWall(threeFourths, 0, oneSixteenth, fullScreen), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), createActivePoint(oneEigth - 8, oneEigth - 8), createPassivePoint(oneEigth - 8, oneHalf - 8, 4.5, 7), loopFireBombs(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(sevenSixteenths, oneSixteenth, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(fiveEigths, fiveEigths, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(oneFourth, thirteenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 1, 1, 0.5), loopFireBombs(fiveEigths, thirteenSixteenths, oneEigth, oneEigth, 2.25, 1, 0.5), loopFireBombs(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 1, 1, 0.5)]);

                    case 15:

                        cancelAwaitChain = false;

                        _context7.next = 18;
                        return Promise.all([createWall(0, 0, fullScreen, oneSixteenth), createWall(0, threeSixteenths, fullScreen, oneSixteenth), createWall(0, threeEigths, fullScreen, oneSixteenth), createWall(0, nineSixteenths, fullScreen, oneSixteenth), createWall(0, threeFourths, fullScreen, oneSixteenth), createWall(0, fifteenSixteenths, fullScreen, oneSixteenth), createWall(0, 0, oneSixteenth, fullScreen), createWall(threeSixteenths, 0, oneSixteenth, fullScreen), createWall(threeEigths, 0, oneSixteenth, fullScreen), createWall(nineSixteenths, 0, oneSixteenth, fullScreen), createWall(threeFourths, 0, oneSixteenth, fullScreen), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), createActivePoint(oneEigth - 8, sevenEigths - 8, 0), loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneSixteenth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(thirteenSixteenths, oneFourth, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(fiveEigths, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(sevenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(fiveEigths, fiveEigths, oneEigth, oneEigth, 1, 0.5, 0.5), loopFireBombs(thirteenSixteenths, fiveEigths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(oneFourth, thirteenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(sevenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5), loopFireBombs(fiveEigths, thirteenSixteenths, oneEigth, oneEigth, 0, 0.5, 0.5)]);

                    case 18:

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context7.next = 25;
                        break;

                    case 22:
                        _context7.prev = 22;
                        _context7.t0 = _context7["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 25:
                        ;

                    case 26:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[0, 22]]);
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
                        _context8.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, oneHalf + blockieAdjustment);

                        createCountdownTimer(35);

                        cancelAwaitChain = false;

                        _context8.next = 6;
                        return Promise.all([createWall(0, 0, fullScreen, fiveSixteenths), createWall(oneEigth, sevenSixteenths, oneEigth, oneEigth), createWall(threeFourths, sevenSixteenths, oneEigth, oneEigth), createWall(0, elevenSixteenths, fullScreen, fiveSixteenths), createActivePoint(oneSixteenth - 8, oneHalf - 8, 0), createPassivePoint(fifteenSixteenths - 8, oneHalf - 8, 0, 3), loopFireBombs(0, fiveSixteenths, oneFourth, oneEigth, 0, 0.7, 0.5), loopFireBombs(0, sevenSixteenths, oneEigth, oneFourth, 0.55, 0.7, 0.5), loopFireBombs(oneEigth, nineSixteenths, oneFourth, oneEigth, 1.1, 0.7, 0.5), loopFireBombs(oneFourth, fiveSixteenths, oneEigth, oneFourth, 1.65, 0.7, 0.5), loopFireBombs(threeFourths, fiveSixteenths, oneFourth, oneEigth, 0, 0.7, 0.5), loopFireBombs(sevenEigths, sevenSixteenths, oneEigth, oneFourth, 0.55, 0.7, 0.5), loopFireBombs(fiveEigths, nineSixteenths, oneFourth, oneEigth, 1.1, 0.7, 0.5), loopFireBombs(fiveEigths, fiveSixteenths, oneEigth, oneFourth, 1.65, 0.7, 0.5)]);

                    case 6:

                        cancelAwaitChain = false;

                        _context8.next = 9;
                        return Promise.all([createWall(0, 0, fullScreen, oneEigth), createWall(0, oneFourth, fullScreen, oneEigth), createWall(0, fiveEigths, fullScreen, oneEigth), createWall(0, sevenEigths, fullScreen, oneEigth), createActivePoint(fifteenSixteenths - 8, oneHalf - 8, 2), fireBomb(0, oneEigth, oneSixteenth, oneEigth, 0, 0.15), fireBomb(oneSixteenth, oneEigth, oneSixteenth, oneEigth, 0.15, 0.15), fireBomb(oneEigth, oneEigth, oneSixteenth, oneEigth, 0.3, 0.15), fireBomb(threeSixteenths, oneEigth, oneSixteenth, oneEigth, 0.45, 0.15), fireBomb(oneFourth, oneEigth, oneSixteenth, oneEigth, 0.6, 0.15), fireBomb(fiveSixteenths, oneEigth, oneSixteenth, oneEigth, 0.75, 0.15), fireBomb(threeEigths, oneEigth, oneSixteenth, oneEigth, 0.9, 0.15), fireBomb(sevenSixteenths, oneEigth, oneSixteenth, oneEigth, 1.05, 0.15), fireBomb(oneHalf, oneEigth, oneSixteenth, oneEigth, 1.2, 0.15), fireBomb(nineSixteenths, oneEigth, oneSixteenth, oneEigth, 1.35, 0.15), fireBomb(fiveEigths, oneEigth, oneSixteenth, oneEigth, 1.5, 0.15), fireBomb(elevenSixteenths, oneEigth, oneSixteenth, oneEigth, 1.65, 0.15), fireBomb(threeFourths, oneEigth, oneSixteenth, oneEigth, 1.8, 0.15), fireBomb(thirteenSixteenths, oneEigth, oneSixteenth, oneEigth, 1.95, 0.15), fireBomb(sevenEigths, oneEigth, oneSixteenth, oneEigth, 2.1, 0.15), fireBomb(fifteenSixteenths, oneEigth, oneSixteenth, oneEigth, 2.25, 0.15), fireBomb(0, threeEigths, oneSixteenth, oneFourth, 1, 0.15), fireBomb(oneSixteenth, threeEigths, oneSixteenth, oneFourth, 1.15, 0.15), fireBomb(oneEigth, threeEigths, oneSixteenth, oneFourth, 1.3, 0.15), fireBomb(threeSixteenths, threeEigths, oneSixteenth, oneFourth, 1.45, 0.15), fireBomb(oneFourth, threeEigths, oneSixteenth, oneFourth, 1.6, 0.15), fireBomb(fiveSixteenths, threeEigths, oneSixteenth, oneFourth, 1.75, 0.15), fireBomb(threeEigths, threeEigths, oneSixteenth, oneFourth, 1.9, 0.15), fireBomb(sevenSixteenths, threeEigths, oneSixteenth, oneFourth, 2.05, 0.15), fireBomb(oneHalf, threeEigths, oneSixteenth, oneFourth, 2.2, 0.15), fireBomb(nineSixteenths, threeEigths, oneSixteenth, oneFourth, 2.35, 0.15), fireBomb(fiveEigths, threeEigths, oneSixteenth, oneFourth, 2.5, 0.15), fireBomb(elevenSixteenths, threeEigths, oneSixteenth, oneFourth, 2.65, 0.15), fireBomb(threeFourths, threeEigths, oneSixteenth, oneFourth, 2.8, 0.15), fireBomb(thirteenSixteenths, threeEigths, oneSixteenth, oneFourth, 2.95, 0.15), fireBomb(sevenEigths, threeEigths, oneSixteenth, oneFourth, 3.1, 0.15), fireBomb(fifteenSixteenths, threeEigths, oneSixteenth, oneFourth, 3.25, 0.15), fireBomb(0, threeFourths, oneSixteenth, oneEigth, 0, 0.15), fireBomb(oneSixteenth, threeFourths, oneSixteenth, oneEigth, 0.15, 0.15), fireBomb(oneEigth, threeFourths, oneSixteenth, oneEigth, 0.3, 0.15), fireBomb(threeSixteenths, threeFourths, oneSixteenth, oneEigth, 0.45, 0.15), fireBomb(oneFourth, threeFourths, oneSixteenth, oneEigth, 0.6, 0.15), fireBomb(fiveSixteenths, threeFourths, oneSixteenth, oneEigth, 0.75, 0.15), fireBomb(threeEigths, threeFourths, oneSixteenth, oneEigth, 0.9, 0.15), fireBomb(sevenSixteenths, threeFourths, oneSixteenth, oneEigth, 1.05, 0.15), fireBomb(oneHalf, threeFourths, oneSixteenth, oneEigth, 1.2, 0.15), fireBomb(nineSixteenths, threeFourths, oneSixteenth, oneEigth, 1.35, 0.15), fireBomb(fiveEigths, threeFourths, oneSixteenth, oneEigth, 1.5, 0.15), fireBomb(elevenSixteenths, threeFourths, oneSixteenth, oneEigth, 1.65, 0.15), fireBomb(threeFourths, threeFourths, oneSixteenth, oneEigth, 1.8, 0.15), fireBomb(thirteenSixteenths, threeFourths, oneSixteenth, oneEigth, 1.95, 0.15), fireBomb(sevenEigths, threeFourths, oneSixteenth, oneEigth, 2.1, 0.15), fireBomb(fifteenSixteenths, threeFourths, oneSixteenth, oneEigth, 2.25, 0.15)]);

                    case 9:

                        cancelAwaitChain = false;

                        moveBlockie(fifteenSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);

                        _context8.next = 13;
                        return Promise.all([createWall(0, oneEigth, oneEigth, sevenEigths), createWall(9 * 16, 0, oneSixteenth, oneEigth), createWall(oneFourth, oneEigth, oneEigth, threeFourths), createWall(oneHalf, oneEigth, oneEigth, fiveSixteenths), createWall(oneHalf, nineSixteenths, oneEigth, sevenSixteenths), createWall(25 * 16, 0, oneSixteenth, oneEigth), createWall(threeFourths, oneEigth, oneEigth, threeFourths), createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0), createPassivePoint(nineSixteenths - 8, oneHalf - 8, 3, 4), loopFireBombs(11 * 16, 0, sevenSixteenths, oneSixteenth, 0, 1, 0.3), loopFireBombs(11 * 16, oneSixteenth, sevenSixteenths, oneSixteenth, 0.3, 1, 0.3), loopFireBombs(threeEigths, oneEigth, oneEigth, oneSixteenth, 0.6, 1, 0.3), loopFireBombs(fiveEigths, oneEigth, oneEigth, oneSixteenth, 0.6, 1, 0.3), loopFireBombs(threeEigths, threeSixteenths, oneEigth, oneSixteenth, 0.9, 1, 0.3), loopFireBombs(fiveEigths, threeSixteenths, oneEigth, oneSixteenth, 0.9, 1, 0.3), loopFireBombs(threeEigths, oneFourth, oneEigth, oneSixteenth, 1.2, 1, 0.3), loopFireBombs(fiveEigths, oneFourth, oneEigth, oneSixteenth, 1.2, 1, 0.3), loopFireBombs(threeEigths, fiveSixteenths, oneEigth, oneSixteenth, 1.5, 1, 0.3), loopFireBombs(fiveEigths, fiveSixteenths, oneEigth, oneSixteenth, 1.5, 1, 0.3), loopFireBombs(threeEigths, threeEigths, oneEigth, oneSixteenth, 1.8, 1, 0.3), loopFireBombs(fiveEigths, threeEigths, oneEigth, oneSixteenth, 1.8, 1, 0.3), loopFireBombs(threeEigths, sevenSixteenths, threeEigths, oneSixteenth, 2.1, 1, 0.3), loopFireBombs(threeEigths, oneHalf, threeEigths, oneSixteenth, 2.4, 1, 0.3)]);

                    case 13:

                        cancelAwaitChain = false;

                        moveBlockie(oneSixteenth + blockieAdjustment, oneSixteenth + blockieAdjustment);

                        _context8.next = 17;
                        return Promise.all([createWall(oneEigth, 0, oneEigth, fiveSixteenths), createWall(oneFourth, 0, threeFourths, oneSixteenth), createWall(oneFourth, threeSixteenths, fiveEigths, oneEigth), createWall(oneEigth, fiveSixteenths, oneEigth, oneEigth), createWall(fiveEigths, fiveSixteenths, oneEigth, oneEigth), createWall(threeEigths, oneHalf, oneEigth, oneEigth), createWall(sevenEigths, oneHalf, oneEigth, oneEigth), createWall(0, fiveEigths, fullScreen, threeEigths), createActivePoint(oneHalf - 8, oneEigth - 8, 0), loopFireBombs(oneFourth, fiveSixteenths, threeEigths, oneEigth, 0.7, 1.1, 0.7), loopFireBombs(threeFourths, fiveSixteenths, oneFourth, oneEigth, 2.1, 1.1, 0.7), loopFireBombs(0, oneHalf, threeEigths, oneEigth, 2.8, 1.1, 0.7), loopFireBombs(oneHalf, oneHalf, threeEigths, oneEigth, 1.4, 1.1, 0.7)]);

                    case 17:

                        cancelAwaitChain = false;

                        _context8.next = 20;
                        return Promise.all([createWall(0, oneSixteenth, oneSixteenth, oneHalf), createWall(threeSixteenths, oneSixteenth, oneSixteenth, oneEigth), createWall(threeFourths, oneSixteenth, oneSixteenth, oneEigth), createWall(threeSixteenths, sevenSixteenths, oneSixteenth, oneEigth), createWall(threeFourths, sevenSixteenths, oneSixteenth, oneEigth), createWall(fifteenSixteenths, oneSixteenth, oneSixteenth, oneHalf), createWall(0, 0, fullScreen, oneSixteenth), createWall(oneSixteenth, threeSixteenths, sevenEigths, oneSixteenth), createWall(oneSixteenth, threeEigths, sevenEigths, oneSixteenth), createWall(0, nineSixteenths, fullScreen, sevenSixteenths), fireBomb(oneFourth, oneSixteenth, oneHalf, oneEigth, 0.25, 1), fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 0.25, 1), fireBomb(oneFourth, oneSixteenth, oneHalf, oneEigth, 2.25, 1), fireBomb(oneSixteenth, oneFourth, sevenEigths, oneEigth, 2.25, 1), fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 2.25, 1), fireBomb(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 4.5, 1), fireBomb(oneFourth, oneSixteenth, oneHalf, oneEigth, 4.5, 1), fireBomb(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 4.5, 1), fireBomb(oneFourth, sevenSixteenths, oneHalf, oneEigth, 4.5, 1), fireBomb(thirteenSixteenths, sevenSixteenths, oneEigth, oneEigth, 4.5, 1), createActivePoint(oneEigth - 8, oneHalf - 8, 5.5)]);

                    case 20:

                        destroyCountdownTimer();

                        cancelAwaitChain = false;

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context8.next = 29;
                        break;

                    case 26:
                        _context8.prev = 26;
                        _context8.t0 = _context8["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 29:
                        ;

                    case 30:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this, [[0, 26]]);
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
                        _context9.prev = 0;

                        initializeLevel(oneEigth + blockieAdjustment, oneHalf + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context9.next = 5;
                        return Promise.all([createWall(0, 0, fullScreen, threeEigths), createWall(0, fiveEigths, fullScreen, threeEigths), fireMovingActivePoint(threeFourths - 8, oneHalf - 8, 0.6, 0, 0)]);

                    case 5:

                        cancelAwaitChain = false;

                        moveBlockie(fifteenSixteenths + blockieAdjustment, oneHalf + blockieAdjustment);

                        _context9.next = 9;
                        return Promise.all([createWall(0, 0, fullScreen, sevenSixteenths), createWall(oneEigth, nineSixteenths, sevenEigths, fiveSixteenths), fireMovingActivePoint(fifteenSixteenths - 8, fifteenSixteenths - 8, -1.65, 0, 0), loopFireBombs(9 * 16, sevenSixteenths, oneSixteenth, oneEigth, 2.4, 1, 0.2), loopFireBombs(11 * 16, sevenSixteenths, oneSixteenth, oneEigth, 2.2, 1, 0.2), loopFireBombs(13 * 16, sevenSixteenths, oneSixteenth, oneEigth, 2, 1, 0.2), loopFireBombs(15 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.8, 1, 0.2), loopFireBombs(17 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.6, 1, 0.2), loopFireBombs(19 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.4, 1, 0.2), loopFireBombs(21 * 16, sevenSixteenths, oneSixteenth, oneEigth, 1.2, 1, 0.2)]);

                    case 9:

                        cancelAwaitChain = false;

                        moveBlockie(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);

                        _context9.next = 13;
                        return Promise.all([createWall(0, 0, sevenEigths, sevenSixteenths), createWall(0, nineSixteenths, sevenEigths, fiveSixteenths), fireMovingActivePoint(fifteenSixteenths - 8, oneHalf - 8, 0, -0.25, 0), fireMovingPassivePoint(fifteenSixteenths - 8, oneHalf - 8, -0.8, 0, 0, 15), loopFireBombs(oneEigth, sevenSixteenths, fiveSixteenths, oneEigth, 0, 0.5, 0.75), loopFireBombs(nineSixteenths, sevenSixteenths, fiveSixteenths, oneEigth, 0, 0.5, 0.75), loopFireBombs(11 * 16, sevenEigths, fiveSixteenths, oneEigth, 0, 0.5, 0.75)]);

                    case 13:

                        cancelAwaitChain = false;

                        moveBlockie(sevenEigths + blockieAdjustment, oneEigth + blockieAdjustment);

                        _context9.next = 17;
                        return Promise.all([createWall(threeSixteenths, oneSixteenth, fiveEigths, threeFourths), createWall(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth), createWall(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth), createWall(0, 0, fullScreen, oneSixteenth), createWall(0, fiveSixteenths, fullScreen, oneSixteenth), createWall(0, oneHalf, fullScreen, oneSixteenth), createWall(0, fifteenSixteenths, fullScreen, oneSixteenth), createWall(0, 0, oneSixteenth, fullScreen), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), fireMovingActivePoint(oneEigth - 8, threeFourths - 8, 0, -0.55, 0), loopFireBombs(oneSixteenth, threeEigths, oneEigth, oneEigth, 2, 0.7, 0.75), loopFireBombs(thirteenSixteenths, threeEigths, oneEigth, oneEigth, 2, 0.7, 0.75), loopFireBombs(threeFourths, thirteenSixteenths, oneSixteenth, oneEigth, 0, 0.35, 0.15), loopFireBombs(elevenSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 0.15, 0.35, 0.15), loopFireBombs(fiveEigths, thirteenSixteenths, oneSixteenth, oneEigth, 0.3, 0.35, 0.15), loopFireBombs(nineSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 0.45, 0.35, 0.15), loopFireBombs(oneHalf, thirteenSixteenths, oneSixteenth, oneEigth, 0.6, 0.35, 0.15), loopFireBombs(sevenSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 0.75, 0.35, 0.15), loopFireBombs(threeEigths, thirteenSixteenths, oneSixteenth, oneEigth, 0.9, 0.35, 0.15), loopFireBombs(fiveSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 1.05, 0.35, 0.15), loopFireBombs(oneFourth, thirteenSixteenths, oneSixteenth, oneEigth, 1.2, 0.35, 0.15), loopFireBombs(threeSixteenths, thirteenSixteenths, oneSixteenth, oneEigth, 1.35, 0.35, 0.15)]);

                    case 17:

                        cancelAwaitChain = false;

                        moveBlockie(oneEigth + blockieAdjustment, oneEigth + blockieAdjustment);

                        _context9.next = 21;
                        return Promise.all([createWall(0, 0, fullScreen, oneSixteenth), createWall(0, threeSixteenths, fullScreen, oneSixteenth), createWall(0, threeEigths, thirteenSixteenths, oneSixteenth), createWall(0, nineSixteenths, fiveEigths, oneSixteenth), createWall(0, threeFourths, sevenSixteenths, oneSixteenth), createWall(0, fifteenSixteenths, oneFourth, oneSixteenth), createWall(threeFourths, threeFourths, oneFourth, oneSixteenth), createWall(fiveEigths, fifteenSixteenths, threeEigths, oneSixteenth), createWall(0, 0, oneSixteenth, fullScreen), createWall(threeSixteenths, 0, oneSixteenth, fullScreen), createWall(threeEigths, 0, oneSixteenth, thirteenSixteenths), createWall(nineSixteenths, 0, oneSixteenth, fiveEigths), createWall(threeFourths, 0, oneSixteenth, sevenSixteenths), createWall(fifteenSixteenths, 0, oneSixteenth, oneFourth), createWall(threeFourths, threeFourths, oneSixteenth, oneFourth), createWall(fifteenSixteenths, fiveEigths, oneSixteenth, threeEigths), fireMovingActivePoint(sevenEigths - 8, oneHalf - 8, -0.55, 0.55, 0), loopFireBombs(oneSixteenth, oneSixteenth, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(oneFourth, oneSixteenth, oneEigth, oneEigth, 0, 1, 0.5), loopFireBombs(sevenSixteenths, oneSixteenth, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(fiveEigths, oneSixteenth, oneEigth, oneEigth, 0, 1, 0.5), loopFireBombs(thirteenSixteenths, oneSixteenth, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(oneSixteenth, oneFourth, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(oneFourth, oneFourth, oneEigth, oneEigth, 0, 1, 0.5), loopFireBombs(sevenSixteenths, oneFourth, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(fiveEigths, oneFourth, oneEigth, oneEigth, 0, 1, 0.5), loopFireBombs(oneSixteenth, sevenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(oneFourth, sevenSixteenths, oneEigth, oneEigth, 0, 1, 0.5), loopFireBombs(sevenSixteenths, sevenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(oneSixteenth, fiveEigths, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(oneFourth, fiveEigths, oneEigth, oneEigth, 0, 1, 0.5), loopFireBombs(oneSixteenth, thirteenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5), loopFireBombs(thirteenSixteenths, thirteenSixteenths, oneEigth, oneEigth, 1.25, 1, 0.5)]);

                    case 21:

                        cancelAwaitChain = false;

                        moveBlockie(oneHalf + blockieAdjustment, sevenEigths + blockieAdjustment);

                        _context9.next = 25;
                        return Promise.all([createWall(0, 0, fullScreen, oneSixteenth), createWall(0, fifteenSixteenths, fullScreen, oneSixteenth), createWall(0, 0, oneSixteenth, fullScreen), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), createWall(oneSixteenth, oneSixteenth, 13.5 * 16, nineSixteenths), createWall(16.5 * 16, oneSixteenth, 13.5 * 16, nineSixteenths), createWall(oneSixteenth, fiveEigths, oneEigth, fiveSixteenths), createWall(thirteenSixteenths, fiveEigths, oneEigth, fiveSixteenths), fireMovingActivePoint(oneHalf - 8, oneSixteenth, 0, 0.4, 0), fireBomb(threeSixteenths, 25 * 16, fiveEigths, 5 * 16, 1, 0.5), fireBomb(threeSixteenths, fiveEigths, fiveEigths, 5 * 16, 2.5, 0.5), fireBomb(threeSixteenths, fiveEigths, 5 * 16, fiveSixteenths, 4.5, 0.5), fireBomb(oneHalf, fiveEigths, 5 * 16, fiveSixteenths, 4.5, 0.5), fireBomb(11 * 16, fiveEigths, 5 * 16, fiveSixteenths, 6, 0.5), fireBomb(21 * 16, fiveEigths, 5 * 16, fiveSixteenths, 6, 0.5), fireBomb(threeSixteenths, fiveEigths, 5 * 16, 5 * 16, 7.8, 0.4), fireBomb(11 * 16, 25 * 16, 5 * 16, 5 * 16, 8, 0.4), fireBomb(oneHalf, fiveEigths, 5 * 16, 5 * 16, 8.2, 0.4), fireBomb(21 * 16, 25 * 16, 5 * 16, 5 * 16, 8.4, 0.4), fireBomb(threeSixteenths, 25 * 16, 5 * 16, 5 * 16, 10, 0.4), fireBomb(11 * 16, fiveEigths, 5 * 16, 5 * 16, 10.2, 0.4), fireBomb(oneHalf, 25 * 16, 5 * 16, 5 * 16, 10.4, 0.4), fireBomb(21 * 16, fiveEigths, 5 * 16, 5 * 16, 10.6, 0.4), fireBomb(threeSixteenths, fiveEigths, fiveEigths, fiveSixteenths, 12.7, 10)]);

                    case 25:

                        cancelAwaitChain = false;

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context9.next = 33;
                        break;

                    case 30:
                        _context9.prev = 30;
                        _context9.t0 = _context9["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 33:
                        ;

                    case 34:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[0, 30]]);
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
                        _context10.prev = 0;

                        initializeLevel(oneHalf + blockieAdjustment, elevenSixteenths + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context10.next = 5;
                        return Promise.all([createWall(0, 0, threeEigths, fullScreen), createWall(fiveEigths, 0, threeEigths, fullScreen), createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 0, 0, 12), loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 3, 0, 12), loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 6, 0, 12), loopFireMovingWalls(threeEigths, -oneSixteenth, oneFourth, oneSixteenth, 0, 1.5, 9, 0, 12)]);

                    case 5:

                        cancelAwaitChain = false;

                        _context10.next = 8;
                        return Promise.all([createWall(0, 0, oneSixteenth, fullScreen), createWall(oneSixteenth, 0, fiveSixteenths, threeSixteenths), createWall(fiveEigths, 0, fiveSixteenths, threeSixteenths), createWall(oneSixteenth, 13 * 16, fiveSixteenths, threeSixteenths), createWall(fiveEigths, 13 * 16, fiveSixteenths, threeSixteenths), createWall(oneSixteenth, thirteenSixteenths, fiveSixteenths, threeSixteenths), createWall(fiveEigths, thirteenSixteenths, fiveSixteenths, threeSixteenths), createWall(fifteenSixteenths, 0, oneSixteenth, fullScreen), createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0), fireContinuallyMovingWall(oneSixteenth, threeSixteenths, 7 * 17, 7 * 16, 1.5, 0, 0, 1.25), fireContinuallyMovingWall(23 * 16, threeSixteenths, 7 * 17, 7 * 16, -1.5, 0, 0, 1.25), fireContinuallyMovingWall(oneSixteenth, 19 * 16, 7 * 16, 7 * 16, 1.5, 0, 0, 1.25), fireContinuallyMovingWall(23 * 16, 19 * 16, 7 * 16, 7 * 16, -1.5, 0, 0, 1.25)]);

                    case 8:

                        cancelAwaitChain = false;

                        moveBlockie(oneHalf + blockieAdjustment, fifteenSixteenths + blockieAdjustment);

                        _context10.next = 12;
                        return Promise.all([createWall(0, 0, threeEigths, oneEigth), createWall(fiveEigths, 0, threeEigths, oneEigth), createWall(0, sevenEigths, threeEigths, oneEigth), createWall(fiveEigths, sevenEigths, threeEigths, oneEigth), createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), loopFireBombs(0, oneEigth, oneEigth, threeFourths, 0, 0, 1000000), loopFireBombs(sevenEigths, oneEigth, oneEigth, threeFourths, 0, 0, 1000000), fireContinuallyMovingWall(oneEigth, oneEigth, oneFourth, oneFourth, 1.5, 0, 0, 2.9), fireContinuallyMovingWall(fiveEigths, threeEigths, oneFourth, oneFourth, -1.5, 0, 0, 2.9), fireContinuallyMovingWall(oneEigth, fiveEigths, oneFourth, oneFourth, 1.5, 0, 0, 2.9)]);

                    case 12:

                        cancelAwaitChain = false;

                        moveBlockie(oneHalf + blockieAdjustment, oneSixteenth + blockieAdjustment);

                        _context10.next = 16;
                        return Promise.all([createWall(0, 0, sevenSixteenths, oneEigth), createWall(0, oneEigth, 25 * 16, 3 * 16), createWall(0, 7 * 16, sevenEigths, 7 * 16), createWall(oneEigth, sevenSixteenths, fiveSixteenths, oneEigth), createWall(oneEigth, nineSixteenths, threeFourths, 7 * 16), createWall(7 * 16, 25 * 16, nineSixteenths, 3 * 16), createActivePoint(oneSixteenth - 8, oneHalf - 8, 0), createPassivePoint(oneHalf - 8, oneHalf - 8, 0, 3.5), loopFireMovingWalls(sevenEigths, -3 * 16, oneEigth, oneSixteenth, 0, 3, 1.3, 1.21, 1.33), loopFireMovingWalls(sevenEigths, 33 * 16, oneEigth, oneSixteenth, 0, -3, 1.3, 1.21, 1.33), loopFireMovingWalls(11 * 16, sevenSixteenths, oneSixteenth, oneEigth, 3, 0, 1.3, 0.85, 1.69), loopFireMovingWalls(-3 * 16, sevenEigths, oneSixteenth, oneEigth, 3, 0, 0, 1, 1.54), loopFireMovingWalls(33 * 16, sevenEigths, oneSixteenth, oneEigth, -3, 0, 0, 1, 1.54)]);

                    case 16:

                        cancelAwaitChain = false;

                        moveBlockie(oneSixteenth + blockieAdjustment, oneHalf + blockieAdjustment);

                        _context10.next = 20;
                        return Promise.all([fireMovingWall(-33 * 16, 0, fullScreen, fullScreen, 1.2, 0, 0.5, 15), fireMovingWall(0, 0, oneSixteenth, threeEigths, 0, -0.2, 0, 10), fireMovingWall(0, fiveEigths, oneSixteenth, fullScreen, 0, -0.2, 0, 10), fireMovingWall(oneSixteenth, 0, oneSixteenth, threeEigths, 0, -0.35, 0, 10), fireMovingWall(oneSixteenth, fiveEigths, oneSixteenth, fullScreen, 0, -0.35, 0, 10), fireMovingWall(oneEigth, 0, oneSixteenth, threeEigths, 0, -0.45, 0, 10), fireMovingWall(oneEigth, fiveEigths, oneSixteenth, fullScreen, 0, -0.45, 0, 10), fireMovingWall(threeSixteenths, 0, oneSixteenth, threeEigths, 0, -0.5, 0, 10), fireMovingWall(threeSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.5, 0, 10), fireMovingWall(oneFourth, 0, oneSixteenth, threeEigths, 0, -0.55, 0, 10), fireMovingWall(oneFourth, fiveEigths, oneSixteenth, fullScreen, 0, -0.55, 0, 10), fireMovingWall(fiveSixteenths, 0, oneSixteenth, threeEigths, 0, -0.5, 0, 10), fireMovingWall(fiveSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.5, 0, 10), fireMovingWall(threeEigths, 0, oneSixteenth, threeEigths, 0, -0.45, 0, 10), fireMovingWall(threeEigths, fiveEigths, oneSixteenth, fullScreen, 0, -0.45, 0, 10), fireMovingWall(sevenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.35, 0, 10), fireMovingWall(sevenSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.35, 0, 10), fireMovingWall(oneHalf, 0, oneSixteenth, threeEigths, 0, -0.2, 0, 10), fireMovingWall(oneHalf, fiveEigths, oneSixteenth, fullScreen, 0, -0.2, 0, 10), fireMovingWall(nineSixteenths, 0, oneSixteenth, threeEigths, 0, -0.1, 0, 10), fireMovingWall(nineSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.1, 0, 10), fireMovingWall(fiveEigths, 0, oneSixteenth, threeEigths, 0, -0.15, 0, 10), fireMovingWall(fiveEigths, fiveEigths, oneSixteenth, fullScreen, 0, -0.15, 0, 10), fireMovingWall(elevenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.27, 0, 10), fireMovingWall(elevenSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.27, 0, 10), fireMovingWall(threeFourths, 0, oneSixteenth, threeEigths, 0, -0.4, 0, 10), fireMovingWall(threeFourths, fiveEigths, oneSixteenth, fullScreen, 0, -0.4, 0, 10), fireMovingWall(thirteenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.5, 0, 10), fireMovingWall(thirteenSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.5, 0, 10), fireMovingWall(sevenEigths, 0, oneSixteenth, threeEigths, 0, -0.55, 0, 10), fireMovingWall(sevenEigths, fiveEigths, oneSixteenth, fullScreen, 0, -0.55, 0, 10), fireMovingWall(fifteenSixteenths, 0, oneSixteenth, threeEigths, 0, -0.6, 0, 10), fireMovingWall(fifteenSixteenths, fiveEigths, oneSixteenth, fullScreen, 0, -0.6, 0, 10), createActivePoint(fifteenSixteenths - 8, oneSixteenth - 8, 5.1)]);

                    case 20:

                        cancelAwaitChain = false;

                        moveBlockie(fifteenSixteenths + blockieAdjustment, oneSixteenth + blockieAdjustment);

                        _context10.next = 24;
                        return Promise.all([createActivePoint(oneSixteenth - 8, fifteenSixteenths - 8, 0), createWall(0, 0, sevenEigths, oneEigth), fireContinuallyMovingWall(-fullScreen, oneEigth, fullScreen, oneEigth, 1.5, 0, 0, 4.98), fireContinuallyMovingWall(oneEigth, oneEigth, fullScreen, oneEigth, 1.5, 0, 0, 4.98), createWall(0, oneFourth, fullScreen, oneSixteenth), fireContinuallyMovingWall(-oneEigth, fiveSixteenths, fullScreen, oneEigth, -1.5, 0, 0, 4.98), fireContinuallyMovingWall(fullScreen, fiveSixteenths, fullScreen, oneEigth, -1.5, 0, 0, 4.98), createWall(0, sevenSixteenths, fullScreen, oneSixteenth), createWall(0, oneHalf, oneSixteenth, oneEigth), loopFireBombs(oneSixteenth, oneHalf, oneEigth, oneEigth, 0, 4, 0.7), createWall(threeSixteenths, oneHalf, oneSixteenth, oneEigth), loopFireBombs(oneFourth, oneHalf, oneEigth, oneEigth, 2.85, 4, 0.7), createWall(threeEigths, oneHalf, oneSixteenth, oneEigth), loopFireBombs(sevenSixteenths, oneHalf, oneEigth, oneEigth, 0, 4, 0.7), createWall(nineSixteenths, oneHalf, oneSixteenth, oneEigth), loopFireBombs(fiveEigths, oneHalf, oneEigth, oneEigth, 2.85, 4, 0.7), createWall(threeFourths, oneHalf, oneSixteenth, oneEigth), loopFireBombs(thirteenSixteenths, oneHalf, oneEigth, oneEigth, 0, 4, 0.7), createWall(fifteenSixteenths, oneHalf, oneSixteenth, oneEigth), createWall(0, fiveEigths, fullScreen, oneSixteenth), loopFireBombs(0, elevenSixteenths, oneFourth, oneEigth, 0, 0, 1000000), fireContinuallyMovingWall(oneFourth, elevenSixteenths, oneSixteenth, oneEigth, 2, 0, 0, 1.9), loopFireBombs(threeFourths, elevenSixteenths, oneFourth, oneEigth, 0, 0, 1000000), createWall(0, thirteenSixteenths, fullScreen, oneSixteenth), loopFireBombs(0, sevenEigths, fullScreen, oneEigth, 0, 2, 1)]);

                    case 24:

                        cancelAwaitChain = false;

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context10.next = 32;
                        break;

                    case 29:
                        _context10.prev = 29;
                        _context10.t0 = _context10["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 32:
                        ;

                    case 33:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this, [[0, 29]]);
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
                        _context11.prev = 0;

                        initializeLevel(oneSixteenth + blockieAdjustment, fifteenSixteenths + blockieAdjustment);

                        cancelAwaitChain = false;

                        _context11.next = 5;
                        return Promise.all([createWall(0, oneEigth, oneEigth, oneSixteenth), createWall(oneEigth, 0, oneEigth, fullScreen), createWall(oneFourth, oneEigth, oneEigth, oneSixteenth), createWall(threeEigths, 0, fiveEigths, fullScreen), createActivePoint(oneSixteenth - 8, oneSixteenth - 8, 0), createPassivePoint(fiveSixteenths - 8, oneSixteenth - 8, 0, 8.5), fireMovingBomb(oneFourth, fullScreen, oneEigth, fullScreen, 0, -2, 0, 3.45), fireBomb(oneFourth, threeSixteenths, oneEigth, thirteenSixteenths, 3.45, 12), fireMovingBomb(0, fullScreen, oneEigth, fullScreen, 0, -1.7, 4.5, 12), fireBomb(0, 0, oneEigth, oneEigth, 1.3, 12)]);

                    case 5:

                        cancelAwaitChain = false;

                        moveBlockie(oneSixteenth - 8, oneSixteenth - 8);

                        _context11.next = 9;
                        return Promise.all([createWall(0, oneEigth, sevenSixteenths, sevenEigths), createWall(nineSixteenths, 0, sevenSixteenths, fullScreen), createWall(sevenSixteenths, 25 * 16, oneEigth, oneSixteenth), createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0), fireMovingBomb(sevenSixteenths, 33 * 16, oneEigth, 34 * 16, 0, -0.45, 0, 20.5), fireBomb(sevenSixteenths, 0, oneEigth, fullScreen, 20.5, 1000000)]);

                    case 9:

                        cancelAwaitChain = false;

                        _context11.next = 12;
                        return Promise.all([createWall(0, 0, threeEigths, oneEigth), createWall(fiveEigths, 0, threeEigths, oneEigth), createWall(0, oneEigth, oneEigth, threeFourths), createWall(oneFourth, oneFourth, oneEigth, oneHalf), createWall(fiveEigths, oneFourth, oneEigth, oneHalf), createWall(sevenEigths, oneEigth, oneEigth, threeFourths), createWall(0, sevenEigths, threeEigths, oneEigth), createWall(fiveEigths, sevenEigths, threeEigths, oneEigth), createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), loopFireMovingBombs(oneEigth, oneFourth, oneEigth, oneSixteenth, 0, 1.2, 0, 2, 4), loopFireMovingBombs(threeEigths, oneFourth, oneFourth, oneSixteenth, 0, 1.86, 0, 1, 2), loopFireMovingBombs(threeEigths, oneFourth, oneFourth, oneSixteenth, 0, 1.86, 2, 1, 2), loopFireMovingBombs(threeFourths, oneEigth, oneEigth, oneSixteenth, 0, 2.35, 0, 0.1, 2.5), loopFireMovingBombs(threeFourths, oneEigth, oneEigth, oneSixteenth, 0, 2.35, 1.2, 0.1, 2.5), loopFireMovingBombs(threeFourths, oneEigth, oneEigth, oneSixteenth, 0, 2.35, 2.4, 0.1, 2.5)]);

                    case 12:

                        cancelAwaitChain = false;

                        moveBlockie(oneHalf + blockieAdjustment, oneSixteenth + blockieAdjustment);

                        _context11.next = 16;
                        return Promise.all([createWall(0, 0, sevenSixteenths, fullScreen), createWall(nineSixteenths, 0, sevenSixteenths, fullScreen), createActivePoint(oneHalf - 8, fifteenSixteenths - 8, 0), fireContinuallyMovingBomb(threeSixteenths, oneEigth, oneEigth, oneSixteenth, 1.79, 0, 0, 2.4), fireContinuallyMovingBomb(threeSixteenths, threeSixteenths, oneEigth, oneSixteenth, 1.79, 0, 0.6, 2.4), fireContinuallyMovingBomb(threeSixteenths, oneFourth, oneEigth, oneSixteenth, 1.79, 0, 1.2, 2.4), fireContinuallyMovingBomb(threeSixteenths, fiveSixteenths, oneEigth, oneSixteenth, 1.79, 0, 1.8, 2.4), fireContinuallyMovingBomb(elevenSixteenths, threeEigths, oneEigth, oneSixteenth, -1.79, 0, 0, 2.4), fireContinuallyMovingBomb(elevenSixteenths, sevenSixteenths, oneEigth, oneSixteenth, -1.79, 0, 0.6, 2.4), fireContinuallyMovingBomb(elevenSixteenths, oneHalf, oneEigth, oneSixteenth, -1.79, 0, 1.2, 2.4), fireContinuallyMovingBomb(elevenSixteenths, nineSixteenths, oneEigth, oneSixteenth, -1.79, 0, 1.8, 2.4), fireContinuallyMovingBomb(threeSixteenths, fiveEigths, oneEigth, oneSixteenth, 1.79, 0, 0, 2.4), fireContinuallyMovingBomb(threeSixteenths, elevenSixteenths, oneEigth, oneSixteenth, 1.79, 0, 0.6, 2.4), fireContinuallyMovingBomb(threeSixteenths, threeFourths, oneEigth, oneSixteenth, 1.79, 0, 1.2, 2.4), fireContinuallyMovingBomb(threeSixteenths, thirteenSixteenths, oneEigth, oneSixteenth, 1.79, 0, 1.8, 2.4)]);

                    case 16:

                        cancelAwaitChain = false;

                        _context11.next = 19;
                        return Promise.all([createWall(oneEigth, 0, fiveSixteenths, oneEigth), createWall(nineSixteenths, 0, threeEigths, oneEigth), createWall(oneEigth, sevenEigths, fiveSixteenths, oneEigth), createWall(nineSixteenths, sevenEigths, threeEigths, oneEigth), createWall(0, 0, oneEigth, fullScreen), createWall(sevenEigths, 0, oneEigth, fullScreen), createActivePoint(oneHalf - 8, oneSixteenth - 8, 0), fireContinuallyMovingBomb(oneEigth, oneEigth, threeFourths, oneSixteenth, 0, 1.4, 0, 4.2), fireContinuallyMovingBomb(oneEigth, thirteenSixteenths, threeFourths, oneSixteenth, 0, -1.4, 0, 4.2), fireContinuallyMovingBomb(threeFourths, oneEigth, oneEigth, threeFourths, -1.28, 0, 0, 4.2)]);

                    case 19:

                        cancelAwaitChain = false;

                        moveBlockie(oneHalf + blockieAdjustment, oneSixteenth + blockieAdjustment);

                        _context11.next = 23;
                        return Promise.all([createWall(oneEigth, oneEigth, threeFourths, oneEigth), createWall(oneEigth, oneFourth, oneEigth, oneEigth), createWall(threeEigths, oneFourth, oneFourth, oneEigth), createWall(threeFourths, oneFourth, oneFourth, oneEigth), createWall(oneEigth, oneHalf, fiveSixteenths, oneEigth), createWall(nineSixteenths, oneHalf, fiveSixteenths, oneEigth), createWall(0, fiveEigths, sevenEigths, oneFourth), createWall(sevenEigths, thirteenSixteenths, oneEigth, oneSixteenth), fireMovingActivePoint(fifteenSixteenths - 8, fifteenSixteenths - 8, -0.42, 0, 0), createPassivePoint(fifteenSixteenths - 8, threeSixteenths - 8, 3, 7), loopFireMovingBombs(fullScreen, threeEigths, oneEigth, oneEigth, -9, 0, 0, 0, 1), fireBomb(0, sevenEigths, oneEigth, oneEigth, 0, 19.3)]);

                    case 23:

                        cancelAwaitChain = false;

                        console.log("Level " + currentLevel + " completed.");
                        increaseLevel();
                        _context11.next = 31;
                        break;

                    case 28:
                        _context11.prev = 28;
                        _context11.t0 = _context11["catch"](0);

                        console.log("Level " + currentLevel + " restarted.");

                    case 31:
                        ;

                    case 32:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[0, 28]]);
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
                        try {} catch (error) {
                            console.log("Level " + currentLevel + " restarted.");
                        };

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

//Clears all arrays, clears the canvas, displays the game over screen, and waits to restart the current level.
var restartLevel = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(reason) {
        var i, _i, _i2;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
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
                            _context13.next = 19;
                            break;
                        }

                        gameState = "animatingBlockieDestruction";

                        //Animates Blockie's destruction.
                        blockie.state = "destructing";
                        blockie.sx = 0;

                        _context13.next = 17;
                        return displayMessage("Determination is your only asset.");

                    case 17:
                        _context13.next = 30;
                        break;

                    case 19:
                        if (!(reason === "keyPressed")) {
                            _context13.next = 24;
                            break;
                        }

                        resetBlockieState();
                        controlLevel();
                        _context13.next = 30;
                        break;

                    case 24:
                        if (!(reason === "countdownTimer")) {
                            _context13.next = 30;
                            break;
                        }

                        gameState = "playingCutscene";
                        _context13.next = 28;
                        return playCutscene(spCountdownDestructionScene, 0.17);

                    case 28:
                        _context13.next = 30;
                        return displayMessage("You've failed another world.");

                    case 30:
                        ;

                    case 31:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));

    return function restartLevel(_x) {
        return _ref13.apply(this, arguments);
    };
}();

var increaseLevel = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        gameState = "finishingLevel";

                        blockie.angleMovingDegrees = -180;

                        //Points are only made permanent once a level is completed.
                        updateLevelPoints(currentLevel);
                        currentLevelPoints = 0;
                        calculateTotalPoints();

                        currentLevel++;

                        //Waits for the PartyHat to descend on to Blockie's head.
                        _context14.next = 8;
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
                        _context14.next = 10;
                        return displayMessage("You haven't escaped yet.");

                    case 10:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function increaseLevel() {
        return _ref14.apply(this, arguments);
    };
}();

//Shows a message and awaits a player input to continue the game.
var displayMessage = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(message) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.next = 2;
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
                        _context15.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Restarts the game once acceptable keys are pressed.
                            function resumePlaying() {
                                if (keysDown[16] || keysDown[32]) {
                                    document.getElementById("messageDisplayer").innerHTML = "";

                                    gameState = "playing";
                                    resetBlockieState();

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
                        return _context15.abrupt("return", _context15.sent);

                    case 5:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));

    return function displayMessage(_x2) {
        return _ref15.apply(this, arguments);
    };
}();

//Sets the timeouts that cause the collision instance to "blink" 2 times before firing. All warning timeouts are set at the same length 
//to allow the player to predict collisions.
var setWarningTimeouts = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(instanceAffecting) {
        var warningSeconds;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        //Each timeout sets the affected instance's timeout and reject function equal to a new "blinking" timeout for a bit.
                        warningSeconds = 1;
                        _context16.next = 3;
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
                            _context16.next = 5;
                            break;
                        }

                        return _context16.abrupt("return");

                    case 5:
                        _context16.next = 7;
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
                            _context16.next = 9;
                            break;
                        }

                        return _context16.abrupt("return");

                    case 9:
                        _context16.next = 11;
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
                            _context16.next = 13;
                            break;
                        }

                        return _context16.abrupt("return");

                    case 13:
                        _context16.next = 15;
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
                        return _context16.abrupt("return", _context16.sent);

                    case 16:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this);
    }));

    return function setWarningTimeouts(_x3) {
        return _ref16.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createPassivePoint = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(x, y, waitingSeconds, firingSeconds) {
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
                        instance = new PassivePoint(x, y, firingSeconds);

                        passivePoints.push(instance);

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
                        return _context17.abrupt("return", _context17.sent);

                    case 13:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));

    return function createPassivePoint(_x4, _x5, _x6, _x7) {
        return _ref17.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingPassivePoint = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(x, y, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
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
                        instance = new MovingPassivePoint(x, y, xSpeed, ySpeed, firingSeconds);

                        movingPassivePoints.push(instance);

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
                                var instanceIndex = movingPassivePoints.indexOf(instance);
                                movingPassivePoints.splice(instanceIndex, 1);
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

    return function fireMovingPassivePoint(_x8, _x9, _x10, _x11, _x12, _x13) {
        return _ref18.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createActivePoint = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(x, y, waitingSeconds) {
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
                        instance = new ActivePoint(x, y);

                        activePoints.push(instance);

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

    return function createActivePoint(_x14, _x15, _x16) {
        return _ref19.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingActivePoint = function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(x, y, xSpeed, ySpeed, waitingSeconds) {
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
                        instance = new MovingActivePoint(x, y, xSpeed, ySpeed);

                        movingActivePoints.push(instance);

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

    return function fireMovingActivePoint(_x17, _x18, _x19, _x20, _x21) {
        return _ref20.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingHorizontalLasers = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(y, height, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        _context21.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context21.next = 4;
                        return fireMovingHorizontalLaser(y, height, speed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context21.next = 9;
                            break;
                        }

                        _context21.next = 7;
                        return fireMovingHorizontalLaser(y, height, speed, waitingSeconds, firingSeconds);

                    case 7:
                        _context21.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context21.abrupt("return");

                    case 11:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));

    return function loopFireMovingHorizontalLasers(_x22, _x23, _x24, _x25, _x26, _x27) {
        return _ref21.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingHorizontalLaser = function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(y, height, speed, waitingSeconds, firingSeconds) {
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
                        instance = new MovingHorizontalLaser(y, height, speed);

                        movingHorizontalLasers.push(instance);

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

                            instance.timeout = setTimeout(function () {
                                //Removes the instance from its object array (so it isn't drawn or colliding) and resolves it once it is "destroyed".
                                var instanceIndex = movingHorizontalLasers.indexOf(instance);
                                movingHorizontalLasers.splice(instanceIndex, 1);
                                resolve("resolved");
                            }, firingSeconds * 1000);
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

    return function fireMovingHorizontalLaser(_x28, _x29, _x30, _x31, _x32) {
        return _ref22.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingVerticalLasers = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(x, width, speed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        _context23.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context23.next = 4;
                        return fireMovingVerticalLaser(x, width, speed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context23.next = 9;
                            break;
                        }

                        _context23.next = 7;
                        return fireMovingVerticalLaser(x, width, speed, waitingSeconds, firingSeconds);

                    case 7:
                        _context23.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context23.abrupt("return");

                    case 11:
                    case "end":
                        return _context23.stop();
                }
            }
        }, _callee23, this);
    }));

    return function loopFireMovingVerticalLasers(_x33, _x34, _x35, _x36, _x37, _x38) {
        return _ref23.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingVerticalLaser = function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(x, width, speed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        _context24.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context24.next = 4;
                            break;
                        }

                        return _context24.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingVerticalLaser(x, width, speed);

                        movingVerticalLasers.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context24.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context24.next = 10;
                            break;
                        }

                        return _context24.abrupt("return");

                    case 10:
                        _context24.next = 12;
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
                        return _context24.abrupt("return", _context24.sent);

                    case 13:
                    case "end":
                        return _context24.stop();
                }
            }
        }, _callee24, this);
    }));

    return function fireMovingVerticalLaser(_x39, _x40, _x41, _x42, _x43) {
        return _ref24.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireBombs = function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(x, y, width, height, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        _context25.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context25.next = 4;
                        return fireBomb(x, y, width, height, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context25.next = 9;
                            break;
                        }

                        _context25.next = 7;
                        return fireBomb(x, y, width, height, waitingSeconds, firingSeconds);

                    case 7:
                        _context25.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context25.abrupt("return");

                    case 11:
                    case "end":
                        return _context25.stop();
                }
            }
        }, _callee25, this);
    }));

    return function loopFireBombs(_x44, _x45, _x46, _x47, _x48, _x49, _x50) {
        return _ref25.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireBomb = function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(x, y, width, height, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        _context26.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context26.next = 4;
                            break;
                        }

                        return _context26.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new Bomb(x, y, width, height);

                        bombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context26.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context26.next = 10;
                            break;
                        }

                        return _context26.abrupt("return");

                    case 10:
                        _context26.next = 12;
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
                        return _context26.abrupt("return", _context26.sent);

                    case 13:
                    case "end":
                        return _context26.stop();
                }
            }
        }, _callee26, this);
    }));

    return function fireBomb(_x51, _x52, _x53, _x54, _x55, _x56) {
        return _ref26.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingBombs = function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        _context27.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context27.next = 4;
                        return fireMovingBomb(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context27.next = 9;
                            break;
                        }

                        _context27.next = 7;
                        return fireMovingBomb(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);

                    case 7:
                        _context27.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context27.abrupt("return");

                    case 11:
                    case "end":
                        return _context27.stop();
                }
            }
        }, _callee27, this);
    }));

    return function loopFireMovingBombs(_x57, _x58, _x59, _x60, _x61, _x62, _x63, _x64, _x65) {
        return _ref27.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingBomb = function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        _context28.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context28.next = 4;
                            break;
                        }

                        return _context28.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingBomb(x, y, width, height, xSpeed, ySpeed);

                        movingBombs.push(instance);

                        //Creates the "blinking" effect for warning of a collision.
                        _context28.next = 8;
                        return setWarningTimeouts(instance);

                    case 8:
                        if (!cancelAwaitChain) {
                            _context28.next = 10;
                            break;
                        }

                        return _context28.abrupt("return");

                    case 10:
                        _context28.next = 12;
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
                        return _context28.abrupt("return", _context28.sent);

                    case 13:
                    case "end":
                        return _context28.stop();
                }
            }
        }, _callee28, this);
    }));

    return function fireMovingBomb(_x66, _x67, _x68, _x69, _x70, _x71, _x72, _x73) {
        return _ref28.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireContinuallyMovingBomb = function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        _context29.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

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
                        return _context29.abrupt("return", _context29.sent);

                    case 13:
                    case "end":
                        return _context29.stop();
                }
            }
        }, _callee29, this);
    }));

    return function fireContinuallyMovingBomb(_x74, _x75, _x76, _x77, _x78, _x79, _x80, _x81) {
        return _ref29.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var createWall = function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(x, y, width, height) {
        var instance;
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
                switch (_context30.prev = _context30.next) {
                    case 0:
                        //Creates an instance and sets all of its initial properties.
                        instance = new Wall(x, y, width, height);

                        walls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context30.next = 4;
                        return new Promise(function (resolve, reject) {
                            //Links the instance's deactivation functions to itself to allow outside callings.
                            instance.externalResolve = resolve;
                            instance.externalReject = reject;
                        });

                    case 4:
                        return _context30.abrupt("return", _context30.sent);

                    case 5:
                    case "end":
                        return _context30.stop();
                }
            }
        }, _callee30, this);
    }));

    return function createWall(_x82, _x83, _x84, _x85) {
        return _ref30.apply(this, arguments);
    };
}();

//Continuously recreates the same instance until the activePoint is touched.
var loopFireMovingWalls = function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, waitingSeconds, firingSeconds) {
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        _context31.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

                    case 2:
                        _context31.next = 4;
                        return fireMovingWall(x, y, width, height, xSpeed, ySpeed, 0, firingSeconds);

                    case 4:
                        if (cancelAwaitChain) {
                            _context31.next = 9;
                            break;
                        }

                        _context31.next = 7;
                        return fireMovingWall(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds);

                    case 7:
                        _context31.next = 4;
                        break;

                    case 9:
                        ;

                        //Cancels the next await if the current screen is being resolved by an activePoint.
                        return _context31.abrupt("return");

                    case 11:
                    case "end":
                        return _context31.stop();
                }
            }
        }, _callee31, this);
    }));

    return function loopFireMovingWalls(_x86, _x87, _x88, _x89, _x90, _x91, _x92, _x93, _x94) {
        return _ref31.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireMovingWall = function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(x, y, width, height, xSpeed, ySpeed, waitingSeconds, firingSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        _context32.next = 2;
                        return setWaitingTimeout(waitingSeconds);

                    case 2:
                        if (!cancelAwaitChain) {
                            _context32.next = 4;
                            break;
                        }

                        return _context32.abrupt("return");

                    case 4:

                        //Creates an instance and sets all of its initial properties.
                        instance = new MovingWall(x, y, width, height, xSpeed, ySpeed);

                        movingWalls.push(instance);

                        //Creates a timeout for the instance's destruction and links its deactivation functions.
                        _context32.next = 8;
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
                        return _context32.abrupt("return", _context32.sent);

                    case 9:
                    case "end":
                        return _context32.stop();
                }
            }
        }, _callee32, this);
    }));

    return function fireMovingWall(_x95, _x96, _x97, _x98, _x99, _x100, _x101, _x102) {
        return _ref32.apply(this, arguments);
    };
}();

//Creates an instance, adds it to an array for drawing and collisions, and controls all timing and variables.
var fireContinuallyMovingWall = function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(x, y, width, height, xSpeed, ySpeed, initialWaitingSeconds, directionChangeSeconds) {
        var instance;
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        _context33.next = 2;
                        return setWaitingTimeout(initialWaitingSeconds);

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

                        //Creates a timeout for the instance's direction changing and links its deactivation functions.
                        _context33.next = 8;
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
                        return _context33.abrupt("return", _context33.sent);

                    case 9:
                    case "end":
                        return _context33.stop();
                }
            }
        }, _callee33, this);
    }));

    return function fireContinuallyMovingWall(_x103, _x104, _x105, _x106, _x107, _x108, _x109, _x110) {
        return _ref33.apply(this, arguments);
    };
}();

//Cutscene Functions

//Waits for a small cutscene to finish.
var playCutscene = function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(scene, secondsPerFrame) {
        var cutsceneSideLength, cutscenesx, lastFramesx, cutscene;
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
            while (1) {
                switch (_context34.prev = _context34.next) {
                    case 0:
                        cutsceneSideLength = 512;
                        cutscenesx = 0;
                        lastFramesx = scene.naturalWidth - cutsceneSideLength;

                        //Each time the frame changes, the next sprite in the sprite map is shown.

                        cutscene = setInterval(function () {
                            cutscenesx += cutsceneSideLength;
                        }, secondsPerFrame * 1000);
                        return _context34.abrupt("return", new Promise(function (resolve, reject) {
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
                        return _context34.stop();
                }
            }
        }, _callee34, this);
    }));

    return function playCutscene(_x111, _x112) {
        return _ref34.apply(this, arguments);
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
        for (var _i3 = 0; _i3 < currentClass.length; _i3++) {
            checkInstancesColliding(blockie, currentClass[_i3]);
        };
    };
};

function checkTestCollisionsWithClasses(instanceOneX, instanceOneY, classesArray) {
    preventingMovement = false;

    checkBlockieOutsideBorder(blockie, instanceOneX, instanceOneY);

    for (var i = 0; i < classesArray.length; i++) {
        var currentClass = classesArray[i];
        for (var _i4 = 0; _i4 < currentClass.length; _i4++) {
            checkTestInstancesColliding(blockie, instanceOneX, instanceOneY, currentClass[_i4]);
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
                for (var _i5 = 0; _i5 < currentTimeouts.length; _i5++) {
                    clearTimeout(currentTimeouts[_i5]);
                };

                currentTimeouts.splice(0);

                //Stops all currently-running timeouts so that they stop hurting performance and don't execute after resetting.
                for (var _i6 = 0; _i6 < currentIntervals.length; _i6++) {
                    clearInterval(currentIntervals[_i6]);
                };

                currentIntervals.splice(0);

                resetBlockieState();

                cancelAwaitChain = true;

                updateAllInstances();
                for (var _i7 = 0; _i7 < allInstances.length; _i7++) {
                    resolveInstances(allInstances[_i7]);
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
//# sourceMappingURL=blockie.js.map