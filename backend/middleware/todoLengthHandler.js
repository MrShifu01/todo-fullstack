// Middleware that checks if a todo item is under the limit of 141 characters
function todoLengthHandler (req, res, next) {
    if (req.body.title.length <= 140) {
        next()

    // If check fails, then an error is sent
    } else {
        res.status(403).send({message: "Todo characters exceeded limit of 140"})
    }
}

module.exports = todoLengthHandler