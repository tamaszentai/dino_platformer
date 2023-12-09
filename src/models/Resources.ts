export default class Resources {
    backgroundImage: HTMLImageElement;
    gameTheme: HTMLAudioElement;
    jumpSound: HTMLAudioElement;
    gameOverTheme: HTMLAudioElement;
    platformImages: HTMLImageElement[];
    idleImages: HTMLImageElement[];
    idleLeftImages: HTMLImageElement[];
    runImages: HTMLImageElement[];
    runLeftImages: HTMLImageElement[];
    jumpImages: HTMLImageElement[];
    jumpLeftImages: HTMLImageElement[];
    deadImages: HTMLImageElement[];
    deadLeftImages: HTMLImageElement[];

    constructor() {
        this.backgroundImage = this.loadImage('src/assets/images/clouds.jpg');
        this.gameTheme = this.loadAudio('src/assets/sounds/game_theme.mp3');
        this.gameTheme.loop = true;
        this.gameTheme.volume = 0.2;
        this.jumpSound = this.loadAudio('src/assets/sounds/jump.mp3');
        this.jumpSound.volume = 0.1;
        this.gameOverTheme = this.loadAudio('src/assets/sounds/game_over.wav');
        this.gameOverTheme.volume = 0.1;
        this.platformImages = this.preloadImages('platform', 3);
        this.idleImages = this.preloadImages('idle', 10);
        this.idleLeftImages = this.preloadImages('idleLeft', 10);
        this.runImages = this.preloadImages('run', 8);
        this.runLeftImages = this.preloadImages('runLeft', 8);
        this.jumpImages = this.preloadImages('jump', 12);
        this.jumpLeftImages = this.preloadImages('jumpLeft', 12);
        this.deadImages = this.preloadImages('dead', 8);
        this.deadLeftImages = this.preloadImages('deadLeft', 8);
    }

    loadImage(src: string) {
        const img = new Image();
        img.src = src;
        return img;
    }

    loadAudio(src: string) {
        const audio = new Audio();
        audio.src = src;
        return audio;
    }

    preloadImages(name: string, count: number) {
        const images = [];
        for (let i = 1; i <= count; i++) {
            const img = this.loadImage(`src/assets/sprites/${name}/${name}(${i}).png`);
            images.push(img);
        }
        return images;
    }
}
