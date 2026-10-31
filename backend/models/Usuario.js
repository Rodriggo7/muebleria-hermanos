import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
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
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      select: false
    }
  },
  {
    timestamps: true
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
