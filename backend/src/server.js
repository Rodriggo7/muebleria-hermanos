import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONEXIÓN A BASE DE DATOS Y ARRANQUE ---
const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto: ${PORT}`);
    });
};

startServer();