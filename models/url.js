const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  url: {
    typeL: String,
    required: true,
  },
})

module.exports = mongoose.model('URL', urlSchema)