const mongoose = require('mongoose')


const Entries = new mongoose.Schema({
    date: { type: String, require: true },
    items: { type: Array, require: true }
})

const model = mongoose.model('Entries', Entries, "Entries")

module.exports = model