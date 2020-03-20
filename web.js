const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./conexion');
const indexRoutes = require('./routes/index');
const usuarioRoutes = require('./routes/usuario');
const productoRoutes = require('./routes/producto');
const empresaRoutes = require('./routes/empresa');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('', indexRoutes);
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

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`))