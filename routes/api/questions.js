const express = require("express");
const db = require("../../db");
const fs = require("fs");
const router = express.Router();

//Get questions 
router.get("/", (req, res) => {
  const str = `SELECT c.name as part, s.name as sections, p.name as subsections, 
                u.difficulty as Complexity, u.name as type, q.name as text, 
                q.typeAnswer as typeAnswer,q.answer as checker, q.hint as description  
                FROM chapter c
                INNER JOIN section s ON s.chapterId=c.id
                INNER JOIN paragraph p ON p.sectionId=s.id
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
      fs.writeFileSync("../../questions.json", json);
      res.send(rows);
    }
  );
});

//Add question
router.post("/", (req, res) => {
  const { name, hint, unitId, typeAnswer, answer } = req.body.data;
  db.query(
    "INSERT INTO question (name, hint, unitId, typeAnswer, answer) VALUES ( ?, ?, ?, ?, ?)",
    [name, hint, unitId, typeAnswer, answer],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});
module.exports = router;
