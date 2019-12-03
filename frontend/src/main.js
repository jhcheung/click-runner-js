let game;
// let flag = true;

let gameOptions = {
    platformStartSpeed: 400,
    gameDisplayWidth: 1337,
    playerGravity: 1000,
    jumpForce: 500,
    playerStartPosition: 200,
    playerStartLives: 2,
    jumps: 2,
    firePercent: 75
}

makeButton()


function makeButton() {
    let b = document.createElement('button');
    b.innerText = "Start Game";
    b.id = "start";
    document.body.appendChild(b);
    
    document.addEventListener('click',(e)=>{
        if (e.target.id === "start")
        {
            e.target.remove();
            gameStart();
            
        }
    });    
}

import runnerGame from "./runnerGame.js";
import clickGame from "./clickGame.js";
import { startScreen, transitionScreen, endScreen } from "./gameScreens.js"


let gameStart = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: gameOptions.gameDisplayWidth,
        height: 690,
        scene: [startScreen, clickGame, transitionScreen, runnerGame, endScreen],
        backgroundColor: 0x444444,
        physics: {
            default: "arcade"
        },
    }

    game = new Phaser.Game(gameConfig)
    game.gameOptions = gameOptions
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}


function resize(){
    let canvas = document.querySelector("canvas");
    // debugger;
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