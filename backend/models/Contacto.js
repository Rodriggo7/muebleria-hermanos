
import mongoose from 'mongoose';

const contactoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      lowercase: true,
      maxlength: 120,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido']
    },
    mensaje: {
      type: String,
      required: [true, 'El mensaje es obligatorio'],
      trim: true,
      minlength: 10,
      maxlength: 2000
    }
  },
  {
    timestamps: true
  }
);

const Contacto = mongoose.model('Contacto', contactoSchema);

export default Contacto;
