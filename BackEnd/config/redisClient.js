const { createClient } = require("redis");
const dotenv = require('dotenv');
dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

// Connect using async function
async function connectRedis() {
  await redisClient.connect();
}

module.exports = { redisClient, connectRedis };
