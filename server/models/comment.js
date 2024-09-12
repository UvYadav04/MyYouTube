const mongoose = require('mongoose')
const commentschema = mongoose.Schema({
    videoid: String,
    userid: String,
    commentbody: String,
    usercommented: String,
    commentedon: { type: Date, default: Date.now }
})
module.exports = mongoose.model("Comments", commentschema)