var figlet = require('figlet');
const inquirer = require('inquirer');
const add = require('./functions/add');
const view = require('./functions/view');
const remove = require('./functions/remove');
const connection = require('./connection/server');
require('console.table');

//generates fancy text upon npm start for flair
figlet('Employee Tracker', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//testing basic connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    tableDisplay();
});

//generating 'view all employees' table query upon npm start for easy display
function tableDisplay() {
    let sql = 'SELECT employees.id, employees.first_name, employees.last_name, department.department, role.title, role.salary, manager_id FROM employees INNER JOIN role ON employees.role_id=role.id INNER JOIN department ON department.id=role.department_id';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table("\n", rows);
        runInquiry();
    });
}

//run main inquire prompt for main DB choices
function runInquiry () {

    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'View all Roles',
            'View all Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Remove Employee',
            'Edit Employee',
            'Quit'
        ]
    }).then(async (answer) => {

        //looking through choices of answer to determine function
        switch (answer.choice) {
            case 'View all Employees':
                view.viewEmployees();
                pause();
                break;
            case 'View all Roles':
                view.viewRoles();
                pause();
                break;
            case 'View all Departments':
                view.viewDepartments();
                pause();
                break;
            case 'Add Employee':
                add.addEmployee();
                pause();
                break;
            case 'Add Role':
                add.addRole();
                pause();
                break;
            case 'Add Department':
                add.addDepartment();
                pause();
                break;
            case 'Remove Employee':
                remove.removeEmployee();
                pause();
                break;
            case 'Edit Employee':
                remove.editEmployee();
                pause();
                break;
            case 'Quit':
                connection.end();
                break;
        }
    })
}

//function allowing brief catchup of inquiry function as to not overlap command prompt text
function pause() {
    setTimeout( () => {runInquiry()}, 500);
};

//exporting inquire function
module.exports = { runInquiry };