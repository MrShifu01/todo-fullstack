// Middleware to check if a token is valid and grant permission to continue

const jwt = require('jsonwebtoken')

function checkJWTToken(req, res, next) {

    // check for and retrieve the included token from the header
    if (req.headers['authorization']) {

        // Split the token from its Bearer and Token and assign the token part to 'token'
        let token = req.headers['authorization'].split(" ")[1]
        
        // Verify the token with the secret key
        jwt.verify(token, "secretKey", function(error, data) {

            // If an error, it means the token is invalid
            if (error) {
                res.send({message: "Invalid Token!"})
                next()

            // Otherwise, the token was accepted and req.username and req.password are assigned to be used in the server code 
            } else {
                req.username = data.username
                req.password = data.password
                next()
            }
        })

    // if no auth header was included, send an error saying not token was attached
    } else {
        res.send({message: "No token attached"})
        return
    }
}

module.exports = checkJWTToken