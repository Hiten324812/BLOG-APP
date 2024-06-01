
const express = require('express')
const usercontrollers = require('../controllers/user')
const { verifytoken } = require('../utils/verifytoken')

const router = express.Router()

router.put('/update/:userid',verifytoken ,usercontrollers.updateuser)
router.delete('/delete/:userid',verifytoken,usercontrollers.deleteuser)
router.post('/signout',usercontrollers.signout)
router.get('/getusers',verifytoken,usercontrollers.getUsers)
router.delete('/deleteuser/:userid',verifytoken,usercontrollers.deleteuser)

module.exports = router