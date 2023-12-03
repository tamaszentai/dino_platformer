import Resources from "./Resources.js";
import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import Platform from "./Platform.js";

export default class Game {
  width: number;
  height: number;
  gravity: number;
  platformCount: number;
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
    this.platformCount = 300;
    this.resources = new Resources();
    this.platforms = [];
    this.player = new Player(this, playerName);
    this.inputHandler = new InputHandler(this);
    this.backgroundStartY = 0;
    this.backgroundPositionY = 0;
    this.animationSpeed = 5;
    // this.resources.gameTheme
    //     .play()
    //     .then()
    //     .catch((err) => console.log(err));

    for (let i = 0; i < this.platformCount; i++) {
      let platform = new Platform(this);
      if (this.platforms.length > 0) {
        let lastPlatform = this.platforms[this.platforms.length - 1];
        if (lastPlatform.y > platform.y) {
          platform.y -= 200;
        } else {
          platform.y = lastPlatform.y - 200;
        }
      }
      this.platforms.push(platform);
    }
  }

  update() {
    this.player.update();
  }

  draw(mainContext: CanvasRenderingContext2D) {
    mainContext.drawImage(
      this.resources.backgroundImage,
      0,
      this.backgroundPositionY,
    );
    mainContext.drawImage(
      this.resources.backgroundImage,
      0,
      this.backgroundPositionY - this.resources.backgroundImage.height,
    );

    this.backgroundPositionY += 2;

    if (this.backgroundPositionY >= this.resources.backgroundImage.height) {
      this.backgroundPositionY = 0;
    }

    this.platforms.forEach((platform) => {
      platform.draw(mainContext, platform.y += 2);
    });
    this.player.draw(mainContext);
  }
}