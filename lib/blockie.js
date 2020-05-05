'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var KeysPressed = {};
var blockieSpeed = 2;

var Player = function Player() {
    _classCallCheck(this, Player);

    this.x = 64;
    this.y = 64;
    this.dx = 0;
    this.dy = 0;
    this.sideLength = 16;
};

;

var blockie = new Player();

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
}

function loop() {
    //Clears the canvas so that it can later be redrawn with updated locations.
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Adds all currently pressed keys as a key with a pair of true in the KeysPressed object.
    document.addEventListener('keydown', function (e) {
        KeysPressed[e.key] = true;
    });

    //Deletes all currently unpressed keys from the KeysPressed object.
    document.addEventListener('keyup', function (e) {
        delete KeysPressed[e.key];
    });

    //Prevents perpetual motion.
    blockie.dx = 0;
    blockie.dy = 0;

    //xInput and yInput are both used to determine the angle that Blockie is moving in.
    var xInput = 0;
    var yInput = 0;

    //Each key changes the angle of Blockie's movement.
    if (KeysPressed['d']) {
        xInput += 1;
    }

    if (KeysPressed['a']) {
        xInput -= 1;
    }

    if (KeysPressed['s']) {
        yInput += 1;
    }

    if (KeysPressed['w']) {
        yInput -= 1;
    }

    //Finds the angle that Blockie is moving based on the inputs.
    var angleBlockieMoving = calculateAngleRadians(xInput, yInput);

    //Moves Blockie in the direction of the input, and the trigonometry prevents faster diagonal movement by making 
    //the desired speed the hypotenuse and finding the x and y components from that.
    if (xInput !== 0 || yInput !== 0) {
        blockie.dx = Math.cos(angleBlockieMoving) * blockieSpeed;
        blockie.dy = Math.sin(angleBlockieMoving) * blockieSpeed;
    }

    //Updates Blockie's location by adding directional changes to his current location.
    blockie.x += blockie.dx;
    blockie.y += blockie.dy;

    //Draws Blockie.
    context.fillStyle = 'red';
    context.fillRect(blockie.x, blockie.y, blockie.sideLength, blockie.sideLength);

    //Recalls the loop for the next frame.
    window.requestAnimationFrame(loop);
};

//Starts the game.
window.requestAnimationFrame(loop);
//# sourceMappingURL=blockie.js.map