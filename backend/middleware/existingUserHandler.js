const User = require('../models/userModel.js')

async function existingUserHandler(req, res, next) {
  const usersDB = await User.find()
  const currentUser = req.body.currentUser?.[0]

  const userUsernames = usersDB.map(user => user.username)
  const userEmails = usersDB.map(user => user.email)

    if (
        (!currentUser || !userUsernames.includes(req.body.username) || currentUser.username === req.body.username) &&
        (!currentUser || !userEmails.includes(req.body.email) || currentUser.email === req.body.email)
    ) {
        next()

    } else if (currentUser && userUsernames.includes(req.body.username) && currentUser.username !== req.body.username) {
        res.status(403).send({ message: 'Username already exists, please choose a different Username' })
  
    } else if (currentUser && userEmails.includes(req.body.email) && currentUser.email !== req.body.email) {
        res.status(403).send({ message: 'Email already exists, please login, or use a new Gmail account' })
  
    } else {
        if (userUsernames.includes(req.body.username) && currentUser.username !== req.body.username) {
        res.status(403).send({ message: 'Username already exists, please choose a different Username' })
    
        } else if (userEmails.includes(req.body.email) && currentUser.email !== req.body.email) {
        res.status(403).send({ message: 'Email already exists, please login, or use a new Gmail account' })
        }
  }
}

module.exports = existingUserHandler
