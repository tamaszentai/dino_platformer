import Game from "./Game.js";

export default class Player {
    game: Game;
    playerName: string;
    height: number;
    width: number;
    x: number;
    y: number;
    speedY: number;
    speedX: number;
    constructor(game: Game, playerName: string) {
        this.game = game;
        this.playerName = playerName;
        this.height = 100;
        this.width = 50;
        this.x = 0;
        this.y = 924;
        this.speedY = 0;
        this.speedX = 0;
    }

    update(){
        if (this.game.keys.includes('ArrowRight')) {
            this.speedX = 2;
        } else if (!this.game.keys.includes('ArrowRight')){
            this.speedX = 0;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "#000";
        context.fill();
    }
}