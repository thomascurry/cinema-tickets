const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;

  res.status(status).json({
    status,
    response: err.message || "An unknown error occurred",
  });
};

export default errorHandler;