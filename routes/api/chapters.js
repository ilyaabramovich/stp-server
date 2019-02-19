const express = require("express");
const db = require("../../db");
const router = express.Router();

//Get chapters
router.get("/", (req, res) => {
  db.query("SELECT * FROM chapter", (err, result) => {
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
    req.body.name,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});
module.exports = router;
