let game;

let gameOptions = {
    platformStartSpeed: 300
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1337,
        height: 690,
        scene: playGame,
        backgroundColor: 0x444444,
        physics: {
            default: "arcade"
        }
    }

    game = new Phaser.Game(gameConfig)
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

class playGame extends Phaser.Scene{
    constructor() {
        super("PlayGame")
        this.score = 0
    }

    preload() {
        this.load.image("platform", "platform.png")
        this.load.image("player", "player.png")
    }

    create() {
        this.groundGroup = this.add.group()
        this.ground = this.physics.add.sprite(game.config.width / 2, game.config.height * 0.8, 'platform')
        this.ground.displayWidth = 1337;
        this.ground.setImmovable(true);
        this.ground.setVelocityX(gameOptions.platformStartSpeed * -1);
        this.physics.add.existing(this.ground)
        this.groundGroup.add(this.ground)
    }

    addGround() {
        this.ground = this.physics.add.sprite(game.config.width / 2, game.config.height * 0.8, 'platform')
        this.ground.displayWidth = 100;
        this.ground.setImmovable(true);
        this.ground.setVelocityX(gameOptions.platformStartSpeed * -1);
        this.physics.add.existing(this.ground)
        this.groundGroup.add(this.ground)
    }



    update() {
        // this.addGround()
        // debugger;
    }
}




function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
