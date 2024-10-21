const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use("/admin", (req, res, next) => {
  const token = "eweweedd";
  const isAuthorized = token === "ewewewedd";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
});

app.use("/admin/auth", (req, res) => {
  res.status(201).send("What would you like to access");
});

app.use("/", (req, res) => res.send("404 Not found"));

app.listen(port, () => console.log(`Server started at port ${port}`));
