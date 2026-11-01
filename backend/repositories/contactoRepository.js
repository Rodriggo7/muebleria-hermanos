
import Contacto from '../models/Contacto.js';

class ContactoRepository {
  async create(datosContacto) {
    return await Contacto.create(datosContacto);
  }
}

export default new ContactoRepository();
