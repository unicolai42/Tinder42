const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const randomString = require('randomstring')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const session = require('express-session')


const app = express()
// const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: 'crypted key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Put true if https
  }))
app.use((req, res, next) => {
    // if (!req.session.views) {
    //     req.session.views = {}
    //   }
    req.session.cookie.id = 'test'
    next()
})
app.use((req, res, next) => {
    req.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '00000000',
        database: 'Matcha'
    });
    next();
});


app.get('/users', (req, res) => {
    req.db.query("SELECT * FROM Users;", (err, rows, fields) => {
        if(err)
        return(res.send(err) && console.log(err));
      
        res.json(rows);
    });
});

app.post('/check_signUp', (req, res) => {
    console.log(req.body);

    const saltRounds = 10;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hashPassword) {
        const randomKey = randomString.generate(15)
        console.log(req.body.username, password, req.body.mail, randomKey)
        req.db.query(`INSERT INTO Users (username, password, mail, randomKey) VALUES ('${req.body.username}', '${hashPassword}', '${req.body.mail}', '${randomKey}');`, (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err));
            // bcrypt.compare('ffffff', '$2b$10$6707gWLRGjqGwKJzXx6Dt.CH00c0rRlioy8KdcWc4ze18LoL2YHeC', function(err, res) {
            //     console.log(res)
            // });
            res.end();
        })
    })
})

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

app.get('/mail_change_password', (req, res) => {
    findUserData('username', req.query.username, req, (userData) => {
        // sendMail(userData)
        res.json(userData)
    })
});

app.post('/connect_user', (req, res) => {
    req.session.cookie.username = req.body.username
    findUserData('username', req.body.username, req, (userData) => {
        req.session.cookie.id = userData.id
        req.session.cookie.username = userData.username
        res.redirect('/profil')
    })
})

// app.use(router)
app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})


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