import usuarioService from '../services/usuarioService.js';

export const registrarUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.registrarUsuario(req.body);

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente.',
      usuario
    });
  } catch (error) {
    next(error);
  }
};
