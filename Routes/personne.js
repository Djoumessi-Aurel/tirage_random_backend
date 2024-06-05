const express = require('express')
const router = express.Router()

const AdminController = require('../Controllers/PersonneController')

router.post('/store', AdminController.store)
router.get('/all', AdminController.showAll)
router.get('/:id', AdminController.showById)
router.delete('/destroy/:id', AdminController.destroy)

router.post('/tirer', AdminController.tirerPersonne)

module.exports = router