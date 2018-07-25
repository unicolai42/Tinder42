const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    req.db.query("SELECT * FROM Users;", (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        console.log(req.cookies)
        res.json(rows);
    });
});

module.exports = router