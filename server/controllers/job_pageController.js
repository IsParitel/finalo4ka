const uuid = require('uuid');
const path = require('path');
const {Job_page, Job_info, Profile_page, Job_reg} = require('../models/models');
const ApiError = require('../error/ApiError');

class Job_pageController {
    async create(req, res, next) {
        try {
            const {name, otraslId, specialId, info} = req.body;

            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Файл изображения не передан'));
            }

            const {img} = req.files;
            let filename = uuid.v4() + path.extname(img.name);
            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const {id: userId} = req.user;
            const profile_page = await Profile_page.findOne({where: {userId}});
            if (!profile_page) {
                return next(ApiError.badRequest('Профиль пользователя не найден'));
            }

            const job_page = await Job_page.create({name, otraslId, specialId, img: filename});

            if (info) {
                const parsedInfo = JSON.parse(info);
                await Promise.all(parsedInfo.map(i =>
                    Job_info.create({
                        title: i.title,
                        description: i.description,
                        job_pageId: job_page.id
                    })
                ));
            }

            await Job_reg.create({profile_pageId: profile_page.id, job_pageId: job_page.id});

            return res.json(job_page);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {otraslId, specialId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        const where = {};
        if (otraslId) where.otraslId = otraslId;
        if (specialId) where.specialId = specialId;

        const job_pages = await Job_page.findAndCountAll({where, limit, offset});
        return res.json(job_pages);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const job_page = await Job_page.findOne({
            where: {id},
            include: [{model: Job_info, as: 'info'}]
        });

        if (!job_page) {
            return res.status(404).json({message: 'Страница не найдена'});
        }

        return res.json(job_page);
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const job_page = await Job_page.findByPk(id);

            if (!job_page) {
                return res.status(404).json({message: 'Страница не найдена'});
            }

            await job_page.destroy();
            return res.json({message: 'Страница успешно удалена'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new Job_pageController();