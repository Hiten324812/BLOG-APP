
const express = require('express')

const authcontrollers = require('../controllers/auth')

const router = express.Router()

router.post('/signup',authcontrollers.signup)

module.exports = router