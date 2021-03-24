const inquirer = require("inquirer");
const connection = require("../connection/server");
require("mysql");

const removeEmployee = () => {

    //selecting list of employees by name
    let sql = 'SELECT employees.first_name FROM employees';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        const empArray = rows.map((employees) => {
            return employees.first_name;
        });

        inquirer.prompt(
            {
                type: "list",
                name: "empRemove",
                message: "What is the name of the employee that you want to remove?",
                choices: empArray,
            }
        ).then((answer) => {

            //finding the employees id
            sql = "SELECT id FROM employees WHERE first_name='" + answer.empRemove + "'";
            connection.query(sql, (err, value) => {
                if (err) throw ('no employee found with that value');
                
                //finding where that employees id falls in the manager role and deleting them from their
                sql = "UPDATE employees SET manager_id=null WHERE manager_id="+value[0].id;
                connection.query(sql, (err) => {
                    if (err) throw err;
                });
            });

            //fully deleting that employee form the database
            sql = "DELETE FROM employees WHERE first_name='" + answer.empRemove + "'";
            connection.query(sql, (err, row) => {
                if (err) throw err;
                console.log("Employee "+answer.empRemove+" removed from the database!")
            });
        });
    });
};

const editEmployee = () => {

    //selecting array of first names from employees table
    let sql = 'SELECT first_name FROM employees';
    connection.query(sql, (err, rows) => {
        if (err) throw ('employees table not found');
        const empArray = rows.map((employees) => {
            return employees.first_name;
        });

        //selecting array of titles from roles table
        let sql = 'SELECT title FROM role';
        connection.query(sql, (err, rows) => {
            if (err) throw ('role table not found');
            const roleArray = rows.map((role) => {
                return role.title;
            });

            inquirer.prompt(
                {
                    type: "list",
                    name: "empToEdit",
                    message: "What is the name of the employee that you want to edit?",
                    choices: empArray,
                },
                {
                    type: "list",
                    name: "empEditChoice",
                    message: "What would you like to edit about the employee?",
                    choices: ['first_name', 'last_name', 'role', 'manager']
                },
                {
                    type: "input",
                    name: "empEditFirstName",
                    message: "What is this employees new First Name?",
                    when: (answers) => answers.empEditChoice == 'first_name',
                },
                {
                    type: "input",
                    name: "empEditLastName",
                    message: "What is this employees new Last Name?",
                    when: (answers) => answers.empEditChoice == 'last_name',
                },
                {
                    type: "list",
                    name: "empEditRole",
                    message: "What is this employees new Role?",
                    choices: roleArray,
                    when: (answers) => answers.empEditChoice == 'role',
                },
                {
                    type: "list",
                    name: "empEditManager",
                    message: "What is this employees new Manager?",
                    choices: empArray,
                    when: (answers) => answers.empEditChoice == 'manager',
                }
            ).then((answers) => {

                //return the id of the selected employee
                let sql = "SELECT id FROM employees WHERE first_name='" + answers.empRemove + "'";
                connection.query(sql, (err, id) => {
                    if (err) throw err;

                    //switch for choosing what category to edit for the employee in
                    switch (answers.empEditChoice) {

                        //chose to edit first_name option running query to input new name into chosen employee field
                        case "first_name":
                            let sql = "UPDATE employees SET first_name = '" + answers.empEditFirstName + "' WHERE employees.id=" + id[0].id;
                            connection.query(sql, (err) => {
                                if (err) throw err;
                            });
                            break;

                        //chose to edit last_name option running query to input new last name into chosen emp field
                        case "last_name":
                            sql = "UPDATE employees SET last_name = '" + answers.empEditLastName + "' WHERE employees.id=" + id;
                            connection.query(sql, (err) => {
                                if (err) throw err;
                            });
                            break;
                            
                        //chose to edit role option running query to input new role into chosen emp field
                        case "role":
                            sql = "UPDATE role SET title='" + answers.empEditRole + "' WHERE employees.id=" + id;
                            connection.query(sql, (err) => {
                                if (err) throw err;
                            });
                            break;

                        //chose to edit manager option running query to input manager into chosen emp field
                        case "manager":

                            //finding id of manager from first name that was selected
                            sql = "SELECT id FROM employees WHERE first_name=" + answers.empEditManager;
                            connection.query(sql, (err, managerId) => {
                                if (err) throw err;

                                //updating that employees manager to the one selected
                                sql = "UPDATE employees SET manager_id=" + managerId + "WHERE employees.id=" + id;
                                connection.query(sql, (err, managerId) => {
                                    if (err) throw err;
                                });
                            });
                            break;
                    }
                    console.log("Employee "+ answers.empEditFirstName +" "+ answers.empEditLastName +" Successfully edited!")
                    //end switch statement
                });
            });
        });
    });
};

//exporting removeEmployee and editEmployee functions
module.exports = { removeEmployee, editEmployee }
