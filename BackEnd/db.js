const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // Explicitly state the dialect
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log SQL in dev, disable in prod
    // dialectOptions: {
    //   // Example for SSL, if your PostgreSQL server requires it
    //   // ssl: {
    //   //   require: true,
    //   //   rejectUnauthorized: false // Adjust as per your SSL certificate setup
    //   // }
    // },
    pool: { // Optional: configure connection pooling
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection (optional, but good for immediate feedback)
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database via Sequelize:', error);
  }
}

// testConnection(); // You can call this here for immediate testing when the module loads

// Export the instance and the Sequelize class
module.exports = { sequelize, Sequelize };
