// Load environment variables first
require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const initializeDatabase = require('./initDb'); // Import the DB initializer
// const { verifyToken } = require('./middleware/authMiddleware'); // Example if you have protected routes here

const app = express();

// Middleware Setup
app.use(express.json()); // To parse JSON request bodies

// Route Setup
app.use('/api/auth', authRoutes); // Authentication routes (signup, login)

// Example of a protected route (you'll need to create actual routes that use this)
/*
app.get('/api/protected-resource', verifyToken, (req, res) => {
  // This route is protected, and req.userId and req.userEmail are available
  res.json({ message: 'This is a protected resource.', user: { id: req.userId, email: req.userEmail } });
});
*/

// Not Found Handler (for routes that don't exist)
// This should be placed before the main error handler
app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: `Sorry, can't find ${req.originalUrl} on this server!` });
});

// Centralized Error Handling Middleware
// This should be the last piece of middleware added
app.use(errorHandler);

// Define Port
const PORT = process.env.PORT || 3000;

// Function to start the server
async function startServer() {
  try {
    await initializeDatabase(); // Wait for DB initialization
    // Note: initializeDatabase now logs its own success/failure messages.
    // If successful, it means the 'users' table is checked/created.
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // Error from initializeDatabase will be caught here
    console.error('Failed to initialize database. Server not started.', error.message);
    process.exit(1); // Exit if DB initialization fails, as it's a critical step
  }
}

// Start the server process
startServer();
