const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    username: String,
    title: String,
    completed: Boolean
}, {timestamps: true})

module.exports = mongoose.model("Todo", todoSchema)