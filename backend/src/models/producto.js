import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del producto es obligatorio'] 
    },
    descripcion: { 
        type: String 
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: { 
        type: Number, 
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    imageUrl: { 
        type: String,
        trim: true
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: {
            values: ['Almacenamiento', 'Asientos', 'Mesas', 'Dormitorio', 'Comedor', 'Oficina'],
            message: '{VALUE} no es una categoría válida'
        }
    },
    activo:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Producto = mongoose.model('Producto', productSchema);