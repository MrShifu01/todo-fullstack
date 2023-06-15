function checkGmail (req, res, next) {
    if (req.body.email.endsWith("@gmail.com")) {
        next()
    } else {
        res.status(403).send({message: "Email address is not Gmail address!"})
    }
}

module.exports = checkGmail