
function checkNewPassword (req, res, next) {
    if (req.body.newPassword === req.body.confirmPassword && req.body.newPassword.length >= 6) {
        req.newUserPassword = req.body.newPassword
        next()
    } else if (req.body.newPassword < 6) {
        res.send({message: "Password must be 6 or more characters"})
        next()
    } else {
        res.send({message: "New Passwords do not match!"})
        next()
    }
}

module.exports = checkNewPassword