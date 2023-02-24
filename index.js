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

class Questions {
  constructor() {
    this.teamArr = [];
  }

  getTeamArr() {
    return this.teamArr;
  }

  // Questions go here!

  questions() {
    inquirer.prompt({
      type: "",
      name: "",
      message: "",
      choices: [],
    });
  }
}


// The data below was for testing purposes

let team = [];

startProgram();
async function startProgram() {
  // team.push(new Employee("Andrew", 1, "test@test.com"))

  const manager1 = new Manager("Marc", 007, "marc@test.com", 0745674833);
  team.push(manager1);

  const engineer1 = new Engineer("Arnold", 008, "david@test.com", "David_008");
  team.push(engineer1);

  const intern1 = new Intern("Jessica", 009, "jessica@test.com", "MIT");
  team.push(intern1);

  // const intern1 = new Intern()
  // team.push(manager1);

  //  Use FS.write to write the following to file
  let htmlDoc = render(team);

  await fs.writeFile(outputPath, htmlDoc);
}
