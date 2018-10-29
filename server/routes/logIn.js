const express = require('express')
const router = express.Router()
const randomString = require('randomstring')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


router.post('/check_signUp', (req, res) => {
    const saltRounds = 10;
    const password = req.body.password

    bcrypt.hash(password, saltRounds, function(err, hashPassword) {
        const randomKey = randomString.generate(15)
        req.db.query(`INSERT INTO Users (username, password, mail, randomKey, sex) VALUES (?, ?, ?, ?, ?);`,
        [req.body.username, hashPassword, req.body.mail, randomKey, 1], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err))
            
            req.db.query(`SELECT * FROM Users WHERE mail = ?;`,
            [req.body.mail], (err, rows, fields) => {
                if(err)
                    return(res.send(err) && console.log(err));
                const userId = rows[0].id
                req.db.query(`INSERT INTO Preferences (age_min, age_max, max_distance, sex, user_id) VALUES (16, 70, 50000, 1, ?);`,
                [userId], (err, rows, fields) => {
                    if(err)
                        return(res.send(err) && console.log(err))

                    req.db.query(`SELECT MAX(id) FROM users;`,
                    (err, rows, fields) => {
                        if(err)
                            return(res.send(err) && console.log(err));

                        const maxId = rows[0]['MAX(id)']

                        req.db.query(`SELECT * FROM users WHERE id = ?;`,
                        [maxId], (err, rows, fields) => {
                            if(err)
                                return(res.send(err) && console.log(err));

                            sendMailValidation(rows[0])
                            res.json(rows[0])
                        })
                    })
                })
            })
        })
    })
})

router.post('/check_valid_user', (req, res) => {
    req.db.query(`SELECT * FROM users;`,
    (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        
        let find = 0
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].mail === req.body.mail) {
                find = 1
                bcrypt.compare(req.body.password, rows[i].password, function(err, result) {
                    if (result && rows[i].randomKey !== '1') {
                        res.json(3)
                    }
                    else if (result && rows[i].randomKey === '1') {
                        res.json(2)
                    }
                    else {
                        res.json(1)
                    }                
                })
            }
            if (i === rows.length - 1 && find === 0)
                res.json(0)
        }
    })
})

router.post('/resend_activation_mail', (req, res) => {
    req.db.query(`SELECT * FROM users WHERE mail = ?;`,
    [req.body.mail], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        
        sendMailValidation(rows[0])
        res.json(rows[0])
    })
})


router.get('/mail_change_password', (req, res) => {
    findUserData('mail', req.query.mail, req, (userData) => {
        sendMailChangePwd(userData)
        res.json(userData)
    })
})

router.post('/find_id_user', (req, res) => {
    req.db.query(`SELECT * FROM users;`,
    (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));

        rows.forEach(elem => {
            if (elem.mail === req.body.mail)
                res.json(elem.id)
        })
    })
})

router.get('/activate_user', (req, res) => {
    req.db.query(`SELECT * FROM Users WHERE mail = ?;`,
    [req.query.mail, req.query.key], (err, rows, fields) => {
        if (rows[0]) {
            req.db.query(`UPDATE Users SET randomKey = 1 WHERE mail = ?;`,
            [req.query.mail], () => {
                res.cookie('mail', rows[0].mail)
                res.cookie('id', rows[0].id)
                res.redirect('http://localhost:3000')
            })
        }
        else
            res.redirect('http://localhost:3000')   
    })
})

router.post('/maj_last_connection_and_deconnect_user', (req, res) => {
    req.db.query(`UPDATE Users SET last_connection = CURRENT_TIMESTAMP WHERE id = ?;`,
    [req.body.userId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));

        req.db.query(`DELETE FROM ConnectedUsers WHERE user1 = ? OR user2 = ?;`,
        [req.body.userId, req.body.userId], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err))
            res.end()
        })
    })
})

module.exports = router



function selectUserData(rows, key, value) {
    let userData;
    rows.forEach(row => {
        if (row[key].toUpperCase() === value.toUpperCase())
            userData = row;
    });
    return (userData)
}

function findUserData(key, value, req, callback) {
    req.db.query("SELECT * FROM Users;", (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        let userData = selectUserData(rows, key, value)
        callback(userData)
    })
}


function sendMailValidation(userData) {
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
        subject: 'Mail de validation',
        text: `Cliquez sur ce lien pour finalisez la création de votre compte : http://localhost:3001/activate_user?mail=${encodeURI(userData.mail)}&key=${encodeURI(userData.randomKey)}`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
    });
}


function sendMailChangePwd(userData) {
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
        subject: 'Change password', // Subject line
        text: `Click on the link to change password : http://localhost:3000/reset_pwd?mail=${encodeURI(userData.mail)}&key=${encodeURI(userData.password)}`,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}