const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

// Connect using async function
async function connectRedis() {
  await redisClient.connect();
}

module.exports = { redisClient, connectRedis };
