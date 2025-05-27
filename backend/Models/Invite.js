const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  role: { type: String, enum: ['Member', 'Manager', 'Admin'], default: 'Member' },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  accepted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Invite', inviteSchema);
