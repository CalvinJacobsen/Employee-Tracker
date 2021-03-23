const inquirer = require("inquirer");
const connection = require("../connection/server");
const index = require('../index');
require('mysql');

function addEmployee() {

    //gather titles into array from available roles
    let sql = 'SELECT title FROM role';
    connection.query(sql, function (err, rows) {
        if (err) throw (err);
        const titleArray = rows.map((role) => {
            return role.title;
        });

        let sql = 'SELECT first_name FROM employees';
        connection.query(sql, function (err, rows) {
            if (err) throw (err);
            const managersArray = rows.map((employees) => {
                return employees.first_name;
            });
            //adding null option to manager array
            managersArray.push('X None')

            inquirer.prompt([
                {
                    name: 'newEmpFirstName',
                    type: 'input',
                    message: 'What is this Employees First Name?',
                },
                {
                    name: 'newEmpLastName',
                    type: 'input',
                    message: 'What is this Employees Last Name?',
                },
                {
                    name: 'newEmpTitle',
                    type: 'list',
                    message: 'What is this Employees Title?',
                    choices: titleArray,
                },
                {
                    name: 'newEmpMan',
                    type: 'list',
                    message: 'Who is this employee\'s manager?',
                    choices: managersArray,
                }

            ]).then((data) => {

                //lets make sure our new employees first and last name are properly capitalized
                const firstName = data.newEmpFirstName[0].toUpperCase() + data.newEmpFirstName.substring(1);
                const lastName = data.newEmpLastName[0].toUpperCase() + data.newEmpLastName.substring(1);

                //setting none chosen value to null if aplicable
                if (data.managersArray == 'X None') {
                    data.managersArray = 'NULL';
                }
                //getting manager id of chosen manager
                let sql = "SELECT id FROM employees WHERE first_name='" + data.newEmpMan + "'";
                connection.query(sql, (err, managerId) => {
                    if (err) throw (err);
                    
                    //getting role id of chosen title
                    sql = "SELECT id FROM role WHERE title='" + data.newEmpTitle + "'";
                    connection.query(sql, (err, titleId) => {
                        if (err) throw (err);
                        
                        //inserting employee values into sql employees table as new employee
                        sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('" + firstName + "', '" + lastName + "', " + titleId[0].id + ", " + managerId[0].id + ")";
                        connection.query(sql, (err) => {
                            if (err) throw (err);
                            console.log(firstName+" "+lastName+" was added to the database!");
                        });
                    });
                });
            });
        });
    });
};


function addRole() {
     
}

function addDepartment() {
    
}

//exporting functions
module.exports = { addEmployee, addRole, addDepartment };

