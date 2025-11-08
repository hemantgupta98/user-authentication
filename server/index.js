const express = require("express");
const port = 8000;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { User } = require("../models/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/business")
  .then((e) => console.log("mongodb is connected"))
  .catch((Error) => console.log(Error));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/business", async (req, res) => {
  try {
    const doc = await User.create(req.body);
    res.json({ msg: "Data Saved", data: doc });
  } catch (error) {
    res.status(500).json({ msg: "Error saving", error });
  }
});

app.listen(port, () => console.log("server is connected 8000"));
