function newPasswordHandler(req, res, next) {
  if (req.body.newPassword == req.body.confirmPassword && req.body.newPassword.length >= 6) {
    req.newUserPassword = req.body.newPassword;
    next();
  } else if (req.body.newPassword.length < 6) {
    res.status(403).send({
      message: "The new password needs to be longer than six characters."
    });

  } else {
    res.status(403).send({
      message: "Confirmation Password and New Password do not match."
    });

  }
}

module.exports = newPasswordHandler;
