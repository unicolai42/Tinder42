const express = require('express')
const router = express.Router()

// router.get('/ok', (req, res) => {
//     req.db.query("SELECT * FROM Chat WHERE sender_id = 1 OR receiver_id = 1 ORDER BY match_id, date;",
//     (err, rows, fields) => {
//         if (err)
//             return (res.send(err) && console.log(err))
//         let conversationsId = []
//         rows.forEach(row => {
//             let add = 1
//             for (let i = 0; i < conversationsId.length; i++)
//                 if (row.match_id === conversationsId[i])
//                     add = 0
//             if (add === 1)
//                 conversationsId.push(row.match_id)
//             add = 1
//         })
//         req.db.query()
//         res.json(rows)
//     })
// })


router.post('/chat_conversation', (req, res) => {
    req.db.query("SELECT * FROM Chat WHERE sender_id = ? OR receiver_id = ? ORDER BY match_id, date;",
    [req.body.user, req.body.user], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        let match_id = 0
        let arrayAllConversations = []
        let arrayConversation = []
        rows.forEach(row => {
            if (row.match_id !== match_id) {
                match_id = row.match_id
                if (arrayConversation.length !== 0) {
                    arrayAllConversations.push(arrayConversation)
                    arrayConversation = []
                }
            }
            arrayConversation.push(row)
        });
        arrayAllConversations.push(arrayConversation)
        res.json(arrayAllConversations)
    })
})

router.post('/find_match_info', (req, res) => {
    req.db.query(`SELECT username, picture1 FROM Users WHERE id IN (?);`,
    [req.body.usersMatched], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        let data = rows
        req.db.query("SELECT date FROM Matchs WHERE user1 = ? AND user2 IN (?) OR user1 IN (?) AND user2 = ?;",
        [req.body.userLogin, req.body.usersMatched, req.body.usersMatched, req.body.userLogin], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err));
            for (let i = 0; i < data.length; i++) {
                data[i].date = Object.values(rows[i])[0]
            }
            res.json(data);
        })
    })
})

module.exports = router