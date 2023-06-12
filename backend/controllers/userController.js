const User = require('../models/userModel.js')
const Todo = require('../models/todoModel.js')
const asyncHandler = require('../middleware/asyncHandler.js')
const jwt = require('jsonwebtoken')
const checkJWTToken = require('../middleware/tokenHandler.js')


// Function Fetch all user
// Route    GET /users
const getUsers = asyncHandler (async (req, res) => {
    const users = await User.find()
    res.json(users)
    return
})

// Function User Login
// Route    POST /users/login
const userLogin = asyncHandler (async (userInfo, req, res) => {
    const users = await User.find()
    for (let i = 0; i < users.length; i++) {
        if (userInfo.username === users[i].username && userInfo.password === users[i].password) {
            let jwtToken = jwt.sign({
                username: userInfo.username,
                password: userInfo.password
            }, "secretKey", { expiresIn: "1hr" })
            res.send(jwtToken)
            return
        }
    }
    res.send({message: "Username or Password does not exist"})
})

const userTodos = asyncHandler((async (userInfo, req, res) => {
    const todos = await Todo.find()
    const userTodoList = []
    for (let i = 0; i < todos.length; i++) {
        if (userInfo.username === todos[i].username) {
            userTodoList.push(todos[i])
        }
    }
    res.json(userTodoList)
  }));
  


module.exports = {
    getUsers,
    userLogin,
    userTodos
}