// Centralized Error Handling Middleware

// Load environment variables to access NODE_ENV
require('dotenv').config();

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.errors.map(e => e.message).join(', ')
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status: 'error',
      message: 'Email address already in use'
    });
  }

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
