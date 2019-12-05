
let gemObj = {
    1: "ruby",
    2: "diamond",
    3: "sapphire",
    4: "emerald",
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
                    case "gem1":
                        gemCounter.gem1 += gem.clickCount;
                        break;
                    case "gem2":
                        gemCounter.gem2 += gem.clickCount;
                        break;
                    case "gem3":
                        gemCounter.gem3 += gem.clickCount;
                        break;
                    case "gem4":
                        gemCounter.gem4 += gem.clickCount;
                        break;
                    case "gem5":
                        gemCounter.gem5 += gem.clickCount;
                        break;
                }
            });
            // debugger
            
                this.scene.start("TransitionScreen",this.gemCounter);
            }
            else {
                this.renderGems(this.gemGroup, this.gemCounter);
                // debugger;
            }
        }


        this.anims.create({
            key: "gem",
            frames: this.anims.generateFrameNumbers("ruby", {
                start: 0,
                end: 8
            }),
            frameRate: 15,
            repeat: -1
        });
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
                case "gem1":
                    gemCounter.gem1 += gem.clickCount;
                    break;
                case "gem2":
                    gemCounter.gem2 += gem.clickCount;
                    break;
                case "gem3":
                    gemCounter.gem3 += gem.clickCount;
                    break;
                case "gem4":
                    gemCounter.gem4 += gem.clickCount;
                    break;
                case "gem5":
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
            let gem = this.add.sprite(this.randWidth(), this.randHeight(), "ruby");
            gem.name = `gem${i}`;
            gem.anims.play("gem");
            gem.clickCount = 0;
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
        this.anims.play("gem");
    }
    incGem(){
        console.log(this.clickCount++);
        this.anims.stop();
        this.setFrame(9);
        // console.log('clicked');
    }
    randWidth(){
        return Math.round(Math.random() * this.game.config.width);
    }
    randHeight(){
        return Math.round(Math.random() * this.game.config.height);
    }
}

export default clickGame