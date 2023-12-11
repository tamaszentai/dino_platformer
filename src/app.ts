import Game from "./models/Game.js";

const soundImage = document.getElementById('soundImage') as HTMLImageElement
const musicImage = document.getElementById('musicImage')  as HTMLImageElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let isSoundOn = true;
let isMusicOn = true;

function toggleSound() {
  isSoundOn = !isSoundOn;
  game.toggleSound();
    soundImage.src = isSoundOn ? './src/assets/images/sound_on.png' : './src/assets/images/sound_off.png';
}

function toggleMusic() {
    isMusicOn = !isMusicOn;
    game.toggleMusic();
    musicImage.src = isMusicOn ? './src/assets/images/music_on.png' : './src/assets/images/music_off.png';
}

soundImage.addEventListener('click', toggleSound);
musicImage.addEventListener('click', toggleMusic);

let game = new Game(canvas.width, canvas.height, isSoundOn, isMusicOn);
window.addEventListener("keydown", (event) => {
  if (event.code === "Enter" && (game.player.isDead || game.isGameWon)) {
    game = new Game(canvas.width, canvas.height, isSoundOn, isMusicOn);
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
