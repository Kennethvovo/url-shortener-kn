const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')
const exphbs = require('express-handlebars')
const PORT = process.env.port || 3000
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
