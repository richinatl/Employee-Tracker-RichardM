const inquirer = require("inquirer");
const db = require("./queries");
const cTable = require(`console.table`);

async function viewEmployees() {
  const res = await db.viewAllEmployees();
  console.table("", res);
  optionPrompt();
}

async function viewDepartments() {
  const res = await db.viewAllDepartments();
  console.table("", res);
  optionPrompt();
}

async function viewRoles() {
  const res = await db.viewAllRoles();
  console.table("", res);
  optionPrompt();
}

module.exports = { viewEmployees, viewDepartments, viewRoles };
