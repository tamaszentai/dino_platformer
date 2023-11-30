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
  currentIdleImage: number;
  currentIdleLeftImage: number;
  currentRunImage: number;
  currentRunLeftImage: number;
  currentJumpImage: number;
  currentJumpLeftImage: number;
  isRightOrientation: boolean;

  constructor(game: Game, playerName: string) {
    this.game = game;
    this.playerName = playerName;
    this.height = 66;
    this.width = 28;
    this.x = 50;
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
    this.currentIdleImage = 0;
    this.currentIdleLeftImage = 0;
    this.currentRunImage = 0;
    this.currentRunLeftImage = 0;
    this.currentJumpImage = 0;
    this.currentJumpLeftImage = 0;
    this.isRightOrientation = true;

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight") {
        this.isMovingRight = true;
      } else if (event.code === "ArrowLeft") {
        this.isMovingLeft = true;
      } else if (event.code === "Space" && this.jumpCount < 2) {
        this.isJumping = true;
        this.game.resources.jumpSound
          .play()
          .then()
          .catch((err: Error) => console.log(err));
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
      this.isRightOrientation = true;
      this.speedX = 3;
    } else if (this.isMovingLeft) {
      this.isRightOrientation = false;
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
    if (this.isJumping && this.isRightOrientation) {
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

    if (this.isJumping && !this.isRightOrientation) {
      if (this.game.animationSpeed % 8 === 0) {
        this.currentJumpLeftImage++;
      }

      if (
        this.currentJumpLeftImage >= this.game.resources.jumpLeftImages.length
      ) {
        this.currentJumpLeftImage = 0;
      }
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

    if (!this.isJumping) {
      if (this.isMovingRight) {
        if (this.game.animationSpeed % 8 === 0) {
          this.currentRunImage++;
        }

        if (this.currentRunImage >= this.game.resources.runImages.length) {
          this.currentRunImage = 0;
        }
        context.drawImage(
          this.game.resources.runImages[this.currentRunImage],
          this.x - 18,
          this.y - 6,
          100,
          80,
        );
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
        !this.isJumping &&
        this.isRightOrientation
      ) {
        if (this.game.animationSpeed % 6 === 0) {
          this.currentIdleImage++;
        }

        if (this.currentIdleImage === this.game.resources.idleImages.length) {
          this.currentIdleImage = 0;
        }

        context.drawImage(
          this.game.resources.idleImages[this.currentIdleImage],
          this.x - 18,
          this.y - 6,
          100,
          80,
        );
      }

      if (
        !this.isMovingRight &&
        !this.isMovingLeft &&
        !this.isJumping &&
        !this.isRightOrientation
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
