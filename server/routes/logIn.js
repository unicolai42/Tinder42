const express = require('express')
const router = express.Router()
const randomString = require('randomstring')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


router.post('/check_signUp', (req, res) => {
    const saltRounds = 10;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hashPassword) {
        const randomKey = randomString.generate(15)
        req.db.query(`INSERT INTO Users (username, password, mail, randomKey) VALUES (?, ?, ?, ?);`,
        [req.body.username, hashPassword, req.body.mail, randomKey], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err));
            // bcrypt.compare('ffffff', '$2b$10$6707gWLRGjqGwKJzXx6Dt.CH00c0rRlioy8KdcWc4ze18LoL2YHeC', function(err, res) {
            //     console.log(res)
            // });
            res.end();
        })
    })
})

router.get('/mail_change_password', (req, res) => {
    findUserData('username', req.query.username, req, (userData) => {
        // sendMail(userData)
        res.json(userData)
    })
});

router.post('/connect_user', (req, res) => {
    res.cookie('username', req.body.username)
    findUserData('username', req.body.username, req, (userData) => {
        res.cookie('id', userData.id)
        res.redirect('/')
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


function sendMail(userData) {
    console.log(userData.username)

    let transporter = nodemailer.createTransport({
        host: 'nomdemonsite.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'no-reply@nomdemonsite.com', // generated ethereal user
            pass: 'motdepassequejaichoisissurmonhebergeur' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Ugo" <ugo@nomdemonsite.com>', // sender address
        to: userData.mail, // list of receivers
        subject: 'Change password', // Subject line
        text: 'Hello world?', // plain text body
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