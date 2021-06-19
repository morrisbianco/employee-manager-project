/* This sql fills out the databases with employees, roles, and departments */
use employeeDB;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Rachel', 'Wright', 1, 0),
('Tom', 'Wells', 2, 1),
('Irene', 'Smith', 3, 2),
('Roy', 'Halladay', 4, 3),
('Nathaniel', 'Wilson', 4, 3),
('Sofia', 'Rodriguez', 5, 2),
('Morris', 'Bianco', 6, 6),
('Kyle', 'Phillips', 6, 6),
('Greg', 'Fowler', 6, 6),
('Susan', 'Lewis', 7, 2),
('Michael', 'Buckner', 8, 10),
('Claire', 'Buckner', 8, 10);

INSERT INTO department (name)
VALUES ('Executive'),
('Accounting'),
('Network'),
('Custodial');

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 160000, 1),
('COO', 140000, 1),
('Accounting Manager', 106000, 2),
('Accountant', 68000, 2),
('Network Manager', 116000, 3),
('Network Engineer', 75000, 3),
('Custodial Manager', 66000, 4),
('Custodian', 36000, 4);

SELECT * FROM employees;
SELECT * FROM role;
SELECT * FROM department;