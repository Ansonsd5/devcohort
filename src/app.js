const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { default: mongoose, model } = require("mongoose");
const user = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const MAX_SKILLS = 4;

app.post("/signup", async (req, res) => {
  
 
  const user = new User(req.body);
try {
  await user.save();
  res.send("User added to DB successfully");
} catch (error) {
  console.log("errr",error.message)
  res.status(500).send(`Somthing went wrong ${error.message}`)
}

});

app.get("/getFeed", async (req, res) => {
  console.log("entering feed");
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

app.delete("/deleteUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
  } catch (error) {
    res.status(400).send("Somthing went wtrong");
  }
});

app.patch("/update/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;
  const ALLOWED_FIELDS = ['firstName','lastName','password','age','gender','skills'];

  const isUpdateAllow = Object.keys(data).every((k)=> ALLOWED_FIELDS.includes(k))
  try {

    
    if(req.body?.skills?.length>MAX_SKILLS){
      throw new Error(`User can have at most ${MAX_SKILLS} skills`)
    }
    if(!isUpdateAllow){
      throw new Error("Update not Allowed")
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data,{runValidators:true,returnDocument: 'after'});
    res.send("User updated");
  } catch (error) {
    res.status(400).send("Somthing went wtrong"+error.message);
  }
});

app.patch("/update-email", async (req, res) => {
  const email = req.body.emailId;
  const userId = req.body.userId;
  try {
    const data = await User.findByIdAndUpdate(userId ,{emailId :email});
    console.log("before updated", data);
    res.status(200).send("Updated email");
  } catch (error) {
    res.status(500).send("Something went wrong!!");
  }
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
