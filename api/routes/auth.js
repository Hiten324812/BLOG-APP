
const express = require('express')

const authcontrollers = require('../controllers/auth')

const router = express.Router()

router.post('/signup',authcontrollers.signup)
router.post('/signin',authcontrollers.signin)
router.post('/google',authcontrollers.google)
module.exports = router