const { User, Audio, Transcription, TodoList, Todo } = require('../models');
const automaticService = require('./AutomaticService');
class toDoListService {
    async createToDoList(userId, audioId) {
        // Fetch audio and transcription
        const audio = await Audio.findOne({
            where: { id: audioId, user_id: userId },
        });
        if (!audio || audio.status != "ready") throw new Error('Wait for audio processing to complete before creating a ToDo List');
        if (!audio) throw new Error('Audio not found or you do not have permission to access it');

        const title = audio.title || 'Untitled ToDo List';
        const todoListExist = await TodoList.findOne({
            where: {
                user_id: userId,
                audio_id: audioId,
            },
            include: [{
                model: Todo,
                as: 'Todos',
                attributes: ['id', 'description', 'completed']
            },
            {
                model: Audio,
                attributes: ['id', 'file_url']
            }
            ],
        });
        if (todoListExist) {
            return {
                status: 'warning',
                data: todoListExist
            };
        }

        const transcription = await Transcription.findOne({
            where: { audio_id: audioId },
            attributes: ['text'],
        });
        if (!transcription || !transcription.text) throw new Error('Transcription not found');

        const { TodoList: todoItems } = await automaticService.generateTodoList(transcription.text);
        if (!todoItems || !Array.isArray(todoItems)) {
            throw new Error('Failed to generate Todo List from transcription');
        }

        try {
            // Create the TodoList with associated Todos (nested creation)
            const todoList = await TodoList.create({
                user_id: userId,
                audio_id: audioId,
                title,
                Todos: todoItems.map(text => ({
                    description: text,
                    completed: false,
                })),
            }, {
                include: [{
                    model: Todo,
                    as: 'Todos',
                }],
            });

            return {
                status: 'success',
                data: todoList
            };
        } catch (error) {
            throw new Error('Failed to create ToDo List: ' + error.message);
        }
    }
    async fetchToDoList(userId) {
        try {
            const todoLists = await TodoList.findAll({
                where: { user_id: userId },
                include: [{
                    model: Todo,
                    as: 'Todos',
                    attributes: ['id', 'description', 'completed']
                },
                {
                    model: Audio,
                    attributes: ['file_url']
                }
                ],
                order: [['created_at', 'DESC']],
            });
            return {
                status: 'success',
                data: todoLists
            };
        }
        catch (error) {
            console.error('Fetch ToDo List error:', error);
            throw new Error('Fetching ToDo List failed: ' + error.message);
        }
    }
    async fetchToDoListById(userId, todoListId) {
        try {
            const todoList = await TodoList.findOne({
                where: { id: todoListId, user_id: userId },
                include: [{
                    model: Todo,
                    as: 'Todos',
                    attributes: ['id', 'description', 'completed']
                },
                {
                    model: Audio,
                    attributes: ['id', 'file_url']
                }
                ],
            });

            if (!todoList) {
                return { status: 'error', message: 'ToDo List not found' };
            }

            return {
                status: 'success',
                data: todoList
            };
        } catch (error) {
            console.error('Fetch ToDo List by ID error:', error);
            throw new Error('Fetching ToDo List by ID failed: ' + error.message);
        }
    }
    async markOrUnmarkTodoCompleted(userId, todoId) {
        try {
            const todo = await Todo.findOne({
                where: { id: todoId },
            });

            if (!todo) {
                return { status: 'error', message: 'Todo not found' };
            }
            if (todo.completed) {
                todo.completed = false;
            }
            else {
                todo.completed = true;
            }

            await todo.save();

            return {
                status: 'success',
                data: todo
            };
        } catch (error) {
            console.error('Mark Todo as completed error:', error);
            throw new Error('Marking Todo as completed failed: ' + error.message);
        }
    }
}
module.exports = new toDoListService();