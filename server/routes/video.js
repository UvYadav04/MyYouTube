const express = require('express')
const likevideocontroller = require('../controllers/like');
const viewscontroller = require('../controllers/views')
const { uploadvideo, getallvideos } = require('..//controllers/video');
const { historycontroller, deletehistory, getallhistorycontroller } = require('../controllers/History');
const { watchlatercontroller, getallwatchlatervontroller, deletewatchlater } = require('../controllers/watchlater');
const { likedvideocontroller, getalllikedvideo, deletelikedvideo } = require('../controllers/likedvideo');
const upload = require('../Helper/filehelper');
const auth = require('../middleware/auth')
const routes = express.Router();

routes.post('/uploadvideo', upload.single('file'), uploadvideo)

routes.get('/getvideos', getallvideos)
routes.patch('/like/:id', auth, likevideocontroller)
routes.patch('/view/:id', viewscontroller)

routes.post('/history', auth, historycontroller)
routes.get('/getallhistory', getallhistorycontroller)
routes.delete('/deletehistory/:userid', auth, deletehistory)

routes.post('/watchlater', auth, watchlatercontroller)
routes.get('/getallwatchlater', getallwatchlatervontroller)
routes.delete('/deletewatchlater/:videoid/:viewer', auth, deletewatchlater)

routes.post('/likevideo', auth, likedvideocontroller)
routes.get('/getalllikevide', getalllikedvideo)
routes.delete('/deletelikevideo/:videoid/:viewer', auth, deletelikedvideo)

module.exports = routes