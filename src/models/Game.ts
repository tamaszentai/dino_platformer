import Player from "./Player.js";
import InputHandler from "./InputHandler.js";

export default class Game {
    height: number;
    width: number;
    player: Player;
    inputHandler: InputHandler;
    keys: String[];
    constructor(height: number, width: number, playerName: string) {
        this.height = height;
        this.width = width;
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