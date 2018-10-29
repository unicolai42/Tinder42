const express = require('express')
const router = express.Router()


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
        })
        arrayAllConversations.push(arrayConversation)
        console.log(arrayAllConversations, 'llllllaaaaaaaaaa') ///////////////////////////////////////////////////////

        req.db.query("SELECT * FROM Matchs WHERE user1 = ? OR user2 = ? ORDER BY date;",
        [req.body.user, req.body.user], (err, rows, fields) => {
            if (err)
                return (res.send(err) && console.log(err))
            
            let chats = []

            if (arrayAllConversations[0][0]) {
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
                console.log(matchsChecked)
                if (matchsChecked[0]) {
                    chats.forEach(chat => {
                        if (i !== -1) {
                            console.log(chat[chat.length - 1].date, matchsChecked[i].date)
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
            // console.log(chats[0], 'eeee')
            res.json(chats)
        })
    })
})

router.post('/find_match_info', (req, res) => {
    const usersMatchedId = req.body.usersMatched

    req.db.query(`SELECT * FROM Users WHERE id IN (?);`,
    [usersMatchedId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        let data = rows
        req.db.query("SELECT * FROM Matchs WHERE user1 = ? AND user2 IN (?);",
        [req.body.userLogin, usersMatchedId], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err))
            
            let y = 0

            for (let i = 0; i < rows.length; i++) {
                if (data[y]) {
                    data[y].date = rows[i].date
                    data[y].readNotif = rows[i].read_match_1
                    y++
                }
            }

            req.db.query("SELECT * FROM Matchs WHERE user1 IN (?) AND user2 = ?;",
            [usersMatchedId, req.body.userLogin], (err, rows, fields) => {
                if(err)
                    return(res.send(err) && console.log(err))

                for (let i = 0; i < rows.length; i++) {
                    data[y].date = rows[i].date
                    data[y].readNotif = rows[i].read_match_2
                    y++
                }

                let usersInfo = []
                let i = 0
                while (i < usersMatchedId.length) {
                    let y = 0
                    while (data[y].id !== usersMatchedId[i])
                        y++
                    usersInfo.push(data[y])
                    i++
                }
                res.json(usersInfo)
                // let usersId = []
                // usersInfo.forEach((e) => {
                //     usersId.push(e.id)
                // })

                // req.db.query("SELECT * FROM Chat WHERE sender_id IN (?) AND receiver_id = ? OR sender_id = ? AND receiver_id IN (?) ORDER BY date DESC;",
                // [usersId, req.body.userLogin, req.body.userLogin, usersId], (err, rows, fields) => {
                //     if(err)
                //         return(res.send(err) && console.log(err))
                    
                //     let usersInfoDateChat = usersInfo

                //     usersInfo.forEach((userInfo, i) => {
                //         rows.forEach((chat) => {
                //             if ((userInfo.id === chat.sender_id && req.body.userLogin === chat.receiver_id) || (userInfo.id === chat.receiver_id && req.body.userLogin === chat.sender_id)) {
                //                 if (chat.date > userInfo.date) {
                //                     usersInfoDateChat[i].date = chat.date                               
                //                 }
                //             }
                //         })
                //         if (i === usersInfo.length - 1) {
                //             let swap
                //             for (let i = 0; i < usersInfoDateChat.length; i++) {
                //                 for (let j = 1; j < usersInfoDateChat.length; j++) {
                //                     if (usersInfoDateChat[j].date < usersInfoDateChat[j - 1].date) {
                //                         swap = usersInfoDateChat[j]
                //                         usersInfoDateChat[j] = usersInfoDateChat[j - 1]
                //                         usersInfoDateChat[j - 1] = swap
                //                     }
                //                 }
                //                 if (i === usersInfoDateChat.length - 1)
                //                     res.json(usersInfoDateChat)
                //             }
                //         }
                //     })
                // })
            })
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

router.post('/load_notifications', (req, res) => {
    req.db.query('SELECT COUNT (id) AS nbNotifs FROM Chat WHERE read_message = 0 AND receiver_id = ?;',
    [req.body.userId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err));
        
        let nbNotifs = rows[0].nbNotifs
        
        req.db.query('SELECT COUNT (id) AS nbNotifs FROM Matchs WHERE (user1 = ? AND read_match_1 = 1) OR (user2 = ? AND read_match_2 = 1) ;',
        [req.body.userId, req.body.userId], (err, rows, fields) => {
            if(err)
                return(res.send(err) && console.log(err));
  
            nbNotifs += rows[0].nbNotifs
            res.json(nbNotifs)
        })
    })
})

router.post('/match_read', (req, res) => {
    req.db.query('SELECT * FROM Matchs WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?;',
    [req.body.userId, req.body.matcherId, req.body.matcherId, req.body.userId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err))

        if (rows[0].user1 === parseInt(req.body.userId, 10)) {
            req.db.query('UPDATE Matchs SET read_match_1 = 0 WHERE user1 = ? AND user2 = ?;',
            [req.body.userId, req.body.matcherId], (err, rows, fields) => {
                if(err)
                    return(res.send(err) && console.log(err))
                
                res.end()
            })
        }
        else {
            req.db.query('UPDATE Matchs SET read_match_2 = 0 WHERE user2 = ? AND user1 = ?;',
            [req.body.userId, req.body.matcherId], (err, rows, fields) => {
                if(err)
                    return(res.send(err) && console.log(err))
                
                res.end()
            })
        }
    })
})

router.post('/chat_read', (req, res) => {
    req.db.query('UPDATE Chat SET read_message = 1 WHERE sender_id = ? AND receiver_id = ?;',
    [req.body.matcherId, req.body.userId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err))

        res.end()
    })
})

router.post('/get_users_connected', (req, res) => {
    req.db.query('SELECT * FROM ConnectedUsers WHERE user1 = ? OR user2 = ?;',
    [req.body.userId, req.body.userId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err))
        
        let usersConnected = []
        rows.forEach(elem => {
            if (elem.user1 !== parseInt(req.body.userId, 10)) {
                const i = usersConnected.indexOf(elem.user1)
                if (i === -1)
                  usersConnected.push(elem.user1)
            }
            else if (elem.user2 !== parseInt(req.body.userId, 10)) {
                const i = usersConnected.indexOf(elem.user2)
                if (i === -1)
                    usersConnected.push(elem.user2)             
            }
        })
        res.json(usersConnected)
    })
})

router.post('/add_new_user_connected', (req, res) => {
    req.db.query('INSERT INTO ConnectedUsers (user1, user2) VALUES (?, ?);',
    [req.body.userSignInId, req.body.userAlreadySignInId], (err, rows, fields) => {
        if(err)
            return(res.send(err) && console.log(err))
        res.end()
    })
})


module.exports = router