class preloadRunnerGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }
    preload(){
        this.load.image("platform", "public/platform.png")
        // this.load.image("player", "public/player.png")
        this.load.image("ceiling", "public/platform.png")
        this.load.spritesheet("player", "public/click-runner-sheet-death.png", {
            frameWidth: 108,
            frameHeight: 120
        })
        this.load.spritesheet("fire", "public/fire.png", {
            frameWidth: 40,
            frameHeight: 70
        });
    }
    create(){
 
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        });
 
        this.scene.start("PlayGame");
    }
}