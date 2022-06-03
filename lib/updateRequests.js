const inquirer = require("inquirer");
const { appPrompt } = require("./prompt");
require("console.table");

function updateEmployeeRole() {
  let query = `SELECT 
                  employee.id,
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  department.name, 
                  role.salary, 
                  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              JOIN role
                  ON employee.role_id = role.id
              JOIN department
                  ON department.id = role.department_id
              JOIN employee manager
                  ON manager.id = employee.manager_id`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));
    console.table(res);
    updateRole(employee);
  });
}

function updateRole(employee) {
  let query = `SELECT 
    role.id, 
    role.title, 
    role.salary 
  FROM role`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    let roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));
    console.table(res);
    getUpdatedRole(employee, roleChoices);
  });
}

function getUpdatedRole(employee, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Employee who's role will be Updated: `,
        choices: employee,
      },
      {
        type: "list",
        name: "role",
        message: "Select New Role: ",
        choices: roleChoices,
      },
    ])
    .then((res) => {
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`;
      connections.query(query, [res.role, res.employee], (err, res) => {
        if (err) throw err;
        appPrompt();
      });
    });
}

module.exports = { updateEmployeeRole, updateRole, getUpdatedRole };
