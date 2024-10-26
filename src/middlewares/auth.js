const jwt = require("jsonwebtoken");
const user = require("../models/user");

const adminAuth = (req, res, next) => {
  const token = "xzy";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuthentication = async (req, res, next) => {
  
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if(!token){
      throw new Error("Invalid Token!!!")
    }
    const deCoded = await jwt.verify(token, "not-111-secret");

    const { _id } = deCoded;

    const userData = await user.findById({_id});
    if (!userData) {
      throw new Error("No user Found ");
    } else {
  
      req.userData = userData;
      next();
      
    }
  } catch (error) {
    res.status(500).send(`Something went wrong : ${error.message}`);
  }
};

module.exports = { adminAuth, userAuthentication };
