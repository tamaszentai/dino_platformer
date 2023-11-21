import Player from "./Player.js";
import InputHandler from "./InputHandler.js";

export default class Game {
    width: number;
    height: number;
    player: Player;
    inputHandler: InputHandler;
    keys: String[];
    constructor(width: number, height: number, playerName: string) {
        this.width = width;
        this.height = height;
        this.player = new Player(this, playerName);
        this.inputHandler = new InputHandler(this);
        this.keys = [];
    }
    update() {
        this.player.update();
    }
    draw(context: CanvasRenderingContext2D){
        this.player.draw(context);
    }
}