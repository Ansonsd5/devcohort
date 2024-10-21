const adminAuth = (req, res, next) => {
    const token = "xzy";
    const isAuthorized = token === "xyz";
    if (!isAuthorized) {
      res.status(401).send("Unauthorized request");
    } else {
      next();
    }
  };

module.exports ={adminAuth}
  