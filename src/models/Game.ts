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
  gameSpeed: number;
  score: number;
  isGameStarted: boolean;
  gameOverThemeCount: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.gravity = 0.5;
    this.platformCount = 300;
    this.resources = new Resources();
    this.platforms = [];
    this.gameSpeed = 0;
    this.score = 0;
    this.isGameStarted = false;
    this.gameOverThemeCount = 0;

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

    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.backgroundStartY = 0;
    this.backgroundPositionY = 0;
    this.animationSpeed = 5;
  }

  play() {
    this.isGameStarted = true;
    this.resources.gameTheme
      .play()
      .then()
      .catch((err) => console.log(err));
    this.gameSpeed = 1;
  }

  gameOver() {
    this.isGameStarted = false;
    this.resources.gameTheme.pause();
    this.gameSpeed = 0;
    if (this.gameOverThemeCount === 0) {
      this.resources.gameOverTheme
        .play()
        .then()
        .catch((err) => console.log(err));
      this.gameOverThemeCount++;
    }
  }

  update() {
    if (this.player.isDead) {
      this.gameOver();
    }

    if (this.isGameStarted) {
      this.score++;
    }

    if (this.score % 1000 === 0 && this.score !== 0) {
        this.gameSpeed += 0.5;
    }
    this.animationSpeed++;
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

    this.backgroundPositionY += this.gameSpeed;

    if (this.backgroundPositionY >= this.resources.backgroundImage.height) {
      this.backgroundPositionY = 0;
    }

    this.platforms.forEach((platform) => {
      platform.draw(mainContext, (platform.y += this.gameSpeed));
    });
    this.player.draw(mainContext);
  }
}
