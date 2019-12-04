import {gameStart} from './main.mjs'

class startMenu {
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