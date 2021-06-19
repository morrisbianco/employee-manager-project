// Requires for all of my npms and files
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const logo = require('asciiart-logo');
const questions = require('./questions');
const util = require('util');

// Establishes my host, port, username, password, and database
const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'employeeDB',
});

// Allows the Async command to work
connection.query = util.promisify(connection.query);

// Creates my Employee Manager Logo
const logoText = logo({ name: "Employee// Manager//" }).render();

console.log(logoText);

// This function updates the role by inserting the question response into role_id at the employee's id
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

// This function updates the manager by inserting the question response into manager_id at the employee's id
const updateManager = (data) => {
  connection.query(
    'UPDATE employees SET ? WHERE ?', [
      {
        manager_id: data.manager_id
      },
      {
        id: data.employee
      }],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} manager updated!\n`);
      start();
    }
  );
};

// This function views the employees of certain managers by pulling the full names of the employees and viewing them by the manager_id
const viewEmployeeByManager = (data) => {
  connection.query('SELECT first_name, last_name FROM employees WHERE manager_id = ?', data.id,
   (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// This function views the employees of certain departments by pulling the full names of the employees and viewing them by their department
const viewEmpDepartment = () => {
  connection.query(`SELECT name, first_name, last_name FROM department 
  INNER JOIN role ON department.id = role.department_id 
  INNER JOIN employees ON role.id = employees.role_id`, 
   (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// This function views the all employees by inner joining their full names, role titles, salaries, and department name of the employees
const viewEmployees = () => {
  connection.query(`SELECT first_name, last_name, manager_id, title, salary, name 
  FROM employees INNER JOIN role ON employees.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id`, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// This function views all info of the department table
const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// This function views all info of the role table
const viewRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// This function creates an employee from the data provided by the questions
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

// This function creates a department from the data provided by the questions
const createDepartment = (data) => {
  connection.query('INSERT INTO department SET ?',
    data, (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} deparment created!\n`);
      start();
    }
  );
};

// This function creates a role from the data provided by the questions
const createRole = (data) => {
  connection.query('INSERT INTO role SET ?',
    data, (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} role created!\n`);
      start();
    }
  );
};

// This function deletes a department
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

// This function deletes an employee
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

// This function deletes a role
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

// This function starts the program and calls the appropiate functions by the response of the user
const start = () => {
  inquirer.prompt(questions.questions)
  .then(({ questions }) => {
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

// This function provides the data for adding an employee
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

// This function provides the data for adding a role
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

// This function provides the data for adding a department
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

// This function provides the data for updating an employee's role
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

// This function provides the data for updating an employee's manager
const updateEmployeeManager = async () => {
  const query = await connection.query(
    'SELECT * FROM employees');
  const empChoices = query.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
  const query2 = await connection.query(
    'SELECT * FROM employees');
  const managerChoices = query2.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
  inquirer.prompt([
    {
      type: 'list',
      message: "Which employee would you like to update?",
      name: 'employee',
      choices: empChoices
    },
    {
      type: 'list',
      message: "Who should be the new manager?",
      name: 'manager_id',
      choices: managerChoices
    }
  ]).then((response) => {
    updateManager(response);
  })
};

// This function provides the data for deleting a department
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

// This function provides the data for deleting a role
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

// This function provides the data for deleting an employee
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

// This function provides the data for viewing employees by their manager
const viewEmpManager = async () => {
  const query = await connection.query(
    'SELECT * FROM employees');
  const managerChoices = query.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
  inquirer.prompt([
    {
      type: 'list',
      message: "Which manager's employees would you like to see?",
      name: 'id',
      choices: managerChoices
    }
  ]).then((response) => {
    viewEmployeeByManager(response);
  })
}

// this function connects the database and calls the start of the program 
connection.connect((err) => {
  if (err) throw err;
  start();
});