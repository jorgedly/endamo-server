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
    const email = datos.email;
    const password = datos.password;
    let sql = `SELECT 1 FROM Usuario WHERE email='${email}' AND password='${password}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.send({ auth: true, user: true });
        } else {
            let sql2 = `SELECT 1 FROM Empresa WHERE email='${email}' AND password='${password}'`;
            let query2 = conn.query(sql2, (err2, results2) => {
                if (err2) throw err2;
                if (results2.length === 1) {
                    res.send({ auth: true, user: false });
                } else {
                    res.send({ auth: false });
                }
            });
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
            res.send({ 'success': false });
        } else {
            res.send({ 'success': true });
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
            res.send({ 'success': false });
        } else {
            res.send({ 'success': true });
        }
    });
});

app.get('/getID/:email',(req,res) => {
    const { email } = req.params;
    let SQLquery = `SELECT idEmpresa FROM Empresa WHERE email = '${email}'`;
    let response = conn.query(SQLquery,(err,results) => {
        if(!err){
            res.json(results[0]);
        }
        else
            res.json({'Error:': 'User not found'});
    })
})

app.post('/addProduct',(req,res) => {
    const {name, price, amount, id} = req.body;
    let SQLquery = `INSERT INTO producto(nombre,precio,cantidad,empresa_idEmpresa) VALUES ('${name}',${price},${amount},${id})`;
    let result = conn.query(SQLquery,(err,results) => {
        if(!err){
            res.json({'Response:': 'Product added correctly'});
        }else
            res.json({'Response:': 'Error'}); 
            
    })
})

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`))