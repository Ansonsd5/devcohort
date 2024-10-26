const validator = require('validator');

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, gender, skills } =
    req.body;
  if (!firstName ) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a strong password!");
  }
};

const validateLoginData = (req) =>{
   const {emailId ,password} = req.body;
     if (!validator.isEmail(emailId)) {
        throw new Error("Enter your registered email");
      }
      else if(!validator.isStrongPassword(password)){
        throw new Error("Enter your correct password")
    }
    
}


module.exports = {
    validateSignUpData,
    validateLoginData,
}