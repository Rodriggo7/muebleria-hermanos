import { Router } from 'express';
import productoController from '../controllers/productoController.js';

const router = Router();

router.get('/', (req, res, next) => productoController.getProductos(req, res, next));
router.get('/:id', (req, res, next) => productoController.getProductoById(req, res, next));
router.post('/', (req, res, next) => productoController.crearProducto(req, res, next));
router.put('/:id', (req, res, next) => productoController.actualizarProducto(req, res, next));
router.delete('/:id', (req, res, next) => productoController.eliminarProducto(req, res, next));

export default router;