const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { CONNECT_API } = require("./util/connectDB");
const helmet = require("helmet");
const compresession = require("compression");

const app = express();
const accountRoutes = require("./routes/account");
const projectRoutes = require("./routes/project");
const contactUsRoutes = require("./routes/contact-us");

// secure
app.use(helmet());

// compression
app.use(compresession());

app.use(bodyParser.json()); // application/json
app.use(accountRoutes);
app.use(projectRoutes);
app.use(contactUsRoutes);

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
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => {
    console.log(err);
  });
