#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Welcome message
const developer = "Saifi Developer's";
const project = "Adventure Game";
console.log(chalk.magentaBright(`\n \t\tWelcome to the ${chalk.yellowBright(developer)} ${chalk.greenBright(project)}\n`));
async function startGame() {
    // Prompt to get the user's name
    const user = await inquirer.prompt([
        {
            name: "userName",
            type: "input",
            message: chalk.yellow(" Please enter your name: "),
            validate(inputname) {
                return inputname.length !== 0; // Ensure the name is not empty
            },
        },
    ]);
    const inputname = user.userName;
    // Welcome the user to the game
    console.log(chalk.greenBright(`\n\t\t Dear ${chalk.yellow(inputname)}, Welcome to the ${chalk.blueBright(project)}\n`));
    async function fightGame(opponent) {
        // Announce the battle
        console.log(chalk.greenBright(`\n\t\t${inputname} vs ${opponent}\n`));
        let userHealth = 100;
        let opponentHealth = 100;
        // Loop until either the user or the opponent runs out of health
        while (userHealth > 0 && opponentHealth > 0) {
            // Prompt the user for their action
            const fightAction = await inquirer.prompt([
                {
                    name: "action",
                    type: "list",
                    message: "Please select your action!",
                    choices: ["Attack", "Run"],
                },
            ]);
            if (fightAction.action === "Attack") {
                opponentHealth -= 10; // Decrease opponent's health by 10
                console.log(chalk.redBright(`\n${chalk.yellow(inputname)} attacks ${chalk.green(opponent)}. ${chalk.green(opponent)} loses 10 health.\n`));
            }
            else if (fightAction.action === "Run") {
                userHealth += 5; // Increase user's health by 5
                console.log(chalk.greenBright(`\n${chalk.yellow(inputname)} runs. ${chalk.yellow(inputname)} gains 5 health.\n`));
            }
            // Check if the opponent has been defeated
            if (opponentHealth <= 0) {
                console.log(chalk.greenBright(`\nDear ${chalk.blueBright(inputname)} you win the game!\n`));
                break;
            }
            // Opponent's turn to act
            const opponentAction = ["Attack", "Run"][Math.floor(Math.random() * 2)];
            if (opponentAction === "Attack") {
                userHealth -= 10; // Decrease user's health by 10
                console.log(chalk.redBright(`\n${chalk.blue(opponent)} attacks ${chalk.green(inputname)}. ${chalk.green(inputname)} loses 10 health.\n`));
            }
            else if (opponentAction === "Run") {
                opponentHealth += 5; // Increase opponent's health by 5
                console.log(chalk.greenBright(`\n${chalk.blue(opponent)} runs. ${chalk.blue(opponent)} gains 5 health.\n`));
            }
            // Check if the user has been defeated
            if (userHealth <= 0) {
                console.log(chalk.redBright(`\n Dear ${chalk.blueBright(inputname)}, you are loss the game!\n`));
                break;
            }
            // Display current health status
            console.log(chalk.cyanBright(`\n${inputname}'s Health: ${userHealth}`));
            console.log(chalk.cyanBright(`${opponent}'s Health: ${opponentHealth}\n`));
        }
        // Ask the user if they want to play again
        const playAgain = await inquirer.prompt([
            {
                name: "playAgain",
                type: "confirm",
                message: "Do you want to play again?",
            },
        ]);
        // Restart the game or exit based on the user's choice
        if (playAgain.playAgain) {
            startGame();
        }
        else {
            console.log(chalk.magentaBright(`\n\tThank you for playing the ${chalk.greenBright(developer)} ${chalk.cyanBright(project)}!\n`));
        }
    }
    // Prompt the user to choose an opponent
    const games = await inquirer.prompt([
        {
            name: "gameslist",
            type: "list",
            message: "Do you want to fight Spiderman or Alien?",
            choices: ["Spiderman", "Alien"],
        },
    ]);
    // Start the fight based on the user's choice of opponent
    if (games.gameslist === "Spiderman") {
        await fightGame("Spiderman");
    }
    else if (games.gameslist === "Alien") {
        await fightGame("Alien");
    }
}
// Start the game
startGame();
