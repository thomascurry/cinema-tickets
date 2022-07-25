const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    error: {
      status,
      message: err.message || "An unknown error occurred",
    }
  });
};

export default errorHandler;