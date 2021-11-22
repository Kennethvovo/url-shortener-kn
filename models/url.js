const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originalURL: {
    typeL: String,
    required: true,
  },
  shortURL: {
    typeL: String,
    required: true,
  },
  shortCode: {
    typeL: String,
    required: true,
  },
})

module.exports = mongoose.model('Url', urlSchema)
