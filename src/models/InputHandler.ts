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

    }
}