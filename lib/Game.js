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

//calls this function
this.startNewBattle();

});
};

//Establish who will take their turn first based on their agility values
Game.prototype.startNewBattle = function() {
    if(this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
//Displays PLayer stats
    console.log(`Your stats are as follows young traveler ${this.player.name}`);
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());


//calls this function
this.battle();
};

Game.prototype.battle = function() {
    if(this.isPlayerTurn) {
        //player prompts go here
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({action}) => {
                if(action === 'Use potion') {
                    //follow-up prompt will go here
                    if(!this.player.getInventory()) {
                    //after player sees their
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        //update inquirer prompt to include a callback function with split() logic
                        .then(({action}) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] -1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                            //after player uses a potion
                            this.checkEndOfBattle();
                        });
                    
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);
                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                    //after player attacked
                    this.checkEndOfBattle();
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        //after enemy attacks
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {

//verifies if both characters are alive and can continue fighting
if(this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
}
//verifies if player is alive but enemy is not
else if(this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated the ${this.currentEnemy.name} ol'e chosen one.`);

    this.roundNumber++;
    //starts another battle/round or ends the game when all battles are won
    if(this.roundNumber < this.enemies.length) {
        this.currentEnemy = this.enemies[this.roundNumber];
        this.startNewBattle();
    } else {
        console.log('You Win! You are truly the hero of Justice!');
    }
}
else {
    console.log("You've been defeated! guess you weren't the true hero after all..*sigh*")
}
};

module.exports = Game;

