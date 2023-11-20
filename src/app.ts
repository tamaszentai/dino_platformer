import Game from "./models/Game.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = 1280;
canvas.height = 1024;

const game = new Game(canvas.width, canvas.height, 'Tamas')

const animate = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
}
animate();


