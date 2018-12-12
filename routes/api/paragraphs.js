const express = require("express");
const db = require("../../db");
const router = express.Router();

//Get paragraphs
router.get("/", (req, res) => {
  db.query("SELECT p.id,p.name FROM paragraph AS p WHERE p.sectionId=?",[req.query.sectionId],(err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});
//Add paragraphs
module.exports = router;