const express = require('express')
const router = express.Router()
const { getUsers, userLogin, userTodos } = require('./controllers/userController.js')
const bodyParser = require('body-parser');
const checkJWTToken = require('./middleware/tokenHandler.js');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.route('/').get(getUsers)

router.route('/login').post((req, res) => {
    const {username, password} = req.body
    const userInfo = {
        username: username,
        password: password
    }
    userLogin(userInfo, req, res)
})

router.route('/todos').get(checkJWTToken, (req, res) => {
    const username = req.username
    const userInfo = {
        username: username,
    }

    userTodos(userInfo, req, res)
})

module.exports = router