const inquirer = require("inquirer");
const appPrompt = require("./prompt");
require("console.table");
const connection = require("../config/connection");

function addEmployee() {
  let query = `SELECT 
      role.id, 
      role.title, 
      role.salary 
  FROM role`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const role = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    employeeRoles(role);
  });
}

function employeeRoles(role) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Employee First Name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Employee Last Name: ",
      },
      {
        type: "list",
        name: "roleId",
        message: "Employee Role: ",
        choices: role,
      },
    ])
    .then((res) => {
      let query = `INSERT INTO employee SET ?`;
      connection.query(
        query,
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.roleId,
        },
        (err, res) => {
          if (err) throw err;
          firstPrompt();
        }
      );
    });
}

function addRole() {
  var query = `SELECT 
    department.id, 
    department.name, 
    role.salary
  FROM employee
  JOIN role
    ON employee.role_id = role.id
  JOIN department
    ON department.id = role.department_id
  GROUP BY department.id, department.name`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const department = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));
    console.table(res);
    addToRole(department);
  });
}

function addToRole(department) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: ",
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department,
      },
    ])
    .then((res) => {
      let query = `INSERT INTO role SET ?`;

      connection.query(
        query,
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department,
        },
        (err, res) => {
          if (err) throw err;
          appPrompt();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Department Name: ",
      },
    ])
    .then((res) => {
      let query = `INSERT INTO department SET ?`;
      connection.query(query, { name: res.name }, (err, res) => {
        if (err) throw err;
        appPrompt();
      });
    });
}

module.exports = {
  addEmployee,
  employeeRoles,
  addDepartment,
  addRole,
  addToRole,
};
