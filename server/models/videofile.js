const mongoose = require('mongoose')
const videofileschema = new mongoose.Schema(
    {
        videotitle: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
            required: true,
        },
        filetype: {
            type: String,
            required: true,
        },
        filepath: {
            type: String,
            required: true,
        },
        baseName: {
            type: String,
        },
        filesize: {
            type: String,
            required: true,
        },
        videochanel: {
            type: String,
            required: true,
        },
        Like: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
        uploader: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("Videofiles", videofileschema)