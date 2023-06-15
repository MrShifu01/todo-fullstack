const express = require('express')
const PORT = 8000
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRouter.js')
const todoRouter = require('./routes/todoRouter.js')
const checkJWTToken = require('./middleware/tokenHandler.js');
const cors = require('cors')
const bodyParser = require('body-parser');
const dataTypeHandler = require('./middleware/dataTypeHandler.js')

connectDB()
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors())

app.use('/users', userRouter)
app.use('/todos', checkJWTToken, todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})