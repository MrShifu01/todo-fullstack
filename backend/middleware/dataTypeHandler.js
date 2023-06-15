// Middleware to check if incoming requests are of JSON type and responding accordingly
function dataTypeHandler(req, res, next) {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.toLowerCase() === 'application/json') {
    next();
  } else {
    res.status(403).send({ message: 'Invalid content type. Only JSON is allowed.' });
  }
}

module.exports = dataTypeHandler