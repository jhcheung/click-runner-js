class clickGame extends Phaser.Scene{
    constructor(){
        super("ClickGame");
        this.text;
        this.timeEvent;
    }
    create(){
        let func = () => {this.scene.start("TransitionScreen");}
        this.text = this.add.text(32, 32);
        this.timeEvent = this.time.addEvent({delay: 10000, callback: func, callbackScope: this, repeat: 1, startAt:5000});
       
    } 
    update()
    {
        this.text.setText('Event.progress: ' + this.timeEvent.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' + this.timeEvent.repeatCount);
    }
}

export default clickGame