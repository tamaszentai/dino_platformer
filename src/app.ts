import Game from "./models/Game.js";

const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d")!;

const game = new Game(mainCanvas.width, mainCanvas.height, "Tamas");

const animate = () => {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  game.update();
  game.animationSpeed++;
  game.draw(mainCtx);
  // if (game.player.currentDeadImage !== 7 || game.player.currentDeadLeftImage !== 7) {
    requestAnimationFrame(animate);
  // }
};
animate();
