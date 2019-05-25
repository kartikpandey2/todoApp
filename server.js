const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost/todoApp");

app.use(cors());

app.use(bodyParser.json());

app.use(routes);

app.listen("9900", () => {
  console.log("server started at port 9900");
});
