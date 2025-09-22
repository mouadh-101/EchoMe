const { redisClient } = require("../config/redisClient");
const jwt = require("jsonwebtoken");

class TokenBlacklist {
  async addToBlacklist(token) {
    const decoded = jwt.decode(token);
    if (!decoded?.exp) return;

    const expiry = decoded.exp - Math.floor(Date.now() / 1000);
    await redisClient.setEx(`bl_${token}`, expiry, "blacklisted");
  }

  async isBlacklisted(token) {
    return (await redisClient.get(`bl_${token}`)) !== null;
  }
}

module.exports = new TokenBlacklist();
