const mongoose = require("mongoose");
const { trim } = require("validator");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 40 },
    lastName: { type: String,maxLength :40 },
    emailId: { 
      type: String, 
      lowercase:true,
      trim:true,
      required: true, 
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error(`Invalid Email Address ${value}`)
        }
      }
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
        message: 'A user can have a maximum of 8 skills.'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
