import Game from "./models/Game.js";

const startButton = document.getElementById("startButton") as HTMLButtonElement;
const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d")!;

let game = new Game(mainCanvas.width, mainCanvas.height);
startButton.addEventListener("click", () => {
  if (game.player.isDead) {
    game = new Game(mainCanvas.width, mainCanvas.height);
  }
});

const animate = () => {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.font = "30px Arial";
  mainCtx.fillText("Hello World", 10, 50);
  game.update();
  game.draw(mainCtx);


  mainCtx.font = "30px Arial";
  mainCtx.fillText(`Score: ${game.score}`, 10, 50);
  mainCtx.fillText(`Speed: ${game.gameSpeed}`, 890, 50);
    requestAnimationFrame(animate);
};
animate();
