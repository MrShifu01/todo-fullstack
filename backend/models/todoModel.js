const mongoose = require('mongoose')

// Assign a simple model for the todo items
const todoSchema = mongoose.Schema({
    username: String,
    title: String,
    completed: Boolean
}, {timestamps: true})

module.exports = mongoose.model("Todo", todoSchema)