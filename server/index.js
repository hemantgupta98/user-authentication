const express = require("express");
const port = 8000;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { User } = require("../server/models/user");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE PATCH HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/business")
  .then((e) => console.log("mongodb is connected"))
  .catch((Error) => console.log(Error));

app.post("/api/user", (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});

app.listen(port, () => console.log("server is connected 8000"));
