export const errorHandler = (err, req, res, next) => {
  console.error(`[Error API] ${req.method} ${req.url} - ${err.message}`);

  let statusCode = err.statusCode || 500;

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    statusCode = 400;
  }

  const esErrorServidor = statusCode === 500;

  res.status(statusCode).json({
    error: esErrorServidor ? 'Error interno del servidor' : (err.name || 'Solicitud inválida'),
    mensaje: esErrorServidor
      ? 'Ocurrió un problema al procesar la solicitud. Nuestros artesanos están trabajando en ello.'
      : err.message,
  });
};

export default errorHandler;