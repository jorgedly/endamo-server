const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const conn = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b1b832c59e4ff9',
    password: '5c27b58e',
    database: 'heroku_a0e0bff8d195685'
});

app.get('/products', (req, res) => {
    let sql = `SELECT nombre,precio,cantidad FROM Producto`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

app.get('/users', (req, res) => {
    let sql = `SELECT * FROM Usuario`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
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
            res.send({auth:true});
        } else {
            res.send({auth:false});
        }
    });
});

app.post('/register', (req, res) => {
    const datos = req.body;
    const email = datos.email;
    const username = datos.username;
    const password = datos.password;
    const avatar = datos.avatar;
    let sql = `INSERT INTO Usuario (email, username, password, avatar) VALUES ('${email}','${username}','${password}', '${avatar}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({'success': false});
        } else {
            res.send({'success': true});
        }
    });
});

app.post('/registerE', (req, res) => {
    const datos = req.body;
    const email = datos.email;
    const username = datos.username;
    const password = datos.password;
    let sql = `INSERT INTO Empresa (email, nombre, password) VALUES ('${email}','${username}','${password}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({'success': false});
        } else {
            res.send({'success': true});
        }
    });
});

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`))