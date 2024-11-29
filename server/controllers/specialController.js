const { Special } = require('../models/models');
const ApiError = require('../error/ApiError');

class SpecialController {

    async create(req, res, next) {
        try {
            const { name } = req.body;
            const { otraslId } = req.body;

            if (!name || !otraslId) {
                return next(ApiError.badRequest('Не указано имя или ID отрасли'));
            }

            const special = await Special.create({ name, otraslId });

            return res.json(special);
        } catch (error) {
            console.error('Ошибка создания специальности:', error);
            return next(ApiError.internal('Ошибка создания специальности'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { otraslId } = req.query;

            let specials;
            if (otraslId) {
                specials = await Special.findAll({
                    where: { otraslId }
                });
            } else {
                specials = await Special.findAll();
            }

            return res.json(specials);
        } catch (error) {
            console.error('Ошибка получения специальностей:', error);
            return next(ApiError.internal('Ошибка получения специальностей'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;

            if (!id) {
                return next(ApiError.badRequest('Не указан ID специальности'));
            }

            // Удаляем специальность
            const result = await Special.destroy({ where: { id } });

            if (!result) {
                return next(ApiError.badRequest('Специальность не найдена'));
            }

            return res.json({ message: 'Специальность успешно удалена' });
        } catch (error) {
            console.error('Ошибка удаления специальности:', error);
            return next(ApiError.internal('Ошибка удаления специальности'));
        }
    }
}

module.exports = new SpecialController();
