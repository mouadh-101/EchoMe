module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    mood: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'error', 'ready'),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'audio',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Audio.associate = (models) => {
    Audio.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    Audio.hasOne(models.Transcription, {
      foreignKey: 'audio_id',
      as: 'transcription',
    });

    Audio.hasOne(models.Summary, {
      foreignKey: 'audio_id',
      as: 'summary',
    });

    Audio.belongsToMany(models.Tag, {
      through: 'audio_tags',
      foreignKey: 'audio_id',
      otherKey: 'tag_id',
      as: 'tags',
    });
  };
  Audio.afterCreate((audio) => {
    console.log('💡 afterCreate hook triggered for audio', audio.id);
    const audioService = require('../services/audioService');
    setImmediate(() => audioService.processAudio(audio).catch(console.error));
  });

  return Audio;
};
