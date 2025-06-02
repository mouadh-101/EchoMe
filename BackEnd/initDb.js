// Import the db object from models/index.js which contains the sequelize instance
// and all loaded models.
const db = require('../models'); 

// The models are already loaded by '../models/index.js', so no need to require them individually here.
// e.g., require('./models/User'); // This line is no longer needed.

// Wrapper function that is exported
const initializeDatabase = async () => {
  try {
    console.log('Sequelize (via models/index.js): Synchronizing database schema...');
    // Use the sequelize instance from the db object
    // sequelize.sync() - Creates tables if they don't exist. Does not alter existing tables.
    // sequelize.sync({ force: true }) - Drops all tables and recreates them. (DANGEROUS IN PROD)
    // sequelize.sync({ alter: true }) - Attempts to alter existing tables to match model definitions. (Good for dev)
    await db.sequelize.sync({ alter: true }); 
    console.log('Sequelize (via models/index.js): Database schema synchronized successfully.');
  } catch (err) {
    console.error('Sequelize (via models/index.js): Failed to synchronize database schema:', err);
    // Re-throw the error so the caller (index.js) can handle it and decide whether to exit.
    throw err; 
  }
  // The sequelize connection is persistent and managed by Sequelize itself via the db object.
  // We don't typically end it here if the application is going to continue running and using it.
};

// Export the main initialization function
module.exports = initializeDatabase;

// Standalone execution part remains commented out as index.js handles this.
/*
if (require.main === module) {
  console.log('Running initDb.js (Sequelize sync via models/index.js) as a standalone script...');
  initializeDatabase()
    .then(() => {
      console.log('Standalone initDb.js (Sequelize sync via models/index.js) execution finished.');
    })
    .catch(err => {
      console.error('Standalone initDb.js (Sequelize sync via models/index.js) execution failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      // For Sequelize, closing the connection is typically done when the app shuts down.
      // await db.sequelize.close(); 
      // console.log('Sequelize connection closed after standalone execution.');
    });
}
*/
