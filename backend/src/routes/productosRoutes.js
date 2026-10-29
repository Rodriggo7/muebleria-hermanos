import { Router } from 'express';
import { createProducto, 
    deleteProducto, 
    getProducto, 
    getProductoById, 
    updateProducto 
} from '../controllers/productosControllers.js';

const router = Router();

router.post('/', createProducto);
router.get('/', getProducto);
router.get('/:id', getProductoById);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;