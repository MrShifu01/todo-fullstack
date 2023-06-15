// A seperate file that allows me to populate or delete dummy user data, taken from the data directory in teh backend
const mongoose = require('mongoose')
const userData = require('./data/userData.js')
const todoData = require('./data/todoData.js')
const User = require("./models/userModel.js")
const Todo = require("./models/todoModel.js")
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const colors = require('colors')

// configure the dotenv and connect to the mongo database
dotenv.config()
connectDB()

// Function to import data to the database
const importData = async () => {
    try {

        // First clear the database of users
        await User.deleteMany()

        // Then populate the databse with an array of users
        await User.insertMany(userData)

        // Clear the database of todos
        await Todo.deleteMany()

        // Then populate the databse with an array of todos
        // NOTE: The todos have already been assigned to users that were inserted to the database
        await Todo.insertMany(todoData)

        // Alerting the console that it was a success
        console.log(`Data Imported`.green.inverse)
        process.exit()

        // If an error occures, it is printed and the process is exited
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

// Similar to above, but this function only deletes all documents of users and todos
const deleteData = async () => {
    try {
        await User.deleteMany()
        await Todo.deleteMany()
        console.log(`Data Deleted`.red.inverse)
    } catch (e) {
        console.log(`${e}`.red.inverse)
    }
}

// Adding a condition simply for ease of running the scripts according to -d flag
if (process.argv[2] === "-d") {
    deleteData()
} else {
    importData()
}