const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const routerDbQuery = require('./routes/dbQuery')
const routerLogIn = require('./routes/logIn')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
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


app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})