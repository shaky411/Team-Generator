const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.


let team = [];

  // Questions go here!

  async function questions() {
    let data = await inquirer.prompt(
        [{
      type: "list",
      name: "role",
      message: "Select the type of employee you would like to add",
      choices: ["Manager", "Engineer", "Intern", "No more entries"]
    },
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
        message: 'Please enter your office number',
        when(answers) {
            return answers.role === 'Manager';
        },
        validate(value) {
            const pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i 
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid number';

        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Please enter school',
        when(answers) {
            return answers.role === "Intern";
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'please provide your github username',
        when(answers) {
            return answers.role === "Engineer"
        }
    }

]
    )

    
    if (data.role === "Manager") {
        const manager1 = new Manager(data.name, data.id , data.email , data.officeNumber );
        team.push(manager1);
    }

    if (data.role === "Engineer") {
        const engineer1 = new Engineer(data.name, data.id, data.email, data.github);
        team.push(engineer1);
    }

    if (data.role === "Intern") {
        const intern1 = new Intern(data.name, data.id, data.email, data.school);
        team.push(intern1);
    }

    
        


        let htmlDoc = render(team);
        await fs.writeFile(outputPath, htmlDoc);
    
    

  }

  

  questions();




















// The data below was for testing purposes



// startProgram();
// async function startProgram() {
//   // team.push(new Employee("Andrew", 1, "test@test.com"))

//   const manager1 = new Manager("Lee", 007, "marc@test.com", 0745674833);
//   team.push(manager1);

//   const engineer1 = new Engineer("Arnold", 008, "david@test.com", "David_008");
//   team.push(engineer1);

//   const intern1 = new Intern("Jessica", 009, "jessica@test.com", "MIT");
//   team.push(intern1);

 



//   let htmlDoc = render(team);

//   await fs.writeFile(outputPath, htmlDoc);

