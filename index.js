const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const chapters = require("./routes/api/chapters");
const sections = require("./routes/api/sections");
const paragraphs = require("./routes/api/paragraphs");
const units = require("./routes/api/units");
const questions = require("./routes/api/questions");

const db = require("./db")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());
app.use("/api/chapters", chapters);
app.use("/api/paragraphs", paragraphs);
app.use("/api/sections", sections);
app.use("/api/units", units);
app.use("/api/questions", questions);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

const { PORT } = process.env || 3000;

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
