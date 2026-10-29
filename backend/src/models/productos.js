import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del producto es obligatorio'] 
    },
    descripcion: { 
        type: String 
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'] 
    },
    stock: { 
        type: Number, 
        default: 0 
    },
    imageUrl: { 
        type: String 
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);