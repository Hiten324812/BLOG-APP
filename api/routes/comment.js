
const express = require('express')

const router = express.Router()

const {verifytoken} = require('../utils/verifytoken')

const commentcontroller = require('../controllers/comment')

router.post('/create-comment', verifytoken, commentcontroller.createcomment)
router.get('/getcomments/:postid',commentcontroller.getpostscomment)

module.exports = router