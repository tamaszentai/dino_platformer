import Game from "./Game.js";

export default class Platform {
    game: Game;
    height: number;
    width: number;
    x: number;
    y: number;

    constructor(game: Game) {
        this.game = game;
        this.height = 10;
        this.width = 100;
        this.y = this.randomIntFromInterval(5500, 0);
        this.x = this.randomIntFromInterval(0, this.game.width);
    }

    randomIntFromInterval(min: number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "yellow";
        context.fill();
    }
}
