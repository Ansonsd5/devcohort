const hadleError = (err, req, res, next) => {
    err =true;
  if (err) {
    res.status(500).res("Something went wrong");
  } else {
    next();
  }
};

module.exports = {
    hadleError
}