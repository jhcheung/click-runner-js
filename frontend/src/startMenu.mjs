import {gameStart} from './main.mjs'

class startMenu {
    constructor() {
        this.bodyBox = document.querySelector('div.box')
    }

    renderStartMenu() {
        const startMenuHTML = `
                <h1>Menu</h1>
                <button class="menu red" id="start_game">Start Game</button>
                <br>
                <button class="menu" id="leaderboard">Leaderboard</button>
                <br>
                <button class="menu grey" id="log_out">Log Out</button>
                <br>
        `
        this.bodyBox.innerHTML = startMenuHTML

        this.bodyBox.addEventListener('click', this.checkOptions)
    }

    checkOptions(e) {
        if (e.target.id === "log_out") {
            location.reload()
        } else if (e.target.id === "start_game") {
            gameStart()
        } else if (e.target.id === "leaderboard") {
            //add leaderboard logic
        }
    }
    

    makeButton() {
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



}

export default startMenu