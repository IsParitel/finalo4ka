const Router = require('express')
const router = new Router()
const job_regController = require('../controllers/job_regController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN', 'RABOTA'), authMiddleware, job_regController.create)
router.delete('/:job_pageId', checkRole('ADMIN', 'RABOTA'), authMiddleware, job_regController.delete)

module.exports = router