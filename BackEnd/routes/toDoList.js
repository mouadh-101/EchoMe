const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const toDoListController = require('../controllers/toDoListController');
const router = express.Router();

// POST /create/:audioId
router.post('/create/:audioId', verifyToken, toDoListController.createToDoList);
// GET /
router.get('/', verifyToken, toDoListController.fetchToDoList);
// GET /:id
router.get('/:id', verifyToken, toDoListController.fetchToDoListById);
// PUT /mark/:todoId
router.put('/mark/:todoId', verifyToken, toDoListController.markOrUnmarkTodoCompleted);

module.exports = router;
