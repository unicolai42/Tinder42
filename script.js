require("isomorphic-fetch")
const mysql = require('mysql')
const fs = require('fs')
const bcrypt = require('bcrypt')


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
    db.query(sqlFile, (err, result) => {
        if (err) throw err
        console.log("Result: " + result)
    })
    fetch('https://randomuser.me/api/?results=5&nat=fr')
    .then(response => response.json())
    .then(data => {
        // console.log(data.results)
        data.results.forEach(elem => {
            const saltRounds = 10;
            const password = elem.login.password
            let sex = (elem.gender === 'male') ? 0 : 2
        
            bcrypt.hash(password, saltRounds, function(err, hashPassword) {
                const randomKey = randomString.generate(15)
                req.db.query(`INSERT INTO Users (username, password, mail, randomKey, picture1, age, sex) VALUES (?, ?, ?, ?, ?);`,
                [elem.login.username, hashPassword, elem.email, randomKey, elem.picture.medium, elem.dob.age, sex], (err, rows, fields) => {
                    if(err)
                        return(res.send(err) && console.log(err))
                    
                    req.db.query(`SELECT * FROM Users WHERE username = ?;`,
                    [elem.login.username], (err, rows, fields) => {
                        if(err)
                            return(res.send(err) && console.log(err));
                        const userId = rows[0].id
                        req.db.query(`INSERT INTO Preferences (age_min, age_max, max_distance, sex, user_id) VALUES (16, 70, 500000, 1, ?);`,
                        [userId], (err, rows, fields) => {
                            if(err)
                                return(res.send(err) && console.log(err))
                        })
                    })
                })
            })
        })
    })
    db.end()
});



