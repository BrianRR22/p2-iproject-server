const express = require('express')
const IdolController = require('../controllers/idolController')
const router = express.Router()

router.get('/', IdolController.showIdol)
router.get('/branches', IdolController.showBranches)
router.get('/songs/:id', IdolController.idolSong)
router.get('/youtube/:youtubeId', IdolController.idolYoutube)



module.exports = router