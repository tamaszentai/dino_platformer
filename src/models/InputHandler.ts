import Game from "./Game.js";

enum Key {
    FORWARD = 'ArrowRight',
    BACKWARD = 'ArrowLeft',
    CLIMB = 'ArrowUp',
    DOWN = 'ArrowDown',
    JUMP = 'Space'
}

export default class InputHandler {
    game: Game;
    constructor(game: Game) {
        this.game = game;
        window.addEventListener('keydown', (event) => {
            console.log(event.code)
            if (event.code === Key.FORWARD && !game.keys.includes(Key.FORWARD)) {
                game.keys.push(Key.FORWARD);
            }

            if (event.code === Key.BACKWARD && !game.keys.includes(Key.BACKWARD)) {
                game.keys.push(Key.BACKWARD);
            }

            if (event.code === Key.CLIMB && !game.keys.includes(Key.CLIMB)) {
                game.keys.push(Key.CLIMB);
            }

            if (event.code === Key.DOWN && !game.keys.includes(Key.DOWN)) {
                game.keys.push(Key.DOWN);
            }

            if (event.code === Key.JUMP ) {
            }

        })
        window.addEventListener('keyup', (event) => {
            if (game.keys.includes(event.code)) {
                game.keys = game.keys.filter(key => key !== event.code)
            }
        })
    }
}