import startMenu from './startMenu.mjs'
class logInForm {
    constructor() {
        this.signInForm = document.querySelector('#user_form')
    }

    signInFormListener() {
        this.signInForm.addEventListener('submit', this.logIn)
    }

    logIn(event){
        event.preventDefault()
        const name = event.target[0].value
        logInForm.prototype.logInBackend(name)
    }

    logInBackend(name) {
        const logInObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }
        const userUrl = "http://localhost:3000/api/v1/users"
        
        fetch(userUrl, logInObj)
            .then(resp => {
                return resp.json()
            })
            .then(data => { 
                if (data.data.type === 'user') {
                    const startMenu1 = new startMenu(parseInt(data.data.id))
                    startMenu1.renderStartMenu()
                }
             })
            .catch(error => alert(error))

    }
}

export default logInForm