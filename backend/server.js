const express = require('express')
const PORT = 8000 || process.env.PORT
const connectDB = require('./config/db.js')
const router = require('./router.js')

connectDB()
const app = express()

app.use('/users', router)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})