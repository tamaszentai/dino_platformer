import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import Platform from "./Platform.js";
const backgroundImage = new Image();
backgroundImage.src = 'src/assets/images/winter8.jpg';

export default class Game {
    width: number;
    height: number;
    gravity: number;
    gameHeight: number;
    platforms: Platform[];
    player: Player;
    inputHandler: InputHandler;
    constructor(width: number, height: number, playerName: string) {
        this.width = width;
        this.height = height;
        this.gravity = 0.5;
        this.gameHeight = -4976;
        this.platforms = []
        for (let i = 0; i < 10; i++) {
            this.platforms.push(new Platform(this));
        }
        this.player = new Player(this, playerName);
        this.inputHandler = new InputHandler(this);
    }
    update() {
        this.player.update();
    }
    draw(context: CanvasRenderingContext2D){
        if (this.player.y < context.canvas.height / 2) {
            this.gameHeight++
        }
        context.drawImage(backgroundImage, 0, this.gameHeight);
        this.platforms.forEach(platform => {
            platform.draw(context);
        })
        this.player.draw(context);


    }
}