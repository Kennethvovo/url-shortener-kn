const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PORT = 3000
const bodyParser = require('body-Parser')
const generateRandomIndex = require('./generateRandomIndex')
const urlList = require('./models/url')
const mainURL = 'http://localhost/'
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
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const inputURL = req.body.originalURL
  urlList
    .find()
    .lean()
    .then((urls) => {
      addedURL = urls.find((url) => url.originalURL === inputURL)
      if (addedURL) {
        res.render('result', { newURL: addedURL.shortURL })
      } else {
        let shortCode = generateRandomIndex()
        while (urls.some((url) => url.shortCode === shortCode)) {
          shortCode = generateRandomIndex()
        }
        urlList.create({
          originalURL: inputURL,
          shortURL: mainURL + shortCode,
          shortCode,
        })
        res.render('result', { mewURL: mainURL + shortCode })
      }
    })
    .catch((error) => console.log(error))
})
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})
