const { Job_create, Profile_page, Job_page } = require('../models/models');

class JobCreateController {
    // Создать связь между профилем и вакансией
    async create(req, res) {
        try {
            const { job_pageId, profile_pageId } = req.body;

            if (!job_pageId || !profile_pageId) {
                return res.status(400).json({ message: "job_pageId и profile_pageId обязательны" });
            }

            const newJobCreate = await Job_create.create({ job_pageId, profile_pageId });
            return res.status(201).json(newJobCreate);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при создании связи" });
        }
    }

    // Получить все связи по профилю
    async getByProfile(req, res) {
        try {
            const { profile_pageId } = req.params;

            const jobCreates = await Job_create.findAll({
                where: { profile_pageId },
                include: [{ model: Job_page }], // Опционально: подгрузить данные вакансии
            });

            return res.status(200).json(jobCreates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при получении связей" });
        }
    }

    // Получить все связи по вакансии
    async getByJob(req, res) {
        try {
            const { job_pageId } = req.params;

            const jobCreates = await Job_create.findAll({
                where: { job_pageId },
                include: [{ model: Profile_page }], // Опционально: подгрузить данные профиля
            });

            return res.status(200).json(jobCreates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при получении связей" });
        }
    }

    // Удалить связь
    async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedJobCreate = await Job_create.destroy({ where: { id } });

            if (!deletedJobCreate) {
                return res.status(404).json({ message: "Связь не найдена" });
            }

            return res.status(200).json({ message: "Связь успешно удалена" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при удалении связи" });
        }
    }
}

module.exports = new JobCreateController();