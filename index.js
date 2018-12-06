var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var app = express();
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

app.post("/questions", function(req, res) {
  connection.query("SELECT * FROM QUESTION", function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send("Questions: " + result);
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
