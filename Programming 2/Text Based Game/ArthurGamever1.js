const readline = require('readline');

//let dungeonChoices = new Array["Jiggle the door","Search under the bed","Yell","Inspect the toilet"];
const nextStep = ["It is locked","There is a dead rat", "Someone is coming...","Maybe you shouldn't"];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});





function askFirstQuestion() {
    rl.question("You wake up in a dimly lit dungeon with no memory of how you got here. Rising off the bed you decide you have four choices:A) Jiggle the door, B) Search under the bed, C) Yell, D) Inspect the toilet  \n" , (answer) => {
        // Convert user input to lowercase to handle case insensitivity
        const playerChoice = answer.toLowerCase();
     

        // First switch case for fruit selection
        switch (playerChoice) {
            case 'a':
				console.log("\n");
				console.log(nextStep[0]);
				console.log("\n");
				askFirstQuestion();
				return;
            case 'jiggle the door':
			console.log("\n");
				console.log(nextStep[0]);
				console.log("\n");
				askFirstQuestion();
				return;
            case 'b':
				console.log("\n");
				console.log(nextStep[1]);
				console.log("\n");
				askFirstQuestion();
				return;
            case 'search under the bed':
				console.log("\n");
				console.log(nextStep[1]);
				askFirstQuestion();
				console.log("\n");
				return;
            case 'd':
				console.log("\n");
				console.log(nextStep[3]);
				console.log("\n");
				askFirstQuestion();
				return;
			case 'inspect the toilet':
				console.log("\n");
				console.log(nextStep[3]);
				console.log("\n");
				askFirstQuestion();
				return;
            case 'c':
				console.log("\n");
                console.log(nextStep[2]);
				console.log("\n");
                break;
				
			case'yell':
				console.log("\n");
				console.log(nextStep[2]);
				console.log("\n");
				break;

            default:
				console.log("\n");
                console.log('Unknown answer. Please choose again from choices list.');
				console.log("\n");
                // If the user enters an invalid fruit, prompt them again
                askFirstQuestion();
                return; // Exit this function and wait for the new input
        }

       

        // Final message after both switch statements
        console.log(`Choices used debugg statement`);

        // Close the readline interface after valid input and processing
        rl.close();
    });
}

// Start the program by asking the user for their favorite fruit
askFirstQuestion();