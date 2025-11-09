const express = require("express");
const port = 8000;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE PATCH HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/business")
  .then((e) => console.log("mongodb is connected"))
  .catch((Error) => console.log(Error));

app.post("/api/user", (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});

app.get("/api/user", (req, res) => {
  return res.end(req.body);
});

app.listen(port, () => console.log("server is connected 8000"));
