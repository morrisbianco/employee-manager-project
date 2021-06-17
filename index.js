const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const asciiart = require('asciiart-logo');
const questions = require('./questions');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'employeeDB',
});

const employeeList = [];
const departmentList = [];
const roleList = [];

const createEmployee = () => {
  const query = connection.query('INSERT INTO employees SET ?',
    employeeList, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} product inserted!\n`);
        connection.end();
    }
);
};

const createDepartment = () => {
  connection.query('INSERT INTO department SET ?',
    (departmentList), (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} product inserted!\n`);
        connection.end();
    }
);
};

const createRole = () => {
  connection.query('INSERT INTO role SET ?',
    roleList, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} product inserted!\n`);
        connection.end();
    }
);
};

const start = () => {
  inquirer.prompt({
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
  }).then((response) => {
    console.log(response);
    if (response === 'VIEW_EMPLOYEES') {
      viewAll();
    } else if (response === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
      viewEmpDepartment();
    } else if (response === 'VIEW_EMPLOYEES_BY_MANAGER') {
      viewEmpManager();
    } else if (response === 'ADD_EMPLOYEE') {
      addEmployee();
    } else if (response === 'REMOVE_EMPLOYEE') {
      removeEmployee();
    } else if (response === 'UPDATE_EMPLOYEE_ROLE') {
      updateEmployeeRole();
    } else if (response === 'UPDATE_EMPLOYEE_MANAGER') {
      updateEmployeeManager();
    } else if (response === 'VIEW_ROLES') {
      viewRoles();
    } else if (response === 'ADD_ROLE') {
      addRole();
    } else if (response === 'REMOVE_ROLE') {
      removeRole();
    } else if (response === 'VIEW_DEPARTMENTS') {
      viewDepartment();
    } else if (response === 'ADD_DEPARTMENT') {
      addDepartment();
    } else if (response === 'REMOVE_DEPARTMENT') {
      removeDepartment();
    } else {
      process.exit();
    }
  })
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's id?",
      name: 'id'
    },
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'first_name'
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'last_name'
    },
    {
      type: 'input',
      message: "What is the employee's role id?",
      name: 'role_id'
    },
    {
      type: 'input',
      message: "What is the manager id?",
      name: 'manager_id'
    }
  ])
    .then((response) => {
      employeeList.push(response);
      createEmployee();
    })
};

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the role's id?",
      name: 'id'
    },
    {
      type: 'input',
      message: "What is the role's title?",
      name: 'title'
    },
    {
      type: 'input',
      message: "What is the role's salary?",
      name: 'salary'
    },
    {
      type: 'input',
      message: "What is the department's id?",
      name: 'department_id'
    },
  ])
    .then((response) => {
      roleList.push(response);
      createRole();
    })
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the department's id?",
      name: 'id'
    },
    {
      type: 'input',
      message: "What is the department's name?",
      name: 'name'
    },
  ])
    .then((response) => {
      departmentList.push(response);
      createDepartment();
    })
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  // start();
  // createDepartment();
  // createRole();
  createEmployee();
});