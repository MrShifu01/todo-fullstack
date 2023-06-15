const express = require('express')
const PORT = 8000
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRouter.js')
const todoRouter = require('./routes/todoRouter.js')
const checkJWTToken = require('./middleware/tokenHandler.js');
const cors = require('cors')
const bodyParser = require('body-parser');

// Connecting to the database and assigning the app to express
connectDB()
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Adding a cors checker for all routes
app.use(cors())

// Connecting to the distinct sets of routes
app.use('/users', userRouter)

// Adding a global JWT checker to the todos as validation
app.use('/todos', checkJWTToken, todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})