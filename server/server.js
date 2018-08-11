const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const routerDbQuery = require('./routes/dbQuery')
const routerLogIn = require('./routes/logIn')
const routerChat = require('./routes/chat')
const routerProfile = require('./routes/profile.js')
const routerSettings = require('./routes/settings.js')

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
app.use(routerChat)
app.use(routerProfile)
app.use(routerSettings)


app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})