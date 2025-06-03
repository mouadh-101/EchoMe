const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  // Define User model
  const User = sequelize.define('User', {
    // Primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // User's full name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    // User's email address
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    // User's password (hashed)
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6, 100],
          msg: 'Password must be between 6 and 100 characters'
        }
      }
    }
  }, {
    // Table configuration
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    
    // Add indexes for better query performance
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });

  // ===== Model Hooks =====
  
  // Hash password before creating a new user
  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // Hash password before updating a user, if password changed
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // ===== Instance Methods =====
  

  User.prototype.validPassword = async function(candidatePassword) {
    if (typeof candidatePassword !== 'string') {
      return false;
    }
    return bcrypt.compare(candidatePassword, this.password);
  };

  // ===== Class Methods =====
  
  /**
   * Find user by email
   * @param {string} email - User's email
   * @returns {Promise<Object>} User object if found
   */
  User.findByEmail = async function(email) {
    return this.findOne({ where: { email } });
  };

  return User;
};
