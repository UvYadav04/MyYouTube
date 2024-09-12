const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userschema = new Schema({
    name: { type: String },
    username: { type: String },
    email: { type: String, require: true },
    subscription: { type: String, default: "Free" },
    plan_validity: { type: Date },
    points: { type: Number, default: 0 },
    joinedon: { type: Date, default: Date.now() },
    description: { type: String, default: "" },
    state: { type: String },
    groupsIn: { type: Array }
})

const user = mongoose.model('user', userschema)
module.exports = user