const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


router.post('/load_user_info', (req, res) => {
    req.db.query("SElECT * FROM Users WHERE id = ?;",
    [req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        
        res.json(rows[0])
    })
})

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
            req.db.query("SELECT * FROM Hashtags;", (err, rows, fields) => {
                let suggestions = []
                rows.forEach((e, i) => {
                    suggestions.push({id: i, name: e.name})
                })
                userPreferences.suggestions = suggestions

                req.db.query("SELECT name FROM Hashtags WHERE id IN (?);",
                [hashtagId], (err, rows, fields) => {
                    if (rows) {
                        rows.forEach((e, i) => {
                            hashtags.push({id: i, name: e.name})
                        })
                        userPreferences.hashtags = hashtags
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
    console.log(req.body.maxDistance)
    req.db.query("UPDATE Preferences SET age_min = ?, age_max = ?, max_distance = ?, sex = ?, popularity_min = ? WHERE user_id = ?;",
    [req.body.ageMin, req.body.ageMax, req.body.maxDistance, req.body.sex, req.body.popularityMin, req.body.userId], (err, rows, fields) => {
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

router.post('/update_mail', (req, res) => {
    req.db.query("UPDATE Users SET mail = ? WHERE id = ?;",
    [req.body.mail, req.body.userId], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        
        res.end()
    })
})

router.post('/check_old_pwd', (req, res) => {
    bcrypt.compare(req.body.input, req.body.pwd, function(err, result) {
        res.json(result)
    })
})

router.post('/change_pwd', (req, res) => {
    const saltRounds = 10;
    const password = req.body.pwd

    bcrypt.hash(password, saltRounds, function(err, hashPassword) {
        req.db.query(`UPDATE Users SET password = ? WHERE id = ?;`,
        [hashPassword, req.body.userId], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err))
            res.json(hashPassword)
        })
    })
})

router.post('/send_mail_forgot_pwd', (req, res) => {
    sendPwdValidation(req.body.user)
})

router.get('/compare_old_pwd', (req, res) => {    
    req.db.query(`SELECT password FROM Users WHERE username = ?;`,
    [req.query.username], (err, rows, fields) => {
        if (rows[0].password === req.query.key)
            res.json('stay')
        else
            res.json('redirect')
    })
})

router.post('/change_new_pwd', (req, res) => {
    req.db.query(`UPDATE Users SET password = ? WHERE username = ?;`,
    [req.body.pwd, req.body.username], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err))
        
        res.json('redirect')
    })
})

module.exports = router


function sendPwdValidation(userData) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 25,
        secure: false,
        auth: {
            user: 'matchamatcha12342@gmail.com', // generated ethereal user
            pass: 'matcha123' // generated ethereal password
        },
        tls: {
            rejectUnauthorised: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"no-reply" <matchamatcha12342@gmail.com>', // sender address
        to: userData.mail, // list of receivers
        subject: 'Reset Password',
        text: `Click on this link to reset your password : http://localhost:3000/reset_pwd?username=${encodeURI(userData.username)}&key=${encodeURI(userData.password)}`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
    });
}