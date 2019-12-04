export class startScreen extends Phaser.Scene{
    constructor(){
        super("StartScreen");
    }
    create(){
        const resetButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.2, 'Click When Ready', { fontSize: "20px", fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fill: '#0f0' });
        resetButton.setInteractive();
        resetButton.on('pointerdown', ()=>{
            //passing in a string value to denote reset score
            //Probably not necessary when game is fully implemented
            this.scene.start('ClickGame');
        });
    }
}

export class transitionScreen extends Phaser.Scene{
    constructor(){
        super("TransitionScreen");
    }
    create(){
        const resetButton = this.add.text(this.game.config.width/2.2, this.game.config.height/1.2, 'Start running!', { fill: '#0f0' });
        resetButton.setInteractive();
        resetButton.on('pointerdown', ()=>{
            //passing in a string value to denote reset score
            //Probably not necessary when game is fully implemented
            this.scene.start('RunnerGame',"alive")
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
            let b = document.createElement('button');
            b.innerText = "Start Game";
            b.id = "start";
            document.body.appendChild(b);
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
