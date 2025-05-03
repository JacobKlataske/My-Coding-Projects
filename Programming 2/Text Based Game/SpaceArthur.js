/*
This is arthur game version three, it isn't done yet (still). However there is enough complete functionality that I am confident
in calling this VER3 and leaving it there.

Loose ends: 
* Key item: Key item currently serves no purpose.
    END GOAL: Use item on strange brick in the wall for alternate ending 
* Repeated Text blocks
    END GOAL: After defeating the rat the game gives you the opportunity to fight again due to the fact that I haven't coded a 
    block for what happens after the rat is dead. That is a lot more text and responses and I just didn't have time.

This is so much bigger than I meant it to be I'm gonna be honest. Which I have no one to blame but myself I suppose.
Uh, oops? Sorry

*/

//My initial ver started with this: the text and response pairs. For every block of text there are 8 things you can type
//you can either type the answer word for word, or the letter. Three out of the four take you to another unique text block
//while D and CHECK INVENTORY always bring you to those functions
const questions = [
    //this is the initial question, every time you run the game this will be the first question and the user will always have these
    //three choices to start the game and a check inventory option. This is going to relate to the inventory array and will hold items
    //0
    {
    text: "You wake up in a dimly lit dungeon with no memory of how you got here. Rising off the bed, you decide you have four choices:\nA) Jiggle the door\nB) Search under the bed\nC) Yell\nD) Check Inventory\n",
    responses: ["a", "jiggle the door", "b", "search under the bed", "c", "yell","d","check inventory"]
    },

    //this text response pair is the result of choosing "a" or "jiggle the door"
    //1
    {
        text: "The door isn't locked very tight, you think with enough force you might be able to break it loose. Choose your next action: \nA) Try and open the door again\nB) Pace around the  room\nC)Look through the bars\nD) Check Inventory\n",
        responses: ["a","try and open the door again","b","pace around the room","c","look through the bars","d","check inventory"]
    },

    //this text response pair is the result of choosing "b" or "search under the bed"
    //2
    {
        text:"A rat stares back at you from beneath the bed, it's holding a key! Choose your next action: \nA) Try and grab the key\nB)Leave\nC) Fight the Rat\nD) Check Inventory\n" ,
        responses:["a","Try and grab the key", "b","leave","c","fight the rat","d","check inventory"]
    },

    //this text response pair is going to be the response to entering "c" or "yell" 
    //3
    {
        text: "You hear footsteps outside. Choose your next action:\nA) Hide under the bed\nB) Prepare to fight\nC) Try to open the door again\nD) Check Inventory\n",
        responses: ["a", "hide under the bed", "b", "prepare to fight", "c", "try to open the door again","d","check inventory"],

    },

        //adding more comments to break up the blocks
        // this text response block goes down the "jiggle the door" path after the initial question
        //this text response pair starts  the  first branching path and takes place after THE DOOR ISN'T LOCKED VERY TIGHT OPTION A
        //"try and open the door again"
        //4

        
    {
        text:"The door breaks loose and the dimly lit hallway stretches in both directions, footsteps approach from your right. Choose your next action: \nA) Hide under the bed\nB) Prepare to fight\nC) Move into the hallway\nD) Check Inventory\n" ,
        responses:["a","hide under the bed","b","prepare to fight","c","move into the hallway","d","check inventory"]
    },

    // this text response block goes down the "jiggle the door" path after the initial question
    //this text response pair starts the second branching path and takes place after THE DOOR ISN'T LOCKED VERY TIGHT OPTION B
    //"pace around the room"
    //5
    {
        text:"You pace around the room, trying to think of something you may have missed, you see a strange brick in the corner. Choose your next action: \nA) Search under the bed\nB) Yell\nC) Inspect the brick\nD) Check Inventory\n",
        responses:["a","Search under the bed","b","yell","c","inspect the brick","d","check inventory"]
    },

    // this text response block goes down the "jiggle the door" path after the initial question
    //this text response pair is after THE DOOR ISN'T LOCKED VERY TIGHT OPTION C 
    //"you look through the bars"
    //6
    {
        text:"The hallway is dimly lit making it hard to see anything. To the far left is an open doorway, to your right you can make out a guard sleeping in a chair. Choose your next action: \nA) Try and open the door again\nB) Search under the bed\nC) Yell\nD) Check Inventory\n",
        responses:["a","try and open the door again","b","search under the bed","c","yell","d","check inventory"]
    },

   
    // this text response block goes down the "search under the bed" path after the initial question
    //this text response pair is after A RAT STARES BACK AT YOU FROM UNDER THE BED OPTION "A"
    //"Try and grab the key"
    //7

    {
        text: "The rat bites at your hand and refuses to relinquish the key. You are bleeding and have lost 1 health point. Choose your next action: \nA) Fight the rat\nB) Leave\nC) Yell\nD) Check Inventory\n",
        responses:["a","fight the rat","b","leave","c","yell","d","check inventory"]
    },

    //this text response block does down the "search under the bed" path after the initial question
    //after  A RAT STARES BACK AT YOU FROM UNDER THE BED OPTION "B"
    //"Leave"
    //8

    {
        text:"You know there's a key here in the cell, unfortunately you're a coward and not willing to fight a rat. Choose your next action: \nA) Fight the rat\nB) Jiggle the door\nC) Yell\nD) Check your inventory\n",
        responses:["a","fight the rat","b","jiggle the door","c","yell","d","check inventory"]
    },

    //adding more comments to break up the blocks
        // this text response block goes down the "yell" path after the initial question
        //this text response pair starts  the  first branching path and takes place after YOU HEAR FOOTSTEPS OPTION "A"
        //"hide under the bed"
        //9
        {
            text:"You hide under the bed, the footsteps growing lowder and closer. Next to you a rat squeaks, it is holding a key, you invaded his space and he wants to fight! Choose your next action \nA) Fight the rat\nB) Leave\nC)Try and grab the key\nD) Check inventory\n",
            responses:["a","fight the rat","b","leave","c","try and grab the key","d","check inventory"]
        },
//adding more comments to break up the blocks
//this text response is after the "move into the hallway"
//10
        {
            text: "You are now face to face with the guard. He is heavily overweight and still sleepy. You think you can take him. Choose your next action \nA) Fight the guard\nB) Check Inventory\n",
            responses:["a", "fight the guard","b","check inventory"]
        },

        //adding more comments to break up the blocks 
        //this text response block is after the "inspect the brick"
        //11
        {
            text:"The brick is a different color than the surrounding stone, a strange crack in the middle of the rock catches your eye, it looks like a keyhole... Choose your next action \nA) Pace around the room\nB) Check Inventory\n",
            responses: ["a","pace around the room","b","check inventory"]
        }
     
];


