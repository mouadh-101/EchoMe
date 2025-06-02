// Centralized Error Handling Middleware

// Load environment variables to access NODE_ENV
require('dotenv').config();

const errorHandler = (err, req, res, next) => {
  // Log the error stack for debugging purposes
  // In a production environment, you might want to log to a file or a logging service
  console.error(err.stack || err.message || err); // Log stack if available, otherwise message or error object

  const statusCode = err.statusCode || 500;
  const status = statusCode >= 500 ? 'error' : 'fail'; // 'error' for server errors, 'fail' for client errors (4xx)

  const responseBody = {
    status: status,
    statusCode: statusCode,
    message: err.message || 'An unexpected error occurred.',
  };

  // Include stack trace in development mode only for debugging
  // Be cautious about exposing stack traces in production due to security concerns
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};

module.exports = errorHandler;
