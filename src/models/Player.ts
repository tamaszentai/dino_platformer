import Game from "./Game.js";

export default class Player {
  game: Game;
  playerName: string;
  height: number;
  width: number;
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  isMovingLeft: boolean;
  isMovingRight: boolean;
  isJumping: boolean;
  jumpStrength: number;
  jumpCount: number;
  maxJumps: number;
  floor: number;
  idleImages: HTMLImageElement[];
  runImages: HTMLImageElement[];
  runLeftImages: HTMLImageElement[];
  jumpImages: HTMLImageElement[];
  currentIdleImage: number;
  currentRunImage: number;
  currentRunLeftImage: number;
  currentJumpImage: number;

  constructor(game: Game, playerName: string) {
    this.game = game;
    this.playerName = playerName;
    this.height = 50;
    this.width = 50;
    this.x = 0;
    this.y = game.height - this.height;
    this.speedY = 0;
    this.speedX = 0;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isJumping = false;
    this.jumpStrength = 17;
    this.jumpCount = 0;
    this.maxJumps = 2;
    this.floor = game.height - this.height;
    this.idleImages = [];
    this.runImages = [];
    this.runLeftImages = [];
    this.jumpImages = [];
    this.currentIdleImage = 0;
    this.currentRunImage = 0;
    this.currentRunLeftImage = 0;
    this.currentJumpImage = 0;

    this.preloadIdleImages();
    this.preloadRunImages();
    this.preloadRunLeftImages();
    this.preloadJumpImages();

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight") {
        this.isMovingRight = true;
      } else if (event.code === "ArrowLeft") {
        this.isMovingLeft = true;
      } else if (event.code === "Space" && this.jumpCount < 2) {
        const jumpAudio = new Audio("src/assets/sounds/jump.mp3");
        jumpAudio
          .play()
          .then()
          .catch((err) => console.log(err));
        this.isJumping = true;
        this.jumpCount++;
        this.speedY = -this.jumpStrength;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.code === "ArrowRight") {
        this.isMovingRight = false;
      } else if (event.code === "ArrowLeft") {
        this.isMovingLeft = false;
      }
    });
  }

  preloadIdleImages() {
    for (let i = 1; i <= 10; i++) {
      const img = new Image();
      img.src = `src/assets/sprites/idle/Idle (${i}).png`;
      this.idleImages.push(img);
    }
  }

  preloadRunImages() {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `src/assets/sprites/run/Run (${i}).png`;
      this.runImages.push(img);
    }
  }

  preloadRunLeftImages() {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `src/assets/sprites/runLeft/Run (${i}).png`;
      this.runLeftImages.push(img);
    }
  }

  preloadJumpImages() {
    for (let i = 1; i <= 12; i++) {
      const img = new Image();
      img.src = `src/assets/sprites/jump/Jump (${i}).png`;
      this.jumpImages.push(img);
    }
  }

  update() {
    let lowestFloor = this.game.height - this.height;

    for (const platform of this.game.platforms) {
      if (
        this.y + this.height < platform.y + platform.height &&
        this.x + this.width >= platform.x &&
        this.x <= platform.x + platform.width
      ) {
        const platformTop = platform.y - this.height;
        if (platformTop < lowestFloor) {
          lowestFloor = platformTop;
        }
      }
    }

    this.floor = lowestFloor;

    if (lowestFloor > this.y && !this.isJumping) {
      this.speedY += 0.1;
      this.y += this.speedY;
    }

    if (this.isMovingRight) {
      this.speedX = 3;
    } else if (this.isMovingLeft) {
      this.speedX = -3;
    } else {
      this.speedX = 0;
    }

    if (this.isJumping) {
      this.speedY += this.game.gravity;
      this.y += this.speedY;
      if (this.y >= this.floor) {
        this.y = this.floor;
        this.isJumping = false;
      }
    } else {
      this.y += this.game.gravity;
      if (this.y >= this.floor) {
        this.y = this.floor;
        this.jumpCount = 0;
      }
    }

    this.x += this.speedX;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.isJumping) {
      if (this.game.animationSpeed % 8 === 0) {
        this.currentJumpImage++;
      }

      if (this.currentJumpImage >= this.jumpImages.length) {
        this.currentJumpImage = 0;
      }

      context.drawImage(
        this.jumpImages[this.currentJumpImage],
        this.x,
        this.y - 22,
        100,
        80,
      );
    } else {
      // TODO fine tuning jumping
    }

    if (!this.isJumping) {
      if (this.isMovingRight) {
        if (this.game.animationSpeed % 8 === 0) {
          this.currentRunImage++;
        }

        if (this.currentRunImage >= this.runImages.length) {
          this.currentRunImage = 0;
        }

        context.drawImage(
          this.runImages[this.currentRunImage],
          this.x,
          this.y - 22,
          100,
          80,
        );
      }
      if (this.isMovingLeft) {
        if (this.game.animationSpeed % 8 === 0) {
          this.currentRunLeftImage++;
        }

        if (this.currentRunLeftImage >= this.runLeftImages.length) {
          this.currentRunLeftImage = 0;
        }

        context.drawImage(
          this.runLeftImages[this.currentRunLeftImage],
          this.x,
          this.y - 22,
          100,
          80,
        );
      }

      if (!this.isMovingRight && !this.isMovingLeft && !this.isJumping) {
        if (this.game.animationSpeed % 6 === 0) {
          this.currentIdleImage++;
        }

        if (this.currentIdleImage === this.idleImages.length) {
          this.currentIdleImage = 0;
        }

        context.drawImage(
          this.idleImages[this.currentIdleImage],
          this.x,
          this.y - 22,
          100,
          80,
        );
      }
    }
  }
}
