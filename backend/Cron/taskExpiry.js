const cron = require('node-cron');
const Task = require('../models/Task');

const taskExpiryJob = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();
      const expiredTasks = await Task.updateMany(
        { dueDate: { $lt: now }, status: { $in: ['Todo', 'In Progress'] } },
        { $set: { status: 'Expired' } }
      );
      console.log(`Task Expiry Job: Updated ${expiredTasks.modifiedCount} tasks to Expired status`);
    } catch (error) {
      console.error('Task Expiry Job error:', error);
    }
  });
};

module.exports = taskExpiryJob;
