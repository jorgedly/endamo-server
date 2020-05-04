const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./conexion');
const usuarioRoutes = require('./routes/usuario');
const productoRoutes = require('./routes/producto');
const empresaRoutes = require('./routes/empresa');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/usuario', usuarioRoutes);
app.use('/producto', productoRoutes);
app.use('/empresa', empresaRoutes);

app.get('/getIdEmpresa/:email', (req, res) => {
    const { email } = req.params;
    let SQLquery = `SELECT idEmpresa FROM Empresa WHERE email = '${email}'`;
    let response = conn.query(SQLquery, (err, results) => {
        if (!err) {
            res.json(results[0]);
        }
        else
            res.json({ 'Error:': 'User not found' });
    })
})

app.post('/addProduct', (req, res) => {
    const { name, price, amount, id } = req.body;
    let SQLquery = `INSERT INTO producto(nombre,precio,cantidad,empresa_idEmpresa) VALUES ('${name}',${price},${amount},${id})`;
    let result = conn.query(SQLquery, (err, results) => {
        if (!err) {
            res.json({ 'Response:': 'Product added correctly' });
        } else
            res.json({ 'Response:': 'Error' });

    })
})

//Listar los productos
app.get('/listaProdutos/:id', (req, res) => {

    const empresa = req.params.id;
    let sql = `SELECT * FROM producto where empresa_idEmpresa = '${empresa}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// elimino el producto
app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM producto WHERE idProducto = '${[id]}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            err.json({ messaje: "Erro al eliminar producto" });
        } else {
            res.json({ message: "El producto se ha eliminado" });
        }
    })
});

// editar productos
app.put('/editar/producto/:id', (req, res) => {

    const { id } = req.params;
    const producto = req.body;

    let sql = `UPDATE producto set nombre = '${producto.name}', precio = ${producto.price}, cantidad = ${producto.amount} WHERE idProducto = ${id}`;
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });


});

// obtener un producto
app.get('/producto/:id', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM producto WHERE idProducto = '${[id]}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});


//ingresar promocion
app.post('/ingresarPromocion', (req, res) => {
    const { ActivoNoActivo,id_empresa, id_producto } = req.body;
    let SQLquery = `INSERT INTO promocion(ActivoNoActivo,id_empresa,id_producto) 
    VALUES (${ActivoNoActivo},${id_empresa},${id_producto})`;
    let result = conn.query(SQLquery, (err, results) => {
        if (!err) {
            res.json({ 'Response:': 'Product added correctly' });
        } else
            res.json({ 'Response:': 'Error' });
    })
});

// eliminar la promocion
app.delete('/eliminarPromocion/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM promocion WHERE id_promocion = '${[id]}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            err.json({ messaje: "Erro al eliminar promocion" });
        } else {
            res.json({ message: "La promoción se ha eliminado" });
        }
    })
});


//obtener las promociones de cada empresa
app.post('/promocion', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM promocion WHERE activo = 1 AND id_empresa = '${id}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

//obtener las promociones activas
app.get('/promocion', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM promocion WHERE activo = 1`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});


//obtener el reporte mas vendido
app.get('/reporteTopProductoMasVendido ', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM promocion WHERE activo = 1`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

//obtener el reporte menos vendido
app.get('/reporteTopProductoMenosVendido ', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM promocion WHERE activo = 1`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.post('/getId', (req,res )=>{
    const { email } = req.body;

    let sql = `SELECT id_usuario FROM usuario WHERE email = '${email}'`;
    let query = conn.query(sql, (err, results) => {
        if(err) res.send({'Error': err});

        res.send(results);
    });
})

//insertar factura
app.post('/crearFactura', (req, res) => {
    const { fecha, id_usuario, total, nit, nombre } = req.body;
    let sql = `INSERT INTO factura(fecha,id_usuario,total,nit,nombre) VALUES ('${fecha}',${id_usuario},${total},'${nit}','${nombre}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ 'creado': 0 });
        } else {
            res.send({ 'creado': results.insertId  });
        }
    });
});

//insertar detalle factura
app.post('/crearDetalleFactura', (req, res) => {
    const { id_factura, id_producto, cantidad} = req.body;
    let sql = `INSERT INTO detalle_factura(id_factura,id_producto,cantidad) VALUES (${id_factura},${id_producto},${cantidad})`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({'success': 0});
        } else {
            res.send({'success': 1});
        }
    });
});

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`))