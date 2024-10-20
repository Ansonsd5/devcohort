const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling request response 1");
    // res.send("Request handler 1");
    next();
  },
  (req, res,next) => {
    console.log("Handling request response 2");
    next();
    console.log("second invoke")
    res.send("Request handler 2");
    console.log("second invoke after")
  },
  (req, res) => {
    console.log("Handling request response 3");
    res.send("Request handler 3");
  }
);

app.listen(port, () => console.log(`Server started at port ${port}`));


/*
1: Request response
It will just console.log 
and next() will be called

2: Request response
It will console and calls next() but doesnt move to next line instead it will call the next req,res

3: Request response
It will  console and also send response as Request handler 3,
then the http connection gets closed but control moves to the 2nd req,res next line i,e;
res.send("Request handler 2"); but since there is no http request alive to send the response so we will get the error as
Cannot set headers after they are sent to the client
*/