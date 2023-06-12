const express = require('express')
const router = express.Router()
const { getUsers, userLogin, createUser, updateUser} = require('../controllers/userController.js')
const bodyParser = require('body-parser');
const checkJWTToken = require('../middleware/tokenHandler.js');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// Get all users
router.route('/').get(getUsers)

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
router.route('/').put(checkJWTToken, (req, res) => {
    const filter = req.username
    const { name, username, email } = req.body
    const userInfo = {
        filter: filter,
        name: name,
        username: username,
        email: email
    }
    console.log(userInfo)
    updateUser(userInfo, req, res)
})

module.exports = router