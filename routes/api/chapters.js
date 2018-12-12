const express = require("express");
const db = require("../../db");
const router = express.Router();

//Get chapters
router.get("/", (req, res) => {
  db.query("SELECT c.id,c.name FROM chapter AS c", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//Add chapters
router.post("/", (req, res) => {
  db.query(
    "INSERT INTO chapter (name) VALUES (?)",
    [req.body.data.name],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});
module.exports = router;
