const { AssemblyAI } = require('assemblyai');
require('dotenv').config();

// Configure Cloudinary using environment variables
const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

module.exports = client;