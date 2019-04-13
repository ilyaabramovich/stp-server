const express = require('express')
const db = require('../../db')
const router = express.Router()

// Get paragraphs
router.get('/', (req, res) => {
  const { sectionId } = req.query
  db.query(
    'SELECT p.id,p.name FROM paragraph AS p WHERE p.sectionId=?',
    sectionId,
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
// Add paragraphs
router.post('/', (req, res) => {
  const { name, sectionId } = req.body
  db.query(
    'INSERT INTO paragraph (name, sectionId) VALUES (?,?)',
    [name, sectionId],
    (err, result) => {
      if (err) {
        throw err
      }
      res.send(result)
    }
  )
})
module.exports = router
