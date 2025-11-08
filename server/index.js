const express = require("express");
const port = 8000;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/business")
  .then((e) => console.log("mongodb is connected"))
  .catch((Error) => console.log(Error));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => console.log("server is connected 8000"));
