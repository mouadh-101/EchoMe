const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = {
  verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      // Extract token from "Bearer <token>"
      token = authHeader.substring(7, authHeader.length);
    } else if (req.headers['x-access-token']) {
      // Fallback for x-access-token header (optional)
      token = req.headers['x-access-token'];
    } else if (req.query.token) {
      // Fallback for token in query parameters (optional, generally not recommended for Authorization)
      token = req.query.token;
    }


    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined. Please set it in your .env file.');
      // Do not expose details about JWT_SECRET missing to the client for security reasons
      return res.status(500).json({ message: 'Authentication configuration error.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Failed to authenticate token. Token has expired.' });
        }
        if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Failed to authenticate token. Invalid token.' });
        }
        // For other errors during verification
        return res.status(401).json({ message: 'Failed to authenticate token.' });
      }

      // If token is valid, attach decoded payload to request object
      // The payload typically contains user identifiers like id or email
      req.userId = decoded.userId; // Assuming your JWT payload has userId
      req.userEmail = decoded.email; // Assuming your JWT payload has email

      next(); // Pass control to the next middleware or route handler
    });
  }
};

module.exports = authMiddleware;
