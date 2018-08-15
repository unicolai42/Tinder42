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

                        req.db.query("SELECT * FROM Users WHERE id IN (?) AND sex IN (?) AND age > ? AND age < ? ORDER BY popularity DESC;",
                        [usersId, sexPreference, preferences.age_min, preferences.age_max], (err, rows, fields) => {
                            if (err)
                                return (res.send(err) && console.log(err))

                            const usersDataNoChecked = rows
                            console.log(usersDataNoChecked, '444')

                            req.db.query("SELECT * FROM checkedUsers WHERE checker_id = ?;",
                            [req.body.userId], (err, rows, fields) => {
                                if (err)
                                    return (res.send(err) && console.log(err))
                                let checkedId = []
                                console.log(rows, '1')

                                rows.forEach(row => {
                                    checkedId.push(row.checked_id)
                                })
                                console.log(checkedId)

                                let usersData = []

                                usersDataNoChecked.forEach(userData => {
                                    let pictures = []

                                    console.log(userData, '5')
                                    for (let i = 1; i < 6 && userData[`picture${i}`] !== null; i++)
                                        pictures.push(userData[`picture${i}`])
                                    userData.pictures = pictures

                                    const distance = geolib.getDistance(
                                                        {latitude: userData.latitude, longitude: userData.longitude},
                                                        {latitude: userLatitude, longitude: userLongitude}
                                                    )

                                    console.log(checkedId, userData.id, '6')
                                    if (distance < preferences.max_distance)
                                        if (checkedId.findIndex(e => { return e === userData.id}))
                                            usersData.push(userData)
                                })
                                res.json(usersData)
                            })
                        })
                    })
                }
                else {
                    req.db.query("SELECT * FROM Users WHERE id != ? AND sex IN (?) AND age > ? AND age < ? ORDER BY popularity DESC;;",
                    [req.body.userId, sexPreference, preferences.age_min, preferences.age_max], (err, rows, fields) => {
                        if (err)
                            return (res.send(err) && console.log(err))
                        
                        const usersDataNoChecked = rows
                        console.log(usersDataNoChecked, '444')

                        req.db.query("SELECT * FROM checkedUsers WHERE checker_id = ?;",
                        [req.body.userId], (err, rows, fields) => {
                            if (err)
                                return (res.send(err) && console.log(err))
                            let checkedId = []
                            console.log(rows, '2')


                            rows.forEach(row => {
                                checkedId.push(row.checked_id)
                            })
                            console.log(checkedId)
                            

                            let usersData = []

                            usersDataNoChecked.forEach(userData => {
                                let pictures = []

                                console.log(userData, '5')
                                for (let i = 1; i < 6 && userData[`picture${i}`] !== null; i++)
                                    pictures.push(userData[`picture${i}`])
                                userData.pictures = pictures

                                const distance = geolib.getDistance(
                                                    {latitude: userData.latitude, longitude: userData.longitude},
                                                    {latitude: userLatitude, longitude: userLongitude}
                                                )

                                console.log(checkedId, userData.id, '6')
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
    [req.body.userId, req.body.matchId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        
        res.end()
    })
})

module.exports = router