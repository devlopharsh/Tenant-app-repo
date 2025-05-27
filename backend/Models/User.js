const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',   
    },
});

module.exports = mongoose.model('User', userSchema);