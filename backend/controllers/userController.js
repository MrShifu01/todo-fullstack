const User = require('../models/userModel.js')
const Todo = require('../models/todoModel.js')
const asyncHandler = require('../middleware/asyncHandler.js')
const newPasswordHandler = require('../middleware/newPasswordHandler.js')
const jwt = require('jsonwebtoken')

// Function Fetch a user
// Route    GET /users

const getUser = asyncHandler (async (filter, req, res) => {
    const user = await User.findOne({username: filter})
    res.send(user)
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

// Function Create User
// Route    POST /users
const createUser = asyncHandler(async (userInfo, req, res) => {
    const newUser = await User.create(userInfo)
    console.log(newUser)
    res.send({
        message: "User created successfully",
        username: newUser.username,
        password: newUser.password
    })
})

// Function Update user
// Route    PATCH /users
const updateUser = asyncHandler(async (userInfo, req, res) => {
    await User.updateOne({_id: userInfo.id}, {$set: {
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email
    }})
    res.send({message: "User Updated Successfully"})
})

// Function Delete User
// Route    DELETE /users
const deleteUser = asyncHandler(async (id, req, res) => {
    await User.deleteOne({_id: id})
    res.send({message: "User Deleted Successfully"})
})

// Function Change Password
// Route    PATCH /users/changePassword
const changePassword = asyncHandler(async (userInfo, req, res) => {
    try {
        await User.updateOne({_id: userInfo.id}, {$set: {password: userInfo.newUserPassword}})
        res.send({message: "Password Successfully changed!"})
    } catch (e) {
        console.log(e)
    }
})
  
module.exports = {
    userLogin,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    getUser
}