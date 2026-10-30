// backend/services/productoService.js
import mongoose from 'mongoose';
import productoRepository from '../repositories/productoRepository.js';
import { CATEGORIAS_PERMITIDAS } from '../Constants/categorias.js';

// Helper interno para validar el formato del ObjectId de MongoDB
function validarObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El identificador provisto no tiene un formato válido de MongoDB.');
    error.statusCode = 400;
    throw error;
  }
}

export class ProductoService {
  // 1. Obtener todos los productos activos
  async obtenerProductos() {
    return await productoRepository.findAll();
  }

  // 2. Obtener un producto activo por ID
  async obtenerProductoPorId(id) {
    validarObjectId(id);
    const producto = await productoRepository.findById(id);
    if (!producto) {
      const error = new Error('No se encontró la pieza solicitada en la casa taller.');
      error.statusCode = 404;
      throw error;
    }
    return producto;
  }

  // 3. Crear un nuevo producto
  async crearProducto(datosProducto) {
    const { nombre, precio, categoria } = datosProducto;

    if (!nombre || nombre.trim() === '') {
      const error = new Error('El nombre de la pieza es obligatorio.');
      error.statusCode = 400;
      throw error;
    }

    if (precio === undefined || isNaN(precio) || precio < 0) {
      const error = new Error('El precio debe ser un valor numérico mayor o igual a cero.');
      error.statusCode = 400;
      throw error;
    }

    if (!categoria || !CATEGORIAS_PERMITIDAS.includes(categoria)) {
      const error = new Error(`La categoría es inválida. Categorías permitidas: ${CATEGORIAS_PERMITIDAS.join(', ')}.`);
      error.statusCode = 400;
      throw error;
    }

    return await productoRepository.create(datosProducto);
  }

  // 4. Actualizar un producto existente
  async actualizarProducto(id, datosActualizados) {
    validarObjectId(id);

    if (datosActualizados.precio !== undefined) {
      if (isNaN(datosActualizados.precio) || datosActualizados.precio < 0) {
        const error = new Error('El precio debe ser un valor numérico mayor o igual a cero.');
        error.statusCode = 400;
        throw error;
      }
    }

    if (datosActualizados.categoria !== undefined && !CATEGORIAS_PERMITIDAS.includes(datosActualizados.categoria)) {
      const error = new Error(`La categoría es inválida. Categorías permitidas: ${CATEGORIAS_PERMITIDAS.join(', ')}.`);
      error.statusCode = 400;
      throw error;
    }

    const productoActualizado = await productoRepository.update(id, datosActualizados);

    if (!productoActualizado) {
      const error = new Error('No se encontró la pieza que intenta modificar.');
      error.statusCode = 404;
      throw error;
    }

    return productoActualizado;
  }

  // 5. Eliminar un producto (Soft Delete)
  async eliminarProducto(id) {
    validarObjectId(id);
    const productoEliminado = await productoRepository.softDelete(id);

    if (!productoEliminado) {
      const error = new Error('No se encontró la pieza que intenta dar de baja.');
      error.statusCode = 404;
      throw error;
    }

    return productoEliminado;
  }
}

export default new ProductoService();
