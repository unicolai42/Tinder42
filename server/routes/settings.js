const express = require('express')
const router = express.Router()

router.post('/load_preferences', (req, res) => {
    let userPreferences
    req.db.query("SELECT * FROM Preferences WHERE user_id = ?;",
    [req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        
        userPreferences = rows[0]
        req.db.query("SELECT hashtag_id FROM HashtagPreferences WHERE user_id = ?;",
        [req.body.userId], (err, rows, fields) => {
            const hashtagId = []
            rows.forEach(e => {
                hashtagId.push(e.hashtag_id)
            })
            let hashtags = []
            console.log(hashtagId, '1')
            req.db.query("SELECT * FROM Hashtags;", (err, rows, fields) => {
                console.log(rows, '4')
                let suggestions = []
                rows.forEach((e, i) => {
                    suggestions.push({id: i, name: e.name})
                })
                userPreferences.suggestions = suggestions

                req.db.query("SELECT name FROM Hashtags WHERE id IN (?);",
                [hashtagId], (err, rows, fields) => {
                    console.log(rows, '2')
                    if (rows) {
                        rows.forEach((e, i) => {
                            hashtags.push({id: i, name: e.name})
                        })
                        userPreferences.hashtags = hashtags
                        console.log(userPreferences, '3')
                        res.json(userPreferences)
                    }
                    else {
                        userPreferences.hashtags = []
                        res.json(userPreferences)
                    }
                })
            })
        })
    })
})

router.post('/set_preferences', (req, res) => {
    req.db.query("UPDATE Preferences SET age_min = ?, age_max = ?, max_distance = ?, sex = ? WHERE user_id = ?;",
    [req.body.ageMin, req.body.ageMax, req.body.maxDistance, req.body.sex, req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        
        res.end()
    })
})

router.post('/add_hashtag_settings', (req, res) => {
    console.log('add')
    req.db.query("SELECT * FROM Hashtags WHERE name = ?;",
    [req.body.hashtagName], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))

        if (rows[0]) {
            const hashtagId = rows[0].id
            req.db.query("INSERT INTO HashtagPreferences (user_id, hashtag_id) VALUES (?, ?);",
            [req.body.userId, hashtagId])
        }
        else {
            req.db.query("INSERT INTO Hashtags (name) VALUES (?);",
            [req.body.hashtagName], (err, rows, fields) => {
                req.db.query("SELECT * FROM Hashtags WHERE name = ?;", 
                [req.body.hashtagName], (err, rows, fields) => {
                    const hashtagId = rows[0].id
                    req.db.query("INSERT INTO HashtagUsers (user_id, hashtag_id) VALUES (?, ?);",
                    [req.body.userId, hashtagId])
                })
            })
        }
    })
    res.end()
})

router.post('/remove_hashtag_settings', (req, res) => {
    console.log('remove')
    req.db.query("SELECT * FROM Hashtags WHERE name = ?;",
    [req.body.hashtagName], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))

        const hashtagId = rows[0].id
        req.db.query("DELETE FROM HashtagPreferences WHERE user_id = ? AND hashtag_id = ?;",
        [req.body.userId, hashtagId])
    })
    res.end()
})


module.exports = router