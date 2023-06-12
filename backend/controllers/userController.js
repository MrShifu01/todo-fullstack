const User = require('../models/userModel.js')
const Todo = require('../models/todoModel.js')
const asyncHandler = require('../middleware/asyncHandler.js')
const jwt = require('jsonwebtoken')

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

const createUser = asyncHandler(async (userInfo, req, res) => {
    await User.create(userInfo)
    res.send({message: "User created successfully"})
})

const updateUser = asyncHandler(async (userInfo, req, res) => {
    await User.updateOne({username: userInfo.filter}, {$set: {
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email
    }})
    res.send({message: "User Updated Successfully"})
})
  
module.exports = {
    getUsers,
    userLogin,
    createUser,
    updateUser
}