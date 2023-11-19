export default class Player {
    constructor(playerName, height, width, x, y, canvas) {
        this.playerName = playerName;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
    }
    moveForward() {
    }
    moveBackward() {
    }
    climb() {
    }
    jump() {
    }
    attack() {
    }
}
