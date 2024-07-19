const express = require("express");
const bodyParser = require("body-parser");
const httpServer = express();

httpServer.use(bodyParser.json());

httpServer.listen(3000, "localhost", () => {
    console.log("Server started @", `http://localhost:3000`)
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
    },
    {
        id: 2,
        title: 'Install necessary dependencies'
    }
];

httpServer.get("/todos", (req, res) => {
    console.log(todos)
    return res.json({
        message: "Todos fetched successfully",
        data: todos
    })
})

httpServer.post("/createTodo", (req, res) => {
    todos.push(req.body)
    return res.status(200).json({
        message: "Data created successfully"
    })
})

httpServer.get("/todo/:todoId", (req, res) => {
    const {
        todoId
    } = req.params;

    const matchingData = todos.find((todo) => todo.id == todoId);

    if (matchingData) {
        return res.status(200).json({
            message: "Todo fetched successfully",
            todo: matchingData
        })
    } else {
        return res.status(404).json({
            message: "No Data Found",
        })
    }
})