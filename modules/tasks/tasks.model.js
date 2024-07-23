const mongoose = require('mongoose');
const TasksSchema = require('./tasks.schema');

const TaskModel = mongoose.model("task", TasksSchema);
module.exports = TaskModel;