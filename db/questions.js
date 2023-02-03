const db = require("../config");
const Queries = require("./index");

const questions = {
  choices: [
    {
      type: "list",
      name: "continue",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add a department",
        "View all roles",
        "Add a Role",
        "View all employees",
        "Add an employee",
        "Update an employee role",
        "QUIT",
      ],
    },
  ],
  addDepartment: [
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    },
  ],
  addRole: [
    {
      type: "input",
      name: "title",
      mesage: "What is the name of the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role?",
    },
  ],
  addEmployee: [
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee",
    },
  ],
};

module.exports = questions;
