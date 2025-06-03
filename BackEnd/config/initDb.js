const { sequelize } = require('./database');
const User = require('../models/User');

// Initialize database tables
async function initializeDatabase() {
  try {
    // Sync all models with database
    // force: false - don't drop existing tables
    // alter: true - update tables if model changes
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized successfully');

    // Initialize any required data
    await initializeDefaultData();
    
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
}

// Initialize default data if needed
async function initializeDefaultData() {
  try {
    // Add any default data initialization here
    // For example: admin user, default settings, etc.
    console.log('✅ Default data initialized successfully');
  } catch (error) {
    console.error('❌ Default data initialization failed:', error.message);
    throw error;
  }
}

module.exports = initializeDatabase; 