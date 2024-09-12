const express = require('express')
const { newgroup, getallgroups } = require('../controllers/group')
const router = express.Router()

router.post('/newgroup', newgroup)
router.get('/fetchallgroups', getallgroups)


module.exports = router