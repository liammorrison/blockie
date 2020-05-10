'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var blockieSpeed = 2;
var KeysPressed = {};
var xInput = 0;
var yInput = 0;

var Player = function Player() {
    _classCallCheck(this, Player);

    this.x = 64;
    this.y = 64;
    this.testXLocation = this.x;
    this.testYLocation = this.y;
    this.sideLength = 16;
};

;

var blockie = new Player();

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
}

//Adds all currently pressed keys as a key with a pair of true in the KeysPressed object.
document.addEventListener('keydown', function (e) {
    KeysPressed[e.key] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener('keyup', function (e) {
    delete KeysPressed[e.key];
});

function loop() {
    //Clears the canvas so that it can later be redrawn with updated locations.
    context.clearRect(0, 0, canvas.width, canvas.height);

    //xInput and yInput are both used to determine the angle that Blockie is moving in.
    xInput = 0;
    yInput = 0;

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

    //Finds the angle that Blockie is moving based on the inputs.
    var angleBlockieMoving = calculateAngleRadians(xInput, yInput);

    //Stores the desired new location for Blockie by adding blockieSpeed in the input direction and adding that
    //to Blockie's current location. This variable is then used to prevent Blockie from moving to certain places.
    if (xInput !== 0 || yInput !== 0) {
        blockie.testXLocation = blockie.x + Math.cos(angleBlockieMoving) * blockieSpeed;
        blockie.testYLocation = blockie.y + Math.sin(angleBlockieMoving) * blockieSpeed;
    };

    //Updates Blockie's location if it is not off of the canvas. This is divided into x and y components so that
    //Blockie can move diagonally against the canvas border.
    if (!(blockie.testXLocation <= 0 || blockie.testXLocation + blockie.sideLength >= canvas.width)) {
        blockie.x = blockie.testXLocation;
    };

    if (!(blockie.testYLocation <= 0 || blockie.testYLocation + blockie.sideLength >= canvas.height)) {
        blockie.y = blockie.testYLocation;
    };

    //Draws Blockie.
    context.fillStyle = 'red';
    context.fillRect(blockie.x, blockie.y, blockie.sideLength, blockie.sideLength);

    //Recalls the loop for the next frame.
    window.requestAnimationFrame(loop);
};

//Starts the game.
window.requestAnimationFrame(loop);
//# sourceMappingURL=blockie.js.map