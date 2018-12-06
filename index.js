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
  database: "testso"
});

app.post("/questions", function(req, res) {
  var result = [];
  let str = `SELECT c.name as part, s.name as sections, p.name as subsections, u.name as title,
                u.difficulty as Complexity, u.hint as description_unit, q.name as text,
                q.hint as description_question, q.typeAnwer as typeAnswer, q.answer as checker
                FROM chapter c
                INNER JOIN section s ON s.chapterId=c.id
                INNER JOIN paragpaph p ON p.sectionId=s.id
                INNER JOIN unit u ON u.paragraphId=p.id
                INNER JOIN question q ON q.unitId=u.id
                WHERE c.name=? AND s.name=? AND p.name=?`;
  connection.query(
    str,
    ["Комбинаторика", "Выборки", "Правило суммы и произведения"],
    function(err, rows) {
      //параметры для тестирования
      if (err) throw err;
      rows.forEach(row => {
        result.push({
          ...row
        });
      });
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

var result = [];
let str = `SELECT c.name as part, s.name as sections, p.name as subsections, u.name as title,
            u.difficulty as Complexity, u.hint as description_unit, q.name as text,
            q.hint as description_question, q.typeAnwer as typeAnswer, q.answer as checker
            FROM chapter c
            INNER JOIN section s ON s.chapterId=c.id
            INNER JOIN paragpaph p ON p.sectionId=s.id
            INNER JOIN unit u ON u.paragraphId=p.id
            INNER JOIN question q ON q.unitId=u.id
            WHERE c.name=? AND s.name=?
            AND p.name=?`;

connection.query(
  str,
  ["Комбинаторика", "Выборки", "Правило суммы и произведения"],
  function(err, rows) {
    if (err) {
      throw err;
    }
    rows.forEach(row => {
      result.push({
        ...row
      });
    });
    console.log(result);
  }
); //end run
