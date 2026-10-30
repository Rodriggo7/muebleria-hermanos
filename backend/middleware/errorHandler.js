export default function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = Number(error.statusCode || error.status) || 500;
  res.status(status).json({ message: status >= 500 ? 'Ocurrió un error en el servidor.' : error.message });
}
