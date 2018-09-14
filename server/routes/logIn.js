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
            
            req.db.query(`SELECT * FROM Users WHERE username = ?;`,
            [req.body.username], (err, rows, fields) => {
                if(err)
                    return(res.send(err) && console.log(err));
                const userId = rows[0].id
                req.db.query(`INSERT INTO Preferences (age_min, age_max, max_distance, sex, user_id) VALUES (16, 38, 50000, 1, ?);`,
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
            if (rows[i].username.toUpperCase() === req.body.username.toUpperCase()) {
                find = 1
                bcrypt.compare(req.body.password, rows[i].password, function(err, result) {
                    console.log(rows[i].randomKey, 'defe')
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
            console.log(find)
            if (i === rows.length - 1 && find === 0)
                res.json(0)
        }
    })
})

router.post('/resend_activation_mail', (req, res) => {
    req.db.query(`SELECT * FROM users WHERE username = ?;`,
    [req.body.username], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));

        sendMailValidation(rows[0])
        res.json(rows[0])
    })
})


router.get('/mail_change_password', (req, res) => {
    findUserData('username', req.query.username, req, (userData) => {
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
            if (elem.username.toUpperCase() === req.body.username.toUpperCase())
                res.json(elem.id)
        })
    })
})

router.get('/activate_user', (req, res) => {
    req.db.query(`SELECT * FROM Users WHERE username = ?;`,
    [req.query.username, req.query.key], (err, rows, fields) => {
        if (rows[0]) {
            req.db.query(`UPDATE Users SET randomKey = 1 WHERE username = ?;`,
            [req.query.username], (err, rows, fields) => {
                res.cookie('username', req.query.username)
                findUserData('username', req.query.username, req, (userData) => {
                    res.cookie('id', userData.id)
                    res.redirect('http://localhost:3000')
                })
            })
        }
        else
            res.redirect('http://localhost:3000')   
    })
})

module.exports = router



function selectUserData(rows, key, value) {
    let userData;
    rows.forEach(row => {
        if (row[key].toUpperCase() === value.toUpperCase())
            userData = row;
    });

    // for(let key in userData) {
    //     console.log(userData[key]);
    // }
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
        text: `Cliquez sur ce lien pour finalisez la création de votre compte : http://localhost:3001/activate_user?username=${encodeURI(userData.username)}&key=${encodeURI(userData.randomKey)}`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
    });
}


function sendMailChangePwd(userData) {
    console.log(userData.username)

    let transporter = nodemailer.createTransport({
        host: 'nomdemonsite.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'Matcha', // generated ethereal user
            pass: '0000000000' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Ugo" <confirm-subscription@tinder42.com>', // sender address
        to: userData.mail, // list of receivers
        subject: 'Change password', // Subject line
        text: 'Hello world?sssssssss', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}