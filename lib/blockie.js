'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

//Variables
var KeysPressed = {};
var xInput = 0;
var yInput = 0;

var Player = function Player() {
    _classCallCheck(this, Player);

    this.x = 64;
    this.y = 64;
    this.sideLength = 16;
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

var blockie = new Player();

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
}

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Adds all currently pressed keys as a key with a pair of true in the KeysPressed object.
document.addEventListener('keydown', function (e) {
    KeysPressed[e.key] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener('keyup', function (e) {
    delete KeysPressed[e.key];
});

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
    if (KeysPressed['d']) {
        xInput += 1;
    };

    if (KeysPressed['a']) {
        xInput -= 1;
    };

    if (KeysPressed['s']) {
        yInput += 1;
    };

    if (KeysPressed['w']) {
        yInput -= 1;
    };

    if (xInput !== 0 || yInput !== 0) {
        //Finds the angle that Blockie is moving in radians based on the inputs.
        blockie.angleMovingRadians = calculateAngleRadians(xInput, yInput);

        //Converted to make the direction of the sprite more discernible.
        blockie.angleMovingDegrees = convertRadiansToDegrees(blockie.angleMovingRadians);

        blockie.dx = Math.cos(blockie.angleMovingRadians) * blockie.speed;
        blockie.dy = Math.sin(blockie.angleMovingRadians) * blockie.speed;

        blockie.xSubPixel += blockie.dx;
        blockie.ySubPixel += blockie.dy;

        blockie.dx = Math.floor(blockie.xSubPixel);
        blockie.dy = Math.floor(blockie.ySubPixel);

        blockie.xSubPixel -= blockie.dx;
        blockie.ySubPixel -= blockie.dy;

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
    blockie.sx = blockie.sideLength * (Math.round(blockie.angleMovingDegrees / 45) + 4);

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.sideLength, blockie.sideLength, blockie.x, blockie.y, blockie.sideLength, blockie.sideLength);

    //Recalls the loop for the next frame.
    window.requestAnimationFrame(loop);
};

//Starts the game.
window.requestAnimationFrame(loop);
//# sourceMappingURL=blockie.js.map