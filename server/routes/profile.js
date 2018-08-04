const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary');
const FileReader = require('filereader')

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

router.post('/upload_picture', (req, res) => {
    const userId = req.body.userId
    const name = req.body.name
    const path = `${userId}/${name}`
    const picture = req.body.picture
    cloudinary.v2.uploader.upload(picture, {"public_id": path}, (result) => {
        console.log(result)
    })
    req.db.query("SELECT * FROM Users WHERE id = ?;",
    [userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        console.log(rows[0])
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
        console.log(rows[0][newPicture])
        console.log(newPicture, path, userId)

        req.db.query(`UPDATE Users SET ?? = ? WHERE id = ?;`,
        [newPicture, path, userId], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err));
            res.end();
        })
    })
})



module.exports = router