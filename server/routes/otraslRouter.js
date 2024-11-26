const Router = require('express')
const router = new Router()
const otraslController = require('../controllers/otraslController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), otraslController.create)
router.get('/', otraslController.getAll)
router.delete('/', checkRole('ADMIN'), otraslController.delete)

module.exports = router
