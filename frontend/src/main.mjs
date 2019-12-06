let game;
// let flag = true;

let gameOptions = {
    platformStartSpeed: 800,
    gameDisplayWidth: 1337,
    playerGravity: 1200,
    cave1Speed: 40,
    cave2Speed: 90,
    jumpForce: 500,
    playerStartPosition: 200,
    playerStartLives: 3,
    jumps: 2,
    firePercent: 100,
    scoreMulti: 1
}

import logInForm from "./logInForm.mjs"
let logIn = new logInForm()
logIn.signInFormListener()

import runnerGame from "./runnerGame.mjs";
import clickGame from "./clickGame.mjs";
import { startScreen, transitionScreen, endScreen } from "./gameScreens.mjs"


export function gameStart(userId, gameId) {
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
    game.gameId = gameId
    window.focus();
    ;
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

