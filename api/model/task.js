const mongoose = require('mongoose')

let task = new mongoose.Schema({
    title: String,
    description: String,
    status: String
})

module.exports = mongoose.model('Tasks',task)