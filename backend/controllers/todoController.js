const Todo = require('../models/todoModel.js')
const asyncHandler = require('../middleware/asyncHandler.js')

const userTodos = asyncHandler(async (userInfo, req, res) => {
    const todos = await Todo.find()
    const userTodoList = []
    for (let i = 0; i < todos.length; i++) {
        if (userInfo.username === todos[i].username) {
            userTodoList.push(todos[i])
        }
    }
    res.json(userTodoList)
});

const createTodo = asyncHandler(async (todoInfo, req, res) => {
    await Todo.create(todoInfo)
    res.send({message: "Todo created successfully"})
})

const updateTodo = asyncHandler(async (todoInfo, req, res) => {
    await Todo.updateOne({_id: todoInfo._id}, {
        title: todoInfo.title,
        completed: todoInfo.completed
    })
    res.send({message: "Todo Updated Successfully"})
})

module.exports = {
    userTodos,
    createTodo,
    updateTodo
}