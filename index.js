const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'employees_db'
});

function showData() {
    let sql = "SELECT * FROM popquiz";

    connection.query(sql, function(err,res));
    if (err) throw err;
    console.log(res);
}

//throw an error incase cant obtain a connection
connection.connect((err) => {
    if (err) throw err;
    console.log("connected!");
    showData();
})
*
connection.end();