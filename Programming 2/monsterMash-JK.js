/*
Monster fighting game similar to a pokemon style game.
Player picks a monster from a list of three and then fights the other two monsters


A lot of this code is probably very unnecessary and I'm still having bugs which is why there's a lot of extra code work that is probably
pointless and could be fixed simply.

Regardless it does *technically* work
*/

//The monster class that the monsters use as a base for this project

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Monster {
    constructor(name, attackPower, attackSpeed, damageThreshold, weakness) {
        this.name = name;
        this.attackPower = attackPower;
        this.attackSpeed = attackSpeed;
        this.damageThreshold = damageThreshold;
        this.weakness = weakness;
        this.health = 100;
        this.resistPotionUsed = false;  // Track resist potion usage
    }
}
//list of three monsters which the player can pick one of
//the "weakness" was not used in the final code but I'm lazy sometimes and didn't bother removing it
const monsters = [
    new Monster("Werewolf", 5, 5, 5, "silver"),
    new Monster("Frankenstein", 5, 4, 6, "fire"),
    new Monster("Skeleton", 4, 3, 5, "blunt force trauma")
];

const healingPotion = {
    itemName: "Healing Potion",
    description: "A healing potion that can restore 10+ health to your monster."
};

const buffPotion = {
    itemName: "Buff Potion",
    description: "Potion that buffs your monster's attack power by +2."
};

const resistPotion = {
    itemName: "Resist Potion",
    description: "Potion that allows the monster to survive a final blow attack once."
};
//playerMonster is an array used to store whatever monster the player picks
const playerMonster = [];
const playerInventory = [healingPotion, buffPotion, resistPotion];


//checks to ensure what the player types in is valid and matches choices
function isValidResponse(answer, monsterNames) {
    const normalizedAnswer = answer.toLowerCase().trim();
    return monsterNames.includes(normalizedAnswer);
}
//this function works to let the player pick from the list of three monsters 
function pickMonster() {
    console.log("Welcome to Monster Mash! Pick your monster from the list. Once you've chosen your monster, it's time to fight the others!");
    //print the monster names from the monsters array with a few spaces between each name
    const monsterNames = monsters.map(monster => monster.name.toLowerCase());
    console.log("Monsters: ", monsters.map(monster => monster.name).join('   '));

    rl.question("Choose your monster: ", (answer) => {
        answer = answer.toLowerCase().trim();
        //checks players answer by checking it against the monsterNames array
        if (isValidResponse(answer, monsterNames)) {
            const selectedMonsterIndex = monsters.findIndex(monster => monster.name.toLowerCase() === answer);
            const selectedMonster = monsters[selectedMonsterIndex];
            //pushes monster to playerMonster
            playerMonster.push(selectedMonster);
            monsters.splice(selectedMonsterIndex, 1);

            console.log(`You have chosen ${selectedMonster.name}! Get ready to battle!`);
            console.log("Your opponents are: ", monsters.map(monster => monster.name).join('   '));
            fight();
        } else {
            console.log("Invalid choice! Please choose a valid monster.");
            pickMonster();
        }
    });
}
//random function
function diceRoll(){
    return Math.floor(Math.random()* 12);
   }
//main combat math function
   function attack(attacker, defender) {
    if (defender.resistPotionUsed) {
        defender.damageThreshold += 3;  //  boost from resist potion
        defender.resistPotionUsed = false;
    }
//This code was modified from Zach Guillory monstergame program
    const attackerRoll1 = diceRoll();
    const defenderRoll1 = diceRoll();
    const attackerRoll2 = diceRoll();
    const defenderRoll2 = diceRoll();

    const defenderAttack = defender.attackSpeed * defenderRoll1;
    const attackerAttack = attacker.attackSpeed * attackerRoll1;

    let defenderDamage = 0;
    let attackerDamage = 0;

    if (defenderAttack >= attackerAttack) {
        defenderDamage = Math.max(defender.attackPower * defenderRoll2 - attacker.damageThreshold, 0);
        attacker.health -= defenderDamage;
        console.log(`${defender.name} attacks ${attacker.name} with ${defender.attackPower} power and ${defender.attackSpeed} speed, dealing ${defenderDamage} damage! ${attacker.name} health: ${attacker.health}`);
    } else {
        attackerDamage = Math.max(attacker.attackPower * attackerRoll2 - defender.damageThreshold, 0);
        defender.health -= attackerDamage;
        console.log(`${attacker.name} attacks ${defender.name} with ${attacker.attackPower} power and ${attacker.attackSpeed} speed, dealing ${attackerDamage} damage! ${defender.name} health: ${defender.health}`);
    }
}


