const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PORT = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/url-shortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}!`)
})
