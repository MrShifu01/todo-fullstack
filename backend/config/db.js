const mongoose = require('mongoose')

// As it is just in development, I will bring in the MONGO_URI into here instead of the .env to make it simpler
const uri = "mongodb+srv://standerchristian:todo@cluster0.zt6v04f.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        // Connecting to my Database
        await mongoose.connect(uri, {
            dbName: 'todo-fullstack',
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("Connected to MongoDB")
    } catch (e) {
        console.log(`Error: ${e}`)
    }
}
module.exports = connectDB