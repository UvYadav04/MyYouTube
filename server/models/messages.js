const mongoose = require('mongoose')
const messageschema = mongoose.Schema({
    Group: {
        type: String
    },
    Messages: {
        type: Array
    }
})
module.exports = mongoose.model("messages", messageschema)