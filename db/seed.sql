-- inserting data into role templates
INSERT INTO role ( title, salary, department_id)
VALUES ("Sales Lead", 80000, 1);
INSERT INTO role ( title, salary, department_id)
VALUES ("Salesperson", 60000, 1);
INSERT INTO role ( title, salary, department_id)
VALUES ("Legal Team Lead", 90000, 2);
INSERT INTO role ( title, salary, department_id)
VALUES ("Lawer", 100000, 2);
INSERT INTO role ( title, salary, department_id)
VALUES ("Accountant", 70000, 3);
INSERT INTO role ( title, salary, department_id)
VALUES ("Lead Engineer", 100000, 4);
INSERT INTO role ( title, salary, department_id)
VALUES ("Software Engineer", 80000, 4);

-- inserting data into department templates
INSERT INTO department (department) VALUES ("Sales");
INSERT INTO department (department) VALUES ("Legal");
INSERT INTO department ( department) VALUES ("Finance");
INSERT INTO department ( department) VALUES ("Engineering");

-- inserting data into employee templates
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jace", "Beleren", 1, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Chandra", "Nalar", 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Giddeon", "Jura", 3, NULL);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ("Garruk", "Wildspeaker", 4, 3);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ("Liliana", "Vess", 5, NULL);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ("Ral", "Zarek", 6, NULL);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ("Sorin", "Markov", 7, 6);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ("Nicol", "Bolas", 7, 6);