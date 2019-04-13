const express = require('express')
const db = require('../../db')
const router = express.Router()

// Get sections
router.get('/', (req, res) => {
  const { chapterId } = req.query
  db.query(
    'SELECT s.id,s.name FROM section AS s WHERE s.chapterId=?', chapterId,
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
// Add sections
router.post('/', (req, res) => {
  const { name, chapterId } = req.body
  db.query(
    'INSERT INTO section (name, chapterId) VALUES (?,?)',
    [name, chapterId],
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
module.exports = router
