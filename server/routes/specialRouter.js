const Router = require('express');
const router = new Router();
const specialController = require('../controllers/specialController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Создание специальности, ожидаем id отрасли в теле запроса
router.post('/', checkRole('ADMIN'), specialController.create);
router.get('/', specialController.getAll);
router.delete('/', checkRole('ADMIN'), specialController.delete);

module.exports = router;
