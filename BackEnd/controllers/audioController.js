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
  async audioTranscribe(req, res) {
    try{
      const { audioPath } = req.body; // Assuming audioPath is sent in the request body
      if (!audioPath) {
        return res.status(400).json({ 
          status: 'error',
          data: 'No audio path provided',
        });
      }

      const result = await audioService.audioTranscript(audioPath);
      res.json(result);
    }
    catch (error) {
      console.error('Transcription error:', error);
      res.status(500).json({ error: error.message || 'Transcription failed' });
    }
  }
  async audioTaggingTitle(req, res) {
    try{
    const {transcription} = req.body;
    const result = await audioService.autoTagging(transcription);
    res.json(result);

    }
    catch (error) {
      console.error('Tagging error:', error);
      res.status(500).json({ error: error.message || 'Tagging failed' });
    }
  }
  async processPendingAudios(req, res) {
    try {
      const result = await audioService.processPendingAudios();
      res.json(result);
    } catch (error) {
      console.error('Process pending audios error:', error);
      res.status(500).json({ error: error.message || 'Processing pending audios failed' });
    }
  }
}

module.exports = new AudioController(); 