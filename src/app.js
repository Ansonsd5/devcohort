const express = require("express");

const app = express();
const port = process.env.PORT || 3000; 
console.log(port);

app.get("/", (req, res) => {
  res.send("We started here");
});

app.get("/test", (req, res) => {
  res.send("What's the recent fun you had?");
});

app.use('/',(req,res)=>res.send("404 Not found"))

app.listen(port, () => console.log(`Server started at port ${port}`));