const Router = require('express')
const router = new Router()
const job_pageController = require('../controllers/job_pageController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN', 'RABOTA'), job_pageController.create)
router.get('/', job_pageController.getAll)
router.get('/:id', job_pageController.getOne)
router.delete('/:id', checkRole('ADMIN', 'RABOTA'), job_pageController.delete)

module.exports = router
