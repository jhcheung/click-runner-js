import {gameStart} from './main.mjs'

class startMenu {
    renderStartMenu() {
        const startMenuHTML = `
            <div class="box">
                <h1>Menu</h1>
                <input id="user_name" class="name" type="text" required/>
                <br>
                <input id="sign_in" class="btn" type="submit" value="Sign In"/>
                </div>
        `
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