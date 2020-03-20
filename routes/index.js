const express = require("express");
const router = express.Router();
const conn = require('../conexion');

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

module.exports = router;