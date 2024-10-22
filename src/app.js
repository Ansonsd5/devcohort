const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log("its coming here",req.body)
  const user = new User(req.body);

  await user.save();
  res.send("User added to DB successfully");
});



connectDB().then(() => {
  try {
    console.log("Database is connected successfully!!");
    app.listen(port, () => console.log(`Server started at port ${port}`));
  } catch {
    console.log("Failed to connect Database...!!!");
  }
});

app.use("/", (req, res) => res.send("404 Not found"));
