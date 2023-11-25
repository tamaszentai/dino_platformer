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
        this.gameHeight = 4976;
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

    draw(mainContext: CanvasRenderingContext2D, viewPortContext: CanvasRenderingContext2D) {
        const mainWidth = mainContext.canvas.width;
        const mainHeight = mainContext.canvas.height;
        const viewPortWidth = viewPortContext.canvas.width;
        const viewPortHeight = viewPortContext.canvas.height;

        if ((mainHeight - this.player.height) - this.player.y >= viewPortHeight / 2) {
            console.log("nyam");
            this.gameHeight --;
        } else if ((mainHeight - this.player.height) - this.player.y < 0){
            this.gameHeight++;
        }


        mainContext.drawImage(backgroundImage, 0, 0);



        this.platforms.forEach(platform => {
            platform.draw(mainContext);
        });

        this.player.draw(mainContext);

        viewPortContext.drawImage(
            mainContext.canvas, // forrás canvas
            0, this.gameHeight, // forrás kezdőpontja a közepéhez igazítva
            mainWidth, viewPortHeight, // forrás mérete a viewPort méretéhez igazítva
            0, 0, // cél kezdőpontja
            viewPortWidth, viewPortHeight // cél mérete (teljes viewPort)
        );
    }
}