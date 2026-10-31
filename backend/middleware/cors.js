import cors from 'cors';

const CLIENT_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const corsMiddleware = cors({
  origin: [CLIENT_URL, 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false,
});

export default corsMiddleware;