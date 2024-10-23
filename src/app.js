const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { default: mongoose, model } = require("mongoose");
const user = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("its coming here", req.body);
  const user = new User(req.body);

  await user.save();
  res.send("User added to DB successfully");
});

app.get("/getFeed", async (req, res) => {
  console.log("entering feed")
  try {
    const allUsers = await User.find({});
    if (allUsers.length) {
      res.send(allUsers);
    } else {
      res.status(404).send("No user Data found");
    }
  } catch (error) {
    res.status(400).send("Somthing went wtrong");
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.find({ emailId: email });
    res.send(user);
  } catch (error) {
    res.status(400).send("Somthing went wtrong");
  }
});

app.delete('/deleteUser', async (req,res) =>{
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully")
  } catch (error) {
    res.status(400).send("Somthing went wtrong");
    
  }
});

app.patch('/update', async (req,res) =>{
  const data = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndUpdate({_id :userId},data);
    res.send("User updated")
  } catch (error) {
    res.status(400).send("Somthing went wtrong");
    
  }
})

connectDB().then(() => {
  try {
    console.log("Database is connected successfully!!");
    app.listen(port, () => console.log(`Server started at port ${port}`));
  } catch {
    console.log("Failed to connect Database...!!!");
  }
});

app.use("/", (req, res) => res.send("404 Not found"));
