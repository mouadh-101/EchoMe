'use strict';

const { sequelize, Sequelize } = require('../config/database');

// Import model definitions
const UserModelDefinition = require('./User');
const AudioModelDefinition = require('./Audio');
const TagModelDefinition = require('./Tag');
const SummaryModelDefinition = require('./Summary');
const TranscriptionModelDefinition = require('./Transcription');
const TodoListModelDefinition = require('./ToDoList');
const TodoModelDefinition = require('./ToDo');



// Initialize models object
const db = {};

// Initialize models
db.User = UserModelDefinition(sequelize, Sequelize.DataTypes);
db.Audio=AudioModelDefinition(sequelize, Sequelize.DataTypes);
db.Tag = TagModelDefinition(sequelize, Sequelize.DataTypes);
db.Summary = SummaryModelDefinition(sequelize, Sequelize.DataTypes);
db.Transcription = TranscriptionModelDefinition(sequelize, Sequelize.DataTypes);
db.TodoList = TodoListModelDefinition(sequelize, Sequelize.DataTypes);
db.Todo = TodoModelDefinition(sequelize, Sequelize.DataTypes);



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
