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
        runInquire();
    });

}


//run main inquire prompt for main DB choices
function runInquire () {

    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'View all Employees by Role',
            'View all Employees by Department',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Remove Employee',
            'Edit Employee Role',
            'Quit'
        ]

    }).then(async (answer) => {
        switch (answer.choice) {
            case 'View all Employees':
                view.viewEmployees();
                pause();
                break;
            case 'View all Employees by Role':
                view.viewRoles();
                pause();
                break;
            case 'View all Employees by Department':
                view.viewDepartments();
                pause();
                break;
            case 'Add Employee':
                add.addEmployee();
                break;
            case 'Add Role':
                add.addRole();
                break;
            case 'Add Department':
                add.addDepartment();
                break;
            case 'Remove Employee':
                remove.removeEmployee();
                break;
            case 'Edit Employee Role':
                remove.editEmployee();
                break;
            case 'Quit':
                connection.end();
                break;
        }
    })
}

function pause() {
    setTimeout( () => {runInquire();
    }, 500);
};


module.exports = { runInquire };