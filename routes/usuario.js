const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/listado', (req, res) => {
    let sql = `SELECT * FROM Usuario`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT nombre FROM Usuario WHERE email='${email}' AND password='${password}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.send({ auth: true, user: true, nombre: results[0].nombre });
        } else {
            let sql2 = `SELECT nombre FROM Empresa WHERE email='${email}' AND password='${password}'`;
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

router.post('/register', (req, res) => {
    const { email, username, password, avatar } = req.body;
    let sql = `INSERT INTO Usuario (email, username, password, avatar) VALUES ('${email}','${username}','${password}', '${avatar}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ 'success': false });
        } else {
            res.send({ 'success': true });
        }
    });
});

module.exports = router;