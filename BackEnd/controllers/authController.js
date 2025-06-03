require('dotenv').config();
const authService = require('../services/authService');

const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide name, email and password'
        });
      }

      const result = await authService.register({ name, email, password });

      res.status(201).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide email and password'
        });
      }

      const result = await authService.login(email, password);

      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async whoami(req, res, next) {
    try {
      const userData = await authService.whoami(req.user.id);

      res.status(200).json({
        status: 'success',
        data: userData
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const user = req.user;
      const { email, name } = req.body;
      const userData = await authService.updateProfile(email, name,user?.id);
      res.status(200).json({
        status: 'success',
        data: userData
      });
    } catch (error) {
      next(error);
    }
  },
  async updatePassword(req, res, next) {
    try {
      const user = req.user;
      const {currentPassword, newPassword } = req.body;
      const userData = await authService.updatePassword(user?.email, currentPassword, newPassword);
      res.status(200).json({
        status: 'success',
        data: userData
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
