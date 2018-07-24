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

// router.get('/ok', (req, res) => {
//     req.db.query("SELECT * FROM Chat WHERE sender_id = 1 OR receiver_id = 1 ORDER BY conversation_id, date;",
//     (err, rows, fields) => {
//         if (err)
//             return (res.send(err) && console.log(err))
//         let conversationsId = []
//         rows.forEach(row => {
//             let add = 1
//             for (let i = 0; i < conversationsId.length; i++)
//                 if (row.conversation_id === conversationsId[i])
//                     add = 0
//             if (add === 1)
//                 conversationsId.push(row.conversation_id)
//             add = 1
//         })
//         req.db.query()
//         res.json(rows)
//     })
// })


router.post('/chat_conversation', (req, res) => {
    req.db.query("SELECT * FROM Chat WHERE sender_id = ? OR receiver_id = ? ORDER BY conversation_id, date;",
    [req.body.user, req.body.user], (err, rows, fields) => {
        if (err)
            return (res.send(err) && console.log(err))
        let conversation_id = 0
        let arrayAllConversations = []
        let arrayConversation = []
        rows.forEach(row => {
            console.log(row)
            if (row.conversation_id !== conversation_id) {
                conversation_id = row.conversation_id
                if (arrayConversation.length !== 0) {
                    console.log('ok')
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

module.exports = router