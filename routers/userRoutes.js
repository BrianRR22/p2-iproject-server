const express = require('express')
const UserController = require('../controllers/UserController')
// const { authentication, authorization, authorizationStatus } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.patch('/subscription', UserController.subscription)



module.exports = router