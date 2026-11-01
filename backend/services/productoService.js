import mongoose from 'mongoose';
import productoRepository from '../repositories/productoRepository.js';
import { CATEGORIAS_PERMITIDAS } from '../Constants/categorias.js';

function crearError(mensaje, statusCode = 400) {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
}

function validarObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw crearError(
      'El identificador provisto no tiene un formato válido de MongoDB.'
    );
  }
}

function validarPrecio(precio) {
  if (
    precio === undefined ||
    precio === null ||
    precio === '' ||
    !Number.isFinite(Number(precio)) ||
    Number(precio) < 0
  ) {
    throw crearError(
      'El precio debe ser un valor numérico mayor o igual a cero.'
    );
  }
}

function validarStock(stock) {
  if (
    stock === undefined ||
    stock === null ||
    stock === '' ||
    !Number.isInteger(Number(stock)) ||
    Number(stock) < 0
  ) {
    throw crearError(
      'El stock debe ser un número entero mayor o igual a cero.'
    );
  }
}

export class ProductoService {
  async obtenerProductos() {
    return await productoRepository.findAll();
  }

  async obtenerProductoPorId(id) {
    validarObjectId(id);

    const producto = await productoRepository.findById(id);

    if (!producto) {
      throw crearError(
        'No se encontró la pieza solicitada en la casa taller.',
        404
      );
    }

    return producto;
  }

  async crearProducto(datosProducto) {
    const { nombre, precio, categoria, stock } = datosProducto;

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      throw crearError('El nombre de la pieza es obligatorio.');
    }

    validarPrecio(precio);
    validarStock(stock === undefined ? 0 : stock);

    if (!categoria || !CATEGORIAS_PERMITIDAS.includes(categoria)) {
      throw crearError(
        `La categoría es inválida. Categorías permitidas: ${CATEGORIAS_PERMITIDAS.join(', ')}.`
      );
    }

    return await productoRepository.create(datosProducto);
  }

  async actualizarProducto(id, datosActualizados) {
    validarObjectId(id);

    if (datosActualizados.precio !== undefined) {
      validarPrecio(datosActualizados.precio);
    }

    if (datosActualizados.stock !== undefined) {
      validarStock(datosActualizados.stock);
    }

    if (
      datosActualizados.categoria !== undefined &&
      !CATEGORIAS_PERMITIDAS.includes(datosActualizados.categoria)
    ) {
      throw crearError(
        `La categoría es inválida. Categorías permitidas: ${CATEGORIAS_PERMITIDAS.join(', ')}.`
      );
    }

    const productoActualizado = await productoRepository.update(
      id,
      datosActualizados
    );

    if (!productoActualizado) {
      throw crearError(
        'No se encontró la pieza que intenta modificar.',
        404
      );
    }

    return productoActualizado;
  }

  async eliminarProducto(id) {
    validarObjectId(id);

    const productoEliminado = await productoRepository.softDelete(id);

    if (!productoEliminado) {
      throw crearError(
        'No se encontró la pieza que intenta dar de baja.',
        404
      );
    }

    return productoEliminado;
  }
}

export default new ProductoService();
