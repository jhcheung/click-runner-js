
let gemObj = {
    1: "ruby",
    2: "sapphire",
    3: "emerald",
    4: "diamond",
    5: "amethyst"
}

class clickGame extends Phaser.Scene{


    constructor(){
        super("ClickGame");
        this.text;
        this.timeEvent;
        this.gemGroup;
        this.gemCounter= {
            gem1: 0,
            gem2: 0,
            gem3: 0,
            gem4: 0,
            gem5: 0
        }
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

        let func = () => {
            console.log(counter++);
            
            if (counter === 2){
            let gemCounter = this.gemCounter;
                
            this.gemGroup.getChildren().forEach((gem)=>{
                switch(gem.name){
                    case "ruby":
                        gemCounter.gem1 += gem.clickCount;
                        break;
                    case "emerald":
                        gemCounter.gem2 += gem.clickCount;
                        break;
                    case "sapphire":
                        gemCounter.gem3 += gem.clickCount;
                        break;
                    case "diamond":
                        gemCounter.gem4 += gem.clickCount;
                        break;
                    case "amethyst":
                        gemCounter.gem5 += gem.clickCount;
                        break;
                }
            });

            
                this.scene.start("TransitionScreen",this.gemCounter);
            }
            else {
                this.renderGems(this.gemGroup, this.gemCounter);
                // debugger;
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
        // debugger;
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
        let scale = Math.min(scaleX, scaleY)
        // debugger;
        image.setScale(scale).setScrollFactor(0)
        //this.add.image(0,0, 'coins');
        this.gemGroup = this.add.group();
        this.renderGems(this.gemGroup, this.gemCounter);
        this.text = this.add.text(32, 32);
        this.timeEvent = this.time.addEvent({delay: 3000, callback: func, callbackScope: this, repeat: 1});

       
    } 
    update()
    {
        this.text.setText('Event.progress: ' + this.timeEvent.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' + this.timeEvent.repeatCount);
    }
    renderGems(gemGrouping, gemCounter){
        // debugger
        while(gemGrouping.getLength()){
            let gem = gemGrouping.getFirstAlive()
            // debugger
            switch(gem.name){
                case "ruby":
                    gemCounter.gem1 += gem.clickCount;
                    break;
                case "sapphire":
                    gemCounter.gem2 += gem.clickCount;
                    break;
                case "emerald":
                    gemCounter.gem3 += gem.clickCount;
                    break;
                case "diamond":
                    gemCounter.gem4 += gem.clickCount;
                    break;
                case "amethyst":
                    gemCounter.gem5 += gem.clickCount;
                    break;
            }
            gemGrouping.remove(gem);
            gem.destroy();
        }
        //check if exist
        // if (this.gem1) {
        //     gemCounter.gem1 += this.gem1.clickCount
        //     this.gem1.destroy();
        // }
        // if (this.gem2) {
        //     gemCounter.gem2 += this.gem2.clickCount
        //     this.gem2.destroy();
        // }
        // if (this.gem3) {
        //     gemCounter.gem3 += this.gem3.clickCount
        //     this.gem3.destroy();
        // }
        // if (this.gem4) {
        //     gemCounter.gem4 += this.gem4.clickCount
        //     this.gem4.destroy();
        // }
        // if (this.gem5) {
        //     gemCounter.gem5 += this.gem5.clickCount
        //     this.gem5.destroy();
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
        // this.gem1 = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.gem2 = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.gem3 = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.gem4 = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.gem5 = this.add.sprite(this.randWidth(), this.randHeight(), "fire")
        // this.gem1.name = "gem1";
        // this.gem2.name = "gem2";
        // this.gem3.name = "gem3";
        // this.gem4.name = "gem4";
        // this.gem5.name = "gem5";

        // this.gem1.anims.play("gem");
        // this.gem2.anims.play("gem");
        // this.gem3.anims.play("gem");
        // this.gem4.anims.play("gem");
        // this.gem5.anims.play("gem");

        // this.gem1.clickCount = 0;
        // this.gem2.clickCount = 0;
        // this.gem3.clickCount = 0;
        // this.gem4.clickCount = 0;
        // this.gem5.clickCount = 0;

        // this.gem1.setInteractive();
        // this.gem2.setInteractive();
        // this.gem3.setInteractive();
        // this.gem4.setInteractive();
        // this.gem5.setInteractive();


        // // debugger
        // // this.gem1.input.useHandCursor = true;
        // // this.gem2.input.useHandCursor = true;
        // // this.gem3.input.useHandCursor = true;

        // this.gem1.on('pointerdown', this.incGem);
        // this.gem2.on('pointerdown', this.incGem);
        // this.gem3.on('pointerdown', this.incGem);
        // this.gem4.on('pointerdown', this.incGem);
        // this.gem5.on('pointerdown', this.incGem);

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