use employeeDB;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Rachel', 'Wright', 1, 4),
('Tom', 'Wells', 1, 4),
('Irene', 'Smith', 1, 4),
('Morris', 'Bianco', 3, 3),
('Nathaniel', 'Wilson', 3, 3),
('Sofia', 'Rodriguez', 3, 3),
('Roy', 'Halladay', 4, 2),
('Michael', 'Buckner', 4, 2),
('Claire', 'Buckner', 4, 2),
('Kyle', 'Phillips', 2, 1),
('Greg', 'Fowler', 2, 1),
('Susan', 'Lewis', 2, 1);

INSERT INTO department (name)
VALUES ('Accounting'),
('Sales'),
('Custodial'),
('Network');

INSERT INTO role (title, salary, department_id)
VALUES ('Accounting Manager', 96000, 2),
('Network Manager', 116000, 3),
('Custodial Manager', 66000, 4),
('Sales Manager', 106000, 1);

SELECT * FROM employees;