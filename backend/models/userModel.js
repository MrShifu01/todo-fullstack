const mongoose = require('mongoose')

// Assign a simple model for the users
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)