export default class leaderboard {
    
    fetchGames() {
        fetch('http://localhost:3000/api/v1/games')
            .then(resp => resp.json())
            .then(this.sortAndRenderTable)
            .catch(errors => alert(errors.message))
    }

    sortAndRenderTable(json) {
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
                <td data-column="Emeralds">${user.attributes.lives_modifier}</td>
                <td data-column="Amethysts">${user.attributes.score_modifier}</td>
                <td data-column="Rubies">${user.attributes.obstacle_modifier}</td>
                <td data-column="Sapphires">${user.attributes.jump_num_modifier}</td>
                <td data-column="Diamonds">${user.attributes.jump_height_modifier}</td>

                </tr>
            `
            tableBody.innerHTML += userHTML
        })

    }

    
}