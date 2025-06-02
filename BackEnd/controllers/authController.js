// No longer need bcrypt here directly for hashing, model handles it.
// bcrypt is still used by the model's validPassword method, but not directly in controller.
const jwt = require('jsonwebtoken');
// Import User model and Sequelize class from models/index.js
const { User, Sequelize } = require('../models'); 
require('dotenv').config(); // Ensure environment variables are loaded

const authController = {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Validate input (basic presence check)
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      // Create user with Sequelize - password hashing is handled by the model's beforeCreate hook
      // Pass the plain password directly.
      const newUser = await User.create({ name, email, password });

      // Respond with success (excluding password)
      res.status(201).json({
        message: 'User created successfully',
        userId: newUser.id,
        name: newUser.name, // Include name in the response
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      });

    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        // Extract specific message if available (e.g., from model definition)
        const message = error.errors && error.errors[0] && error.errors[0].message 
                        ? error.errors[0].message 
                        : 'Email address already in use.';
        return res.status(409).json({ message });
      }
      if (error instanceof Sequelize.ValidationError) {
        // Concatenate validation error messages
        const messages = error.errors.map(e => e.message).join(', ');
        return res.status(400).json({ message: messages });
      }
      // Pass other errors (e.g., database connection issues) to the centralized error handler
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password: plainPasswordFromRequest } = req.body;

      // Validate input
      if (!email || !plainPasswordFromRequest) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      // Find user by email using Sequelize
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials (user not found).' });
      }

      // Compare passwords using the model's instance method
      const isValidPassword = await user.validPassword(plainPasswordFromRequest);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials (password mismatch).' });
      }

      // Generate JWT
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        const err = new Error('JWT_SECRET is not defined. Critical server configuration issue.');
        err.statusCode = 500;
        console.error(err.message); 
        return next(err);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email }, // Payload
        jwtSecret,
        { expiresIn: '1h' } // Options e.g. token expires in 1 hour
      );

      res.status(200).json({ token, userId: user.id, email: user.email });

    } catch (error) {
      // Pass other errors to the centralized error handler
      next(error);
    }
  },
};

module.exports = authController;
