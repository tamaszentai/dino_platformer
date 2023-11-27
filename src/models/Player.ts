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
  spriteRunImages: HTMLImageElement[];
  currentRunImage: number;
  animationSpeed: number;

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
    this.jumpStrength = 20;
    this.jumpCount = 0;
    this.maxJumps = 2;
    this.floor = game.height - this.height;
    this.spriteRunImages = [];
    this.currentRunImage = 0;
    this.animationSpeed = 1000; // Adjust animation speed here

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight") {
        this.isMovingRight = true;
      } else if (event.code === "ArrowLeft") {
        this.isMovingLeft = true;
      } else if (event.code === "Space" && this.jumpCount < 2) {
        const jumpAudio = new Audio('src/assets/sounds/jump.mp3');
        jumpAudio.play().then().catch(err => console.log(err));
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

    this.preloadRunImages();
  }

  preloadRunImages() {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `src/assets/sprites/run/Run (${i}).png`;
      this.spriteRunImages.push(img);
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
    // if (this.isMovingRight) {
    //   context.drawImage(this.spriteRunImages[this.currentRunImage], this.x, this.y, this.width, this.height);
    // }
    //
    // if (this.isMovingLeft) {
    //   context.drawImage(this.spriteRunImages[this.currentRunImage], this.x, this.y, this.width, this.height);
    // }
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "salmon";
    context.fill();
  }
}
