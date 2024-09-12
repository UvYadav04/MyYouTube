const express = require('express')
const { updatemessages, getallmessages } = require('../controllers/messages')
const router = express.Router()

router.patch('/update', updatemessages)
router.get('/allmessages', getallmessages)

module.exports = router