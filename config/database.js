const mongoose = require("mongoose");
const uri =
  "mongodb+srv://ansonsd5:AgvB0fTSei10fTPy@test.v1fgg.mongodb.net/?retryWrites=true&w=majority&appName=test";

const connectDB = async () => {
  await mongoose.connect(uri);
};

connectDB().then(() => {
  try {
    console.log("Database connected successfully");
  } catch {
    console.error("Database cannot be connected");
  }
});
