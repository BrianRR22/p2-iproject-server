const express = require('express')
const UserController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/idols/favorites', authentication, UserController.favoriteNewsList)
router.post('/idols/:IdolId', authentication, UserController.addFavoriteNews)



module.exports = router