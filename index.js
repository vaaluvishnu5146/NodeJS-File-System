const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
    createFileAsync
} = require("./utils/filesystem");
const httpServer = express();
const {
    initialize_mongo_connectivity
} = require('./database/connection');

httpServer.use(cors());

httpServer.use(bodyParser.json());
require('dotenv').config();

var HOSTNAME = process.env.NODE_ENV === "PRODUCTION" ? process.env.RENDER_HOST_NAME : "localhost";
var PORT = 3000;

// INJECT ALL EXPRESS ROUTERS
httpServer.use('/users', require('./modules/users/users.controller'))
httpServer.use('/tasks', require('./modules/tasks/tasks.controller'))
httpServer.use('/auth', require('./modules/authentication/authentication.controller'))

httpServer.listen(PORT, HOSTNAME, () => {
    console.log("Server started")
    console.log("webservice is live");
    initialize_mongo_connectivity();
});

httpServer.get("/", (req, res) => {
    return res.json({
        name: "Vishnu Vardhan",
        age: 27
    })
})

const todos = [{
    id: 1,
    title: 'Create npm project'
}, {
    id: 2,
    title: 'Install necessary dependencies'
}];

httpServer.get("/todos", (req, res) => {
    return res.json({
        message: "Todos fetched successfully",
        data: todos
    })
})

httpServer.post("/createTodo", (req, res) => {
    todos.push(req.body)
    return res
        .status(200)
        .json({
            message: "Data created successfully"
        })
})

httpServer.get("/todo/:todoId", (req, res) => {
    const {
        todoId
    } = req.params;
    const matchingData = todos.find((todo) => todo.id == todoId);
    if (matchingData) {
        return res
            .status(200)
            .json({
                message: "Todo fetched successfully",
                todo: matchingData
            })
    } else {
        return res
            .status(404)
            .json({
                message: "No Data Found"
            })
    }
})

httpServer.post("/createFile", async (req, res) => {
    try {
        await createFileAsync(JSON.stringify(req.body))
        return res
            .status(201)
            .json({
                message: "File created successfully"
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Failed to create file",
                error
            })
    }
})