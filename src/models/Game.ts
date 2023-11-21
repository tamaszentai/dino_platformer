import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import Platform from "./Platform.js";

export default class Game {
    width: number;
    height: number;
    gravity: number;
    player: Player;
    platforms: Platform[];
    inputHandler: InputHandler;
    constructor(width: number, height: number, playerName: string) {
        this.width = width;
        this.height = height;
        this.gravity = 0.5;
        this.player = new Player(this, playerName);
        this.platforms = []
        this.inputHandler = new InputHandler(this);

        for (let i = 0; i < 5; i++) {
            this.platforms.push(new Platform(this));
        }
    }
    update() {
        this.player.update();
    }
    draw(context: CanvasRenderingContext2D){
        this.player.draw(context);
        this.platforms.forEach(platform => {
            platform.draw(context);
        })
    }
}