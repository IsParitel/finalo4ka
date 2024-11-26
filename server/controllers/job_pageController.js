const uuid = require('uuid')
const path = require('path')
const {Job_page, Job_info} = require('../models/models')
const ApiError = require('../error/ApiError')
class Job_pageController {
    async create(req, res, next) {
        try {
            const {name, otraslId, specialId, info} = req.body
            const {img} = req.files
            let filename = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    job_info.create({
                        title: i.title,
                        description: i.description,
                        job_pageId: job_page.id
                    })
                )
            }

            const job_page = await Job_page.create({name, otraslId, specialId, info, img: filename})

            return res.json(job_page)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {otraslId, specialId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let job_pages;
        if (!otraslId && !specialId) {
            job_pages = await Job_page.findAndCountAll({limit, offset})
        }
        if (otraslId && !specialId) {
            job_pages = await Job_page.findAndCountAll({where:{otraslId}, limit, offset})
        }
        if (!otraslId && specialId) {
            job_pages = await Job_page.findAndCountAll({where:{specialId}, limit, offset})
        }
        if (otraslId && specialId) {
            job_pages = await Job_page.findAndCountAll({where:{otraslId, specialId}, limit, offset})
        }
        return res.json(job_pages)
    }
    async getOne(req, res) {
        const {id} = req.params
        const job_page = await Job_page.findOne(
            {
                where: {id},
                include: [{model: Job_info, as: 'info'}]
            }
        )
        return res.json(job_page)
    }
    async delete(req, res) {

    }
}

module.exports = new Job_pageController()