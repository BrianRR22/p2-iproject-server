const express = require('express')
const router = express.Router()
const idolRouter= require('./idolRoutes')



router.use('/idols', idolRouter)




module.exports= router