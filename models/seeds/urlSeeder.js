const mongoose = require('mongoose')
const urlList = require('../url')
const datas = require('../../test-url.json')
const PORT = 3000
const generateRandomIndex = require('../../generateRandomIndex')
mongoose.connect('mongodb://localhost/url-shortener')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  datas.forEach((data) => {
    const shortCode = generateRandomIndex()
    urlList.create = {
      originalURL: data,
      shortURL: `http:localhost:${PORT}/${shortCode}`,
      shortCode,
    }
  })
  console.log('done')
})
