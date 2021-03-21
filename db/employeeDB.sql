DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    
);
CREATE TABLE department (
    id INT NOT NULL,
    department VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
    PRIMARY KEY (id)
    
);