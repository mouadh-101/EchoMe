module.exports = (sequelize, DataTypes) => {
    const Summary = sequelize.define('Summary', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      audio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      summary_text: {
        type: DataTypes.TEXT,
      },
    }, {
      tableName: 'summary',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    Summary.associate = (models) => {
      Summary.belongsTo(models.Audio, {
        foreignKey: 'audio_id',
      });
    };
  
    return Summary;
  };
  