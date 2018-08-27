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
        console.log(rows)
        
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
        })
        arrayAllConversations.push(arrayConversation)

        req.db.query("SELECT * FROM Matchs WHERE user1 = ? OR user2 = ? ORDER BY date;",
        [req.body.user, req.body.user], (err, rows, fields) => {
            if (err)
                return (res.send(err) && console.log(err))
            
            console.log(rows, req.body.user, 'sssss')
            let chats = []
            console.log(arrayAllConversations, 'cee')

            if (arrayAllConversations[0][0]) {
                // console.log(row.date, 'row date')
                // let i = 0
                // while (i < arrayAllConversations.length) {
                    
                // }
                // arrayAllConversations.forEach(conversations => {
                //     console.log(conversations[conversations.length - 1].date, 'arr date')
                // })
                chats = arrayAllConversations

                let matchsChecked = []

                rows.forEach(row => {
                    let alreadyChecked = 1
                    chats.forEach(chat => {
                        if (chat[chat.length - 1].sender_id === row.user1 && chat[chat.length - 1].receiver_id === row.user2 || chat[chat.length - 1].sender_id === row.user2 && chat[chat.length - 1].receiver_id === row.user1) {
                            alreadyChecked = 0
                            return
                        }
                    })
                    if (alreadyChecked === 1)
                        matchsChecked.push(row)
                })

                let i = 0

                while (i < matchsChecked.length) {
                    matchsChecked[i].sender_id = matchsChecked[i].user1
                    matchsChecked[i].receiver_id = matchsChecked[i].user2
                    matchsChecked[i].match_id = matchsChecked[i].id
                    i++
                }

                i = 0
                if (matchsChecked[0]) {
                    chats.forEach(chat => {
                        if (i !== -1) {
                            if (chat[chat.length - 1].date < matchsChecked[i].date) {
                                chats.unshift(matchsChecked[i])
                                i++
                                if (i > matchsChecked.length - 1)
                                    i = -1
                            }
                        }
                    })
                }
            }
            else {
                rows.forEach(row => {
                    row.sender_id = row.user1
                    row.receiver_id = row.user2
                    row.match_id = row.id
                    chats.push(row)
                })
            }
            res.json(chats)
        })
    })
})

router.post('/find_match_info', (req, res) => {
    const usersMatchedId = req.body.usersMatched
    // console.log(usersMatchedId, 'here')
    req.db.query(`SELECT id, username, picture1 FROM Users WHERE id IN (?);`,
    [usersMatchedId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        let data = rows
        req.db.query("SELECT date FROM Matchs WHERE user1 = ? AND user2 IN (?) OR user1 IN (?) AND user2 = ?;",
        [req.body.userLogin, usersMatchedId, usersMatchedId, req.body.userLogin], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err));
            for (let i = 0; i < data.length; i++) {
                data[i].date = Object.values(rows[i])[0]
            }
            // console.log(data, 'rehe')
            let usersInfo = []
            let i = 0
            while (i < usersMatchedId.length) {
                let y = 0
                while (data[y].id !== usersMatchedId[i])
                    y++
                usersInfo.push(data[y])
                i++
            }
            // console.log(usersInfo, 'good')

            res.json(usersInfo);
        })
    })
})

router.post('/submit_form_chat', (req, res) => {
    req.db.query('INSERT INTO Chat (match_id, sender_id, receiver_id, message) VALUES (?, ?, ?, ?);',
    [req.body.matchId, req.body.senderId, req.body.receiverId, req.body.message], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        req.db.query('SELECT * FROM Chat WHERE match_id = ? ORDER BY date;',
        [req.body.matchId], (err, rows, fields) => {
            res.json(rows)
        })
    })
})



module.exports = router