const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


function Game() {
this.roundNumber = 0;
this.isPlayerTurn = false;
this.enemies = [];
this.currentEnemy;
this.player;
}

Game.prototype.initializeGame = function() {
//populates enemies array with the .push method
this.enemies.push(new Enemy ('goblin', 'sword'));
this.enemies.push(new Enemy('orc', 'baseball bat'));
this.enemies.push(new Enemy('skeleton', 'axe'));

//keeping track of which Enemy object is currently fighting the Player
this.currentEnemy = this.enemies[0];

//prompt user for their name which will be player name
inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: "What is your name little one?"
    })
//destructure name from the prompt object
.then(({name}) => {
    this.player = new Player(name);

//test the object creation for enemy and player
//console.log(this.currentEnemy, this.player);

this.startNewBattle()

});
};


module.exports = Game;

