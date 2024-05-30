
const express = require('express')

const { verifytoken } = require('../utils/verifytoken')

const postcontroller = require('../controllers/post')

const router = express.Router()

router.post('/create-post',verifytoken,postcontroller.createpost)
router.get('/getposts',verifytoken,postcontroller.getpost)
router.delete('/delete/:postid/:userid',verifytoken,postcontroller.deletepost)

module.exports = router