//inventory items the player can pick up. The coin is the starter item in the inventory.
//dead rat and key were both meant to have uses but as it is the dead rat is the only useful item right now, which I'll let 
//you figure out how its useful...
const coin = {
    itemName: "Coin",
    description: "A coin in your pocket, a generic quarter you keep on you as a good luck charm. It might be useful for something.\n"
};

const key = {
    itemName: "Key",
    description:"A strange key with a flat knob the shape of a shield.\n"

};

const deadRat = {
    itemName: "Dead rat",
    description: "You picked up and put the dead rat in your pocket, it is a dead rat.\n"
}

//inventory array
const arthurInventory = [coin];


//the player character and enemies!
const arthur = {
    name: "Arthur",
    attackSpeed: 5,
    attackPower: 5,
    dT: 5,
    health: 100,
    status: "alive"
};

const guard = {
    name: "The Guard",
    attackSpeed: 3,
    attackPower: 5,
    dT: 2,
    health: 75,
    status: "alive"

};

const rat = {
    name: "Rat",
    attackSpeed: 1,
    attackPower: 1,
    dT: 1,
    health: 1,
    status: "alive"

}
//charaacter array that I don't think I ever even used

const characters = [arthur,guard,rat];

let currentQuestionIndex = 0; // tracks the current question based on the above question blocks
let previousQuestionIndex = null; // Holds previous question index when checking inventory so you can return accurately

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let inCombat = false; // track whether Arthur is in combat
let currentEnemy = null; // stores the current enemy when in combat


//checks user text for if it works or if it doesn't fit 
function isValidResponse(answer, responses) {
    const normalizedAnswer = answer.toLowerCase().trim();
    return responses.includes(normalizedAnswer);
}

