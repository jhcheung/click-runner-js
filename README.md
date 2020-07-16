Click Runner JS by Jimmy & Gene
========================


Click Runner JS is a video game written in Phaser 3, Javascript, and Rails. It is a combination between an autorunner game (like Temple Run or Doodle Jump) and incremental (clicker) game (like Cookie Clicker or Civ Clicker). The backend is built with Rails/PostgreSQL, and the frontend is a combination of Phaser 3, Javascript, with CSS for styling.

---

## How to Install
1. Clone the repo
2. Use Bundler to install the required gems.
```
bundle install
```
3. Run the following rake task to set up the databases
```
rake db:migrate
```
4. Run rails server and you'll be able to play on the localhost with port 3000! 
```
rails s
```
---
## How to Play

You can play Click Runner JS here: 
http://click-runner-js.herokuapp.com/

Click Runner is a two stage game. 

First, you will play a clicker game and try to click as many gems as possible. Different gems will provide different power ups for the next stage.
* Emeralds - Increases the number of lives you start with
* Amethyst - Increases the rate at which you score points 
* Ruby - Reduces the rate of obstacles spawning
* Sapphire - Increases the number of jumps
* Diamond - Increase the jump height


Then, you will play the autorunner game, where you have powerups according to the gems you clicked on in the first stage. Press space to jump. The goal is to jump over each of the incoming obstacles. The game will continue until you have hit one of the obstacles. As with other incremental/autorunner games, there is no ending.
