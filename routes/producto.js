const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/listado', (req, res) => {
    let sql = `SELECT nombre,precio,cantidad,descripcion,imagen FROM Producto`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

module.exports = router;