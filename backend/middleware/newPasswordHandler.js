// Middleware function to handle the validity of a new password, for changing a password or creating a new user and password
function newPasswordHandler(req, res, next) {

  // If a new password is the same as the cofirmed password, and the password is 6 or more characters, then it's successful
  if (req.body.newPassword == req.body.confirmPassword && req.body.newPassword.length >= 6) {
    req.newUserPassword = req.body.newPassword;
    next();

  // If the password is too short, then send an error 
  } else if (req.body.newPassword.length < 6) {
    res.status(403).send({
      message: "The new password needs to be longer than six characters."
    });

  // If those two options are not met, then the password must be an incorrect match and an error is sent  
  } else {
    res.status(403).send({
      message: "Confirmation Password and New Password do not match."
    });

  }
}

module.exports = newPasswordHandler;
