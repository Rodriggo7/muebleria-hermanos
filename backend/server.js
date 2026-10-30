import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/productoRoutes.js';
import connectDatabase from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/productos', productoRoutes);
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }));
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;
connectDatabase().then(() => {
  app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));
}).catch((error) => {
  console.error('No se pudo iniciar la API:', error.message);
  process.exitCode = 1;
});
