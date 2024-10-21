const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const { hadleError } = require("./middlewares/handleError");

const app = express();
const port = process.env.PORT || 3000;


app.use('/',hadleError)
app.use('/admin',adminAuth);

app.use("/admin/auth", (req, res) => {
  res.status(201).send("What would you like to access");
});

app.use('/getUserData',(req,res) =>{
  // throw new Error("dffdff");
  res.send("User data send");
})

app.use('/',(err,req,res,next)=>{
  err = true
  if(err){
    res.status(500).send("Something went wrong")
  }else {
    next()
  }
})

app.use("/", (req, res) => res.send("404 Not found"));

app.listen(port, () => console.log(`Server started at port ${port}`));
