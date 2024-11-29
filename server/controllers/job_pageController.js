const uuid = require('uuid');
const path = require('path');
const { Job_page, Profile_page, Special } = require('../models/models');
const ApiError = require('../error/ApiError');

class Job_pageController {
    async create(req, res, next) {
        try {
            const { name, otraslId, specialId, description } = req.body;

            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Файл изображения не передан'));
            }
            const { img } = req.files;

            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(img.mimetype)) {
                return next(ApiError.badRequest('Неверный формат файла. Только JPG, JPEG и PNG разрешены.'));
            }

            const special = await Special.findOne({ where: { id: specialId } });
            if (!special) {
                return next(ApiError.badRequest('Указанная специальность не найдена'));
            }
            if (special.otraslId !== parseInt(otraslId)) {
                return next(ApiError.badRequest('Специальность не связана с указанной отраслью'));
            }

            const filename = uuid.v4() + path.extname(img.name);
            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const { id: userId } = req.user;
            const profile_page = await Profile_page.findOne({ where: { userId } });
            if (!profile_page) {
                return next(ApiError.badRequest('Профиль пользователя не найден'));
            }

            const job_page = await Job_page.create({
                name,
                otraslId,
                specialId,
                img: filename,
                description,
            });

            return res.json(job_page);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            let { otraslId, specialId, limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            const where = {};
            if (otraslId) where.otraslId = otraslId;
            if (specialId) where.specialId = specialId;

            const job_pages = await Job_page.findAndCountAll({ where, limit, offset });
            return res.json(job_pages);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при получении вакансий' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const job_page = await Job_page.findOne({
                where: { id }
            });

            if (!job_page) {
                return res.status(404).json({ message: 'Вакансия не найдена' });
            }

            return res.json(job_page);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении вакансии' });
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const job_page = await Job_page.findByPk(id);
            if (!job_page) {
                return res.status(404).json({ message: 'Вакансия не найдена' });
            }

            await job_page.destroy();

            return res.json({ message: 'Вакансия успешно удалена' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new Job_pageController();
