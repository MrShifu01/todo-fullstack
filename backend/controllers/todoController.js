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
    const newTodo = await Todo.create(todoInfo)
    res.send({
        message: "Todo created successfully",
        item: newTodo
    })
})

const updateTodo = asyncHandler(async (todoInfo, req, res) => {
    await Todo.updateOne({_id: todoInfo.id}, {
        title: todoInfo.title,
        completed: todoInfo.completed
    })
    res.send({message: "Todo Updated Successfully"})
})

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