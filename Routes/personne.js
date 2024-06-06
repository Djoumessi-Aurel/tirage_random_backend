const express = require('express')
const router = express.Router()

const AdminController = require('../Controllers/PersonneController')

router.post('/', AdminController.store)
router.get('/', AdminController.showAll)
router.get('/:id', AdminController.showById)
router.delete('/:id', AdminController.destroy)

router.post('/tirer', AdminController.tirerPersonne)

module.exports = router