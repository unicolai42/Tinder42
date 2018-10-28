const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')

const apiCloudinary = require('../key.js')


cloudinary.config({ 
    cloud_name: apiCloudinary.cloudinary.cloud_name, 
    api_key: apiCloudinary.cloudinary.api_key, 
    api_secret: apiCloudinary.cloudinary.api_secret
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
        let userData = rows[0]

        req.db.query("SELECT hashtag_id FROM HashtagUsers WHERE user_id = ?;",
        [req.body.userId], (err, rows, fields) => {
            const hashtagId = []
            if (rows && rows.length > 0) {
                rows.forEach(e => {
                    hashtagId.push(e.hashtag_id)
                });
            }  
            let hashtags = []

            req.db.query("SELECT name FROM Hashtags WHERE id IN (?);",
            [hashtagId], (err, rows, fields) => {
                if (rows) {
                    rows.forEach((e, i) => {
                        hashtags.push({id: i, name: e.name})
                    })
                    
                    let i = 0
                    let y = 1

                    while (i < hashtags.length) {
                        while (y < hashtags.length) {
                            if (hashtags[y].name < hashtags[y - 1].name) {
                                let swap = hashtags[y - 1]
                                hashtags.splice(y - 1, 1)
                                hashtags.splice(y, 0, swap)
                            }
                            y++
                        }
                        y = 1
                        i++
                    }
                }
                if (userData)
                    userData.hashtags = hashtags

                req.db.query("SELECT * FROM Hashtags;", (err, rows, fields) => {
                    let i = 0
                    let y = 1

                    if (rows) {
                        while (i < rows.length) {
                            while (y < rows.length) {
                                if (rows[y].name < rows[y - 1].name) {
                                    let swap = rows[y - 1]
                                    rows.splice(y - 1, 1)
                                    rows.splice(y, 0, swap)
                                }
                                y++
                            }
                            y = 1
                            i++
                        }
                    }

                    if (userData)
                        userData.suggestions = rows
                        
                    res.json(userData)
                })
            })
        })
    })
})

router.post('/edit_info_user', (req, res) => {
    req.db.query("UPDATE Users SET username = ?, age = ?, description = ?, work = ?, language = ?, latitude = ?, longitude = ?, sex = ? WHERE id = ?;",
    [req.body.name, req.body.age, req.body.description, req.body.work, req.body.language, req.body.latitude, req.body.longitude, req.body.sex, req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        res.end()
    })
})

router.post('/add_hashtag_profile', (req, res) => {
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
        cloudinary.v2.uploader.destroy(req.body.removeUrl, (error, result) => {if (error) console.log(error)})

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