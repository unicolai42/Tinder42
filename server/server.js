import bodyParser from 'body-parser'
import express from 'express'
import mysql from 'mysql'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const router = express.Router()

router.get('/users', (req, res) => {
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '00000000',
      database: 'Matcha'
  });

  db.query("SELECT * FROM Users;", (err, rows, fields) => {
      if(err)
          return(res.send(err));
      
      res.json(rows);
  });
});

app.use(router)
app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})