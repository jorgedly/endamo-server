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

router.get('/edit/:id',(req,res) => {
    const {id} = req.params;
    let sql = `SELECT * FROM empresa WHERE id_empresa=${id}`
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    })
})

module.exports = router;