const inquirer = require("inquirer");
const { appPrompt } = require("./lib/prompt");
require("console.table");

function init() {
  console.log("Employee Manager");
  appPrompt();
}

init();
