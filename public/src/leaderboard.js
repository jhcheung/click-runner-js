import startMenu from './startMenu.js'
import { gameUrl } from './urls.js' 

export default class leaderboard {
    
    fetchGames() {
        // command fetches game data from api to render
        fetch(gameUrl)
            .then(resp => resp.json())
            .then(json => {
                this.sortAndRenderTable(json)
                this.backButtonListener()
            })
            .catch(errors => alert(errors.message))
    }

    sortAndRenderTable(json) {
        // html for table
        let bodyBox = document.querySelector('div.box')
        bodyBox.innerHTML = `
            <h1>High Scores</h1>
            <table>
            <thead>
                <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Rubies</th>
                <th>Emeralds</th>
                <th>Sapphires</th>
                <th>Diamonds</th>
                <th>Amethysts</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>

            <button id="back" class="menu grey">Back</button>
        `
        const tableBody = bodyBox.querySelector('tbody')

        let sortedUsers = json.data.sort(function(a, b) {
            return b.attributes.score - a.attributes.score
        })

        sortedUsers = sortedUsers.slice(0, 10)
        sortedUsers.forEach(function(user, index) {
            const userHTML = `
                <tr>
                <td data-column="Rank">${index + 1}</td>
                <td data-column="Username">${user.attributes.user.name}</td>
                <td data-column="Score">${user.attributes.score}</td>
                <td data-column="Rubies">${user.attributes.obstacle_modifier}</td>
                <td data-column="Emeralds">${user.attributes.lives_modifier}</td>
                <td data-column="Sapphires">${user.attributes.jump_num_modifier}</td>
                <td data-column="Diamonds">${user.attributes.jump_height_modifier}</td>
                <td data-column="Amethysts">${user.attributes.score_modifier}</td>


                </tr>
            `
            tableBody.innerHTML += userHTML
        })
    }

    backButtonListener() {
        // creates a back button
        const backButton = document.querySelector('#back')
        backButton.addEventListener('click', startMenu.prototype.renderStartMenu)
    }

    
}