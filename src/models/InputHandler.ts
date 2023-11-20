import Game from "./Game.js";

export default class InputHandler {
    game: Game;
    constructor(game: Game) {
        this.game = game;
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' && !game.keys.includes('ArrowRight')) {
                game.keys.push(event.key);
            }
        })
        window.addEventListener('keyup', (event) => {
            if (game.keys.includes(event.key)) {
                game.keys = game.keys.filter(key => key !== event.key)
            }
        })
    }
}