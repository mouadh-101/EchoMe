const toDoListService = require('../services/toDoListService');
const toDoListController = {
    async createToDoList(req, res) {
        try{
            const userId = req.user.id; 
            const audioId = req.params.audioId;
            const result = await toDoListService.createToDoList(userId, audioId);
            res.json(result);
        }
        catch (error) {
            console.error('Create ToDo List error:', error);
            res.status(500).json({ error: error.message || 'Creating ToDo List failed' });
        }
    },
    async fetchToDoList(req, res) {
        try {
            const userId = req.user.id; 
            const result = await toDoListService.fetchToDoList(userId);
            res.json(result);
        } catch (error) {
            console.error('Fetch ToDo List error:', error);
            res.status(500).json({ error: error.message || 'Fetching ToDo List failed' });
        }
    },
    async fetchToDoListById(req, res) {
        try{
            const userId = req.user.id;
            const todoListId = req.params.id;
            const result = await toDoListService.fetchToDoListById(userId, todoListId);
            res.json(result)
        }
        catch(error){
            console.error('Fetch ToDo List error:', error);
            res.status(500).json({ error: error.message || 'Fetching ToDo List failed' });
        }
    },
    async markOrUnmarkTodoCompleted(req, res) {
        try{
            const userId = req.user.id;
            const todoId = req.params.todoId;
            const result = await toDoListService.markOrUnmarkTodoCompleted(userId, todoId);
            res.json(result);
        } catch (error) {
            console.error('Mark/Unmark Todo Completed error:', error);
            res.status(500).json({ error: error.message || 'Marking/Unmarking Todo Completed failed' });
        }
    }
    
}
module.exports = toDoListController;