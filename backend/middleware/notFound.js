export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Recurso no encontrado',
    mensaje: `La ruta '${req.originalUrl}' no existe en la casa taller.`,
  });
};

export default notFoundHandler;