//main fight function that handles most of the other code 

function fight() {
    // Set the current opponent to the first monster in the array
    let currentOpponent = monsters[0];
    
    // If there are no opponents, the player has already won
    if (!currentOpponent) {
        console.log("Congratulations! You've defeated all the monsters!");
        rl.close();
        return;
    }

    console.log(`Your first opponent is ${currentOpponent.name}!`);

    // Track whose turn it is: true for player, false for opponent
    let playerTurn = true;

    // Define the main battle function
    const battle = () => {
        // Check if the player’s monster has been defeated
        if (playerMonster[0].health <= 0) {
            console.log("Your monster has been defeated. Game over.");
            rl.close();
            return;
        }

        // Check if the current opponent has been defeated
        if (currentOpponent.health <= 0) {
            console.log(`${currentOpponent.name} has been defeated!`);
            // Remove defeated opponent from the array
            monsters.shift();
            // Set the next opponent (if any) as the new current opponent
            currentOpponent = monsters[0];

            if (currentOpponent) {
                // Announce the next opponent
                console.log(`Next opponent is ${currentOpponent.name}!`);
            } else {
                // All opponents have been defeated, the player wins
                console.log("Congratulations! You've defeated all the monsters!");
                rl.close();
                return;
            }
        }

        // Determine whose turn it is based on the value of `playerTurn`
        if (playerTurn) {
            // Player's turn
            console.log("Your turn! Type 'attack' to attack or 'inventory' to open your inventory.");
            rl.question("> ", (action) => {
                if (action.toLowerCase() === "attack") {
                    // Player attacks the opponent
                    attack(playerMonster[0], currentOpponent);
                    // swap to monster
                    playerTurn = false;
                    // delay because I was having issues with the code either sending the player or enemy twice
                    setTimeout(battle, 500);
                } else if (action.toLowerCase() === "inventory") {
                    checkInventory();
                } else {
                    // text doesn't match
                    console.log("Invalid action.");
                    setTimeout(battle, 500);
                }
            });
        } else {
            // enemy turn
            console.log(`${currentOpponent.name} is attacking!`);
            // opponent attack
            attack(currentOpponent, playerMonster[0]);
            //  player's turn
            playerTurn = true;
            // Delay before the player's next turn for smoother flow
            setTimeout(battle, 500);
        }
    };
    
    // start the battle
    battle();
}

function checkInventory() {
    console.log("Inventory:");
    playerInventory.forEach((item, index) => {
        console.log(`${index + 1}. ${item.itemName}`);
    });
    rl.question("Type the number of the item you want to inspect, or type 'back' to return: ", (choice) => {
        if (choice.toLowerCase() === "back") {
            fight();  // Return to fight after inventory actions
            return;
        }
        const itemIndex = parseInt(choice) - 1;
        if (itemIndex >= 0 && itemIndex < playerInventory.length) {
            inspectItem(playerInventory[itemIndex]);
        } else {
            console.log("Invalid choice.");
            checkInventory();
        }
    });
}

function inspectItem(item) {
    console.log(`Item: ${item.itemName}`);
    console.log(`Description: ${item.description}`);
    rl.question("Type 'use' to use this item or 'back' to return: ", (action) => {
        if (action.toLowerCase() === "use") {
            useItem(item);
            fight(); // Return to fight after using an item
        } else if (action.toLowerCase() === "back") {
            checkInventory();
        } else {
            console.log("Invalid action.");
            inspectItem(item);
        }
    });
}
//you'll notice this function and the inspect item function and checkInventory function are similar to another program of mine
//not exactly obviously but I had the bones to work off of from my SpaceArthur program
function useItem(item) {
    const monster = playerMonster[0];
    switch (item.itemName) {
        case "Healing Potion":
            monster.health += 10;
            console.log(`${monster.name} healed for 10 points! Current health: ${monster.health}`);
            break;
        case "Buff Potion":
            monster.attackPower += 2;
            console.log(`${monster.name}'s attack power increased to ${monster.attackPower}`);
            break;
        case "Resist Potion":
            monster.resistPotionUsed = true;
            console.log(`${monster.name} is temporarily more resistant to attacks!`);
            break;
    }
    playerInventory.splice(playerInventory.indexOf(item), 1);
}

pickMonster();