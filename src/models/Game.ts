import Resources from "./Resources.js";
import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import Platform from "./Platform.js";

export default class Game {
    width: number;
    height: number;
    gravity: number;
    resources: Resources;
    platforms: Platform[];
    player: Player;
    inputHandler: InputHandler;
    backgroundStartY: number;
    backgroundPositionY: number;
    animationSpeed: number;


    constructor(width: number, height: number, playerName: string) {
        this.width = width;
        this.height = height;
        this.gravity = 0.5;
        this.resources = new Resources();
        this.platforms = []
        this.player = new Player(this, playerName);
        this.inputHandler = new InputHandler(this);
        this.backgroundStartY = 0;
        this.backgroundPositionY = 0;
        this.animationSpeed = 5;
        // this.resources.gameTheme
        //     .play()
        //     .then()
        //     .catch((err) => console.log(err));

        for (let i = 0; i < 2; i++) {
            this.platforms.push(new Platform(this));
        }

    }

    addPlatforms() {
        for (let i = 0; i < 1; i++) {
            this.platforms.push(new Platform(this));
        }
    }

    update() {
        this.player.update();
    }

    draw(mainContext: CanvasRenderingContext2D) {
        mainContext.drawImage(this.resources.backgroundImage, 0, this.backgroundPositionY);
        mainContext.drawImage(this.resources.backgroundImage, 0, this.backgroundPositionY - this.resources.backgroundImage.height);

        this.backgroundPositionY += 2;

        if (this.backgroundPositionY >= this.resources.backgroundImage.height) {
            this.backgroundPositionY = 0;
        }

        this.platforms.forEach(platform => {
            platform.draw(mainContext);
        })
        this.player.draw(mainContext);
    }
}