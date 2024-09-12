const mongoose = require('mongoose')
const likedvideoschema = mongoose.Schema({
    videoid: { type: String, require: true },
    viewer: { type: String, require: true },
    likedon: { type: Date, default: Date.now() }
})
module.exports = mongoose.model("Likedvideo", likedvideoschema)