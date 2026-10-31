import 'dotenv/config';
import express from 'express';

import corsMiddleware from './middleware/cors.js';
import loggerMiddleware from './middleware/logger.js';
import notFoundHandler from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

import productoRoutes from './routes/productoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import connectDatabase from './config/database.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo iniciar la API:', error.message);
    process.exitCode = 1;
  });
