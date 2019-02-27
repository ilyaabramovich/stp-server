const express = require('express')
const db = require('../../db')
const router = express.Router()

// Get units
router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM unit AS u WHERE u.paragraphId=?',
    req.query.paragraphId,
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
