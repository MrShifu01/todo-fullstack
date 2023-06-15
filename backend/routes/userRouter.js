const express = require('express')
const router = express.Router()
const { userLogin, createUser, updateUser, deleteUser, changePassword, getUser} = require('../controllers/userController.js')
const checkJWTToken = require('../middleware/tokenHandler.js');
const checkGmail = require('../middleware/gmailHandler.js');
const dataTypeHandler = require('../middleware/dataTypeHandler.js')
const newPasswordHandler = require('../middleware/newPasswordHandler.js');
const existingUserHandler = require('../middleware/existingUserHandler.js');

// Get one user details
// check their JWT with middleware
router.get('/', checkJWTToken, (req, res) => {
    const filter = req.username
    getUser(filter, req, res)
})

// User Login 
// check the data type with middleware
router.post('/login', dataTypeHandler, (req, res) => {
    const {username, password} = req.body
    const userInfo = {
        username: username,
        password: password
    }
    userLogin(userInfo, req, res)
})

// Create new User
//  check password validation, email validation, existing user validation and data type with middleware
router.post('/', checkGmail, newPasswordHandler, dataTypeHandler, existingUserHandler, (req, res) => {
    const {name, username, email } = req.body
    const password = req.newUserPassword
    const userInfo = {
        name: name,
        username: username,
        email: email,
        password: password
    }
    
    createUser(userInfo, req, res)
})

// Update user info
//  check JWT, email validation, existing user validation and data type with middleware
router.patch('/:id', checkJWTToken, checkGmail, dataTypeHandler, existingUserHandler, (req, res) => {
    const { id } = req.params
    const { name, username, email } = req.body
    const userInfo = {
        id,
        name,
        username,
        email,
    }
    updateUser(userInfo, req, res)
})

// Delete User
// check JWT
router.delete('/:id', checkJWTToken, (req, res) => {
    const { id } = req.params
    deleteUser(id, req, res)
})

// Change User Password
// check JWT, password validation and data type with middleware
router.patch('/changePassword/:id', checkJWTToken, newPasswordHandler, dataTypeHandler, (req, res) => {
    const { id } = req.params
    const userInfo = {
        id,
        newUserPassword: req.newUserPassword
    }

    console.log(userInfo)
    changePassword(userInfo, req, res)
})

module.exports = router