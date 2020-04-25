const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class blockie {
    constructor() {
        this.x = 64;
        this.y = 64;
        this.sideLength = 16;
    };
};

//const blockie = new blockie();

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Draws Blockie.
    context.fillStyle = 'red';
    context.fillRect(1, 2, 16, 16);
};

window.requestAnimationFrame(loop());