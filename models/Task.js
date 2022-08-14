const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {type: String, require: true, trim: true},
    completed: { type: Boolean, default: false }
});


module.exports = mongoose.model('Task', TaskSchema);