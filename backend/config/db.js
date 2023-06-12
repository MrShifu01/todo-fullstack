const mongoose = require('mongoose')

const uri = "mongodb+srv://standerchristian:todo@cluster0.zt6v04f.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
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