//random math because everyone loves RNG!
//function borrowed from Zach
function diceRoll() {
    return Math.floor(Math.random() * 20) + 1;
}

// function to check the player's inventory and return to the previous question if it's empty
function checkInventory() {
    if (arthurInventory.length === 0) {
        console.log("Your inventory is empty.\n");
        inCombat ? combatTurn() : returnToPreviousQuestion(); // return based on combat state
        //this is here (and in fact the entire combatTurn() function being separate is because I needed to  return to a combat
        //encounter not just from questions which was a headache
    } else {
        //prints inventory content
        const inventoryNames = arthurInventory.map(item => item.itemName).join('   ');
        console.log("Inventory:", inventoryNames);

        rl.question("Do you want to inspect or use an item? (inspect/use) or type 'return' to go back.\n", (input) => {
            if (input === 'return') {
                inCombat ? combatTurn() : returnToPreviousQuestion(); //return based on combat state
            } else if (input === 'inspect') {
                rl.question("Which item would you like to inspect?\n", (item) => {
                    inspectItem(item);
                });
            } else if (input === 'use') {
                rl.question("Which item would you like to use?\n", (item) => {
                    useItem(item, currentEnemy); //pass currentEnemy to allow item effects
                });
            } else {
                console.log("Invalid input. Returning to main game.\n");
                inCombat ? combatTurn() : returnToPreviousQuestion();
            }
        });
    }
}
//inspects the item and lets the user read my illuminating descriptions
function inspectItem(item) {
    switch (item.toLowerCase()) {
        case 'coin':
            console.log(coin.description);
            break;
        case 'key':
            console.log(key.description);
            break;
        case 'dead rat':
            console.log(deadRat.description);
            break;
        default:
            console.log("Item not found in inventory.\n");
    }
    checkInventory();
}

//use the items at your peril
//this was built before the combat encounters and so there needed to be some significant modifications such as passing in
//the enemy perameter and using that to evaluate whether or not the item can be used.
function useItem(item, enemy) {
    switch (item.toLowerCase()) {
        case 'coin':
            if (enemy && enemy.name === "Rat") {
                console.log("You shove the coin in the rat's mouth, it chokes and dies to your shock.\n");
                enemy.health = 0;
                arthurInventory.push(deadRat, key);
                console.log("Your wonderful loot: A strange key and the warm body of a dead rat.\n");
                inCombat = false;
                askQuestions(); // End combat after using the item
            } else {
                console.log("You can't use the coin right now.\n");
                checkInventory();
            }
            break;

        case 'dead rat':
            if (enemy && enemy.name === "The Guard") {
                if (enemy.health <= enemy.health / 2) {
                    console.log("In a moment of desperation you throw the dead rat at the guard, it strikes him and he dies out of shock!\n");
                    enemy.health = 0;
                } else {
                    console.log("The guard is shaken, taking significant damage.\n");
                    enemy.health -= enemy.health / 2;
                }
                inCombat = false;
                askQuestions(); // End combat after using the item
            } else {
                console.log("The dead rat has no effect here.\n");
                checkInventory();
            }
            break;

        case 'key':
            console.log("You can't use the key right now.\n");
            checkInventory();
            break;

        default:
            console.log("Item not found in inventory.\n");
            checkInventory();
    }
}



//function to return to the previous question after checking inventory
function returnToPreviousQuestion() {
    if (previousQuestionIndex !== null) {
        currentQuestionIndex = previousQuestionIndex; //restore the previous question index
        previousQuestionIndex = null; //clear the stored previous question index
        askQuestions(); //reprint the previous question
    }
}



