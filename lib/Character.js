//Created a new Character constructor function to hold methods that Player and Enemy objects has in common.
//function Chararcter() {}

class Character {
    constructor(name = '') {
        this.name = name;
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    }


// Chararcter.prototype.isAlive = function() 
isAlive(){
    if(this.health === 0) {
        return false;
    }
    return true;
}

// Chararcter.prototype.getHealth = function() 
getHealth(){
    return `${this.name}'s health is now ${this.health}!`;
}

// Chararcter.prototype.getAttackValue = function() 
getAttackValue(){
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
}

// Chararcter.prototype.reduceHealth = function(health) 
reduceHealth(health){
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
}
}
module.exports = Character;

 //console.log(new Character().getHealth());
