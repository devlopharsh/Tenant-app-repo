const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, category, priority, dueDate, assignee } = req.body;

        const task = new Task({
            title,
            description,
            category,
            priority,
            dueDate,
            status: 'Todo',
            organization: req.user.organizationId,
            assignee
        });

        await task.save();

        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message : 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ organization: req.user.organizationId }).populate('assignee', 'name email');
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message : 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: id, organization: req.user.organizationId },
            updates,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message : 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message : 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, organization: req.user.organizationId });

        if (!task) {
            return res.status(404).json({ message : 'Task not found' });
        }

        res.json({ message : 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message : 'Server error' });
    }
}; 