//the main and first function I made which started with if() else() blocks and then quickly pivoted to switch case
//could you imagine this as if else?
//ask questions creates currentQuestion and alters that const based on the questions above and the index of each pairing of 
//text and responses
function askQuestions() {
    const currentQuestion = questions[currentQuestionIndex]; // Get the current question

    console.log(currentQuestion.text); // Print the current question text
//the beginning of user interaction
    rl.question("Choose your action: ", (answer) => {
        answer = answer.toLowerCase(); //ensures the user can enter any amount of capitals and lower case as long as its the
        //correct words or letter

        //check if the response is valid for the current question
        if (isValidResponse(answer, currentQuestion.responses)) {
            
            // Check the input and transition based on the current question index
            switch (currentQuestionIndex) {
                case 0:
                    if (answer === 'a' || answer === 'jiggle the door') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 1;
                    } else if (answer === 'b' || answer === 'search under the bed') {
                        console.log("You chose option B.");
                        currentQuestionIndex = 2;
                    } else if (answer === 'c' || answer === 'yell') {
                        console.log("You chose option C.");
                        currentQuestionIndex = 3;
                    } else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; // Store for backtracking
                        checkInventory(); // Call the inventory function
                        return; // Exit askQuestions to wait for user input from checkInventory
                    }
                    break;

                case 1:
                    if (answer === 'a' || answer === 'try and open the door again') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 4;
                    }else if (answer ==='b' || answer === 'pace around the room'){
                        console.log("You chose option B.");
                            currentQuestionIndex =5;
                    }else if (answer ==='c' || answer === 'look through the bars'){
                        console.log("You chose option C.");
                        currentQuestionIndex = 6;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory();
                        return; 
                    }
                    
                    break;

                case 2:
                    if (answer === 'a' || answer === 'try and grab the key') {
                        console.log("You chose option A.");
                        arthur.health -= 1;
                        console.log("The rat bites you. You lose 1 health point.");
                        currentQuestionIndex = 7;
                    }else if (answer ==='b' || answer === 'leave'){
                        console.log("You chose option B.");
                            currentQuestionIndex =8;
                    }else if (answer === 'c' || answer === 'fight the rat') {
                        //first call of the fight function
                        fight(rat);
                        return;
                    } else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex;
                        checkInventory();
                        return;
                    }
                    break;

                
                case 3:
                    if (answer === 'a' || answer === 'hide under the bed') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 9;
                    }else if (answer ==='b' || answer === 'prepare to fight'){
                        console.log("You chose option B.");
                        fight(guard);
                           return;
                    }else if (answer === 'c' || answer === 'try and open the door again') {
                        console.log("You chose option C.");
                        currentQuestionIndex = 4;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }

                break;
                
                case 4:
                    if (answer === 'a' || answer === 'hide under the bed') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 9;
                    }else if (answer ==='b' || answer === 'prepare to fight'){
                        console.log("You chose option B.");
                        fight(guard);
                        return;

                           
                    }else if (answer === 'c' || answer === 'move into the hallway') {
                        console.log("You chose option C.");



                        //need to add more text
                        currentQuestionIndex = 10;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }

                break;

                case 5:
                    if (answer === 'a' || answer === 'search under the bed') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 2;
                    }else if (answer === 'b' || answer === 'yell') {
                        console.log("You chose option B.");
                        currentQuestionIndex = 3;
                    }else if (answer ==='c' || answer === 'inspect the brick'){
                        console.log("You chose option C.");
                        currentQuestionIndex = 11;

                        //need to add a new question block
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }

                break;

                case 6:
                    if (answer === 'a' || answer === 'try and open the door again') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 4;
                    }else if (answer === 'b' || answer === 'search under the bed') {
                        console.log("You chose option B.");
                        currentQuestionIndex = 2;
                    }else if (answer === 'c' || answer === 'yell') {
                        console.log("You chose option C.");
                        currentQuestionIndex = 3;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }
                break;

                case 7:
                    if (answer ==='a' || answer === 'fight the rat'){
                        console.log("You chose option A. Time to Face the RAT!");
                        fight(rat);
                        return;
                    }else if (answer ==='b' || answer === 'leave'){
                        console.log("You chose option B.");
                            currentQuestionIndex =8;
                    }else if (answer === 'c' || answer === 'yell') {
                        console.log("You chose option C.");
                        currentQuestionIndex = 3;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }
                break;

                case 8:
                    if (answer ==='a' || answer === 'fight the rat'){
                        console.log("You chose option A. Time to Face the RAT!");
                        fight(rat);
                        return;
                    }else if (answer === 'b' || answer === 'jiggle the door') {
                        console.log("You chose option B.");
                        currentQuestionIndex = 1;
                    }else if (answer === 'c' || answer === 'yell') {
                        console.log("You chose option C.");
                        currentQuestionIndex = 3;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }
                break;

                case 9:
                    if (answer ==='a' || answer === 'fight the rat'){
                        console.log("You chose option A. Time to Face the RAT!");
                        fight(rat);
                        return;
                    }else if (answer ==='b' || answer === 'leave'){
                        console.log("You chose option B.");
                            currentQuestionIndex =8;
                    }else if (answer === 'c' || answer === 'try and grab the key') {
                        console.log("You chose option C.");
                        arthur.health = arthur.health-1;
                        currentQuestionIndex = 7;
                    }else if (answer === 'd' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }
                break;

                case 10:
                    if (answer === 'a' || answer === 'fight the guard') {
                        fight(guard);
                        return;
                    } else if (answer === 'b' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex;
                        checkInventory();
                        return;
                    }
                    break;

                case 11:
                    if (answer === 'a' || answer === 'pace around the room') {
                        console.log("You chose option A.");
                        currentQuestionIndex = 5;
                    }else if (answer === 'b' || answer === 'check inventory') {
                        previousQuestionIndex = currentQuestionIndex; 
                        checkInventory(); 
                        return; 
                    }


                break;

            }

            //after handling the choice, print the next question text if not checking inventory
            askQuestions(); //recursively call askQuestions to handle the next question
        } else {
            console.log("Invalid input. Please try again.");
            askQuestions(); //ask again for valid input
        }
    });
}

