const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config();
const db = require("./db")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());

const chapters = require("./routes/api/chapters");

app.use("/api/chapters", chapters);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/questions", function(req, res) {
  const str = `SELECT c.name as part, s.name as sections, p.name as subsections, 
                u.difficulty as Complexity, u.name as type, q.name as text, 
                q.typeAnwer as typeAnswer,q.answer as checker, q.hint as description  
                FROM chapter c
                INNER JOIN section s ON s.chapterId=c.id
                INNER JOIN paragpaph p ON p.sectionId=s.id
                INNER JOIN unit u ON u.paragraphId=p.id
                INNER JOIN question q ON q.unitId=u.id
                WHERE c.name=? AND s.name=? AND p.name=? AND u.difficulty=?`;
  db.query(
    str,
    ["Комбинаторика", "Выборки", "Правило суммы и произведения", 1],
    function(err, rows) {
      if (err) throw err;

      const json = JSON.stringify(
        {
          questions: rows
        },
        null,
        2
      )
        .replace("/&/g", "&amp;")
        .replace("/</g", "&lt;")
        .replace("/>/g", "&gt;");
      fs.writeFileSync("questions.json", json);
      res.send(rows);
    }
  );
});

const { PORT } = process.env || 3000;

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
