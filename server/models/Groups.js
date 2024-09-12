const mongoose = require('mongoose')
const schema = mongoose.Schema

const groupschema = new schema({
    name: {
        type: String,
        require: true
    },
    members: {
        type: Array
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: String
    }
})


module.exports = mongoose.model('groups', groupschema)