//this function initially contained the below combatTurn() however as the code grew more complex requiring more functions to call
//on combatTurn (like in the use item or inspect item) it needed to be moved out. 
//fight currently takes in the currentEnemy (either rat or guard) prints out that you are now fighting them, sets inCombat to true
//sets the current enemy and calls combatTurn
function fight(enemy) {
    console.log(`You engage in a fight with ${enemy.name}.`);
    inCombat = true;
    currentEnemy = enemy; // Set the current enemy
    combatTurn(); // Start combat
}

//the meat and potatoes of the fighting is done here
function combatTurn() {
    //initial statement of either attack or inventory
    rl.question("Choose your action: (attack/check inventory)\n", (action) => {
        if (action.toLowerCase() === "attack") {
            //thanks again to Zach for making such a dead simple and intuitive combat mechanic based on diceRolls 
            //making my life easier as per usual
            let playerRoll = diceRoll();
            let enemyRoll = diceRoll();

            let playerRoll2 = diceRoll();
            let enemyRoll2 = diceRoll();

            let playerAttack = playerRoll * arthur.attackSpeed;
            let enemyAttack = enemyRoll * currentEnemy.attackSpeed;

            if (playerAttack >= enemyAttack) {
                let damage = arthur.attackPower * playerRoll2 - currentEnemy.dT;
                currentEnemy.health -= damage;
                console.log(`You hit the ${currentEnemy.name} for ${damage} damage. ${currentEnemy.name} has ${currentEnemy.health} health left.`);
            } else {
                let damage = currentEnemy.attackPower * enemyRoll2 - arthur.dT;
                arthur.health -= damage;
                console.log(`${currentEnemy.name} hits you for ${damage} damage. You have ${arthur.health} health left.`);
            }

            //check if the enemy is defeated
            if (currentEnemy.health <= 0) {
                console.log(`You defeated the ${currentEnemy.name}!`);
                
                //add the deadRat and key items to the inventory
                if (currentEnemy.name === "Rat") {
                    arthurInventory.push(deadRat, key);
                    console.log("You add the dead rat and key to your inventory.");
                }
                //end the game if the guard is the one defeated
                else if (currentEnemy.name === "The Guard"){
                    console.log("With the Guard dead you can begin to make your way out of this prison!");
                        rl.close();
                        return;
                    
                }
                

                //clear combat state and reset currentEnemy before returning to the game
                inCombat = false;
                currentEnemy = null;
                
                askQuestions(); //return to the game after defeating the enemy
            } else if (arthur.health <= 0) {
                console.log("You have been defeated!");
                rl.close(); //end game
            } else {
                combatTurn(); //continue the fight
            }
        } else if (action.toLowerCase() === "check inventory") {
            checkInventory(); //calls inventory. This right here caused an entire rework of combatTurn() and useItem. 
            //the audacity!
        } else {
            console.log("Invalid action. Please choose 'attack' or 'check inventory'.");
            combatTurn();
        }
    });
}


askQuestions(); //starts the game