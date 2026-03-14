const ApiError = require('../utils/ApiError');

const notFound = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);

  const statusCode =
    err instanceof ApiError && err.statusCode
      ? err.statusCode
      : res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;

  const message =
    err instanceof ApiError && err.message
      ? err.message
      : 'An unexpected error occurred';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development'
      ? { stack: err.stack }
      : null)
  });
};

module.exports = {
  notFound,
  errorHandler
};