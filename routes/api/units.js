const express = require("express");
const db = require("../../db");
const router = express.Router();

//Get units
router.get("/", (req, res) => {
  db.query("SELECT * FROM unit AS u WHERE u.paragraphId=?",[req.query.paragraphId],(err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});
//Add units
module.exports = router;