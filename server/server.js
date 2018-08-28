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
    socket.on('writeMessage', data => {
        console.log(data)
        if (data.message)
            console.log('...')
        io.sockets.emit('displayWrite', data)
    })
    socket.on('newMessage', data => {
        console.log(data)
        io.sockets.emit('displayMessage', data)
    }) 
})