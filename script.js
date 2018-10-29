require('es6-promise').polyfill();
require("isomorphic-fetch")
const mysql = require('mysql')
const fs = require('fs')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const api = require('./apiKey.js')

const unsplash = new Unsplash({
  applicationId: api.unsplash.applicationId,
  secret: api.unsplash.secret
})

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


db.connect(async function(err) {
    if (err) throw err
    
    db.query(sqlFile, (err, result) => {
        if (err) throw err
    })

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    let scriptDone = 0
    let img = 0

    let picturesGirls = []
    let picturesGirlsWithoutCopy = []
    let nbGirls

    for (let i = 1; i < 100; i++) {
        while (i === 37 || i === 39 || i === 40 || i === 41 || i === 47 || i === 58 || i === 73 || i === 82 || i === 84 || i === 90 || i === 96 || i === 98)
            i++
        unsplash.search.photos("female", i, 10)
        .then(toJson)
        .then(json => {
            json.results.forEach(element => {
                picturesGirls.push(element.urls.regular)
            });            
        })
        .then(() => {
            picturesGirls.forEach((picture) => {
                const newImg = picturesGirlsWithoutCopy.find((pictureGirl) => {
                    return picture === pictureGirl;
                });
                if (newImg === undefined) {
                    picturesGirlsWithoutCopy.push(picture)
                }
            })
        })
        .then(() => {
            nbGirls = (picturesGirlsWithoutCopy.length >= 350) ? 350 : picturesGirls.length
        })
    }

    fetch(`https://uinames.com/api/?amount=350&gender=female&region=france&ext`)
    .then(response => response.json())
    .then(data => {
        const users = data

        for (let i = 0; i < nbGirls; i++) {
            let elem = users[i]        
            const saltRounds = 10;
            const password = '0000'
            const sex = 2
            const popularity = getRandomInt(51)
        
            bcrypt.hash(password, saltRounds, function(err, hashPassword) {
                const randomKey = randomString.generate(15)
                const mail = `${randomKey}@sharklasers.com`
                let longitude = Math.random() * fr_coords.lon_diff + fr_coords.lon.min
                let latitude = Math.random() * fr_coords.lat_diff + fr_coords.lat.min

                db.query(`INSERT INTO Users (username, password, mail, randomKey, picture1, age, popularity, latitude, longitude, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [elem.name, hashPassword, mail, randomKey, picturesGirlsWithoutCopy[i], elem.age, popularity, latitude, longitude, sex], (err, rows, fields) => {
                    if(err)
                        return(console.log(err))
                    
                    db.query(`SELECT * FROM Users WHERE mail = ?;`,
                    [mail], (err, rows, fields) => {
                        if(err)
                            return(console.log(err))

                        const userId = rows[0].id
                        db.query(`INSERT INTO Preferences (age_min, age_max, max_distance, sex, user_id) VALUES (16, 70, 500000, 1, ?);`,
                        [userId], (err, rows, fields) => {
                            if(err)
                                return(console.log(err))
                            
                            img++
                            console.log(img)
                            if (i === nbGirls - 1) {
                                if (scriptDone) {
                                    console.log('Completed database')
                                    db.end()
                                }
                                else
                                    scriptDone = 1
                            }
                        })
                    })
                })
            })
        }
    })

    

    let picturesBoys = []
    let picturesBoysWithoutCopy = []
    let nbBoys

    for (let i = 1; i <= 50; i++) {
        unsplash.search.photos("male", i, 10)
        .then(toJson)
        .then(json => {
            json.results.forEach(element => {
                picturesBoys.push(element.urls.regular)
            });            
        })
        .then(() => {
            picturesBoys.forEach((picture) => {
                const newImg = picturesBoysWithoutCopy.find((pictureBoy) => {
                    return picture === pictureBoy;
                });
                if (newImg === undefined) {
                    picturesBoysWithoutCopy.push(picture)
                }
            })
        })
        .then(() => {
            nbBoys = (picturesBoysWithoutCopy.length >= 150) ? 150 : picturesBoys.length
        })
    }

    fetch('https://uinames.com/api/?amount=150&gender=male&region=france&ext')
    .then(response => response.json())
    .then(data => {
        const users = data

        for (let i = 0; i < nbBoys; i++) {
            let elem = users[i]        
            const saltRounds = 10;
            const password = '0000'
            const sex = 0
            const popularity = getRandomInt(51)
        
            bcrypt.hash(password, saltRounds, function(err, hashPassword) {
                const randomKey = randomString.generate(15)
                const mail = `${randomKey}@sharklasers.com`
                let longitude = Math.random() * fr_coords.lon_diff + fr_coords.lon.min
                let latitude = Math.random() * fr_coords.lat_diff + fr_coords.lat.min

                db.query(`INSERT INTO Users (username, password, mail, randomKey, picture1, age, popularity, latitude, longitude, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [elem.name, hashPassword, mail, randomKey, picturesBoysWithoutCopy[i], elem.age, popularity, latitude, longitude, sex], (err, rows, fields) => {
                    if(err)
                        return(console.log(err))
                    
                    db.query(`SELECT * FROM Users WHERE mail = ?;`,
                    [mail], (err, rows, fields) => {
                        if(err)
                            return(console.log(err))

                        const userId = rows[0].id
                        db.query(`INSERT INTO Preferences (age_min, age_max, max_distance, sex, user_id) VALUES (16, 70, 500000, 1, ?);`,
                        [userId], (err, rows, fields) => {
                            if(err)
                                return(console.log(err))

                            img++
                            console.log(img)
                            if (i === nbBoys - 1) {
                                if (scriptDone) {
                                    console.log('Completed database')
                                    db.end()
                                }
                                else
                                    scriptDone = 1
                            }
                        })
                    })
                })
            })
        }
    })
})