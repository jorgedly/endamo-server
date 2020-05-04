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

//insertar Entrega
router.post('/entrega', (req, res) => {
    const { entregado, usuario_id_usuario, factura_id_factura} = req.body;
    let sql = `INSERT INTO entrega(entregado, usuario_id_usuario, factura_id_factura) VALUES (${entregado},${usuario_id_usuario}, ${factura_id_factura})`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({'success': 0});
        } else {
            res.send({'success': 1});
        }
    });
});

//ver mis Entregas
router.get('/entrega/:id', (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM entrega where usuario_id_usuario = '${id}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

module.exports = router;