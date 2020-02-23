const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

//app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b1b832c59e4ff9',
    password: '5c27b58e',
    database: 'heroku_a0e0bff8d195685'
});

app.get('/users', (req, res) => {
    let sql = `SELECT * FROM Usuario`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/login', (req, res) => {
    const datos = req.body;
    const username = datos.username;
    const password = datos.password;
    let sql = `SELECT 1 FROM Usuario WHERE username='${username}' AND password='${password}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        if(results.length === 1) {
            res.send({auth:true, token:123, username, password});
        } else {
            res.send({auth:false, "username":username,"password": password});
        }
    });
});

app.post('/register', (req, res) => {
    const datos = req.body;
    const username = datos.username;
    const password = datos.password;
    const email = datos.email;
    const avatar = datos.avatar;
    let sql = `INSERT INTO Usuario2 (username, password) VALUES ('${username}','${password}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({"dato": "MAL", "errores": err});
            //res.send({'success': false});
        } else {
            res.send({"dato": "BIEN", "results": results});
            //res.send({'success': true});
        }
    });
});

app.post('/registerE', (req, res) => {
    const datos = req.body;
    const username = datos.username;
    const password = datos.password;
    const email = datos.email;
    let sql = `INSERT INTO Empresa (username, email, password) VALUES ('${username}','${email}','${password}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({'success': false});
        } else {
            res.send({'success': true});
        }
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))