function todoLengthHandler (req, res, next) {
    if (req.body.title.length <= 140) {
        next()
    } else {
        res.status(403).send({message: "Todo characters exceeded limit of 140"})
    }
}

module.exports = todoLengthHandler