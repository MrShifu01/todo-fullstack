// Middleware to check if a username or email already exists in the database
// Also accounts for when a user updates his details.
const User = require('../models/userModel.js')

async function existingUserHandler(req, res, next) {
// Get all users from the database
  const usersDB = await User.find()

// Get the information about the logged in user, or when creating a new user, this value is undefined
  const currentUser = req.body.currentUser?.[0]

// Creating two new arrays that store only the usernames and emails of all users
  const userUsernames = usersDB.map(user => user.username)
  const userEmails = usersDB.map(user => user.email)

    if (
        // In creating a new user and the username and email is unique, allow successful create
        (!currentUser || !userUsernames.includes(req.body.username) || currentUser.username === req.body.username) &&
        (!currentUser || !userEmails.includes(req.body.email) || currentUser.email === req.body.email)
    ) {
        next()

        // If a current user updating details and the email is still unique, but the username is now the same as someone elses
    } else if (currentUser && userUsernames.includes(req.body.username) && currentUser.username !== req.body.username) {
        res.status(403).send({ message: 'Username already exists, please choose a different Username' })
  
        // If a current user updating details and the username is still unique, but the email is now the same as someone elses
    } else if (currentUser && userEmails.includes(req.body.email) && currentUser.email !== req.body.email) {
        res.status(403).send({ message: 'Email already exists, please login, or use a new Gmail account' })
  

    } else {
        // Check if the requested username already exists and is different from the current user's username
        if (userUsernames.includes(req.body.username) && currentUser.username !== req.body.username) {
            res.status(403).send({ message: 'Username already exists, please choose a different Username' });

        // Check if the requested email already exists and is different from the current user's email
        } else if (userEmails.includes(req.body.email) && currentUser.email !== req.body.email) {
            res.status(403).send({ message: 'Email already exists, please login, or use a new Gmail account' });
        }
    }
}

module.exports = existingUserHandler
