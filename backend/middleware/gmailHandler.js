// Middleware to check if an email address entered by the client is valid
function checkGmail (req, res, next) {

    // Checking if the entered email address ends with @gmail.com
    if (req.body.email.endsWith("@gmail.com")) {
        next()

    // If not, then send an error as the entered email address is incorrect 
    } else {
        res.status(403).send({message: "Email address is not Gmail address!"})
    }
}

module.exports = checkGmail