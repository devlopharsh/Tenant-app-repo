const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: String, enum: ['Bug', 'Feature', 'Improvement'], default: 'Feature' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: Date,
  status: { type: String, enum: ['Todo', 'In Progress', 'Completed', 'Expired'], default: 'Todo' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
