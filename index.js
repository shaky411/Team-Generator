const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Empty array to store results that will be printed to HTML doc
let team = [];

// Start with manger details then initiate questions for employees
async function startProgram() {
    let data = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
        
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your id number?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter your email address'
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Please enter your office number'
            }
        ]
    )

    // pushes data to the team array
    const managerAnswers = new Manager(data.name, data.id, data.email, data.officeNumber)
    team.push(managerAnswers)

    // Starts employee questions
    return employeeQuestions();
}

// This starts the programme and initiates the manager questions
startProgram()

// Questions about the employees
async function employeeQuestions() {
    let employeeData = await inquirer.prompt(
        [
        {
            type: 'list',
            name: 'role',
            message: 'Select the type of employee you would like to add',
            choices: ["Engineer", "Intern", "No more entries to add"]
        }
    ])

    // Show questions based on role selection
    if (employeeData.role === "Engineer") {
        return engineerQuestions();
    }

    if (employeeData.role === "Intern") {
        return internQuestions();
    }

    // If no more entries selected, create the HTML file
    if (employeeData.role === "No more entries to add") {
        return writeToFile();
    }
}



async function engineerQuestions() {
    let engineerData = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
        
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your id number?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter your email address'
            },
            {
                type: 'input',
                name: 'github',
                message: 'please provide your github username'
            }
        ]
    )

    const engineerAnswers = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github)
    team.push(engineerAnswers)

    return employeeQuestions()

}

async function internQuestions() {
    let internData = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
        
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your id number?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter your email address'
            },
            {
                type: 'input',
                name: 'school',
                message: 'please enter school name'
            }
        ]
    )

    const internAnswers = new Intern(internData.name, internData.id, internData.email, internData.school)
    team.push(internAnswers)

    return employeeQuestions()

}


// Function to write the data to the html file and end the application
async function writeToFile() {
    let htmlDoc = render(team);
    await fs.writeFile(outputPath, htmlDoc);
}