const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    students: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] }
});

module.exports = mongoose.model('Course', courseSchema);