const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskcontroller');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/roleMiddleware');


// All routes protected
router.use(authMiddleware);

// Create task
router.post('/', taskController.createTask);

// Get all tasks
router.get('/', taskController.getTasks);

// Update task
router.put('/:id', taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;

