const express = require('express')
const router = express.Router()
const idolRouter= require('./idolRoutes')
const userRouter= require('./userRoutes')



router.use('/idols', idolRouter)
router.use('/users', userRouter)




module.exports= router