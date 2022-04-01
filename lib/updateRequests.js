const inquirer = require("inquirer");
const db = require("./queries");

async function updateRole() {
  const employees = await db.findEmployee();

  const employeeList = employees.map((record) => {
    return record.first_name.concat(" " + record.last_name);
  });

  const roles = await db.findRoles();

  const roleList = roles.map((record) => {
    return record.title;
  });

  const answer = await inquirer.prompt([
    {
      name: "name",
      type: "list",
      message: "Which employee do you want to update?",
      choices: employeeList,
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's updated role?",
      choices: roleList,
    },
  ]);

  const employeeChoice = employees.find(
    (resultEntry) =>
      answer.name === resultEntry.first_name + " " + resultEntry.last_name
  );

  const employeeId = employeeChoice.id;

  const roleRecord = roles.find(
    (resultEntry) => resultEntry.title === answer.role
  );
  const roleId = roleRecord.id;

  await db.updateEmployeeRole(roleId, employeeId);

  console.log(`Updated ${answer.name}'s role in the database.`);
  optionPrompt();
}

module.exports = { updateRole };
