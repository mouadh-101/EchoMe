const audioService = require('../services/audioService');

class AudioController {
  async uploadAudio(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          status: 'error',
          data: 'No file uploaded',
        });
      }

      const result = await audioService.uploadAudio(req.file.path);
      res.json(result);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message || 'Upload failed' });
    }
  }
}

module.exports = new AudioController(); 