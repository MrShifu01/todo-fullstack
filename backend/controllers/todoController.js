const Todo = require('../models/todoModel.js')
const asyncHandler = require('../middleware/asyncHandler.js')

// Function Fetch all todos for the specific User
// Route    GET /users
const userTodos = asyncHandler(async (userInfo, req, res) => {
    const todos = await Todo.find()
    const userTodoList = []
    // Checking which todo's are associated with the logged in user and adding them to a unique array
    for (let i = 0; i < todos.length; i++) {
        if (userInfo.username === todos[i].username) {
            userTodoList.push(todos[i])
        }
    }
    res.json(userTodoList)
});

// Function Create a new todo
// Route    POST /users
const createTodo = asyncHandler(async (todoInfo, req, res) => {
    const newTodo = await Todo.create(todoInfo)
    res.send({
        message: "Todo created successfully",
        item: newTodo
    })
})

// Function Update an existing todo 
// Route    PATCH /user/:id
const updateTodo = asyncHandler(async (todoInfo, req, res) => {
    await Todo.updateOne({_id: todoInfo.id}, {
        title: todoInfo.title,
        completed: todoInfo.completed
    })
    res.send({message: "Todo Updated Successfully"})
})

// Function Delete an existing todo
// Route    DELETE /users/:id
const deleteTodo = asyncHandler(async (id, req, res) => {
    await Todo.deleteOne({_id: id})
    res.send({message: "Todo Deleted Successfully"})
})

module.exports = {
    userTodos,
    createTodo,
    updateTodo,
    deleteTodo
}