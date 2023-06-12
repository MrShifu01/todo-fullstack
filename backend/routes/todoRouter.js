const express = require('express')
const router = express.Router()
const { userTodos, createTodo, updateTodo } = require('../controllers/todoController.js')
const bodyParser = require('body-parser');
const checkJWTToken = require('../middleware/tokenHandler.js');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// Create new todo
router.route('/').post(checkJWTToken, (req, res) => {
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
router.route('/').get(checkJWTToken, (req, res) => {
    const username = req.username
    const userInfo = {
        username: username,
    }
    userTodos(userInfo, req, res)
})

// Edit todo
router.route('/:id').patch(checkJWTToken, (req, res) => {
    const { id }  = req.params
    const { title, completed } = req.body
    const todoInfo = {
        _id: id,
        title: title,
        completed: completed
    }
    updateTodo(todoInfo, req, res)
})

module.exports = router