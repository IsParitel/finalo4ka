const Router = require('express')
const router = new Router()
const job_regController = require('../controllers/job_regController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN', 'USER'), authMiddleware, job_regController.create)
router.delete('/:job_pageId/:profile_pageId', checkRole('ADMIN', 'USER'), authMiddleware, job_regController.delete);

module.exports = router