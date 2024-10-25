const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 40 },
    lastName: { type: String },
    emailId: { type: String, required: true, unique: true },
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
