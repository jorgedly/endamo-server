const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mysql = require('mysql');

const conn = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b1b832c59e4ff9',
    password: '5c27b58e',
    database: 'heroku_a0e0bff8d195685'
});

app.get('/', (req, res) => {
    let sql = "SELECT * FROM Usuario";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))