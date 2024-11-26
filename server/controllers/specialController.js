const {Special} = require('../models/models')
const ApiError = require('../error/ApiError')

class SpecialController {
    async create(req, res) {
        const {name} = req.body
        const special = await Special.create({name})
        return res.json(special)
    }
    async getAll(req, res) {
        const specials = await Special.findAll()
        return res.json(specials)
    }
    async delete(req, res) {

    }
}

module.exports = new SpecialController()