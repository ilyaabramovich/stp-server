const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const chapters = require('./routes/chapters')
const sections = require('./routes/sections')
const paragraphs = require('./routes/paragraphs')
const units = require('./routes/units')
const questions = require('./routes/questions')
const tests = require('./routes/tests')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors())

app.use('/chapters', chapters)
app.use('/paragraphs', paragraphs)
app.use('/sections', sections)
app.use('/units', units)
app.use('/questions', questions)
app.use('/tests', tests)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const { PORT } = process.env || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
