/*
Program: Arthur Game (version 2)
Developer: Jacob Klataske

This is a rough draft program for a text game that incorporates conditionals, a loop, and a math random for a roll. A lot of this is temporary and not final
especially as far as the options and their consequences are concerned. I was mostly focused with progressing on a single track for now.

run in command prompt as node ArthurGameVer2.js

*/


//Initialize readline for user input
//declare arrays of content  for use in functions with questions and steps
//develop a questions function that runs through the steps of text and their possible answers
//function for a random roll outcome like a dice roll in dnd


const readline = require('readline');

// Array containing nextStep messages for each question's responses
//an array of arrays.
const nextSteps = [
    // Next steps for the first question
    ["It is locked.", "There is a dead rat.", "Someone is coming...", "Maybe you shouldn't."],
    // Next steps for the second question
    ["You hide under the bed just in time.", "You prepare to fight bravely.", "The door creaks open slowly..."],
    // Next steps for the third question
    ["The light leads to a hidden tunnel.", "You ignore the light, but hear noises.", "You find another exit, but it's blocked."]
];


//this ended up being more complex than my v1 which was just a simple array of the questions that I didn't use because it was all contianed in console.log in a switch/case statement
//while a bit chunkier up here by being an array of objects, it leads to a much cleaner function and refines
const questions = [
    {
        text: "You wake up in a dimly lit dungeon with no memory of how you got here. Rising off the bed, you decide you have four choices:\nA) Jiggle the door\nB) Search under the bed\nC) Yell\nD) Inspect the toilet\n",
        responses: ["a", "jiggle the door", "b", "search under the bed", "c", "yell", "d", "inspect the toilet"],
        nextSteps: [0, 1, 2, 3] // Indices correspond to entries in nextSteps[0]
    },
    {
        text: "You hear footsteps outside. Choose your next action:\nA) Hide under the bed\nB) Prepare to fight\nC) Try to open the door again\n",
        responses: ["a", "hide under the bed", "b", "prepare to fight", "c", "try to open the door again"],
        nextSteps: [0, 1, 2] // Indices correspond to entries in nextSteps[1]
    },
    {
        text: "You see a faint light coming from the corner of the room. What do you do?\nA) Approach the light\nB) Ignore it\nC) Look for another exit\n",
        responses: ["a", "approach the light", "b", "ignore it", "c", "look for another exit"],
        nextSteps: [0, 1, 2] // Indices correspond to entries in nextSteps[2]
    }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question based on the current stage.
//stage is an integer representing the current point of the game based on the sets of questions
function askQuestion(stage) {
    const question = questions[stage];

    rl.question(question.text, (answer) => {
        const playerChoice = answer.toLowerCase();

        // Find index of the player's choice in responses array
        let index = question.responses.indexOf(playerChoice);
        if (index === -1) {
            console.log("\nUnknown answer. Please choose again from the list.\n");
            askQuestion(stage);
            return;
        }

        // Normalize index to point to corresponding nextStep (this also deals with the double connected response pairs)
        index = Math.floor(index / 2);
        console.log("\n" + nextSteps[stage][question.nextSteps[index]] + "\n");

        // Only restrict progression on the first question (stage 0)
		//This is somewhat temporary or not realistic as a full text based game would delve into creating multiple branching pathways depending on player choice so having 
		//a single "correct" answer for the path forward isn't true to the genre but fits for a beginning of the semester program.
        if (stage === 0 && !(playerChoice === 'c' || playerChoice === 'yell')) {
            askQuestion(stage); // Re-prompt the first question
        } else {
            // If it's not the first question or they chose "c"/"yell" in the first question, allow progression
            if (stage < questions.length - 1) {
                askQuestion(stage + 1);
            } else {
                randomOutcome();
            }
        }
    });
}

// Example function using a for loop and Math.random to determine an outcome
function randomOutcome() {
    console.log("\nYou encounter a final challenge. Rolling a die to determine your fate...\n");
	
	//value to store the sum of the rolls.
	let totalRolls = 0;
    // Roll a "die" 3 times using a for loop
    for (let i = 0; i < 3; i++) {
        let roll = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
		totalRolls += roll;
        console.log(`Roll ${i + 1}: You rolled a ${roll}`);
    }

	 console.log(`\nThe total of your rolls is: ${totalRolls}\n`);
	 
    console.log("\nYour rolls determine the course of play. The game ends here (For Now...).\n");
	
	if(totalRolls < 10){
		failedRoll();
	}
	else{
		successfulRoll();
	}

   // rl.close(); // End the game
}

function failedRoll(){
	console.log("Someone is in the doorway!");
	
	rl.close();
}


function successfulRoll(){
	
	console.log("Someone has passed the cell!");
	
	
	
	rl.close();
}


// Start the game
askQuestion(0);

