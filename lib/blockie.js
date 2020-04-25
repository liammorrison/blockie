'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var blockie = function blockie() {
    _classCallCheck(this, blockie);

    this.x = 64;
    this.y = 64;
    this.sideLength = 16;
};

;

//const blockie = new blockie();

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Draws Blockie.
    context.fillStyle = 'red';
    context.fillRect(1, 2, 16, 16);
};

window.requestAnimationFrame(loop());
//# sourceMappingURL=blockie.js.map