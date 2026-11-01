import bcrypt from 'bcryptjs';
import usuarioRepository from '../repositories/usuarioRepository.js';

function crearError(mensaje, statusCode = 400) {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
}

class UsuarioService {
  async registrarUsuario(datos) {
    const nombre = datos.nombre?.trim();
    const email = datos.email?.trim().toLowerCase();
    const password = datos.password;

    if (!nombre || nombre.length < 2 || nombre.length > 80) {
      throw crearError('El nombre debe tener entre 2 y 80 caracteres.');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw crearError('Ingresá un email válido.');
    }

    if (typeof password !== 'string' || password.length < 8) {
      throw crearError('La contraseña debe tener al menos 8 caracteres.');
    }

    const usuarioExistente = await usuarioRepository.findByEmail(email);

    if (usuarioExistente) {
      throw crearError('Ya existe una cuenta con ese email.', 409);
    }

    const passwordCifrada = await bcrypt.hash(password, 12);

    const usuario = await usuarioRepository.create({
      nombre,
      email,
      password: passwordCifrada
    });

    return {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email
    };
  }
}

export default new UsuarioService();
