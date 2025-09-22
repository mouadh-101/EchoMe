const jwt = require('jsonwebtoken');
const tokenBlacklist = require( "../services/tokenBlacklist.js")
const { User } = require('../models');

class AuthService {
  async register(userData) {
    try {
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = await User.create(userData);
      const token = this.generateToken(user);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isValidPassword = await user.validPassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      const token = this.generateToken(user);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async whoami(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(email, name, userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.name = name;
    user.email = email;
    await user.save();
    return user;
  }
  async updatePassword(email, curentPassword, newPassword) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (await user.validPassword(curentPassword)) {
      user.password = newPassword;
      await user.save();
      return user;
    }
    throw new Error('Invalid current password');
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  async verifyToken(token) {
    try {
      if (await tokenBlacklist.isBlacklisted(token)) {
        throw new Error("Token is blacklisted")
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return decoded 
    } catch (error) {
      throw new Error("Invalid token")
    }
  }
  logout(token) {
    return tokenBlacklist.addToBlacklist(token);
  }
}

module.exports = new AuthService();