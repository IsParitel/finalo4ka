const Router = require('express')
const router = new Router()
const profile_pageController = require('../controllers/profile_pageController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:userId', authMiddleware, profile_pageController.getOne)

module.exports = router
