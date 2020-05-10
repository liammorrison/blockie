const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

//Variables
let angleBlockieMovingRadians = 0;
let angleBlockieMovingDegrees = 0;
const blockieSpeed = 2;
let KeysPressed = {};
let xInput = 0;
let yInput = 0;

class Player {
    constructor() {
        this.x = 64;
        this.y = 64;
        this.sideLength = 16;
        this.sx = 0;
        this.testXLocation = this.x;
        this.testYLocation = this.y;

        //Loads Blockie's sprite map. It is one large sprite map to avoid loading many individual 
        //sprite files.
        this.sprite = document.createElement('img');
        this.sprite.src = '../images/blockie.png';
    };
};

const blockie = new Player();

function calculateAngleRadians(x, y) {
    return Math.atan2(y, x);
}

function convertRadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
};

//Adds all currently pressed keys as a key with a pair of true in the KeysPressed object.
document.addEventListener('keydown', e => {
    KeysPressed[e.key] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener('keyup', e => {
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
    angleBlockieMovingDegrees = -180;

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
        angleBlockieMovingRadians = calculateAngleRadians(xInput, yInput);

        //Converted to make the direction of the sprite more discernible.
        angleBlockieMovingDegrees = convertRadiansToDegrees(angleBlockieMovingRadians);

        //Stores the desired new location for Blockie by adding blockieSpeed in the input direction and adding that
        //to Blockie's current location. This variable is then used to prevent Blockie from moving to certain places.
        blockie.testXLocation = blockie.x + Math.cos(angleBlockieMovingRadians) * blockieSpeed;
        blockie.testYLocation = blockie.y + Math.sin(angleBlockieMovingRadians) * blockieSpeed;
    };

    //Updates Blockie's location if it is not off of the canvas. This is divided into x and y components so that
    //Blockie can move diagonally against the canvas border.
    if (!(blockie.testXLocation <= 0 || (blockie.testXLocation + blockie.sideLength) >= canvas.width)) {
        blockie.x = blockie.testXLocation;
    };

    if (!(blockie.testYLocation <= 0 || (blockie.testYLocation + blockie.sideLength) >= canvas.height)) {
        blockie.y = blockie.testYLocation;
    };

    //sx is the location on the blockie.png sprite map and it determines the sprite's direction facing. 
    //It starts at the idle image, then goes to the top-left, and then continues in a clockwise direction.
    blockie.sx = blockie.sideLength * (Math.round(angleBlockieMovingDegrees / 45) + 4);

    context.drawImage(blockie.sprite, blockie.sx, 0, blockie.sideLength, blockie.sideLength, blockie.x, blockie.y, blockie.sideLength, blockie.sideLength);

    //Recalls the loop for the next frame.
    window.requestAnimationFrame(loop);
};

//Starts the game.
window.requestAnimationFrame(loop);