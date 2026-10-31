export const errorHandler = (err, req, res, next) => {
  console.error(
    `[Error API] ${req.method} ${req.originalUrl} - ${err.message}`
  );

  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || err.status || 500;

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    statusCode = 400;
  }

  if (err.code === 11000) {
    statusCode = 409;
  }

  if (statusCode < 400 || statusCode > 599) {
    statusCode = 500;
  }

  const esErrorServidor = statusCode >= 500;

  res.status(statusCode).json({
    error: esErrorServidor
      ? 'Error interno del servidor'
      : statusCode === 409
        ? 'Conflicto de datos'
        : err.name || 'Solicitud inválida',
    mensaje: esErrorServidor
      ? 'Ocurrió un problema al procesar la solicitud. Nuestros artesanos están trabajando en ello.'
      : err.message,
  });
};

export default errorHandler;