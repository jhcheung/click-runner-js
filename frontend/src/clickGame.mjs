
let gemObj = {
    1: "ruby",
    2: "emerald",
    3: "sapphire",
    4: "diamond",
    5: "amethyst"
}

class clickGame extends Phaser.Scene{


    constructor(){
        super("ClickGame");
        this.text;
        this.timeEvent;
        this.secondEvent;
        this.gemGroup;
        this.gemCounter = {
            ruby: 0,
            emerald: 0,
            sapphire: 0,
            diamond: 0,
            amethyst: 0
        }
        this.timeCounter = 0;
    }
    
    preload() {
        this.gameOptions = this.game.gameOptions

        this.load.image('coins', 'public/coinbackgrounds.png');
       
        this.load.spritesheet("ruby", "public/ruby-sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("diamond", "public/diamond-sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("sapphire", "public/sapphire-sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("emerald", "public/emerald-sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("amethyst", "public/amethyst-sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
 
    }
    create(){
        let counter = 0;
        let incTime = () => {
            this.timeCounter++;
        }

        let func = () => {
            console.log(counter++);
            
            if (counter === 4){
            let gemCounter = this.gemCounter;
                
            this.gemGroup.getChildren().forEach((gem)=>{
                switch(gem.name){
                    case "ruby":
                        gemCounter.ruby += gem.clickCount;
                        break;
                    case "emerald":
                        gemCounter.emerald += gem.clickCount;
                        break;
                    case "sapphire":
                        gemCounter.sapphire += gem.clickCount;
                        break;
                    case "diamond":
                        gemCounter.diamond += gem.clickCount;
                        break;
                    case "amethyst":
                        gemCounter.amethyst += gem.clickCount;
                        break;
                }
            });

            
                this.scene.start("TransitionScreen",this.gemCounter);
            }
            else {
                this.renderGems(this.gemGroup, this.gemCounter);
                ;
            }
        }
        for (let i = 1 ; i <= Object.values(gemObj).length ; i++)
        {
            this.anims.create({
                key: gemObj[i],
                frames: this.anims.generateFrameNumbers(gemObj[i], {
                    start: 0,
                    end: 8
                }),
                frameRate: 10,
                repeat: -1
            });
        }
        ;
        // this.anims.create({
        //     key: "gem",
        //     frames: this.anims.generateFrameNumbers("ruby", {
        //         start: 0,
        //         end: 8
        //     }),
        //     frameRate: 15,
        //     repeat: -1
        // });
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'coins')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.min(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0)
        //this.add.image(0,0, 'coins');
        this.gemGroup = this.add.group();
        this.renderGems(this.gemGroup, this.gemCounter);
        this.text = this.add.text(10, this.cameras.main.height - 68, "",{fontFamily: "Comic Sans MS", fontSize: "64px"});
        this.timeEvent = this.time.addEvent({delay: 5000, callback: func, callbackScope: this, repeat: 3});
        this.secondEvent = this.time.addEvent({delay:1000, callback: incTime, callbackScope: this, repeat:19})
       
    } 
    update()
    {
        // let time = this.timeEvent.getProgress().toString().substr(0, 4);
        // let timeMinus = 5 * time;

        
        
        this.text.setText(20-this.timeCounter);
    }
    renderGems(gemGrouping, gemCounter){
        
        while(gemGrouping.getLength()){
            let gem = gemGrouping.getFirstAlive()
            
            switch(gem.name){
                case "ruby":
                    gemCounter.ruby += gem.clickCount;
                    break;
                case "sapphire":
                    gemCounter.emerald += gem.clickCount;
                    break;
                case "emerald":
                    gemCounter.sapphire += gem.clickCount;
                    break;
                case "diamond":
                    gemCounter.diamond += gem.clickCount;
                    break;
                case "amethyst":
                    gemCounter.amethyst += gem.clickCount;
                    break;
            }
            gemGrouping.remove(gem);
            gem.destroy();
        }
        //check if exist
        // if (this.ruby) {
        //     gemCounter.ruby += this.ruby.clickCount
        //     this.ruby.destroy();
        // }
        // if (this.emerald) {
        //     gemCounter.emerald += this.emerald.clickCount
        //     this.emerald.destroy();
        // }
        // if (this.sapphire) {
        //     gemCounter.sapphire += this.sapphire.clickCount
        //     this.sapphire.destroy();
        // }
        // if (this.diamond) {
        //     gemCounter.diamond += this.diamond.clickCount
        //     this.diamond.destroy();
        // }
        // if (this.amethyst) {
        //     gemCounter.amethyst += this.amethyst.clickCount
        //     this.amethyst.destroy();
        // }
        for (let i = 1; i <= 5; i++){

            let gemInd = this.getRandomGemIndex();
            let gem = this.add.sprite(this.randWidth(), this.randHeight(), `${gemObj[gemInd]}`);
            gem.name = `${gemObj[gemInd]}`;
            gem.anims.play(gemObj[gemInd]);
            gem.clickCount = 0;
            gem.ind = gemInd;
            gem.setInteractive();
            gem.on('pointerdown', this.incGem);
            gem.on('pointerup', this.startAnim);
            gemGrouping.add(gem);
        }
        // this.ruby = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.emerald = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.sapphire = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.diamond = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.amethyst = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.ruby.name = "ruby";
        // this.emerald.name = "emerald";
        // this.sapphire.name = "sapphire";
        // this.diamond.name = "diamond";
        // this.amethyst.name = "amethyst";

        // this.ruby.anims.play("gem");
        // this.emerald.anims.play("gem");
        // this.sapphire.anims.play("gem");
        // this.diamond.anims.play("gem");
        // this.amethyst.anims.play("gem");

        // this.ruby.clickCount = 0;
        // this.emerald.clickCount = 0;
        // this.sapphire.clickCount = 0;
        // this.diamond.clickCount = 0;
        // this.amethyst.clickCount = 0;

        // this.ruby.setInteractive();
        // this.emerald.setInteractive();
        // this.sapphire.setInteractive();
        // this.diamond.setInteractive();
        // this.amethyst.setInteractive();


        // 
        // // this.ruby.input.useHandCursor = true;
        // // this.emerald.input.useHandCursor = true;
        // // this.sapphire.input.useHandCursor = true;

        // this.ruby.on('pointerdown', this.incGem);
        // this.emerald.on('pointerdown', this.incGem);
        // this.sapphire.on('pointerdown', this.incGem);
        // this.diamond.on('pointerdown', this.incGem);
        // this.amethyst.on('pointerdown', this.incGem);

    }
    startAnim(){
        this.anims.play(gemObj[this.ind]);
    }
    incGem(){
        console.log(this.clickCount++);
        this.anims.stop();
        this.setFrame(9);
        // console.log('clicked');
    }
    randWidth(){
        let retVal =  Math.round(Math.random() * this.game.config.width);
        if (retVal < 100) { retVal = 100; }
        else if  (retVal > this.game.config.width-100 ) { retVal = this.game.config.width-100; }
        return retVal;
    }
    randHeight(){
        let retVal = Math.round(Math.random() * this.game.config.height);
        if (retVal < 60) { retVal = 60; }
        else if  (retVal > this.game.config.height-60 ) { retVal = this.game.config.height-60; }
        return retVal;
    }
    getRandomGemIndex(){
       let rand = Math.ceil(Math.random() * 100);
       if (rand < 70) { return Math.ceil(Math.random() * 3); }
       else if(rand < 90) { return 4; }
       else { return 5; } 
    }
}

export default clickGame