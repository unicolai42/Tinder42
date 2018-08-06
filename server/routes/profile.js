const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dzhnhtkyv', 
    api_key: '139166436229766', 
    api_secret: '1qcqxUa7qkfHxyW8R9FDO-bezfQ' 
});


router.post('/load_userdata', (req, res) => {
    console.log(req.body.user)
    req.db.query("SELECT * FROM Users WHERE id = ?;",
    [req.body.user], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        let pictures = []
        pictures.push(rows[0].picture1, rows[0].picture2, rows[0].picture3, rows[0].picture4, rows[0].picture5)
        let data = {}
        data.pictures = pictures
        data.username = rows[0].username
        data.location = rows[0].location
        // let arrayAllConversations = []
        // let arrayConversation = []
        // rows.forEach(row => {
        //     if (row.match_id !== match_id) {
        //         match_id = row.match_id
        //         if (arrayConversation.length !== 0) {
        //             arrayAllConversations.push(arrayConversation)
        //             arrayConversation = []
        //         }
        //     }
        //     arrayConversation.push(row)
        // })
        // arrayAllConversations.push(arrayConversation)
        res.json(data)
    })
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