const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Producto = require('./models/producto')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//conectar a MongoDB(local)
mongoose.connect('mongodb://127.0.0.1:27017/prueba')
  .then(() => console.log('Conectado correctamente a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB'))

//Rutas
//Get - Obtener Datos
app.get('/productos', async(req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})