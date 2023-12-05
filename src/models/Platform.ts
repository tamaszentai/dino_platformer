import Game from "./Game.js";

export default class Platform {
    game: Game;
    height: number;
    width: number;
    x: number;
    y: number;

    constructor(game: Game) {
        this.game = game;
        this.height = 40;
        this.width = 150;
        this.y = 500
        this.x = this.randomIntFromInterval(this.width, this.game.width - this.width);
    }

    randomIntFromInterval(min: number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    draw(context: CanvasRenderingContext2D, movingY: number) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "red";
        context.fill();
        context.drawImage(
            this.game.resources.platformImages[0],
            this.x,
            movingY,
            this.width / 3,
            this.height,
        );
        context.drawImage(
            this.game.resources.platformImages[1],
            this.x + 50,
            movingY,
            this.width / 3,
            this.height,
        );
        context.drawImage(
            this.game.resources.platformImages[2],
            this.x + 100,
            movingY,
            this.width / 3,
            this.height,
        );
    }
}
