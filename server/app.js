const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { CONNECT_API } = require("./util/connectDB");

const app = express();

const accountRoutes = require("./routes/account");

app.use(bodyParser.json()); // application/json
app.use(accountRoutes);

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
