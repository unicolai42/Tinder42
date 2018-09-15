const mysql = require('mysql')

const req = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00000000',
    ssl  : {
        ca : fs.readFileSync('database_tinder42.sql')
    }    
})

// req.db.query("UPDATE Users SET latitude = ?, longitude = ? WHERE id = ?;",
// [latitude, longitude, req.body.userId], (err, rows, fields) => {
//     if (err)
//         return (res.send(err) && console.log(err))
    
//     res.end()
// })