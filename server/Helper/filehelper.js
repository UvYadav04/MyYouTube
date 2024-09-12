"use strict";
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const dateStr = new Date().toISOString().replace(/[:.]/g, "-"); // Replace colons and dots with hyphens
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_"); // Replace spaces and special characters with underscores
        cb(null, `${dateStr}-${sanitizedFilename}`);
    },
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage, fileFilter: filefilter });
module.exports = upload