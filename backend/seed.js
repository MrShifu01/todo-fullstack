const mongoose = require('mongoose')
const userData = require('./data/userData.js')
const todoData = require('./data/todoData.js')
const User = require("./models/userModel.js")
const Todo = require("./models/todoModel.js")
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const colors = require('colors')

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await User.insertMany(userData)
        await Todo.deleteMany()
        await Todo.insertMany(todoData)
        console.log(`Data Imported`.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Todo.deleteMany()
        console.log(`Data Deleted`.red.inverse)
    } catch (e) {
        console.log(`${e}`.red.inverse)
    }
}

if (process.argv[2] === "-d") {
    deleteData()
} else {
    importData()
}