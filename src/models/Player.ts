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

    constructor(game: Game, playerName: string) {
        this.game = game;
        this.playerName = playerName;
        this.height = 100;
        this.width = 50;
        this.x = 0;
        this.y = 924;
        this.speedY = 0;
        this.speedX = 0;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isJumping = false;
        this.jumpStrength = 20;
        this.jumpCount = 0;
        this.maxJumps = 2;


        window.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowRight') {
                this.isMovingRight = true;
            } else if (event.code === 'ArrowLeft') {
                this.isMovingLeft = true;
            } else if (event.code === 'Space' && this.jumpCount < 2) {
                this.isJumping = true;
                this.jumpCount++
                this.speedY = -this.jumpStrength;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowRight') {
                this.isMovingRight = false;
            } else if (event.code === 'ArrowLeft') {
                this.isMovingLeft = false;
            }
        });
    }

    update() {
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
            if (this.y >= 924) {
                this.y = 924;
                this.isJumping = false;
            }
        } else {

            this.y += this.game.gravity;
            if (this.y >= 924) {
                this.y = 924;
                this.jumpCount = 0;
            }
        }

        this.x += this.speedX;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "#000";
        context.fill();
    }
}
