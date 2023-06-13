function checkDataType (req, res, next) {
    const contentType = req.headers['content-type'];

    if (contentType && contentType.includes('application/json')) {
      try {
        JSON.parse(JSON.stringify(req.body));
        next();
      } catch (error) {
        res.status(400).send({ message: 'Invalid JSON content.' });
      }
    } else {
      res.status(400).send({ message: 'Invalid content type. Only JSON is allowed.' });
    }
  }

module.exports = checkDataType
  