import Player from "./models/Player.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;


const player = new Player('Tamas', 100, 100, 0, 924, canvas);
player.draw();
