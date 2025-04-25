const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Producto = require('./models/producto');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/prueba')
    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch(err => console.error('Error al conectar MongoDB:', err));

// Rutas

// GET - Obtener todos los productos
app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// POST - Crear un nuevo producto
app.post('/productos', async (req, res) => {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
});

// PUT - Actualizar un producto completamente
app.put('/productos/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PATCH - Actualizar parcialmente un producto
app.patch('/productos/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Eliminar un producto
app.delete('/productos/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});