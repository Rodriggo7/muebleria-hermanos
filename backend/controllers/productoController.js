import productoService from '../services/productoService.js';

export class ProductoController {
  // GET /api/productos
  async getProductos(req, res, next) {
    try {
      const productos = await productoService.obtenerProductos();
      res.status(200).json(productos);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/productos/:id
  async getProductoById(req, res, next) {
    try {
      const { id } = req.params;
      const producto = await productoService.obtenerProductoPorId(id);
      res.status(200).json(producto);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/productos
  async crearProducto(req, res, next) {
    try {
      const nuevoProducto = await productoService.crearProducto(req.body);
      res.status(201).json({
        mensaje: 'Pieza creada exitosamente en el taller.',
        producto: nuevoProducto,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/productos/:id
  async actualizarProducto(req, res, next) {
    try {
      const { id } = req.params;
      const productoActualizado = await productoService.actualizarProducto(id, req.body);
      res.status(200).json({
        mensaje: 'Pieza actualizada exitosamente.',
        producto: productoActualizado,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/productos/:id
  async eliminarProducto(req, res, next) {
    try {
      const { id } = req.params;
      const productoEliminado = await productoService.eliminarProducto(id);
      res.status(200).json({
        mensaje: 'Pieza dada de baja exitosamente (soft delete).',
        producto: productoEliminado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductoController();