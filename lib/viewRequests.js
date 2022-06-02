const inquirer = require("inquirer");
require("console.table");
const appPrompt = require("./prompt");
const connection = require("../config/connection");

function viewEmployeesReq() {
  let query = `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  LEFT JOIN employee manager
      ON manager.id = employee.manager_id`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    appPrompt();
  });
}

function viewEmployeesByDepReq() {
  let query = `SELECT 
      department.id, 
      department.name, 
      role.salary
  FROM employee
  LEFT JOIN role 
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  GROUP BY department.id, department.name, role.salary`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const deptChoices = res.map((choices) => ({
      value: choices.id,
      name: choices.name,
    }));
    console.table(res);
    getDept(deptChoices);
  });
}

function getDept(deptChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Departments: ",
        choices: deptChoices,
      },
    ])
    .then((res) => {
      let query = `SELECT 
                      employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name
                  FROM employee
                  JOIN role
                      ON employee.role_id = role.id
                  JOIN department
                      ON department.id = role.department_id
                  WHERE department.id = ?`;

      connection.query(query, res.department, (err, res) => {
        if (err) throw err;
        appPrompt();
        console.table(res);
      });
    });
}

module.exports = { viewEmployeesReq, viewEmployeesByDepReq };
