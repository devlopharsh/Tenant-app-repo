const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskcontroller');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/roleMiddleware');



router.use(authMiddleware);

router.post('/', taskController.createTask);


router.get('/', taskController.getTasks);


router.put('/:id', taskController.updateTask);


router.delete('/:id', taskController.deleteTask);

module.exports = router;

