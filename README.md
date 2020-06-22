Click Runner JS by Jimmy & Gene
========================


Click Runner JS is a video game written in Phaser 3, Javascript, and Rails. It is a combination between an autorunner and incremental (clicker) game. The backend is built with Rails, and the frontend is a combination of Phaser 3, Javascript, with CSS for styling.

---

## How to Install

1. Use Bundler to install the required gems.
```
bundle install
```
2. Run the following rake task to set up the databases
```
rake db:migrate
```
3. Run rails server and you'll be able to play on the localhost with port 3000! 
```
rails s
```
---
## How to Play

Click Runner is a two stage game. First, you will play a clicker game and try to click as many gems as possible.

Then, you will play the autorunner game, where you have powerups according to the gmes you clickced on in the first stage.
