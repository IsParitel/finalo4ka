const Router = require('express');
const router = new Router();
const JobCreateController = require('../controllers/job_createController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN', 'RABOTA'), JobCreateController.create);
router.get('/profile/:profile_pageId', JobCreateController.getByProfile);
router.get('/job/:job_pageId', JobCreateController.getByJob);
router.delete('/:id', checkRole('ADMIN', 'RABOTA'), JobCreateController.delete);

module.exports = router;
