const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')
// const ip = require('ip')


cloudinary.config({ 
    cloud_name: 'dzhnhtkyv', 
    api_key: '139166436229766', 
    api_secret: '1qcqxUa7qkfHxyW8R9FDO-bezfQ' 
});


router.post('/load_pictures', (req, res) => {
    req.db.query("SELECT * FROM Users WHERE id = ?;",
    [req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        let pictures = []
        pictures.push(rows[0].picture1, rows[0].picture2, rows[0].picture3, rows[0].picture4, rows[0].picture5)
        let data = {}
        data.pictures = pictures

        res.json(data)
    })
})

router.post('/load_info_user', (req, res) => {
    req.db.query("SELECT * FROM Users WHERE id = ?;",
    [req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        // console.log(rows)
        let userData = rows[0]
        // res.json(rows)
        req.db.query("SELECT hashtag_id FROM HashtagUsers WHERE user_id = ?;",
        [req.body.userId], (err, rows, fields) => {
            const hashtagId = []
            rows.forEach(e => {
                hashtagId.push(e.hashtag_id)
            });
            // console.log(rows.length, hashtagId)
            let hashtags = []
            req.db.query("SELECT name FROM Hashtags WHERE id IN (?);",
            [hashtagId], (err, rows, fields) => {
                if (rows)
                    rows.forEach((e, i) => {
                        hashtags.push({id: i, name: e.name})
                    })
                userData.hashtags = hashtags

                req.db.query("SELECT * FROM Hashtags;", (err, rows, fields) => {
                    userData.suggestions = rows
                    res.json(userData)
                })
            })
        })
    })
})

router.post('/edit_info_user', (req, res) => {
    req.db.query("UPDATE Users SET username = ?, age = ?, description = ?, location = ?, work = ?, language = ? WHERE id = ?;",
    [req.body.name, req.body.age, req.body.description, req.body.location, req.body.work, req.body.language, req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
    })
    res.end()
})

router.post('/add_hashtag_profile', (req, res) => {
    console.log('add')
    req.db.query("SELECT * FROM Hashtags WHERE name = ?;",
    [req.body.hashtagName], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))

        if (rows[0]) {
            const hashtagId = rows[0].id
            req.db.query("INSERT INTO HashtagUsers (user_id, hashtag_id) VALUES (?, ?);",
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

router.post('/remove_hashtag_profile', (req, res) => {
    console.log('remove')
    req.db.query("SELECT * FROM Hashtags WHERE name = ?;",
    [req.body.hashtagName], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))

        const hashtagId = rows[0].id
        req.db.query("DELETE FROM HashtagUsers WHERE user_id = ? AND hashtag_id = ?;",
        [req.body.userId, hashtagId])
    })
    res.end()
})

router.post('/update_order_pictures', (req, res) => {
    if (req.body.removeUrl)
        cloudinary.v2.uploader.destroy(req.body.removeUrl, function(error, result){console.log(result, error)})

    const pictures = req.body.newOrderPictures
    req.db.query("UPDATE Users SET picture1 = ?, picture2 = ?, picture3 = ?, picture4 = ?, picture5 = ? WHERE id = ?;",
    [pictures[0], pictures[1], pictures[2], pictures[3], pictures[4], req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        res.end()
    })
})

router.post('/upload_picture', (req, res) => {
    const userId = req.body.userId
    const picture = req.body.picture
    cloudinary.v2.uploader.upload(picture, (err, result) => {
        if (err)
            console.log(err)
        console.log(result.url)
        const url = result.url

        req.db.query("SELECT * FROM Users WHERE id = ?;",
        [userId], (err, rows, fields) => {
            if (err)
                return (res.send(err) && console.log(err))
            let newPicture
            if (rows[0].picture1 === null)
                newPicture = 'picture1'
            else if (rows[0].picture2 === null)
                newPicture = 'picture2'
            else if (rows[0].picture3 === null)
                newPicture = 'picture3'
            else if (rows[0].picture4 === null)
                newPicture = 'picture4'
            else if (rows[0].picture5 === null)
                newPicture = 'picture5'
            console.log(newPicture)

            req.db.query(`UPDATE Users SET ?? = ? WHERE id = ?;`,
            [newPicture, url, userId], (err, rows, fields) => {
                if(err)
                    return(res.send(err) && console.log(err));
            })
        })
        res.json(url)
    })
})



module.exports = router