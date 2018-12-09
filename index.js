var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cors = require("cors");
var fs = require("fs");
var morgan = require("morgan");

var app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "",
  database: "testso"
});

app.get("/questions", function(req, res) {
  var result = [];
  let str = `SELECT c.name as part, s.name as sections, p.name as subsections, 
                u.difficulty as Complexity, u.name as type, q.name as text, 
                q.typeAnwer as typeAnswer,q.answer as checker, q.hint as description  
                FROM chapter c
                INNER JOIN section s ON s.chapterId=c.id
                INNER JOIN paragpaph p ON p.sectionId=s.id
                INNER JOIN unit u ON u.paragraphId=p.id
                INNER JOIN question q ON q.unitId=u.id
                WHERE c.name=? AND s.name=? AND p.name=? AND u.difficulty=?`;
  connection.query(
    str,
    ["Комбинаторика", "Выборки", "Правило суммы и произведения", 1],
    function(err, rows) {
      //параметры для тестирования
      if (err) throw err;
      rows.forEach(row => {
        result.push({
          ...row
        });
      });
      console.log(result);
      var answer = {
        questions: result
      };
      var json = JSON.stringify(answer, null, 2);
      json = json
        .replace("/&/g", "&amp;")
        .replace("/</g", "&lt;")
        .replace("/>/g", "&gt;");
      fs.writeFileSync("questions.json", json);
      // res.send();
    }
  );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
