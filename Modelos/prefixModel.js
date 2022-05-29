const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
  Guild: String,
  Prefix: String
})

module.exports = mongoose.model('prefixSchema', Schema)

/**
 * @JeremiasBots#3355
 * Asegurate de no vender este codigo
 * Usalo como base para un sistema de idiomas o como tu bot si estas empezando
 */