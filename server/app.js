const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { CONNECT_API } = require("./util/connectDB");

const app = express();
const accountRoutes = require("./routes/account");
const projectRoutes = require("./routes/project");

app.use(bodyParser.json()); // application/json
app.use(accountRoutes);
app.use(projectRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoose
  .connect(CONNECT_API)
  .then((res) => {
    console.log("Connected Database");
    console.log("Listening port 4000 ...");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
