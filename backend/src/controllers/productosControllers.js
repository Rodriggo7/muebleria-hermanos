import { Producto } from '../models/producto.js';

// 1. Obtener todos los productos (GET)
export const getProducto = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

// 2. Obtener un producto por ID (GET /:id)
export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
    }
};

// 3. Crear un nuevo producto (POST)
export const createProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// 4. Actualizar un producto (PUT /:id)
export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// 5. Eliminar un producto (DELETE /:id)
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};