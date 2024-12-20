const { Job_reg, Profile_page, Job_page } = require('../models/models');
const ApiError = require('../error/ApiError');

class Job_regController {
    async create(req, res, next) {
        try {
            const { profile_pageId, job_pageId } = req.body;

            if (!profile_pageId || !job_pageId) {
                return next(ApiError.badRequest("profile_pageId и job_pageId обязательны"));
            }

            const profile_pageExists = await Profile_page.findByPk(profile_pageId);
            const job_pageExists = await Job_page.findByPk(job_pageId);

            if (!profile_pageExists || !job_pageExists) {
                return next(ApiError.badRequest("Указанный профиль или вакансия не существуют"));
            }

            const existingReg = await Job_reg.findOne({ where: { profile_pageId, job_pageId } });
            if (existingReg) {
                return next(ApiError.badRequest("Такая регистрация уже существует"));
            }

            const jobReg = await Job_reg.create({ profile_pageId, job_pageId });
            return res.json(jobReg);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { job_pageId, profile_pageId } = req.params;

            if (!job_pageId || !profile_pageId) {
                return next(ApiError.badRequest("job_pageId и profile_pageId обязательные параметры"));
            }

            const deleted = await Job_reg.destroy({ where: { job_pageId, profile_pageId } });

            if (!deleted) {
                return next(ApiError.badRequest("Запись с указанными параметрами не найдена"));
            }

            return res.json({ message: `Запись с job_pageId ${job_pageId} и profile_pageId ${profile_pageId} успешно удалена` });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new Job_regController();
