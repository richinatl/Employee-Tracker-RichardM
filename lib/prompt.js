const inquirer = require("inquirer");
const { viewEmployeesReq, viewEmployeesByDepReq } = require("./viewRequests");
const {
  updateEmployeeRole,
  updateRole,
  getUpdatedRole,
} = require("./updateRequests");
const {
  addEmployee,
  employeeRoles,
  addDepartment,
  addRole,
  addToRole,
} = require("./addRequests");
const { removeEmployee, employeeDelete } = require("./removeRequests");

function appPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees By Department",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((res) => {
      console.log(res.userChoice);
      switch (res.userChoice) {
        case "View All Employees":
          viewEmployeesReq();
          break;
        case "View Employees By Department":
          viewEmployeesByDepReq();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          connection.end();
          break;
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

module.exports = { appPrompt };
