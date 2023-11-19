import Player from "./Player.js";

export default class Game {
    height: number;
    width: number;
    player: Player;
    constructor(height: number, width: number, playerName: string) {
        this.height = height;
        this.width = width;
        this.player = new Player(this, playerName);
    }
    update() {
        this.player.update();
    }
    draw(context: CanvasRenderingContext2D){
        this.player.draw(context);
    }
}