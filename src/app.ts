import Game from "./models/Game.js";

const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let game = new Game(canvas.width, canvas.height);
window.addEventListener("keydown", (event) => {
  if (event.code === "Enter" && (game.player.isDead || game.isGameWon)) {
    game = new Game(canvas.width, canvas.height);
  }
});

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  game.draw(ctx);
  ctx.font = "30px Arial";
  ctx.fillText(`Score: ${game.score}`, 10, 50);
  ctx.fillText(`Speed: ${game.currentSpeed}`, 870, 50);

  if (game.player.isDead && (game.player.currentDeadImage === 7 || game.player.currentDeadLeftImage === 7 )) {
    ctx.font = "30px Arial";
    ctx.fillText("Game over", canvas.width / 2 - 50, canvas.height / 2);
    ctx.fillText(
      "Press enter to play again",
      canvas.width / 2 - 150,
      canvas.height / 2 + 50,
    );
  }

  if (game.isGameWon) {
    ctx.font = "30px Arial";
    ctx.fillText("You won!", canvas.width / 2 - 50, canvas.height / 2);
    ctx.fillText(
      "Press enter to play again",
      canvas.width / 2 - 150,
      canvas.height / 2 + 50,
    );
  }
  requestAnimationFrame(animate);
};
animate();
