const express = require('express')
const geolib = require('geolib')
const ipLocator = require('ip-locator')
const router = express.Router()


router.post('/update_location', (req, res) => {
    console.log(req.body.latitude, req.body.longitude, req.body.userId)
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    if (!latitude && !longitude) {
        ipLocator.getDomainOrIPDetails(req.ip,'json', function (err, data) {
            latitude = data.latitude
            longitude = data.longitude
          })
        
        // console.log(req.socket.address().address, 'ko')
    }
    console.log(latitude, longitude, '4')
    if (latitude && longitude) {
        req.db.query("UPDATE Users SET latitude = ?, longitude = ? WHERE id = ?;",
        [latitude, longitude, req.body.userId], (err, rows, fields) => {
            if (err)
                return (res.send(err) && console.log(err))
            
            res.end()
        })
    }
    else
        res.end()
})

router.post('/load_user_data_match', (req, res) => {
    req.db.query("SELECT * FROM Users WHERE id = ?;",
    [req.body.userId], (err, rows, fields) => {
        const userLatitude = rows[0].latitude
        const userLongitude = rows[0].longitude

        req.db.query("SELECT * FROM Preferences WHERE user_id = ?;",
        [req.body.userId], (err, rows, fields) => {
            let preferences = rows[0]
            let sexPreference = (preferences.sex === 1) ? [0, 1, 2] : [preferences.sex]

            req.db.query("SELECT hashtag_id FROM HashtagPreferences WHERE user_id = ?;",
            [req.body.userId], (err, rows, fields) => {
                if (err)
                    return (res.send(err) && console.log(err))

                const hashtagId = []

                if (rows[0]) {
                    rows.forEach(e => {
                        hashtagId.push(e.hashtag_id)
                    });

                    req.db.query("SELECT user_id FROM HashtagUsers WHERE hashtag_id IN (?);",
                    [hashtagId], (err, rows, fields) => {
                        if (err)
                            return (res.send(err) && console.log(err))
                        
                        let usersId = []
                        rows.forEach(e => {
                            usersId.push(e.user_id)
                        });
                        console.log(usersId, 'Users')
                        
                        req.db.query("SELECT checked_id FROM CheckedUsers WHERE checker_id = ?;",
                        [req.body.userId], (err, rows, fields) => {
                            if (err)
                                return (res.send(err) && console.log(err))
                        
                            console.log(rows, 'checked')

                            req.db.query("SELECT * FROM Users WHERE id IN (?) AND sex IN (?) AND age > ? AND age < ? ORDER BY popularity DESC;",
                            [usersId, sexPreference, preferences.age_min, preferences.age_max], (err, rows, fields) => {
                                if (err)
                                    return (res.send(err) && console.log(err))

                                const usersDataNoChecked = rows

                                req.db.query("SELECT * FROM checkedUsers WHERE checker_id = ?;",
                                [req.body.userId], (err, rows, fields) => {
                                    if (err)
                                        return (res.send(err) && console.log(err))
                                    let checkedId = []

                                    rows.forEach(row => {
                                        checkedId.push(row.checked_id)
                                    })

                                    let usersData = []
                                    let usersDataChecked = []

                                    usersDataNoChecked.forEach(user => {
                                        let res = checkedId.find(id => {
                                            return id === user.id
                                        })
                                        if (!res)
                                            usersDataChecked.push(user)
                                    })

                                    usersDataChecked.forEach(userData => {
                                        let pictures = []

                                        for (let i = 1; i < 6 && userData[`picture${i}`] !== null; i++)
                                            pictures.push(userData[`picture${i}`])
                                        userData.pictures = pictures

                                        const distance = geolib.getDistance(
                                                            {latitude: userData.latitude, longitude: userData.longitude},
                                                            {latitude: userLatitude, longitude: userLongitude}
                                                        )

                                        if (distance < preferences.max_distance)
                                            if (checkedId.findIndex(e => { return e === userData.id}))
                                                usersData.push(userData)
                                    })
                                    res.json(usersData)
                                })
                            })
                        })
                    })
                }
                else {
                    req.db.query("SELECT * FROM Users WHERE id != ? AND sex IN (?) AND age > ? AND age < ? ORDER BY popularity DESC;",
                    [req.body.userId, sexPreference, preferences.age_min, preferences.age_max], (err, rows, fields) => {
                        if (err)
                            return (res.send(err) && console.log(err))
                        
                        const usersDataNoChecked = rows

                        req.db.query("SELECT * FROM checkedUsers WHERE checker_id = ?;",
                        [req.body.userId], (err, rows, fields) => {
                            if (err)
                                return (res.send(err) && console.log(err))
                            let checkedId = []

                            rows.forEach(row => {
                                checkedId.push(row.checked_id)
                            })

                            let usersData = []
                            let usersDataChecked = []

                            usersDataNoChecked.forEach(user => {
                                let res = checkedId.find(id => {
                                    return id === user.id
                                })
                                if (!res)
                                    usersDataChecked.push(user)
                            })

                            usersDataChecked.forEach(userData => {
                                let pictures = []

                                for (let i = 1; i < 6 && userData[`picture${i}`] !== null; i++)
                                    pictures.push(userData[`picture${i}`])
                                userData.pictures = pictures

                                const distance = geolib.getDistance(
                                                    {latitude: userData.latitude, longitude: userData.longitude},
                                                    {latitude: userLatitude, longitude: userLongitude}
                                                )

                                if (distance < preferences.max_distance)
                                    if (checkedId.findIndex(e => { return e === userData.id}))
                                        usersData.push(userData)
                            })
                            res.json(usersData)
                        })
                    })
                }
            })
        })
    })
})

router.post('/check_match', (req, res) => {
    req.db.query("INSERT INTO CheckedUsers (checker_id, checked_id) VALUES (?, ?);",
    [req.body.userId, req.body.matcherId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))

        if (req.body.liked) {
            req.db.query("INSERT INTO LikeUsers (liker_id, liked_id) VALUES (?, ?);",
            [req.body.userId, req.body.matcherId], (err, rows, fields) => {
                if (err)
                    return (res.send(err) && console.log(err))

                req.db.query("SELECT * FROM LikeUsers WHERE liker_id = ? && liked_id = ?;",
                [req.body.matcherId, req.body.userId], (err, rows, fields) => {
                    if (err)
                        return (res.send(err) && console.log(err))

                    if (rows[0]) {
                        req.db.query("INSERT INTO Matchs (user1, user2) VALUES (?, ?);",
                        [req.body.userId, req.body.matcherId], (err, rows, fields) => {
                            if (err)
                                return (res.send(err) && console.log(err))
                            
                            req.db.query("INSERT INTO Notifications (sender_id, receiver_id, content) VALUES (?, ?, 'matched');",
                            [req.body.userId, req.body.matcherId], (err, rows, fields) => {
                                if (err)
                                    return (res.send(err) && console.log(err))
                                res.end()
                            })
                        })
                    }
                    else
                        res.end()
                })
            })
        }
        else
            res.end()
    })
})

module.exports = router