const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
require('./config/mongoose')
const app = express()
const routes = require('./routes')
const PORT = process.env.port || 3000
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
