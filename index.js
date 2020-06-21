const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const lotteryRoutes = require("./routes/lotteryRouter");
const multer = require("multer");
const sendEmails = require("./email/email");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-jne8p.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("connection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, text/html"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", lotteryRoutes);
app.listen(3000);
module.exports = router;
module.exports = app;
