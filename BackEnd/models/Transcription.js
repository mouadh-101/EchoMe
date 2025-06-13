module.exports = (sequelize, DataTypes) => {
    const Transcription = sequelize.define('Transcription', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      audio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
      },
    }, {
      tableName: 'transcription',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    Transcription.associate = (models) => {
      Transcription.belongsTo(models.Audio, {
        foreignKey: 'audio_id',
      });
    };
  
    return Transcription;
  };
  