
import contactoService from '../services/contactoService.js';

export const enviarMensaje = async (req, res, next) => {
  try {
    const contacto = await contactoService.enviarMensaje(req.body);

    return res.status(201).json({
      mensaje: 'Tu mensaje fue recibido correctamente.',
      contacto
    });
  } catch (error) {
    next(error);
  }
};
