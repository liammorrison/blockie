//Game Setup

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
context.fillStyle = 'white';

//Variables

let KeysPressed = {};
let xInput = 0;
let yInput = 0;
let colliding = false;

//Arrays

let horizontalLasers = [];

//Classes

class Player {
    constructor() {
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
};

class horizontalLaser {
    constructor() {
        this.x = 0;
        this.y = 100;
        this.height = 32;
        this.width = canvas.width;
    }
}

//Functions

//Levels are a series of obstacles and objectives that appear in specific orders and time periods.
async function levelOne() {
    await Promise.all([
        fireHorizontalLaser(100, 10, 10),
        fireHorizontalLaser(200, 20, 20)
    ]);
};

//Creates an instance of a laser and adds it to an array so that it can be drawn and used in collision checking more easily.
//When the timer ends, the instance is deleted.
function fireHorizontalLaser(y, height, seconds) {
    horizontalLasers.push(new horizontalLaser());
    let newInstanceIndex = horizontalLasers.length - 1;
    horizontalLasers[newInstanceIndex].y = y;
    horizontalLasers[newInstanceIndex].height = height;
    return new Promise((resolve) => {
        setTimeout(() => {
            horizontalLasers.splice(newInstanceIndex);
            console.log('resolved');
            resolve('resolved');
        }, seconds * 1000);
    });
};

function drawHorizontalLasers() {
    for (let i = 0; i < horizontalLasers.length; i++) {
        let currentInstance = horizontalLasers[i];
        context.fillRect(currentInstance.x, currentInstance.y, currentInstance.width, currentInstance.height);
    }
}

//Determines if two objects are "colliding".
function checkSpritesColliding(xOne, yOne, widthOne, heightOne, xTwo, yTwo, widthTwo, heightTwo) {
    if ((xTwo < xOne) && (xOne < xTwo + widthTwo)) {
        colliding = true;
    } else if ((xOne < xTwo) && (xTwo < xOne + widthOne)) {
        colliding = true;
    } else if ((yTwo < yOne) && (yOne < yTwo + heightTwo)) {
        colliding = true;
    } else if ((yOne < yTwo) && (yTwo < yOne + heightOne)) {
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
document.addEventListener('keydown', e => {
    KeysPressed[e.keyCode] = true;
});

//Deletes all currently unpressed keys from the KeysPressed object.
document.addEventListener('keyup', e => {
    delete KeysPressed[e.keyCode];
});

const blockie = new Player();

function loop() {
    //Clears the canvas so that it can later be redrawn with updated locations and instances.
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Blockie's Movement

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
    if (!(blockie.testXLocation <= 0 || (blockie.testXLocation + blockie.sideLength) >= canvas.width)) {
        blockie.x = blockie.testXLocation;
    } else if (blockie.testXLocation <= 0) {
        blockie.x = 0;
    } else if ((blockie.testXLocation + blockie.sideLength) >= canvas.width) {
        blockie.x = canvas.width - blockie.sideLength;
    };

    if (!(blockie.testYLocation <= 0 || (blockie.testYLocation + blockie.sideLength) >= canvas.height)) {
        blockie.y = blockie.testYLocation;
    } else if (blockie.testYLocation <= 0) {
        blockie.y = 0;
    } else if ((blockie.testYLocation + blockie.sideLength) >= canvas.height) {
        blockie.y = canvas.height - blockie.sideLength;
    };

    //Blockie's Interactions



    //Drawing

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