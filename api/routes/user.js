
const express = require('express')
const usercontrollers = require('../controllers/user')
const { verifytoken } = require('../utils/verifytoken')

const router = express.Router()

router.put('/update/:userid',verifytoken ,usercontrollers.updateuser)

module.exports = router