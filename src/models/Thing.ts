import Game from "./Game";

export default class Thing {
  game: Game;
  x: number;
  y: number;
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(game: Game, x: number, y: number, image: HTMLImageElement) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw(context: CanvasRenderingContext2D, movingY: number) {
    context.drawImage(this.image, this.x, movingY);
  }
}
