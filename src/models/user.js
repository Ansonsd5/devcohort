const mongoose = require("mongoose");
const { trim } = require("validator");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 40 },
    lastName: { type: String, maxLength: 40 },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Invalid Email Address ${value}`);
        }
      },
    },
    password: { type: String, required: true },
    age: { type: Number },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: function (skills) {
          return skills.length <= 10;
        },
        message: "A user can have a maximum of 8 skills.",
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user }, "not-111-secret", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function(userInputPassword){
  console.log("inside cominggggg")
  const user = this;
  const passwordHash = user.password;
 const isValidPassword = await bcrypt.compare(userInputPassword, passwordHash);
  return isValidPassword;
}

module.exports = mongoose.model("User", userSchema);
