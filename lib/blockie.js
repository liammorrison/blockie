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

    //Checks if each key is being pressed from they KeysPressed object and changes dx and dy accordingly.
    if (KeysPressed['d']) {
        blockie.dx += blockieSpeed;
    }

    if (KeysPressed['a']) {
        blockie.dx -= blockieSpeed;
    }

    if (KeysPressed['s']) {
        blockie.dy += blockieSpeed;
    }

    if (KeysPressed['w']) {
        blockie.dy -= blockieSpeed;
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