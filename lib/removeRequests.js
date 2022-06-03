const inquirer = require("inquirer");
require("console.table");
const { appPrompt } = require("./prompt");
const connection = require("../config/connection");

function removeEmployee() {
  let query = `SELECT
        employee.id, 
        employee.first_name, 
        employee.last_name
    FROM employee`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));
    console.table(res);
    employeeDelete(employee);
  });
}

function employeeDelete(employee) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Employee To Be Deleted: ",
        choices: employee,
      },
    ])
    .then((res) => {
      let query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: res.employee }, (err, res) => {
        if (err) throw err;
        appPrompt();
      });
    });
}

module.exports = { removeEmployee, employeeDelete };
