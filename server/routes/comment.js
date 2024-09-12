const express = require('express')

const { postcomment, getcomment, deletecomment, editcomment } = require('../controllers/Comment.js')
const auth = require('../middleware/auth.js')
const router = express.Router()

router.post('/post', postcomment)
router.get('/get', getcomment)
router.delete('/delete/:id', auth, deletecomment)
router.patch('/edit/:id', auth, editcomment)

module.exports = router