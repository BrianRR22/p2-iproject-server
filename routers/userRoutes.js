const express = require('express')
const UserController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.loginWithGoogle)
router.get('/', authentication, UserController.findUser)
router.patch('/subscription', authentication, UserController.subscription)
router.post('/generate-midtrans-token', authentication, UserController.generateMidtransToken)
router.get('/idols/favorites', authentication, UserController.favoriteIdolList)
router.post('/idols/:IdolId', authentication, UserController.addFavoriteIdol)
router.delete('/idols/:id', authentication, UserController.deleteFavoriteIdol)



module.exports = router