use employeeDB;

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Rachel', 'Wright', 1, 4576),
(2, 'Tom', 'Wells', 2, null),
(3, 'Irene', 'Smith', 3, 2497),
(4, 'Morris', 'Bianco', 4, null),
(5, 'Nathaniel', 'Wilson', 5, 8734),
(6, 'Sofia', 'Rodriguez', 6, null),
(7, 'Roy', 'Halladay', 7, 9374),
(8, 'Michael', 'Buckner', 8, null),
(9, 'Claire', 'Buckner', 8, null),
(10, 'Kyle', 'Phillips', 9, 2389),
(11, 'Greg', 'Fowler', 10, null),
(12, 'Susan', 'Lewis', 11, null);

SELECT * FROM employees;