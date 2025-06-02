const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty.'
        }
      }
    }
  }, {
    tableName: 'users', // Ensure table name is 'users'
    timestamps: true,
    createdAt: 'created_at', // Match column name
    updatedAt: 'updated_at'  // Match column name
  });

  // Hook to hash password before creating a new user
  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // Hook to hash password before updating a user, if password changed
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) { // Only hash if password has changed
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // Instance method to validate password
  User.prototype.validPassword = async function(candidatePassword) {
    // Ensure candidatePassword is a string before comparing
    if (typeof candidatePassword !== 'string') {
        return false;
    }
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};
