const express = require("express");
const db = require("../../db");
const router = express.Router();

//Get sections
router.get("/", (req, res) => {
  db.query("SELECT s.id,s.name FROM section AS s WHERE s.chapterId=?",[req.query.chapterId],(err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});
//Add sections
module.exports = router;