const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');
const { Audio, Tag, Transcription,Summary, sequelize } = require('../models');
const ffmpeg = require('fluent-ffmpeg');
const client = require('../config/assemblyAi');
const AutomaticService = require('./AutomaticService');
const { Op, fn, col } = require('sequelize');

ffmpeg.setFfmpegPath('C:/Users/mouad/scoop/apps/ffmpeg/current/bin/ffmpeg.exe');
ffmpeg.setFfprobePath('C:/Users/mouad/scoop/apps/ffmpeg/current/bin/ffprobe.exe');

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
  getAudioDuration(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) return reject(err);
        resolve(Math.floor(metadata.format.duration));
      });
    });
  }
  async createAudio(audioFile, description, userId) {
    try {
      const audioPath = audioFile.path;
      const duration = await this.getAudioDuration(audioPath);
      const uploadResult = await this.uploadAudio(audioPath);


      const audio = await Audio.create({
        user_id: userId,
        file_url: uploadResult.data,
        description,
        duration,
        status: 'pending',
      });

      return {
        status: 'success',
        data: {
          id: audio.id,
          url: uploadResult.data,
          description,
          duration,
          userId,
        },
      };
    } catch (error) {
      throw new Error('Audio creation failed: ' + error.message);
    }

  }
  async audioTranscript(audioPath) {
    const params = {
      audio: audioPath,
      speech_model: "universal",
    };
    try {
      const transcript = await client.transcripts.transcribe(params);

      // Poll for completion
      let completedTranscript;
      do {
        await new Promise(r => setTimeout(r, 3000));
        completedTranscript = await client.transcripts.get(transcript.id);
      } while (
        completedTranscript.status !== "completed" &&
        completedTranscript.status !== "error"
      );

      if (completedTranscript.status === "error") {
        throw new Error("Transcription failed: " + completedTranscript.error);
      }

      return {
        status: 'success',
        text: completedTranscript.text
      };
    } catch (error) {
      throw new Error('Transcription failed: ' + error.message);
    }
  }
  async autoTagging(transcription) {
    try {
      const result = await AutomaticService.generateTagsTitle(transcription);
      return {
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new Error('Tagging failed: ' + error.message);
    }
  }
  async processAudio(audio) {
  try {
    const transcriptResult = await this.audioTranscript(audio.file_url);
    if (!transcriptResult || transcriptResult.status !== 'success' || !transcriptResult.text) {
      await audio.update({ status: 'error' });
      return;
    }

    const transcriptText = transcriptResult.text;
    const taggingResult = await this.autoTagging(transcriptText);
    const { title, tags, mood, summary } = taggingResult.data;

    const tagInstances = await Promise.all(
      tags.map(tagName => Tag.findOrCreate({ where: { name: tagName } }).then(([tag]) => tag))
    );

    const summaryInstance = await Summary.findOrCreate({
      where:{ audio_id: audio.id },
      defaults: { summary_text: summary }
    }).then(([summary]) => summary);

    await sequelize.transaction(async (t) => {
      if (audio.transcription) {
        await audio.transcription.update({ text: transcriptText }, { transaction: t });
      } else {
        await Transcription.create({ audio_id: audio.id, text: transcriptText }, { transaction: t });
      }

      await audio.update({ title, mood, status: 'ready' }, { transaction: t });
      await audio.setTags(tagInstances, { transaction: t });
    });

  } catch (err) {
    console.error(`Error processing audio ${audio.id}:`, err.message);
    await audio.update({ status: 'error' });
  }
}

  async fetchAudioByUser(userId) {
    try {
      const audios = await Audio.findAll({
        where: { user_id: userId },
        attributes: ['id', 'description', 'title', 'created_at'],
        include: [
          {
            model: Tag, as: 'tags',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            }
          }
        ],
      });
      return {
        status: 'success',
        data: audios,
      };
    }
    catch (error) {
      throw new Error('Fetch audio failed: ' + error.message);
    }
  }
  async fetchStatestics(userId) {
    try {
      const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      console.log('Fetching statistics for user:', userId);
      console.log('Today:', today);

      let audioToday, audioTotal, audioPending, audioThisWeek;

      try {
        audioToday = await Audio.count({
          where: {
            user_id: userId,
            created_at: {
              [Op.gte]: today
            }
          }
        });
        audioTotal = await Audio.count({
          where: { user_id: userId },
        });
        audioPending = await Audio.count({
          where: { user_id: userId, status: 'pending' },
        });
        audioThisWeek = await Audio.count({
          where: {
            user_id: userId,
            created_at: {
              [Op.gte]: sequelize.literal("NOW() - INTERVAL '7 days'")
            }
          }
        });
      }catch (err) {
        throw err;
      }

      return {
        status: 'success',
        data: {
          audioToday: audioToday || 0,
          audioTotal: audioTotal || 0,
          audioPending: audioPending || 0,
          audioThisWeek: audioThisWeek || 0
        },
      };
    }
    catch (error) {
      console.error('Fetch statistics error:', error);
      throw new Error('Fetch statistics failed: ' + error.message);
    }
  }
  async fetchAudioById(userId, audioId) {
    try {
      const audio = await Audio.findOne({
        where: { id: audioId, user_id: userId },
        include: [
          {
            model: Tag, as: 'tags',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            }
          },
          {
            model: Transcription, as: 'transcription',
            attributes: ['text']
          },
          {
            model: Summary, as: 'summary',
            attributes: ['summary_text']
          }
        ],
      });

      if (!audio) {
        return { status: 'error', message: 'Audio not found' };
      }

      return {
        status: 'success',
        data: audio,
      };
    } catch (error) {
      throw new Error('Fetch audio failed: ' + error.message);
    }
  }
}

module.exports = new AudioService();