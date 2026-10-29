import Product from '../models/Product.js';

export class ProductoRepository {
  // 1. Obtener productos activos (opción de incluir dados de baja si se requiere en admin)
  async findAll(incluirEliminados = false) {
    const filtro = incluirEliminados ? {} : { activo: true };
    return await Product.find(filtro);
  }

  // 2. Buscar un producto activo por su ID de MongoDB
  async findById(id, incluirEliminados = false) {
    const filtro = incluirEliminados ? { _id: id } : { _id: id, activo: true };
    return await Product.findOne(filtro);
  }

  // 3. Crear un nuevo producto (se guarda activo por defecto)
  async create(datosProducto) {
    return await Product.create({ ...datosProducto, activo: true });
  }

  // 4. Actualizar un producto activo
  async update(id, datosActualizados) {
    return await Product.findOneAndUpdate(
      { _id: id, activo: true },
      datosActualizados,
      { new: true, runValidators: true }
    );
  }

  // 5. Soft Delete: Marca activo en false sin eliminar el documento físico
  async softDelete(id) {
    return await Product.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );
  }
}

export default new ProductoRepository();