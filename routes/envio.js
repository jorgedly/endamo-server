const express = require("express");
const router = express.Router();
const conn = require('../conexion');


//insertar Domicilio
router.post('/domiciliio', (req, res) => {
    const { avenida, zona, numero_casa, usuario_id_usuario} = req.body;
    let sql = `INSERT INTO direccion(avenida,zona,numero_casa, usuario_id_usuario) VALUES ('${avenida}','${zona}', '${numero_casa}', ${usuario_id_usuario})`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({'success': 0});
        } else {
            res.send({'success': 1});
        }
    });
});

module.exports = router;