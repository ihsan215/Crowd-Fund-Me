const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { CONNECT_API } = require("./util/connectDB");
const helmet = require("helmet");
const compresession = require("compression");
const cors = require("cors");
const app = express();
const accountRoutes = require("./routes/account");
const projectRoutes = require("./routes/project");
const contactUsRoutes = require("./routes/contact-us");

// secure

// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const domainsFromEnv = process.env.CORS_DOMAINS || "";

const whitelist = domainsFromEnv.split(",").map((item) => item.trim());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
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
