
let gemObj = {
    1: "rubies",
    2: "sapphires",
    3: "emeralds",
    4: "diamonds",
    5: "amethysts"
}

export class startScreen extends Phaser.Scene{
    constructor(){
        super("StartScreen");
    }
    create(){        
        const instructions = "You are an explorer seeking valuable treasures in an unnamed dungeon. In the first part of the game, put your plunde— mining skills to the test! \nClick the gems as they appear on the screen to mine them. \nOh no! After 30 seconds of mining, it seems that the dungeon has noticed you. It’s time to escape! \nUse the space bar in order to jump over obstacles as they appear on the screen. Luckily, you have the gems you gathered to help, as they will grant you magic powers! \n * Emeralds - Emeralds will grant you additional lives. Wow! \n * Sapphires - Sapphires will grant you a higher score multiplier. \n * Rubys - Rubies will ward off obstacles. You’ll encounter fewer obstacles as you run. \n\nGood luck!"
        const instructionsText = this.add.text(0, 0, instructions, { fontSize: "20px", fontFamily: 'Comic Sans MS', fill: 'whitesmoke', wordWrap: { width: 1300 },     padding: {
            left: 30,
            right: 30,
            top: 100,
            bottom: 100,
        }});
        const resetButton = this.add.text(this.game.config.width/2, this.game.config.height/1.2, 'Click When Ready', { fontSize: "20px", fontFamily: 'Comic Sans MS', fill: '#0f0' });


        resetButton.setInteractive();
        resetButton.on('pointerdown', ()=>{
            //passing in a string value to denote reset score
            //Probably not necessary when game is fully implemented
            this.scene.start('ClickGame');
        });

    
    }

    createGame() {
        let createGameObj = {
            method: "Post"
        }
        fetch('http://localhost:3000/api/v1/games')
    }
}

export class transitionScreen extends Phaser.Scene{
    constructor(){
        super("TransitionScreen");
    }
    create(clickScore){
        console.log(clickScore);
        // debugger;
        let x = 1;
        let scoreheight = this.game.config.height;
        let scoreheightOffset = scoreheight/3.2;
        let game = this;
        Object.values(clickScore).forEach((value)=>{
            game.add.text(game.game.config.width/2.2, scoreheightOffset, `Total ${gemObj[x]}: ${value}`, {fill: '#0f0'});
            scoreheightOffset += 25;
            x+=1;
        });
        //const score1 = this.add.text(this.game.config.width/2.2, this.game.config.height/3.2, clickScore.gem1, {fill: '#0f0'});
        const resetButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.2, 'Start running!', { fill: '#0f0' });
        resetButton.setInteractive();
        resetButton.on('pointerdown', ()=>{
            //passing in a string value to denote reset score
            //Probably not necessary when game is fully implemented
            this.scene.start('RunnerGame', clickScore)
        });
    }
}

export class endScreen extends Phaser.Scene{
    constructor(){
        super("EndScreen");
    }
    create(data){
        console.log(data);
        console.log("here");
        this.add.text(this.game.config.width/2.5, this.game.config.height/2.2, 'Game Over', { fontSize: "64px", fontFamily: '"Roboto Condensed"' });
        this.add.text(this.game.config.width/2.3, this.game.config.height/1.8, `Your Score : ${data}`, { fontSize: "32px", fontFamily: '"Roboto Condensed"' });
        
        const helloButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.5, 'Hello Phaser!', { fill: '#0f0' });
        const resetButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.2, 'Restart!', { fill: '#0f0' });
        resetButton.setInteractive();
        resetButton.on('pointerdown', ()=>{
            this.sys.game.destroy(true);
            document.querySelector('canvas').remove();
            //passing in a string value to denote reset score
            //Probably not necessary when game is fully implemented
            // this.scene.start('RunnerGame',"dead")
            // let b = document.createElement('button');
            // b.innerText = "Start Game";
            // b.id = "start";
            // document.body.appendChild(b);
            //flag= false;

            // document.addEventListener('click',(e)=>{
            //     if (e.target.id === "start")
            //     {
            //         b.remove();
            //         gameStart();
            //     }
            // });
        });
        helloButton.setInteractive();
        helloButton.on('pointerdown', ()=>{
            //temporary
            document.querySelector('canvas').remove();
        })
        // debugger
    }

}
