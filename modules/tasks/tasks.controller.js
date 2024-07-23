const TasksRouter = require('express').Router();
const Task = require('./tasks.model');
const {
    Types
} = require('mongoose');

// 1. Create tasks
// http://localhost:3000/tasks/create/
TasksRouter.post('/create', async (req, res) => {
    const newtask = new Task(req.body);
    try {
        const response = await Task.create(newtask);
        return res.status(201).json({
            message: "task created successfully",
        })
    } catch (error) {
        return res.json({
            message: "Error creating task",
            error
        })
    }
})

// 2. Get All tasks
//http://localhost:3000/tasks/
TasksRouter.get('/', async (req, res) => {
    try {
        const response = await Task.find(); // [{}, {}] or []
        return res.json({
            message: "tasks fetched successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
});

// 3. Get a task
// http://localhost:3000/tasks/task/1
TasksRouter.get('/task/:taskId', async (req, res) => {
    const {
        taskId
    } = req.params;
    try {
        const response = await Task.findOne({
            _id: new Types.ObjectId(taskId)
        }); // null/undefined or {}
        if (response) {
            return res.status(200).json({
                message: "task fetched successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                message: "No task found",
                data: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
})

// 4. Update a task
// http://localhost:3000/tasks/update/1
TasksRouter.patch('/update/:taskId', async (req, res) => {
    const {
        taskId
    } = req.params;
    try {
        const response = await Task.findOneAndUpdate({
            _id: new Types.ObjectId(taskId),
        }, {
            $set: req.body
        }, {
            new: true,
            projection: {
                _id: 0
            }
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed updating task! No task found",
            })
        } else {
            return res.json({
                message: "task updated successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

// 5. Delete a task
// http://localhost:3000/tasks/delete/1
TasksRouter.delete('/delete/:taskId', async (req, res) => {
    const {
        taskId
    } = req.params;
    try {
        const response = await Task.findOneAndDelete({
            _id: new Types.ObjectId(taskId),
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting task! No task found",
            })
        } else {
            return res.json({
                message: "task deleted successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
});

module.exports = TasksRouter;