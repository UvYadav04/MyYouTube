const mongoose = require('mongoose')
const historyschema = mongoose.Schema({
    videoid: { type: String, require: true },
    viewer: { type: String, require: true },
})

module.exports = mongoose.model("History", historyschema)