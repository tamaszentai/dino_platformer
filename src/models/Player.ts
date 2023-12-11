import Game from "./Game.js";

export default class Player {
  game: Game;
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
  onPlatform: boolean;
  currentIdleImage: number;
  currentIdleLeftImage: number;
  currentRunImage: number;
  currentRunLeftImage: number;
  currentJumpImage: number;
  currentJumpLeftImage: number;
  currentDeadImage: number;
  currentDeadLeftImage: number;
  isRightOrientation: boolean;
  isDead: boolean;

  constructor(game: Game) {
    this.game = game;
    this.height = 66;
    this.width = 28;
    this.x = game.platforms[0].x + game.platforms[0].width / 2;
    this.y = game.platforms[0].y - this.height;
    this.speedY = 0;
    this.speedX = 0;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isJumping = false;
    this.jumpStrength = 17;
    this.jumpCount = 0;
    this.maxJumps = 2;
    this.floor = game.height - this.height;
    this.onPlatform = true;
    this.currentIdleImage = 0;
    this.currentIdleLeftImage = 0;
    this.currentRunImage = 0;
    this.currentRunLeftImage = 0;
    this.currentJumpImage = 0;
    this.currentJumpLeftImage = 0;
    this.currentDeadImage = 0;
    this.currentDeadLeftImage = 0;
    this.isRightOrientation = true;
    this.isDead = false;

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight" && !this.isDead && !this.game.isGameWon) {
        this.isMovingRight = true;
        if (!this.game.isGameStarted && !this.game.isGameWon) {
          this.game.play();
        }
      } else if (event.code === "ArrowLeft" && !this.isDead && !this.game.isGameWon) {
        this.isMovingLeft = true;
        if (!this.game.isGameStarted && !this.game.isGameWon) {
          this.game.play();
        }
      } else if (event.code === "Space" && !this.isDead && this.jumpCount < 2 && !this.game.isGameWon) {
        this.isJumping = true;
        this.onPlatform = false;
        if (!this.game.isGameStarted && !this.game.isGameWon && !this.game.isGameWon) {
          this.game.play();
        }
        if (this.game.isSoundOn) {
            this.game.resources.jumpSound.play().then(() => this.game.resources.jumpSound.currentTime=0).catch();
        }
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

  update() {
    if (
      this.y < this.game.trophy.y + this.game.trophy.height &&
      this.y > this.game.trophy.y - this.height &&
      this.x + this.width >= this.game.trophy.x&&
      this.x <= this.game.trophy.x + this.width
    ) {
      this.game.gameWon();
    }

    // dead case start
    if (this.game.height <= this.y + this.height) {
      this.isDead = true;
      this.isJumping = false;
      this.isMovingLeft = false;
      this.isMovingRight = false;
    }
    // dead case end

    let lowestFloor = this.game.height - this.height;
    let platformTop;

    for (const platform of this.game.platforms) {
      if (
        this.y + this.height < platform.y &&
        this.x + this.width >= platform.x &&
        this.x <= platform.x + platform.width
      ) {
        platformTop = platform.y - this.height;
        if (platformTop < lowestFloor) {
          lowestFloor = platformTop;
        }
      }
    }

    this.floor = lowestFloor;

    if (this.isMovingRight) {
      this.isRightOrientation = true;
      this.speedX = 3;
    } else if (this.isMovingLeft) {
      this.isRightOrientation = false;
      this.speedX = -3;
    } else {
      this.speedX = 0;
    }

    if ((this.game.isGameStarted || this.isJumping) && !this.game.isGameWon) {
      this.speedY += this.game.gravity;
      this.y += this.speedY;
      if (this.y > this.floor) {
        this.y = this.floor;
        if (this.y === this.floor) {
          this.speedY = this.game.gameSpeed;
          this.onPlatform = true;
          // this.isJumping = false;
        }
        this.jumpCount = 0;
      }
    }
    // else {
    //   this.y += this.game.gameSpeed;
    // }

    this.x += this.speedX;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.isDead) {
      if (this.isRightOrientation) {
        if (this.game.animationSpeed % 8 === 0 && this.currentDeadImage < 7) {
          this.currentDeadImage++;
        }

        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "yellow";
        // context.fill();

        context.drawImage(
          this.game.resources.deadImages[this.currentDeadImage],
          this.x - 18,
          this.y - 6,
          100,
          80,
        );
      }

      if (!this.isRightOrientation) {
        if (
          this.game.animationSpeed % 8 === 0 &&
          this.currentDeadLeftImage < 7
        ) {
          this.currentDeadLeftImage++;
        }

        if (
          this.currentDeadLeftImage ===
          this.game.resources.deadLeftImages.length
        ) {
          this.currentDeadLeftImage = 0;
        }

        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "yellow";
        // context.fill();

        context.drawImage(
          this.game.resources.deadLeftImages[this.currentDeadLeftImage],
          this.x - 54,
          this.y - 6,
          100,
          80,
        );
      }
    }

    if (this.isJumping && this.isRightOrientation && !this.onPlatform) {
      if (this.game.animationSpeed % 8 === 0) {
        this.currentJumpImage++;
      }

      if (this.currentJumpImage >= this.game.resources.jumpImages.length) {
        this.currentJumpImage = 0;
      }
      // context.beginPath();
      // context.rect(this.x, this.y, this.width, this.height);
      // context.fillStyle = "yellow";
      // context.fill();

      context.drawImage(
        this.game.resources.jumpImages[this.currentJumpImage],
        this.x - 18,
        this.y - 6,
        100,
        80,
      );
    } else {
      // TODO fine tuning jumping
    }

    if (this.isJumping && !this.isRightOrientation && !this.onPlatform) {
      if (this.game.animationSpeed % 8 === 0) {
        this.currentJumpLeftImage++;
      }

      if (
        this.currentJumpLeftImage >= this.game.resources.jumpLeftImages.length
      ) {
        this.currentJumpLeftImage = 0;
      }

      // context.beginPath();
      // context.rect(this.x, this.y, this.width, this.height);
      // context.fillStyle = "yellow";
      // context.fill();

      context.drawImage(
        this.game.resources.jumpLeftImages[this.currentJumpLeftImage],
        this.x - 54,
        this.y - 6,
        100,
        80,
      );
    } else {
      // TODO fine tuning jumping
    }
    if (this.onPlatform) {
      if (this.isMovingRight) {
        if (this.game.animationSpeed % 8 === 0) {
          this.currentRunImage++;
        }

        if (this.currentRunImage >= this.game.resources.runImages.length) {
          this.currentRunImage = 0;
        }

        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "yellow";
        // context.fill();

        if (this.game.isGameStarted) {
          context.drawImage(
            this.game.resources.runImages[this.currentRunImage],
            this.x - 18,
            this.y - 6 + this.game.gameSpeed,
            100,
            80,
          );
        } else {
          context.drawImage(
            this.game.resources.runImages[this.currentRunImage],
            this.x - 18,
            this.y - 6,
            100,
            80,
          );
        }
      }
      if (this.isMovingLeft) {
        if (this.game.animationSpeed % 8 === 0) {
          this.currentRunLeftImage++;
        }

        if (
          this.currentRunLeftImage >= this.game.resources.runLeftImages.length
        ) {
          this.currentRunLeftImage = 0;
        }
        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "yellow";
        // context.fill();

        if (this.game.isGameStarted) {
          context.drawImage(
            this.game.resources.runLeftImages[this.currentRunLeftImage],
            this.x - 54,
            this.y - 6 + this.game.gameSpeed,
            100,
            80,
          );
        } else
          context.drawImage(
            this.game.resources.runLeftImages[this.currentRunLeftImage],
            this.x - 54,
            this.y - 6,
            100,
            80,
          );
      }

      if (
        !this.isMovingRight &&
        !this.isMovingLeft &&
        this.onPlatform &&
        this.isRightOrientation &&
        !this.isDead
      ) {
        if (this.game.animationSpeed % 6 === 0) {
          this.currentIdleImage++;
        }

        if (this.currentIdleImage === this.game.resources.idleImages.length) {
          this.currentIdleImage = 0;
        }

        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "yellow";
        // context.fill();

        if (this.game.isGameStarted) {
          context.drawImage(
            this.game.resources.idleImages[this.currentIdleImage],
            this.x - 18,
            this.y - 6 + this.game.gameSpeed,
            100,
            80,
          );
        } else {
          context.drawImage(
            this.game.resources.idleImages[this.currentIdleImage],
            this.x - 18,
            this.y - 6,
            100,
            80,
          );
        }
      }

      if (
        !this.isMovingRight &&
        !this.isMovingLeft &&
        this.onPlatform &&
        !this.isRightOrientation &&
        !this.isDead
      ) {
        if (this.game.animationSpeed % 6 === 0) {
          this.currentIdleLeftImage++;
        }

        if (
          this.currentIdleLeftImage ===
          this.game.resources.idleLeftImages.length
        ) {
          this.currentIdleLeftImage = 0;
        }

        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "yellow";
        // context.fill();

        if (this.game.isGameStarted) {
          context.drawImage(
            this.game.resources.idleLeftImages[this.currentIdleLeftImage],
            this.x - 54,
            this.y - 6 + this.game.gameSpeed,
            100,
            80,
          );
        } else {
          context.drawImage(
            this.game.resources.idleLeftImages[this.currentIdleLeftImage],
            this.x - 54,
            this.y - 6,
            100,
            80,
          );
        }
      }
    }
  }
}
