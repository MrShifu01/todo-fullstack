const jwt = require('jsonwebtoken')

function checkJWTToken(req, res, next) {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token, "secretKey", function(error, data) {
            if (error) {
                res.send({message: "Invalid Token!"})
                next()
            } else {
                req.username = data.username
                req.password = data.password
                next()
            }
        })
    } else {
        res.send({message: "No token attached"})
        return
    }
}

module.exports = checkJWTToken