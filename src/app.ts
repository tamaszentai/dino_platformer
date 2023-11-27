import Game from "./models/Game.js";

const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d")!;
const backgroundImage = new Image();
backgroundImage.src = "src/assets/images/winter8.jpg";

const game = new Game(mainCanvas.width, mainCanvas.height, "Tamas");

const animate = () => {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  game.update();
  game.draw(mainCtx);
  requestAnimationFrame(animate);
};
animate();
