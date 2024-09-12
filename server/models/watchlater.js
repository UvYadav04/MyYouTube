const mongoose = require('mongoose')
const watchalatervideoschema = mongoose.Schema({
    videoid: { type: String, require: true },
    viewer: { type: String, require: true },
    likedon: { type: Date, default: Date.now() }
})
module.exports = mongoose.model("Watchlater", watchalatervideoschema)