'use strict';

const { sequelize, Sequelize } = require('../db'); // Or your path to db config

// Import your model definition functions manually
const UserModelDefinition = require('./User');
// Example for another model:
// const AnotherModelDefinition = require('./AnotherModel');

const db = {};

// Initialize models manually
db.User = UserModelDefinition(sequelize, Sequelize.DataTypes);
// Example for another model:
// db.AnotherModel = AnotherModelDefinition(sequelize, Sequelize.DataTypes);

// Optional: Associate models if associate method exists
// This part can be kept if your models (like User.js) might have an 'associate' static method.
// If not, it can be removed or commented out.
Object.keys(db).forEach(modelName => {
  // Check if it's an actual Sequelize model and has an associate method
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the sequelize instance and Sequelize class along with models
db.sequelize = sequelize;
db.Sequelize = Sequelize; // The Sequelize library itself

module.exports = db;
