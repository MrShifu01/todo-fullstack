const express = require('express')
const router = express.Router()
const { userTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController.js')
const todoLengthHandler = require("../middleware/todoLengthHandler.js")
const dataTypeHandler = require('../middleware/dataTypeHandler.js')

// Create new todo and check todo length and data type with middleware
router.route('/').post(todoLengthHandler, dataTypeHandler, (req, res) => {
    const { title } = req.body
    const username = req.username
    const todoInfo = {
        username: username,
        title: title,
        completed: false
    }
    createTodo(todoInfo, req, res)
})

// Get all user todos
router.route('/').get((req, res) => {
    const username = req.username
    const userInfo = {
        username: username,
    }
    userTodos(userInfo, req, res)
})

// Edit todo title and check todo length and data type with middleware
router.route('/:id').patch(todoLengthHandler, dataTypeHandler, (req, res) => {
    const { id }  = req.params
    const { title, completed } = req.body
    const todoInfo = {
        id: id,
        title: title,
        completed: completed
    }
    updateTodo(todoInfo, req, res)
})

// Edit todo completed and check the data type with middleware
router.route('/completed/:id').patch(dataTypeHandler, (req, res) => {
    const { id }  = req.params
    const { title, completed } = req.body
    const todoInfo = {
        id: id,
        title: title,
        completed: completed
    }
    updateTodo(todoInfo, req, res)
})

// Delete todo
router.route('/:id').delete((req, res) => {
    const { id } = req.params
    deleteTodo(id, req, res)
})

module.exports = router