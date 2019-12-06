let gemObj = {
    1: "rubies",
    2: "emeralds",
    3: "sapphires",
    4: "diamonds",
    5: "amethysts"
}

export class startScreen extends Phaser.Scene{
    constructor(){
        super("StartScreen");
        this.music;
    }
    preload(){
        this.load.spritesheet('plunder', 'public/plunder.png', {
            frameWidth: 300,
            frameHeight: 200
        });
        this.load.spritesheet('plunderPress', 'public/plunderpress.png', {
            frameWidth: 300,
            frameHeight: 200
        });
        this.load.audio('titleMusic', 'public/startScreenSciFi.mp3');
        this.load.image("title", "public/clickTitle.png");

        this.load.audio('clickMusic', 'public/clickGameSummer.mp3');
        this.load.audio('clicked', 'public/click.mp3');
        this.load.audio('death', 'public/death.mp3');
        this.load.audio('jump','public/jump.wav');
        this.load.audio("runBGM", "public/runnerGameExtreme.mp3")

    }
    loadNewSpriteAndGame(){
        this.scene.music.stop();
        this.anims.stop();
        this.anims.play('press');
        this.scene.scene.start('ClickGame');
    }
    create(){
        const instructions = `You are an explorer seeking valuable treasures in an unnamed dungeon. In the first part of the game, put your plunde— mining skills to the test! \nClick the gems as they appear on the screen to mine them. \nOh no! After 20 seconds of mining, it seems that the dungeon has noticed you. It’s time to escape! \nUse the space bar in order to jump over obstacles as they appear on the screen. Luckily, you have the gems you gathered to help, as they will grant you magic powers! \n * Rubys - Rubies will ward off obstacles, lowering the encounter rate. \n * Sapphires - Sapphires will improve your jumping ability, giving you more mid-air jumps. \n * Emeralds - Emeralds will grant you additional lives.\n * Diamonds will improve your jumping ability, giving you more jumping force. \n * Amethysts will increase your score multiplier. \n\nGood luck!`
        this.createGame()

        let title = this.add.image(this.cameras.main.width / 2, 150, 'title')
        title.setScale(2);
        this.add.text(0, 0, instructions, { fontSize: "15px", fontFamily: 'Comic Sans MS', fill: 'whitesmoke', wordWrap: { width: 1300 },     padding: {
            left: 30,
            right: 30,
            top: 300,
            bottom: 100,
        }});
        const clickPlay = this.add.sprite(this.game.config.width/2, this.game.config.height/1.07, 'plunder');
        this.anims.create({
            key: 'plund',
            frames: this.anims.generateFrameNumbers('plunder', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'press',
            frames: this.anims.generateFrameNumbers('plunderPress', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });

        // const resetButton = this.add.text(this.game.config.width/2, this.game.config.height/1.2, 'Click When Ready', { fontSize: "20px", fontFamily: 'Comic Sans MS', fill: '#0f0' });
        this.music = this.sound.add('titleMusic');
        this.music.setLoop(true);
        this.music.play();

        clickPlay.anims.play('plund');
        clickPlay.setInteractive();
        clickPlay.on('pointerdown', this.loadNewSpriteAndGame);

    
    }

    createGame () {
        const createGameObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                user_id: this.game.userId
            })
    
        }
        fetch('http://localhost:3000/api/v1/games', createGameObj)
            .then(resp => {
                return resp.json()
            })
            .then(json => {
                this.game.gameId = parseInt(json.data.id);
            })
    }



}
export class transitionScreen extends Phaser.Scene{
    constructor(){
        super("TransitionScreen");
        this.clickScore = {};
    }
    preload(){
        this.load.spritesheet('run', 'public/run.png', {
            frameWidth: 300,
            frameHeight: 200
        });
        this.load.spritesheet('runPress', 'public/runpress.png', {
            frameWidth: 300,
            frameHeight: 200
        });
    }
    create(clickScore){
        console.log(clickScore);
        this.clickScore = clickScore;
        this.anims.create({
            key: 'runn',
            frames: this.anims.generateFrameNumbers('run', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'pressRun',
            frames: this.anims.generateFrameNumbers('runPress', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        ;
        let scoreheight = this.game.config.height;
        let scoreheightOffset = scoreheight/3.2;
        let game = this;
        Object.values(clickScore).forEach((value, index)=>{
            game.add.text(game.game.config.width/2.2, scoreheightOffset, `Total ${gemObj[index+1]}: ${value}`, {fill: 'whitesmoke', fontFamily: "Comic Sans MS"});
            scoreheightOffset += 25;
        });
        
        //const score1 = this.add.text(this.game.config.width/2.2, this.game.config.height/3.2, clickScore.ruby, {fill: '#0f0'});
        //const resetButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.2, 'Start running!', { fill: '#0f0' });
        const clickPlay = this.add.sprite(this.game.config.width/2, this.game.config.height/1.2, 'run');
        clickPlay.anims.play('runn');
        clickPlay.setInteractive();
        clickPlay.on('pointerdown', this.loadNewSpriteAndGame);
    }

    loadNewSpriteAndGame(){
        
        this.anims.stop();
        this.anims.play('pressRun');
        
        this.scene.scene.start('RunnerGame',this.scene.clickScore);
    }

}

export class endScreen extends Phaser.Scene{
    constructor(){
        super("EndScreen");
    }
    preload(){
        this.load.spritesheet('again', 'public/pagain.png', {
            frameWidth: 300,
            frameHeight: 200
        });
        this.load.spritesheet('againPress', 'public/pagainpress.png', {
            frameWidth: 300,
            frameHeight: 200
        });
        this.load.spritesheet('quit', 'public/quit.png', {
            frameWidth: 300,
            frameHeight: 200
        });
        this.load.spritesheet('quitPress', 'public/quitpress.png', {
            frameWidth: 300,
            frameHeight: 200
        });
    }
    destroyG(){
        this.clickQuit.anims.stop();
        this.clickQuit.anims.play('quitPress');
        // location.reload();
        document.querySelector('canvas').remove();
    }
    again(){
        this.clickAgain.anims.stop();
        this.clickAgain.anims.play('playPress');
        // document.querySelector('canvas').remove();
        
    }
    create(data){
        console.log(data);
        console.log("here");
        this.add.text(this.game.config.width/2.65, this.game.config.height/2.9, 'Game Over', { fontSize: "64px", fontFamily: 'Comic Sans MS' });
        this.add.text(this.game.config.width/2.45, this.game.config.height/2.1, `Your Score : ${data}`, { fontSize: "32px", fontFamily: 'Comic Sans MS' });
        

        // const clickPlay = this.add.sprite(this.game.config.width/2, this.game.config.height/1.5, 'again');
        this.anims.create({
            key: 'play',
            frames: this.anims.generateFrameNumbers('again', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'playPress',
            frames: this.anims.generateFrameNumbers('againPress', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });

        // const resetButton = this.add.text(this.game.config.width/2, this.game.config.height/1.2, 'Click When Ready', { fontSize: "20px", fontFamily: 'Comic Sans MS', fill: '#0f0' });

        // clickPlay.anims.play('play');
        // clickPlay.setInteractive();
        // clickPlay.on('pointerdown', this.loadNewSpriteAndGame);

        this.clickAgain = this.add.sprite(this.game.config.width/2, this.game.config.height/1.4, 'again');
        this.clickQuit = this.add.sprite(this.game.config.width/2, this.game.config.height/1.1, 'quit');
        this.anims.create({
            key: 'quit',
            frames: this.anims.generateFrameNumbers('quit', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1

        });
        this.anims.create({
            key: 'quitPress',
            frames: this.anims.generateFrameNumbers('quitPress', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: -1
        });

        // const resetButton = this.add.text(this.game.config.width/2, this.game.config.height/1.2, 'Click When Ready', { fontSize: "20px", fontFamily: 'Comic Sans MS', fill: '#0f0' });

        this.clickAgain.anims.play('play');
        this.clickQuit.anims.play('quit');
        this.clickQuit.setInteractive();
        this.clickAgain.setInteractive();
        this.clickAgain.on('pointerdown', () => { 
            this.again() 
            // const userId = this.game.userId
            let gameOptions = {
                platformStartSpeed: 800,
                gameDisplayWidth: 1337,
                playerGravity: 1200,
                cave1Speed: 40,
                cave2Speed: 90,
                jumpForce: 500,
                playerStartPosition: 200,
                playerStartLives: 2,
                jumps: 2,
                firePercent: 100,
                scoreMulti: 1,
                clickGameLength: 4
            }
            this.game.gameOptions = gameOptions            
            this.scene.start('StartScreen')
            // // document.querySelector('canvas').remove()
            // gameStart(userId)
            // resize()
        });
        this.clickQuit.on('pointerdown', () => { this.destroyG() } );


        // //const helloButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.5, 'Hello Phaser!', { fill: '#0f0' });
        // //const resetButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.2, 'Restart!', { fill: '#0f0' });
        // resetButton.setInteractive();
        // resetButton.on('pointerdown', ()
        // helloButton.setInteractive();
        // helloButton.on('pointerdown', ()=>{
        //     //temporary
        //     document.querySelector('canvas').remove();
        // })
        // 
    }

}
