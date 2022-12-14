const express = require("express");
const path = require("path");
const userController = require("./server/controllers/userController");
const productController = require("./server/controllers/productController");
const rentRecordController = require("./server/controllers/rentRecordController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", productController);
app.use("/user", userController);
app.use("/record", rentRecordController);

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const mongoose = require("mongoose");
const url = "mongodb://localhost/rent";
mongoose
  .connect(url)
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
    console.log(err);
  });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});

const PORT = 4000;
app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});
