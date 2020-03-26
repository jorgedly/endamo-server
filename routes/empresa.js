const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/listado', (req, res) => {
    let sql = `SELECT * FROM Empresa`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/register', (req, res) => {
    const { email, nombre, password } = req.body;
    let sql = `INSERT INTO Empresa (email, nombre, password) VALUES ('${email}','${nombre}','${password}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ 'success': false });
        } else {
            res.send({ 'success': true });
        }
    });
});

router.get('/edit/:email',(req,res) => {
    const {email} = req.params;
    let sql = `SELECT * FROM empresa WHERE email='${email}'`
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    })
})

router.post('/update',(req,res) => {
    const {id, name, password} = req.body;
    let sql = `UPDATE empresa SET nombre = '${name}', password = '${password}' WHERE id = ${id}`
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ 'success': false });
        } else {
            res.send({ 'success': true });
        }
    })
})

module.exports = router;