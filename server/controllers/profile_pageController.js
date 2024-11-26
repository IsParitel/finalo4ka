const {Profile_page, Job_reg, Job_page} = require('../models/models')
const {Sequelize} = require('sequelize')
const ApiError = require('../error/ApiError');

class Profile_pageController {
    async getOne(req, res, next) {
        try {
            const {id} = req.user
            const profile_page = await Profile_page.findOne(
                {
                    where: {userId: id}
                },
            )
            if (!profile_page) {
                return res.status(404).json({message: 'Профиль не найден'});
            }

            const job_regs = await Job_reg.findAll({where: {profile_pageId: profile_page.id}})
            const job_pages = await Job_page.findAll({
                where: {
                    id: {[Sequelize.Op.or]: job_regs.map(({job_pageId}) => job_pageId)}
                }
            })
            return res.json({...profile_page.dataValues, job_pages})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new Profile_pageController()