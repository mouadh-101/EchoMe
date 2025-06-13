module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
      tableName: 'tag',
      timestamps: false,
    });
  
    Tag.associate = (models) => {
      Tag.belongsToMany(models.Audio, {
        through: 'audio_tags',
        foreignKey: 'tag_id',
        otherKey: 'audio_id',
        as: 'audios',
      });
    };
  
    return Tag;
  };
  