const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

module.exports = TasksSchema;