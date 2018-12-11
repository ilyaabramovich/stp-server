const express = require("express");
const db = require("../../db");
const router = express.Router();

//Get chapters
router.get("/", (req, res) => {
  db.query("SELECT c.id,c.name FROM chapter AS c", (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});
//Add chapters
module.exports = router;
