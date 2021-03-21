-- creating role templates
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 80000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Salesperson", 60000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Legal Team Lead", 90000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Lawer", 100000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Accountant", 70000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Lead Engineer", 100000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Software Engineer", 80000, 4);

-- creating department templates
INSERT INTO department (id, name) VALUES (1, "Sales");
INSERT INTO department (id, name) VALUES (2, "Legal");
INSERT INTO department (id, name) VALUES (3, "Finance");
INSERT INTO department (id, name) VALUES (4, "Engineering");

-- creating employee templates with sample data
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jace", "Beleren", 1, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Chandra", "Nalar", 2, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Giddeon", "Jura", 3, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Garruk", "Wildspeaker", 4, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Liliana", "Vess", 5, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Ral", "Zarek", 6, NULL);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Sorin", "Markov", 7, 6);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Nicol", "Bolas", 7, 6);