const express = require('express')
const router = express.Router()
const { userLogin, createUser, updateUser, deleteUser, changePassword, getUser} = require('../controllers/userController.js')
const checkJWTToken = require('../middleware/tokenHandler.js');
const checkGmail = require('../middleware/gmailHandler.js');
const checkDataType = require('../middleware/dataTypeHandler.js');
const newPasswordHandler = require('../middleware/newPasswordHandler.js');



// Get one user details
router.route('/').get(checkJWTToken, (req, res) => {
    const filter = req.username
    getUser(filter, req, res)
})

// User Login
router.route('/login').post((req, res) => {
    const {username, password} = req.body
    const userInfo = {
        username: username,
        password: password
    }
    userLogin(userInfo, req, res)
})

// Create new User
router.route('/').post((req, res) => {
    const {name, username, email, password} = req.body
    const userInfo = {
        name: name,
        username: username,
        email: email,
        password: password
    }
    
    createUser(userInfo, req, res)
})

// Update user info
router.route('/:id').patch(checkJWTToken,(req, res) => {
    const { id } = req.params
    const { name, username, email } = req.body
    const userInfo = {
        id,
        name,
        username,
        email,
    }
    console.log(userInfo)
    updateUser(userInfo, req, res)
})

// Delete User
router.route('/:id').delete(checkJWTToken, (req, res) => {
    const { id } = req.params
    deleteUser(id, req, res)
})

// Change User Password
router.patch('/changePassword/:id', checkJWTToken, newPasswordHandler, (req, res) => {
    const { id } = req.params
    const newUserPassword = req.newUserPassword
    const userInfo = {
        id,
        newUserPassword
    }
    changePassword(userInfo, req, res)
})

module.exports = router