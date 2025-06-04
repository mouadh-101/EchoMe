const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');

class AudioService {
  async uploadAudio(filePath) {
    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'video', // works for audio
        folder: 'mediaFlow/audio', // organize uploads in dashboard
      });

      // Cleanup
      fs.unlinkSync(filePath);

      return {
        status: 'success',
        data: result.secure_url,
      };
    } catch (error) {
      throw new Error('Upload failed: ' + error.message);
    }
  }
}

module.exports = new AudioService();