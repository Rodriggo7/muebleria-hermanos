
import contactoRepository from '../repositories/contactoRepository.js';

function crearError(mensaje, statusCode = 400) {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
}

class ContactoService {
  async enviarMensaje(datos) {
    const nombre = datos.nombre?.trim();
    const email = datos.email?.trim().toLowerCase();
    const mensaje = datos.mensaje?.trim();

    if (!nombre || nombre.length < 2 || nombre.length > 80) {
      throw crearError('El nombre debe tener entre 2 y 80 caracteres.');
    }

    if (!email || email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw crearError('Ingresá un email válido.');
    }

    if (!mensaje || mensaje.length < 10 || mensaje.length > 2000) {
      throw crearError('El mensaje debe tener entre 10 y 2000 caracteres.');
    }

    const contacto = await contactoRepository.create({
      nombre,
      email,
      mensaje
    });

    return {
      id: contacto._id,
      nombre: contacto.nombre,
      email: contacto.email,
      mensaje: contacto.mensaje,
      creadoEn: contacto.createdAt
    };
  }
}

export default new ContactoService();
