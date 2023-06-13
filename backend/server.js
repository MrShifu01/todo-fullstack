const express = require('express')
const PORT = 8000 || process.env.PORT
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRouter.js')
const todoRouter = require('./routes/todoRouter.js')
const checkJWTToken = require('./middleware/tokenHandler.js');
const checkDataType = require('./middleware/dataTypeHandler.js')

connectDB()
const app = express()

app.use('/users',checkDataType, userRouter)
app.use('/todos', checkJWTToken, checkDataType, todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})