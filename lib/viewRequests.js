const inquirer = require("inquirer");
const db = require("./queries");
const cTable = require(`console.table`);

async function viewEmployeesReq() {
  const res = await db.viewEmployees();
  console.table("", res);
  optionPrompt();
}

async function viewDepartmentsReq() {
  const res = await db.viewDepartments();
  console.table("", res);
  optionPrompt();
}

async function viewRolesReq() {
  const res = await db.viewRoles();
  console.table("", res);
  optionPrompt();
}

module.exports = { viewEmployeesReq, viewDepartmentsReq, viewRolesReq };
