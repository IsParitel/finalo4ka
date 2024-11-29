const { Profile_page, Job_reg, Job_page, User } = require('../models/models');
const { Sequelize } = require('sequelize');
const ApiError = require('../error/ApiError');

class Profile_pageController {
    async getOne(req, res, next) {
        try {
            const { id: userId } = req.user;

            const profile_page = await Profile_page.findOne({ where: { userId } });
            if (!profile_page) {
                return res.status(404).json({ message: 'Профиль не найден' });
            }

            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const job_regs = await Job_reg.findAll({
                where: { profile_pageId: profile_page.id },
                attributes: ['job_pageId'],
            });

            const jobPageIds = job_regs.map(({ job_pageId }) => job_pageId);

            const job_pages = jobPageIds.length
                ? await Job_page.findAll({ where: { id: { [Sequelize.Op.or]: jobPageIds } } })
                : [];

            return res.json({
                user,
                profile_page,
                job_pages,
            });
        } catch (e) {
            console.error('Ошибка при получении профиля:', e);
            return next(ApiError.internal('Ошибка при получении профиля'));
        }
    }
}

module.exports = new Profile_pageController();
