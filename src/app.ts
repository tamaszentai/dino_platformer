import Game from "./models/Game.js";

const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d")!;
const viewPortCanvas = document.getElementById(
  "viewPortCanvas",
) as HTMLCanvasElement;
const viewPortCtx = viewPortCanvas.getContext("2d")!;
const backgroundImage = new Image();
backgroundImage.src = "src/assets/images/winter8.jpg";

const game = new Game(mainCanvas.width, mainCanvas.height, "Tamas");

const animate = () => {
  viewPortCtx.clearRect(0, 0, viewPortCanvas.width, viewPortCanvas.height);
  game.update();
  game.draw(mainCtx, viewPortCtx);
  requestAnimationFrame(animate);
};
animate();
