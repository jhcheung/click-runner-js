class runnerGame extends Phaser.Scene{
    constructor() {
        super("RunnerGame")
        this.score = 0
        this.addedGround = 0
        this.clickScore
        this.createFlag = true;

    }

    preload() {
        this.gameOptions = this.game.gameOptions
        if (!this.lives) {
            this.lives = this.gameOptions.playerStartLives
        }
        this.load.image("platform", "public/newplatform.png")
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
        this.load.image("cavefore", "public/caveback.png");
        this.load.image("cavemid", "public/caveback2.png");
        this.load.image("caveback", "public/caveback3.png");
      
 
    }

    create(clickScore) {        
        if (this.createFlag){
            this.clickScore = clickScore
            
            let [obsMod,livesMod, jumpNumMod, jumpStrengthMod, scoreMulti] = Object.values(clickScore);
            
            this.gameOptions.firePercent -= Math.ceil(obsMod*0.3);
            this.lives += Math.ceil(livesMod*0.1); //lives are preloaded
            this.gameOptions.jumps += Math.ceil(jumpNumMod*0.2);
            this.gameOptions.jumpForce += jumpStrengthMod*15;
            this.gameOptions.scoreMulti += Math.ceil(scoreMulti*0.1);
            this.createFlag = false;
        }
     

        this.caveBackgroundStatic = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1500, 800, 'caveback');
        this.caveBackground = this.add.tileSprite(this.game.config.width/2, 0, 1500, 1600, 'cavemid');
        this.caveForeground = this.add.tileSprite(this.game.config.width/2, 0, 1500, 1600, 'cavefore');
        this.caveForeground.setScale(2.4);
        this.caveBackground.setScale(2.4);
        //
        // if (data==="dead") {
        //     this.score = 0;
        //     this.lives = this.gameOptions.playerStartLives;
        // }
        // let cave = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'caveback')
        // let scaleX = this.cameras.main.width / cave.width
        // let scaleY = this.cameras.main.height / cave.height
        // let scale = Math.max(scaleX, scaleY)
        // cave.setScale(scale);
        
        // cave.anims.play();
        // group with all active cave foregrounds.
       

        //make group for floor sprites
        this.dying = false
        this.groundGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.groundPool.add(platform)
            }
        });
 
        // platform pool
        this.groundPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.groundGroup.add(platform)
            }
        });

        this.ceilingGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.groundPool.add(platform)
            }
        });

        this.ceilingPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.groundGroup.add(platform)
            }
        });



        // make initial floor

        let groundPlatform = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height * 0.78, 'platform')
        groundPlatform.setImmovable(true);
        groundPlatform.setVelocityX(this.gameOptions.platformStartSpeed * -1);
        groundPlatform.displayWidth = this.gameOptions.gameDisplayWidth;
        this.groundGroup.add(groundPlatform)

        // make initial ceiling
        let ceilingStart = this.physics.add.sprite(this.game.config.width / 2, 0, 'ceiling')
        ceilingStart.setImmovable(true);
        ceilingStart.setVelocityX(this.gameOptions.platformStartSpeed * -1);
        ceilingStart.displayWidth = this.gameOptions.gameDisplayWidth;
        this.ceilingGroup.add(ceilingStart)

        
        // consec jumps
        this.playerJumps = 0

        // set up player
        this.player = this.physics.add.sprite(this.gameOptions.playerStartPosition, this.game.config.height / 2, "player")
        this.player.setGravityY(this.gameOptions.playerGravity);
        
        // set up score
        this.scoreText = this.add.text(16, 30, `Score: ${this.score}`, { fontFamily: 'Comic Sans MS', fontSize: '32px', fill: '#fff' });
        this.livesText = this.add.text(this.gameOptions.gameDisplayWidth - 170, 30, `Lives: ${this.lives}`, { fontFamily: 'Comic Sans MS', fontSize: '32px', fill: '#fff' });

        
        //set up animation
        if (!this.anims.anims.entries.run){
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });

         }   
        this.ceilingCollider = this.physics.add.collider(this.player, this.ceilingGroup)
        
        this.groundCollider = this.physics.add.collider(this.player, this.groundGroup, function() {
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this)
        
        if (!this.anims.anims.entries.burn){

            this.anims.create({
                key: "burn",
                frames: this.anims.generateFrameNumbers("fire", {
                    start: 0,
                    end: 4
                }),
                frameRate: 15,
                repeat: -1
            });
        }
 
        
        //copy pasted vv
        // group with all active firecamps.
        this.fireGroup = this.add.group({
            // once a firecamp is removed, it's added to the pool
            removeCallback: function(fire){
                fire.scene.firePool.add(fire)
            }
        });
 
        // fire pool
        this.firePool = this.add.group({
 
            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(fire){
                fire.scene.fireGroup.add(fire)
            }
        });

        // death by collision
        this.physics.add.overlap(this.player, this.fireGroup, function(player, fire){
            if (this.dying === false) {
                this.dying = true;
                this.player.anims.stop();
                this.player.setFrame(8);
                this.player.body.setVelocityY(-200);
                this.physics.world.removeCollider(this.groundCollider);
                this.lives = this.lives - 1
                this.livesText.setText(`Lives: ${this.lives}`)
            }
            // this.game.time.events.add(Phaser.Timer.SECOND * 4, this.scene.restart(), this)
        }, null, this);


        this.input.keyboard.on('keydown_SPACE', this.jump, this)
        
        //early game over keypress for testing
        this.input.keyboard.on('keydown_W', this.gameOver, this);

    }
   

    addGround(){
        this.addedGround ++;

        let ground;
        if(this.groundPool.getLength()){
            ground = this.groundPool.getFirst();
            ground.x = this.game.config.width;
            ground.y = this.game.config.height * 0.78;
            ground.active = true;
            ground.visible = true;
            this.groundPool.remove(ground);
            // let newRatio =  groundWidth / ground.displayWidth;
            ground.displayWidth = this.gameOptions.gameDisplayWidth;
            ground.tileScaleX = 1 / ground.scaleX;
        }
        else{
            ground = this.add.tileSprite(this.game.config.width, this.game.config.height * 0.78, this.game.config.width * 1.5, 48, "platform");
            this.physics.add.existing(ground);
            ground.body.setImmovable(true);
            ground.body.setVelocityX(- this.gameOptions.platformStartSpeed);
            ground.setDepth(2);
            this.groundGroup.add(ground);
        }

        let ceiling;
        if(this.ceilingPool.getLength()){
            ceiling = this.ceilingPool.getFirst();
            ceiling.x = this.game.config.width;
            ceiling.y = this.game.config.height * 0.8;
            ceiling.active = true;
            ceiling.visible = true;
            this.ceilingPool.remove(ceiling);
            // let newRatio =  ceilingWidth / ceiling.displayWidth;
            ceiling.displayWidth = this.gameOptions.gameDisplayWidth;
            ceiling.tileScaleX = 1 / ceiling.scaleX;
        }
        else{
            ceiling = this.add.tileSprite(this.game.config.width, 0, this.game.config.width * 1.5, 32, "ceiling");
            this.physics.add.existing(ceiling);
            ceiling.body.setImmovable(true);
            ceiling.body.setVelocityX(- this.gameOptions.platformStartSpeed);
            ceiling.setDepth(2);
            this.ceilingGroup.add(ceiling);
        }




        if(this.addedGround > 1){
            if(Phaser.Math.Between(1, 100) <= this.gameOptions.firePercent){
                if(this.firePool.getLength()){
                    let num = Phaser.Math.Between(1, 4)
                    if (num > this.firePool.getLength()) {
                        num = this.firePool.getLength()
                    }
                    for (let i = 0; i < num; i++) {
                        let fire = this.firePool.getFirst()
                        fire.x = this.gameOptions.gameDisplayWidth
                        fire.y = this.game.config.height - 200 - (i * 40)
                        fire.alpha = 1
                        fire.active = true
                        fire.visible = true
                        this.firePool.remove(fire)
                    }
                }
                else{
                    let num = Phaser.Math.Between(3, 4)
                    for (let i = 0; i < num; i++) {
                        let fire = this.physics.add.sprite(this.gameOptions.gameDisplayWidth, this.game.config.height - 200 - (i * 40), "fire")
                        fire.setImmovable(true)
                        fire.setVelocityX(- this.gameOptions.platformStartSpeed)
                        fire.setSize(8, 2, true)
                        fire.anims.play("burn")
                        fire.setDepth(2)
                        this.fireGroup.add(fire)    
                        console.log("new from group")
                    }
                    
                }
            }
        }
    }

    removeOldPlatforms() {
        this.minDistance = this.game.config.width;
        this.groundGroup.getChildren().forEach(function(platform){
            let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < this.minDistance){
                this.minDistance = platformDistance;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.groundGroup.killAndHide(platform);
                this.groundGroup.remove(platform);
            }
        }, this);
    }

    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0
            }
            this.player.setVelocityY(this.gameOptions.jumpForce * -1)
            this.playerJumps ++
            this.player.anims.setProgress(0.25)
            this.player.anims.stop();
        }
        
    }

    gameOver () {
 
        // shake the camera
        this.cameras.main.shake(500);
    //    
        // end screen
        this.time.delayedCall(500, function() {
          this.scene.start("EndScreen", this.score+"");
        }, [], this);
        this.updateGame()
    }
    
    updateGame() {
        const gameUrl = `http://localhost:3000/api/v1/games/${this.game.gameId}`
        
        let patchObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                score: this.score,
                lives_modifier: this.clickScore.emerald,
                score_modifier: this.clickScore.amethyst,
                obstacle_modifier: this.clickScore.ruby,
                jump_num_modifier: this.clickScore.sapphire,
                jump_height_modifier: this.clickScore.diamond
            })
        }

        fetch(gameUrl, patchObj)
            .then(resp => resp.json())
            .then(json => {
            })
    }

    update() {
        //extend ground with every update
        if(this.player.y > this.game.config.height){
            this.scene.restart();
        }

        if (this.lives <= 0) {
            this.gameOver();
        }

        if (this.minDistance > 0) {
            this.addGround()
        }
        this.caveForeground.tilePositionX += 1
        this.caveBackground.tilePositionX += 0.3
        

        //have player stay in one position
        this.player.x = this.gameOptions.playerStartPosition

        //recycle old platforms
        this.removeOldPlatforms();

        this.fireGroup.getChildren().forEach(function(fire){
            if(fire.x < - fire.displayWidth / 2){
                this.fireGroup.killAndHide(fire);
                this.fireGroup.remove(fire);

                if (!this.dying) {
                    this.score += 1*this.gameOptions.scoreMulti;
                    this.scoreText.setText(`Score: ${this.score}`)    
                }
            }
        }, this);

    }
}

export default runnerGame