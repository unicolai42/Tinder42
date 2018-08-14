const express = require('express')
const router = express.Router()


router.post('/update_location', (req, res) => {
    console.log(req.body.latitude, req.body.longitude, req.body.userId)
    req.db.query("UPDATE Users SET latitude = ?, longitude = ? WHERE id = ?;",
    [req.body.latitude, req.body.longitude, req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        
        res.end()
    })
})

router.post('/load_user_data_match', (req, res) => {
    req.db.query("SELECT * FROM Preferences WHERE user_id = ?;",
    [req.body.userId], (err, rows, fields) => {
        let preferences = rows[0]
        console.log(preferences, 'pref')
        req.db.query("SELECT hashtag_id FROM HashtagPreferences WHERE user_id = ?;",
        [req.body.userId], (err, rows, fields) => {
            if (err)
                return (res.send(err) && console.log(err))

            const hashtagId = []
            console.log(rows, 'heeeere')
            if (rows[0]) {
                rows.forEach(e => {
                    hashtagId.push(e.hashtag_id)
                });
                console.log(hashtagId, 'a')
                req.db.query("SELECT user_id FROM HashtagUsers WHERE hashtag_id IN (?);",
                [hashtagId], (err, rows, fields) => {
                    if (err)
                        return (res.send(err) && console.log(err))
                    
                    let usersId = []
                    rows.forEach(e => {
                        console.log(e, 'abis')
                        usersId.push(e.user_id)
                    });
                    console.log(usersId, 'b')
                    req.db.query("SELECT * FROM Users WHERE id IN (?) AND sex = ? AND age > ? AND age < ? ORDER BY popularity DESC;",
                    [usersId, preferences.sex, preferences.age_min, preferences.age_max], (err, rows, fields) => {
                        if (err)
                            return (res.send(err) && console.log(err))

                        console.log(rows, 'c')
                        let usersData = []
                        rows.forEach(userData => {
                            let pictures = []

                            for (let i = 1; i < 6 && userData[`picture${i}`] !== null; i++)
                                pictures.push(userData[`picture${i}`])
                            userData.pictures = pictures
                            console.log(pictures, 'ppp')
                            usersData.push(userData)
                        })
                        res.json(usersData)
                    })
                })
            }
            else {
                req.db.query("SELECT * FROM Users WHERE id != ?;",
                [req.body.userId], (err, rows, fields) => {
                    let usersData = []
                    rows.forEach(userData => {
                        let pictures = []

                        for (let i = 1; i < 6 && userData[`picture${i}`] !== null; i++)
                            pictures.push(userData[`picture${i}`])
                        userData.pictures = pictures
                        console.log(pictures, 'ppp')
                        usersData.push(userData)
                    })
                    res.json(usersData)
                })
            }
            // console.log(rows.length, hashtagId)
            // let hashtags = []
            // req.db.query("SELECT name FROM Hashtags WHERE id IN (?);",
            // [hashtagId], (err, rows, fields) => {
            //     rows.forEach((e, i) => {
            //         hashtags.push({id: i, name: e.name})
            //     })
            //     userData.hashtags = hashtags

            //     req.db.query("SELECT * FROM Hashtags;", (err, rows, fields) => {
            //         userData.suggestions = rows
            //         res.json(userData)
            //     })
            // })
        })
    })
})


module.exports = router