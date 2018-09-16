const mysql = require('mysql')
const fs = require('fs')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00000000',
    database: 'Matcha',    
    multipleStatements: true
})

const sqlFile = fs.readFileSync('database_tinder42.sql').toString()

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query(sqlFile, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
    db.end()
});



