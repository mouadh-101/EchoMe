'use strict';

const { sequelize, Sequelize } = require('../config/database');

// Import model definitions
const UserModelDefinition = require('./User');
// Add more model imports here as needed
// const AnotherModelDefinition = require('./AnotherModel');

// Initialize models object
const db = {};

// Initialize models
db.User = UserModelDefinition(sequelize, Sequelize.DataTypes);
// Add more model initializations here as needed
// db.AnotherModel = AnotherModelDefinition(sequelize, Sequelize.DataTypes);

// Set up model associations
Object.keys(db).forEach(modelName => {
  if (db[modelName] && typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

// Export database instance and models
module.exports = {
  sequelize,
  Sequelize,
  ...db
};
