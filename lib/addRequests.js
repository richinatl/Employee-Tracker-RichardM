const inquirer = require("inquirer");
const db = require("./queries");

async function addEmployee() {
  const roles = await db.findRoles();

  const roleList = roles.map((record) => {
    return record.title;
  });

  const employees = await db.findEmployee();

  const employeeList = employees.map((record) => {
    return record.first_name.concat(" " + record.last_name);
  });

  employeeList.unshift("None");

  const answer = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is their first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is their last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is their role?",
      choices: roleList,
    },
    {
      name: "manager",
      type: "list",
      message: "What is the manager's name?",
      choices: employeeList,
    },
  ]);

  let managerId;
  if (answer.manager !== "None") {
    const managerRecord = employees.find(
      (resultEntry) =>
        answer.manager === resultEntry.first_name + " " + resultEntry.last_name
    );

    managerId = managerRecord.id;
  }
  const roleRecord = roles.find(
    (resultEntry) => resultEntry.title === answer.role
  );
  const roleId = roleRecord.id;

  await db.addEmployee(answer.firstName, answer.lastName, roleId, managerId);

  console.log(`Added ${answer.firstName} to the database.`);
  optionPrompt();
}

async function addDepartment() {
  const answer = await inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department would you like to add?",
  });

  const res = await db.addDepartment(answer.department);

  console.log(`Added ${answer.department} to the the database.`);
  optionPrompt();
}

async function addRole() {
  const answer = await inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "What role would you like to add?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for that role?",
    },
  ]);

  const res = await db.addRole(answer.role, answer.salary);
  console.log(`Added ${answer.role} to the the database.`);
  optionPrompt();
}

module.exports = { addEmployee, addDepartment, addRole };
