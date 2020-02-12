let game;
// let flag = true;

let gameOptions = {
    platformStartSpeed: 1000,
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

import logInForm from "./logInForm.js"
let logIn = new logInForm()
logIn.signInFormListener()

import runnerGame from "./runnerGame.js";
import clickGame from "./clickGame.js";
import { startScreen, transitionScreen, endScreen } from "./gameScreens.js"


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
    resize();
    window.addEventListener("resize", resize, false);
}


export function resize(){
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

