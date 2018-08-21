const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios")


const routerDbQuery = require('./routes/dbQuery')
const routerLogIn = require('./routes/logIn')
const routerProfile = require('./routes/profile')
const routerChat = require('./routes/chat')
const routerMatch = require('./routes/match')
const routerSettings = require('./routes/settings')

const app = express()

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())
app.use((req, res, next) => {
    req.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '00000000',
        database: 'Matcha'
    });
    next();
});

app.use(routerDbQuery)
app.use(routerLogIn)
app.use(routerProfile)
app.use(routerChat)
app.use(routerMatch)
app.use(routerSettings)


app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})






var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3002)

io.on('connection', (socket) => {
    // let userId
    // let chaterId
    // socket.on('chatUsers', data => {
    //     console.log(data)
    //     userId = data.user
    //     chaterId = data.chater
    // })
    socket.on('writeMessage', data => {
        console.log(data)
        io.sockets.emit('displayWrite', data)
    })
    socket.on('newMessage', data => {
        console.log(data)
        io.sockets.emit('displayMessage', data)
    }) 
})

// io.on('connection', function (socket) {
//     io.emit('this', { will: 'be received by everyone'});

//     socket.on('private message', function (from, msg) {
//         console.log('I received a private message by ', from, ' saying ', msg);
//     });

//     socket.on('disconnect', function () {
//         io.emit('user disconnected');
// });



// const server = http.createServer(app)
// const io = socketIo(server)
// const port = 3002



// io.on('connection', function(socket) {
//     authorize (socket, function(shop_id) {
//         setInterval(function() {
//             var lastCreated = toMySQLDate(new Date());
//             var sql = "SELECT * FROM `stats` WHERE `shop_id` = " + connection.escape(shop_id) +
//             " AND `created` > " + lastCreated + " ORDER BY `created` DESC";
//             var query = connection.query(sql, function(err, rows, fields) {
//                 if (err == null) {
//                     if (rows.length) {
//                         lastCreated = toMySQLDate(rows[0].created);
//                     }
//                     console.log (rows);
//                     socket.emit('newData', rows);
//                 }
//             });
//         }, 2000);
//     });
// });

// function toMySQLDate(date) {
//     return date.toISOString().slice(0, 19).replace('T', ' ');
// }

// io.on("connection", socket => {
//     console.log(socket.handshake.headers.cookie, 'HERE')
//     console.log("New client connected"), setInterval(
//       () => getApiAndEmit(socket),
//       1000
//     )
//     socket.on("disconnect", () => console.log("Client disconnected"))
//   })

//   const getApiAndEmit = async socket => {
//     // try {
//         const res = await connect.query('select * from Users', function(err, result) {
//             if(err) { throw new Error('Failed')}
//             return result
//             socket.emit('changed', result)
//         });
//         // const res = await axios.post("http://localhost:3001/chat_conversation", {
//         //                 "userId": req.cookies('id')
//         //             })
//         console.log(res)
//         socket.emit("FromAPI", res)
//     // } catch (error) {
//     //   console.error(`Error: ${error.code}`)
//     // }
// }
// server.listen(port, () => console.log(`Listening on port ${port}`))