module.exports = (sequelize, DataTypes) => {
    const TodoList = sequelize.define('TodoList', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        audio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    TodoList.associate = (models) => {
        TodoList.belongsTo(models.Audio, {
            foreignKey: 'audio_id',
        });
        TodoList.belongsTo(models.User, {
            foreignKey: 'user_id', 
        });
        TodoList.hasMany(models.Todo, {
            foreignKey: 'todo_list_id',
        });
    };

    return TodoList;
};
