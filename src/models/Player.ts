export default class Player {
    playerName: string;
    height: number;
    width: number;
    x: number;
    y: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(playerName: string, height: number, width: number, x: number, y: number, canvas: HTMLCanvasElement) {
        this.playerName = playerName;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

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