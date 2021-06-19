const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const logo = require('asciiart-logo');
const questions = require('./questions');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'employeeDB',
});

connection.query = util.promisify(connection.query);

const logoText = logo({ name: "Employee// Manager//" }).render();

console.log(logoText);

const updateRole = (data) => {
  connection.query(
    'UPDATE employees SET ? WHERE ?', [
    {
      role_id: data.role_id
    },
    {
      id: data.employee
    }],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} role updated!\n`);
      start();
    }
  );
};

// const updateManager = (data) => {
//   console.log(data.first_name);
//   console.log(data.last_name);
//   connection.query(
//     'UPDATE employees SET ? WHERE ? and ?', (`first_name: ${data.first_name}`,`last_name: ${data.last_name}`, data.manager_id),
//     (err, res) => {
//       if (err) throw err;
//       console.log(`${res.affectedRows} manager updated!\n`);
//       start();
//     }
//   );
// };

const viewEmpDepartment = () => {
  connection.query(`SELECT name, first_name, last_name FROM department 
  INNER JOIN role ON department.id = role.department_id 
  INNER JOIN employees ON role.id = employees.role_id`, 
   (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

const viewEmployees = () => {
  connection.query(`SELECT first_name, last_name, manager_id, title, salary, name 
  FROM employees INNER JOIN role ON employees.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id`, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const createEmployee = (data) => {
  console.log(data);
  connection.query('INSERT INTO employees SET ?',
    data, (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} employee added!\n`);
      start();
    }
  );
};

const createDepartment = (data) => {
  connection.query('INSERT INTO department SET ?',
    data, (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} deparment created!\n`);
      start();
    }
  );
};

const createRole = (data) => {
  connection.query('INSERT INTO role SET ?',
    data, (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} role created!\n`);
      start();
    }
  );
};

const deleteDepartment = (data) => {
  connection.query(
    'DELETE FROM department WHERE ?', data,
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} department deleted!\n`);
      start();
    }
  );
};

const deleteEmployee = (data) => {
  connection.query(
    'DELETE FROM employees WHERE ?', data,
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} employee deleted!\n`);
      start();
    }
  );
};

const deleteRole = (data) => {
  connection.query(
    'DELETE FROM role WHERE ?', data,
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} role deleted!\n`);
      start();
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
  }).then(({ questions }) => {
    console.log(questions);
    if (questions === 'VIEW_EMPLOYEES') {
      viewEmployees();
    } else if (questions === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
      viewEmpDepartment();
    } else if (questions === 'VIEW_EMPLOYEES_BY_MANAGER') {
      viewEmpManager();
    } else if (questions === 'ADD_EMPLOYEE') {
      addEmployee();
    } else if (questions === 'REMOVE_EMPLOYEE') {
      removeEmployee();
    } else if (questions === 'UPDATE_EMPLOYEE_ROLE') {
      updateEmployeeRole();
    } else if (questions === 'UPDATE_EMPLOYEE_MANAGER') {
      updateEmployeeManager();
    } else if (questions === 'VIEW_ROLES') {
      viewRoles();
    } else if (questions === 'ADD_ROLE') {
      addRole();
    } else if (questions === 'REMOVE_ROLE') {
      removeRole();
    } else if (questions === 'VIEW_DEPARTMENTS') {
      viewDepartment();
    } else if (questions === 'ADD_DEPARTMENT') {
      addDepartment();
    } else if (questions === 'REMOVE_DEPARTMENT') {
      removeDepartment();
    } else {
      process.exit();
    }
  })
};

const addEmployee = async () => {
  const query = await connection.query(
    'SELECT * FROM role');
  const roleChoices = query.map(({ title, id }) => ({ name: title, value: id }));
  const query2 = await connection.query(
    'SELECT * FROM employees');
  const managerChoices = query2.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
  inquirer.prompt([
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
      type: 'list',
      message: "What is the employee's role id?",
      name: 'role_id',
      choices: roleChoices
    },
    {
      type: 'list',
      message: "What is the manager id?",
      name: 'manager_id',
      choices: managerChoices
    }
  ])
    .then((response) => {
      createEmployee(response);
    })
};

const addRole = () => {
  inquirer.prompt([
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
      createRole(response);
    })
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the department's name?",
      name: 'name'
    },
  ])
    .then((response) => {
      createDepartment(response);
    })
};

const updateEmployeeRole = async () => {
  const query = await connection.query(
    'SELECT * FROM employees');
  const empChoices = query.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
  inquirer.prompt([
    {
      type: 'list',
      message: "Which employee's role would you like to update?",
      name: 'employee',
      choices: empChoices
    },
    {
      type: 'input',
      message: "What is the new role's id?",
      name: 'role_id'
    }
  ]).then((response) => {
    updateRole(response);
  })
};

const updateEmployeeManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's new manager's id?",
      name: 'manager_id'
    },
    {
      type: 'input',
      message: "What is the current manager's first name?",
      name: 'first_name'
    },
    {
      type: 'input',
      message: "What is the current manager's last name?",
      name: 'last_name'
    }
  ]).then((response) => {
    updateManager(response);
  })
};

const removeDepartment = async () => {
  const query = await connection.query(
    'SELECT * FROM department');
  const deptChoices = query.map(({ name, id }) => ({ name: name, value: id }));
  inquirer.prompt([
    {
      type: 'list',
      message: "Which department would you like to delete?",
      name: 'id',
      choices: deptChoices
    }
  ]).then((response) => {
    deleteDepartment(response);
  })
};

const removeRole = async () => {
  const query = await connection.query(
    'SELECT * FROM role');
  const roleChoices = query.map(({ title, id }) => ({ name: title, value: id }));
  inquirer.prompt([
    {
      type: 'list',
      message: "Which role would you like to delete?",
      name: 'id',
      choices: roleChoices
    }
  ]).then((response) => {
    deleteRole(response);
  })
};

const removeEmployee = async () => {
  const query = await connection.query(
    'SELECT * FROM employees');
  const empChoices = query.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
  inquirer.prompt([
    {
      type: 'list',
      message: "Which employee would you like to delete?",
      name: 'id',
      choices: empChoices
    }
  ]).then((response) => {
    deleteEmployee(response);
  })
};

connection.connect((err) => {
  if (err) throw err;
  start();
});