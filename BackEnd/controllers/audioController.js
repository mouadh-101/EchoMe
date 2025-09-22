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
  async createAudio(req, res) {
    try {
      const { description } = req.body;
      const userId = req.user.id; // Assuming user ID is stored in req.user

      if (!req.file) {
        return res.status(400).json({ 
          status: 'error',
          data: 'No file uploaded',
        });
      }

      const result = await audioService.createAudio(req.file, description, userId);
      res.json(result);
    } catch (error) {
      console.error('Create audio error:', error);
      res.status(500).json({ error: error.message || 'Audio creation failed' });
    }
  }


  async fetchAudioByUser(req,res){
    try{
      const userId = req.user.id; 
      const result = await audioService.fetchAudioByUser(userId);
      res.json(result);
    }
    catch (error) {
      console.error('Fetch audio by user error:', error);
      res.status(500).json({ error: error.message || 'Fetching audio by user failed' });
    }
  }
  async fetchStatestics(req,res) {
    try{
      const userId = req.user.id;
      const result =await audioService.fetchStatestics(userId);
      res.json(result);
    }
    catch (error) {
      console.error('Fetch statistics error:', error);
      res.status(500).json({ error: error.message || 'Fetching statistics failed' });
    }
  }
  async fetchAudioById(req, res) {
    try{
      const userId = req.user.id;
      const audioId = req.params.id;
      const result = await audioService.fetchAudioById(userId, audioId);
      res.json(result);
    }
    catch (error) {
      console.error('Fetch audio by ID error:', error);
      res.status(500).json({ error: error.message || 'Fetching audio by ID failed' });
    }
  }
}

module.exports = new AudioController(); 