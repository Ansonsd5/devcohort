const mongoose = require("mongoose");
const uri =
  "mongodb+srv://ansonsd5:AgvB0fTSei10fTPy@test.v1fgg.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(uri);
};

module.exports =  connectDB;


