const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./config");
const questions = require("./db/questions");
const Queries = require("./db/index");
const cTable = require("console.table");

function Choices() {
  inquirer.prompt(questions.choices).then((answer) => {
    switch (answer.continue) {
      case "View all departments":
        Queries.GetAllDepartments().then((data) => {
          console.table(data);
          Choices();
        });
        break;
      case "Add a department":
        AddDepartment();
        break;
      case "View all roles":
        Queries.GetAllRoles().then((data) => {
          console.table(data);
          Choices();
        });
        break;
      case "Add a Role":
        AddRole();
        break;
      case "View all employees":
        Queries.GetAllEmployees().then((data) => {
          console.table(data);
          Choices();
        });
        break;
      case "Add an employee":
        AddEmployee();
        break;
      case "Update an employee role":
        UpdateEmployeeRole();
        break;
      case "QUIT":
        process.exit();
        break;
    }
  });
}

function AddDepartment() {
  inquirer.prompt(questions.addDepartment).then((answer) => {
    const newDepartment = {
      name: answer.name,
    };
    Queries.AddDepartment(newDepartment);
    Choices();
  });
}

function AddRole() {
  Queries.GetDepartmentNames().then((data) => {
    const names = data;
    inquirer.prompt(questions.addRole).then((answer) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "name",
            message: "What department is the new role a part of?",
            choices: names,
          },
        ])
        .then((department) => {
          Queries.GetDepartmentIdByName(department.name).then((data) => {
            const newRole = {
              title: answer.title,
              salary: answer.salary,
              department_id: data[0].id,
            };
            Queries.AddRole(newRole);
            Choices();
          });
        });
    });
  });
}

function AddEmployee() {
  Queries.GetEmployeeNames().then((data) => {
    const employeeNames = data;
    Queries.GetRoleNames().then((roles) => {
      const roleNames = roles;
      inquirer.prompt(questions.addEmployee).then((answer) => {
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What role is the employee?",
              choices: roleNames,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is their manager?",
              choices: employeeNames,
            },
          ])
          .then((names) => {
            Queries.GetRoleIdByName(names.role).then((roleId) => {
              const nameArr = names.manager.split(" ");
              Queries.GetEmployeeIdByName(nameArr[0], nameArr[1]).then(
                (managerId) => {
                  const newEmployee = {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId[0].id,
                    manager_id: managerId[0].id,
                  };
                  Queries.AddEmployee(newEmployee);
                  Choices();
                }
              );
            });
          });
      });
    });
  });
}

function UpdateEmployeeRole() {
  Queries.GetEmployeeNames().then((employees) => {
    Queries.GetRoleNames().then((roles) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select an employee to update",
            choices: employees,
          },
          {
            type: "list",
            name: "role",
            message: "Select an new role for the employee",
            choices: roles,
          },
        ])
        .then((answers) => {
          Queries.GetRoleIdByName(answers.role).then((roleId) => {
            const nameArr = answers.employee.split(" ");
            Queries.GetEmployeeIdByName(nameArr[0], nameArr[1]).then(
              (employeeId) => {
                const updatedEmployee = {
                  role_id: roleId[0].id,
                };
                Queries.UpdateEmployeeRole(updatedEmployee, employeeId[0].id);
                Choices();
              }
            );
          });
        });
    });
  });
}

Choices();
