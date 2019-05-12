const express = require('express')
const db = require('../db')
const router = express.Router()

// Add question
router.post('/', (req, res) => {
  const { name, hint, unitId, typeAnswer, answer } = req.body
  db.query(
    'INSERT INTO question (name, hint, unitId, typeAnswer, answer) VALUES ( ?, ?, ?, ?, ?)',
    [name, hint, unitId, typeAnswer, answer],
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
module.exports = router
