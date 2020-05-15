'use strict';

//Functions

var levelOne = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var laserOne;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fireHorizontalLaser(100, 10);

                    case 2:
                        laserOne = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function levelOne() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Game Setup

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
context.fillStyle = 'white';

//Variables

var KeysPressed = {};
var xInput = 0;
var yInput = 0;
var colliding = false;

//Arrays

var horizontalLasers = [];

//Classes

var Player = function Player() {
    _classCallCheck(this, Player);

    this.sideLength = 32;
    this.spriteSideLength = 16;
    this.x = canvas.width / 2 - this.sideLength / 2;
    this.y = canvas.height / 2 - this.sideLength / 2;
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

    //Loads Blockie's sprite map. It is one large sprite map to avoid loading many individual 
    //sprite files.
    this.sprite = document.createElement('img');
    this.sprite.src = '../images/blockie.png';
};

;

var horizontalLaser = function horizontalLaser() {
    _classCallCheck(this, horizontalLaser);

    this.x = 0;
    this.y = 100;
    this.height = 32;
    this.width = canvas.width;
};

;

function fireHorizontalLaser(y, height) {
    horizontalLasers.push(new horizontalLaser());
    var newInstanceLocation = horizontalLasers.length - 1;
    horizontalLasers[newInstanceLocation].y = y;
    horizontalLasers[newInstanceLocation].height = height;
    return new Promise(function (resolve) {
        setTimeout(function () {
            horizontalLasers.splice(newInstanceLocation);
            console.log('resolved');
            resolve('resolved');
        }, 5000);
    });
};

function drawHorizontalLasers() {
    for (var i = 0; i < horizontalLasers.length; i++) {
        var currentInstance = horizontalLasers[i];
        console.log(currentInstance.x);
        console.log(currentInstance.y);
        console.log(currentInstance.width);
        console.log(currentInstance.height);
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    }
}

//Determines if two objects are "colliding".
function checkSpritesColliding(xOne, yOne, widthOne, heightOne, xTwo, yTwo, widthTwo, heightTwo) {
    if (xTwo < xOne && xOne < xTwo + widthTwo) {
        colliding = true;
    } else if (xOne < xTwo && xTwo < xOne + widthOne) {
        colliding = true;
    } else if (yTwo < yOne && yOne < yTwo + heightTwo) {
        colliding = true;
    } else if (yOne < yTwo && yTwo < yOne + heightOne) {
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

//Adds all currently pressed keys as a keyCode with a pair of true in the KeysPressed object. .keyCode is used instead of .key so 
//that capital letters can't cause unwanted movements.
document.addEventListener('keydown', function (e) {
    KeysPressed[e.keyCode] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener('keyup', function (e) {
    delete KeysPressed[e.keyCode];
});

var blockie = new Player();

function loop() {
    //Clears the canvas so that it can later be redrawn with updated locations and instances.
    context.clearRect(0, 0, canvas.width, canvas.height);

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
    };

    //Updates Blockie's location if it is not off of the canvas. If it is off of the canvas, Blockie will move towards
    //the last available space to avoid a gap (the walls are in rigid locations so nothing more fancy is needed).
    if (!(blockie.testXLocation <= 0 || blockie.testXLocation + blockie.sideLength >= canvas.width)) {
        blockie.x = blockie.testXLocation;
    } else if (blockie.testXLocation <= 0) {
        blockie.x = 0;
    } else if (blockie.testXLocation + blockie.sideLength >= canvas.width) {
        blockie.x = canvas.width - blockie.sideLength;
    };

    if (!(blockie.testYLocation <= 0 || blockie.testYLocation + blockie.sideLength >= canvas.height)) {
        blockie.y = blockie.testYLocation;
    } else if (blockie.testYLocation <= 0) {
        blockie.y = 0;
    } else if (blockie.testYLocation + blockie.sideLength >= canvas.height) {
        blockie.y = canvas.height - blockie.sideLength;
    };

    //sx is the location on the blockie.png sprite map and it determines the sprite's direction facing. 
    //It starts at the idle image, then goes to the top-left, and then continues in a clockwise direction.
    blockie.sx = blockie.spriteSideLength * (Math.round(blockie.angleMovingDegrees / 45) + 4);

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.spriteSideLength, blockie.spriteSideLength, blockie.x, blockie.y, blockie.sideLength, blockie.sideLength);

    drawHorizontalLasers();

    //Recalls the loop for the next frame.
    window.requestAnimationFrame(loop);
};

levelOne();

//Starts the game.
window.requestAnimationFrame(loop);
//# sourceMappingURL=blockie.js.map