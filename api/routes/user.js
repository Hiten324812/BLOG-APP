
const express = require('express')
const usercontrollers = require('../controllers/user')

const router = express.Router()

router.get('/test',usercontrollers.usertest)

module.exports = router