import Resources from "./Resources.js";
import Player from "./Player.js";
import Platform from "./Platform.js";
import Thing from "./Thing.js";

export default class Game {
  width: number;
  height: number;
  isSoundOn: boolean;
  isMusicOn: boolean;
  gravity: number;
  platformCount: number;
  resources: Resources;
  platforms: Platform[];
  player: Player;
  trophy: Thing;
  backgroundStartY: number;
  backgroundPositionY: number;
  animationSpeed: number;
  gameSpeed: number;
  currentSpeed: number;
  score: number;
  isGameStarted: boolean;
  gameOverThemeCount: number;
  gameWonThemeCount: number;
  isGameWon: boolean;

  constructor(
    width: number,
    height: number,
    isSoundOn: boolean,
    isMusicOn: boolean,
  ) {
    this.width = width;
    this.height = height;
    this.isSoundOn = isSoundOn;
    this.isMusicOn = isMusicOn;
    this.gravity = 0.5;
    this.platformCount = 200;
    this.resources = new Resources();
    this.platforms = [];
    this.gameSpeed = 0;
    this.currentSpeed = 0;
    this.score = 0;
    this.isGameStarted = false;
    this.gameOverThemeCount = 0;
    this.gameWonThemeCount = 0;
    this.isGameWon = false;

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
    this.trophy = new Thing(
      this,
      this.platforms[this.platforms.length - 1].x +
        this.platforms[this.platforms.length - 1].width / 2 -
        20,
      this.platforms[this.platforms.length - 1].y - 50,
      this.resources.trophyImage,
    );
    this.backgroundStartY = 0;
    this.backgroundPositionY = 0;
    this.animationSpeed = 5;
  }

  play() {
    this.isGameStarted = true;
    this.isGameWon = false;
    if (this.isMusicOn) {
        this.resources.gameTheme
            .play()
            .then()
            .catch((err) => console.log(err));
    }
    this.gameSpeed = 1;
    this.setCurrentSpeed();
  }

  gameOver() {
    this.isGameStarted = false;
    this.resources.gameTheme.pause();
    this.gameSpeed = 0;
    if (this.gameOverThemeCount === 0) {
      if (this.isSoundOn) {
        this.resources.gameOverTheme
            .play()
            .then()
            .catch((err) => console.log(err));
      }
      this.gameOverThemeCount++;
    }
  }

  gameWon() {
    this.isGameStarted = false;
    this.isGameWon = true;
    this.resources.gameTheme.pause();
    this.gameSpeed = 0;

    if (this.gameWonThemeCount === 0) {
      if (this.isSoundOn) {
        this.resources.gameWonTheme
          .play()
          .then()
          .catch((err) => console.log(err));
      }
      this.gameWonThemeCount++;
    }
  }

  setCurrentSpeed() {
    this.currentSpeed = this.gameSpeed;
  }

  toggleSound() {
    this.isSoundOn = !this.isSoundOn;
    if (this.isSoundOn) {
      this.resources.jumpSound.volume = 0.1;
      this.resources.gameOverTheme.volume = 0.2;
      this.resources.gameWonTheme.volume = 0.2;
    } else {
        this.resources.jumpSound.volume = 0;
        this.resources.gameOverTheme.volume = 0;
        this.resources.gameWonTheme.volume = 0;
    }
  }

    toggleMusic() {
        this.isMusicOn = !this.isMusicOn;
        if (this.isMusicOn && this.isGameStarted) {
            this.resources.gameTheme.play();
        } else {
            this.resources.gameTheme.pause();
        }
    }

  update() {
    console.log(this.isMusicOn);
    if (this.player.isDead) {
      this.gameOver();
    }

    if (this.isGameStarted) {
      this.score++;
    }

    if (this.score % 1000 === 0 && this.score !== 0) {
      this.gameSpeed += 0.5;
      if (this.gameSpeed !== 0) {
        this.setCurrentSpeed();
      }
    }
    this.animationSpeed++;
    this.player.update();
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.resources.backgroundImage,
      0,
      this.backgroundPositionY,
    );
    context.drawImage(
      this.resources.backgroundImage,
      0,
      this.backgroundPositionY - this.resources.backgroundImage.height,
    );

    this.backgroundPositionY += this.gameSpeed;

    if (this.backgroundPositionY >= this.resources.backgroundImage.height) {
      this.backgroundPositionY = 0;
    }

    this.platforms.forEach((platform) => {
      platform.draw(context, (platform.y += this.gameSpeed));
    });

    this.trophy.draw(context, (this.trophy.y += this.gameSpeed));
    this.player.draw(context);
  }
}
