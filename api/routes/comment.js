
const express = require('express')

const router = express.Router()

const {verifytoken} = require('../utils/verifytoken')

const commentcontroller = require('../controllers/comment')

router.post('/create-comment', verifytoken, commentcontroller.createcomment)
router.get('/getcomments/:postid',commentcontroller.getpostscomment)
router.put('/likecomment/:commentid',verifytoken,commentcontroller.likecomment)
router.post('/editcomment/:commentid',verifytoken, commentcontroller.editcomment)
router.delete('/deletecomment/:commentid',verifytoken,commentcontroller.deletecomment)

module.exports = router