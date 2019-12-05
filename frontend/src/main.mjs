let game;
// let flag = true;

let gameOptions = {
    platformStartSpeed: 400,
    gameDisplayWidth: 1337,
    playerGravity: 1000,
    jumpForce: 500,
    playerStartPosition: 200,
    playerStartLives: 2,
    jumps: 100,
    firePercent: 100
}

import logInForm from "./logInForm.mjs"
let logIn = new logInForm()
logIn.signInFormListener()

import runnerGame from "./runnerGame.mjs";
import clickGame from "./clickGame.mjs";
import { startScreen, transitionScreen, endScreen } from "./gameScreens.mjs"


export function gameStart(userId) {
    let gameConfig = {
        type: Phaser.AUTO,
        width: gameOptions.gameDisplayWidth,
        height: 690,
        scene: [startScreen, clickGame, transitionScreen, runnerGame, endScreen],
        backgroundColor: 0x4A5A7A,
        physics: {
            default: "arcade"
        },
    }

    game = new Phaser.Game(gameConfig)
    game.gameOptions = gameOptions
    game.userId = userId
    window.focus();
    // debugger;
    resize();
    window.addEventListener("resize", resize, false);
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

