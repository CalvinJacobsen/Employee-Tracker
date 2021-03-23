const connection = require('../connection/server');
require('console.table');

//viewing all employees
const viewEmployees = () => {
    let sql = 'SELECT employees.id, employees.first_name, employees.last_name, department.department, role.title, role.salary, manager_id FROM employees INNER JOIN role ON employees.role_id=role.id INNER JOIN department ON department.id=role.department_id';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table("\n", rows, "\n");
    });
}

//viewing all available roles
const viewRoles = () => {
    let sql = 'SELECT title, salary FROM role';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table("\n", rows, "\n");
    });
}

//viewing all available departments
const viewDepartments = () => {
    let sql = 'SELECT department FROM department';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table("\n", rows, "\n");
    });
}

module.exports = { viewEmployees, viewRoles, viewDepartments };
