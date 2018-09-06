const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')


router.get('/users', (req, res) => {
    req.db.query("SELECT * FROM Users;", (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));

        res.json(rows);
    });
});

module.exports = router