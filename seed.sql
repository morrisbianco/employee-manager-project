use employeeDB;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Rachel', 'Wright', 1, 4576),
('Tom', 'Wells', 2, 23),
('Irene', 'Smith', 3, 2497),
('Morris', 'Bianco', 4, 34),
('Nathaniel', 'Wilson', 5, 8734),
('Sofia', 'Rodriguez', 6, 347),
('Roy', 'Halladay', 7, 9374),
('Michael', 'Buckner', 8, 8247),
('Claire', 'Buckner', 8, 234),
('Kyle', 'Phillips', 9, 2389),
('Greg', 'Fowler', 10, 23),
('Susan', 'Lewis', 11, 234);

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