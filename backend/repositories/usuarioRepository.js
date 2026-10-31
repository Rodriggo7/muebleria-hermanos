import Usuario from '../models/Usuario.js';

class UsuarioRepository {
  async create(datosUsuario) {
    return await Usuario.create(datosUsuario);
  }

  async findByEmail(email) {
    return await Usuario.findOne({ email }).select('+password');
  }
}

export default new UsuarioRepository();
