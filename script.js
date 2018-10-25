require("isomorphic-fetch")
const mysql = require('mysql')
const fs = require('fs')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Matcha',    
    multipleStatements: true
})

const sqlFile = fs.readFileSync('database_tinder42.sql').toString()

const fr_coords = {lat: {min: 41.314330, max: 51.124200}, lon: {min: -5.559100, max: 9.662500}}
fr_coords.lon_diff = fr_coords.lon.max - fr_coords.lon.min
fr_coords.lat_diff = fr_coords.lat.max - fr_coords.lat.min 

db.connect(function(err) {
    if (err) throw err
    
    db.query(sqlFile, (err, result) => {
        if (err) throw err
    })
    fetch('https://randomuser.me/api/?results=500&nat=fr')
    .then(response => response.json())
    .then(data => {
        const users = data.results
        for (let i = 0; i < users.length; i++) {
            let elem = users[i]        
            const saltRounds = 10;
            const password = elem.login.password
            let sex = (elem.gender === 'male') ? 0 : 2
        
            bcrypt.hash(password, saltRounds, function(err, hashPassword) {
                const randomKey = randomString.generate(15)
                let longitude = Math.random() * fr_coords.lon_diff + fr_coords.lon.min
                let latitude = Math.random() * fr_coords.lat_diff + fr_coords.lat.min

                db.query(`INSERT INTO Users (username, password, mail, randomKey, picture1, age, latitude, longitude, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [elem.login.username, hashPassword, elem.email, randomKey, elem.picture.large, elem.dob.age, latitude, longitude, sex], (err, rows, fields) => {
                    if(err)
                        return(console.log(err))
                    
                    db.query(`SELECT * FROM Users WHERE username = ?;`,
                    [elem.login.username], (err, rows, fields) => {
                        if(err)
                            return(console.log(err))

                        const userId = rows[0].id
                        db.query(`INSERT INTO Preferences (age_min, age_max, max_distance, sex, user_id) VALUES (16, 70, 500000, 1, ?);`,
                        [userId], (err, rows, fields) => {
                            if(err)
                                return(console.log(err))

                            if (i === data.results.length - 1) {
                                console.log('Completed database')
                                db.end()
                            }
                        })
                    })
                })
            })
        }
    })
});



