const express = require('express')
const db = require('../db')
const router = express.Router()

// Get units
router.get('/', (req, res) => {
  const { paragraphId } = req.query
  db.query(
    'SELECT * FROM unit AS u WHERE u.paragraphId=?',
    paragraphId,
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
// Add units
router.post('/', (req, res) => {
  const { name, paragraphId, difficulty, hint } = req.body
  db.query(
    'INSERT INTO unit (name, paragraphId, difficulty, hint) VALUES (?,?,?,?)',
    [name, paragraphId, difficulty, hint],
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
module.exports = router
