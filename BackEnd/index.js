// Load environment variables from .env file
require('dotenv').config();

// Import required packages and modules
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const audioRoute = require('./routes/audio');
const toDoListRoute= require('./routes/toDoList');
const errorHandler = require('./middleware/errorHandler');
const initializeDatabase = require('./config/initDb');
const { testConnection, sequelize } = require('./config/database');

// Create Express application
const app = express();

// ===== Middleware Setup =====
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// This middleware parses JSON data from incoming requests
app.use(express.json());

// ===== Route Setup =====
// Authentication routes (signup, login)
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoute);
app.use('/api/todoList', toDoListRoute);

// ===== Error Handling =====
// Handle 404 errors - when a route is not found
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.originalUrl}`
  });
});

// Global error handler - catches all errors
app.use(errorHandler);

// ===== Server Configuration =====
const PORT = process.env.PORT ;

// Start the server
async function startServer() {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize database tables
    await initializeDatabase();
    
    // Start listening for requests
    await sequelize.sync();
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();
