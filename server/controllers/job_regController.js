const { Job_reg } = require('../models/models');
const ApiError = require('../error/ApiError');

class Job_regController {
    async create(req, res, next) {
        try {
            const { profile_pageId, job_pageId } = req.body;

            // Проверка на наличие обязательных данных
            if (!profile_pageId || !job_pageId) {
                return next(ApiError.badRequest("profile_pageId и job_pageId обязательны"));
            }

            const jobReg = await Job_reg.create({ profile_pageId, job_pageId });
            return res.json(jobReg);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    async delete(req, res, next) {
        try {
            const { job_pageId } = req.params;

            // Проверка, указан ли job_pageId
            if (!job_pageId) {
                return next(ApiError.badRequest("job_pageId обязательный параметр"));
            }

            // Удаление записи по job_pageId
            const deleted = await Job_reg.destroy({ where: { job_pageId } });

            // Если запись не найдена, сообщить об этом
            if (!deleted) {
                return next(ApiError.badRequest("Запись с указанным job_pageId не найдена"));
            }

            return res.json({ message: `Запись с job_pageId ${job_pageId} успешно удалена` });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new Job_regController();