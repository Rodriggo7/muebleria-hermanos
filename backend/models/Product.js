import mongoose from 'mongoose';
import { CATEGORIAS_PERMITIDAS } from '../Constants/categorias.js';

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, default: '', trim: true },
  precio: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true, enum: CATEGORIAS_PERMITIDAS },
  imagen: { type: String, default: '' },
  activo: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
