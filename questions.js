// This script file provides the questions for the program menu
const questions =
{
  type: 'list',
  message: 'Welcome to the Employee Manager, what would you like to do?',
  name: 'questions',
  choices: [
    {
      name: "View All Employees",
      value: "VIEW_EMPLOYEES"
    },
    {
      name: "View All Employees By Department",
      value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
    },
    {
      name: "View All Employees By Manager",
      value: "VIEW_EMPLOYEES_BY_MANAGER"
    },
    {
      name: "Add Employee",
      value: "ADD_EMPLOYEE"
    },
    {
      name: "Remove Employee",
      value: "REMOVE_EMPLOYEE"
    },
    {
      name: "Update Employee Role",
      value: "UPDATE_EMPLOYEE_ROLE"
    },
    {
      name: "Update Employee Manager",
      value: "UPDATE_EMPLOYEE_MANAGER"
    },
    {
      name: "View All Roles",
      value: "VIEW_ROLES"
    },
    {
      name: "Add Role",
      value: "ADD_ROLE"
    },
    {
      name: "Remove Role",
      value: "REMOVE_ROLE"
    },
    {
      name: "View All Departments",
      value: "VIEW_DEPARTMENTS"
    },
    {
      name: "Add Department",
      value: "ADD_DEPARTMENT"
    },
    {
      name: "Remove Department",
      value: "REMOVE_DEPARTMENT"
    },
    {
      name: "Quit",
      value: "QUIT"
    }
  ]
}

// This code exports the questions
module.exports = {
  questions,
}